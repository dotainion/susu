import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { token } from "../utils/Token";
import { Notifications } from "../components/Notifications";
import { ModalOverlay } from "../container/ModalOverlay";
import $ from "jquery";
import { routes } from "../routes/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { mockData } from "../contents/MockData";
import { SidebarProvider } from "../layout/SidebarProvider";
import { Loader } from "../components/Loader";
import { utils } from "../utils/Utils";

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [pending, setPending] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const setSuccess = (response, callback) =>{
        token.set(response.data.data[0].attributes.token);
        api.reInitializeAuthorizationHeader();
        setUser(response.data.data[0]);
        setIsAuthenticated(true);
        callback({success: response});
    }

    const setUnsuccess = (error, callback) =>{
        setUser(null);
        setIsAuthenticated(false);
        callback({error});
    }

    const signIn = (email, password, callback) =>{
        setPending(true);
        callback({loading: true});
        api.auth.signIn(email, password).then((response)=>{
            setSuccess(response, callback);
        }).catch((error)=>{
            setUnsuccess(error, callback);
        }).finally(()=>{
            setPending(false);
        });
    }
    
    const signUp = (data, callback) =>{
        setPending(true);
        data['session'] = {
            authenticate: 'auto'
        }
        callback({loading: true});
        api.auth.signUp(data).then((response)=>{
            setSuccess(response, callback);
        }).catch((error)=>{
            setUnsuccess(error, callback);
        }).finally(()=>{
            setPending(false);
        });
    }

    const signOut = () =>{
        setPending(true);
        api.auth.logout().then((response)=>{
            token.set(null);
            setUser(null);
            setIsAuthenticated(false);
        }).catch((error)=>{
            token.set(null);
            setUser(null);
            setIsAuthenticated(false);
        }).finally(()=>{
            setPending(false);
        });
    }

    useLayoutEffect(()=>{
        const path = window.location.hash.replace('#', '');
        if([routes.signIn(), routes.register(), routes.landing()].includes(path) || path.includes('test')){
            utils.dom.loggedOutNotification().hide('fast');
        }
    }, [location]);

    useEffect(()=>{
        if(process.env.NODE_ENV === 'development'){
            setUser(mockData.user());
            setIsAuthenticated(true);
            return setLoading(false);
        }
        api.auth.session().then((response)=>{
            setUser(response.data.data[0]);
            setIsAuthenticated(true);
        }).catch((error)=>{
            setUser(null);
            setIsAuthenticated(false);
        }).finally(()=>{
            setLoading(false);
        });
    }, []);

    const value = {
        user,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
    }

    return(
        <Context.Provider value={value}>
            {
                loading 
                ? <Loader show/> 
                : <SidebarProvider>
                    {children}
                </SidebarProvider>
            }
            {isAuthenticated ? <Notifications/> : null}
            <div id="login-notification" style={{display: 'none'}}>
                <ModalOverlay show centered noHeader>
                    <div className="d-flex align-items-center w-100">
                        <div className="w-100">You are no longer logged in.</div>
                        <button onClick={()=>{
                            utils.dom.loggedOutNotification().hide('fast');
                            navigate(routes.signIn());
                        }} className="btn btn-sm btn-primary">Okay</button>
                    </div>
                </ModalOverlay>
            </div>
            {pending && (
                <div className="bg-primary bg-opacity-10 position-fixed top-0 start-0 w-100 vh-100" style={{zIndex: 9999999}}>
                    <Loader show/>
                </div>
            )}
        </Context.Provider>
    )
}