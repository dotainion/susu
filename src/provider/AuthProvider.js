import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { api } from "../request/Api";
import { token } from "../utils/Token";
import { Notifications } from "../components/Notifications";
import { ModalOverlay } from "../container/ModalOverlay";
import $ from "jquery";
import { routes } from "../routes/Routes";
import { useLocation, useNavigate } from "react-router-dom";
import { mockData } from "../container/MockData";
import { SidebarProvider } from "../layout/SidebarProvider";

const Context = createContext();
export const useAuth = () => useContext(Context);

export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const alertIdRef = useRef('login-notification');

    const signIn = (email, password, callback) =>{
        api.auth.signIn(email, password).then((response)=>{
            token.set(response.data.data[0].attributes.token);
            api.reInitializeAuthorizationHeader();
            setUser(response.data.data[0]);
            setIsAuthenticated(true);
            callback({success: response});
        }).catch((error)=>{
            setUser(null);
            setIsAuthenticated(false);
            callback({error});
        });
    }

    const signOut = () =>{
        api.auth.logout().then((response)=>{
            token.set(null);
            setUser(null);
            setIsAuthenticated(false);
        }).catch((error)=>{
            token.set(null);
            setUser(null);
            setIsAuthenticated(false);
        });
    }

    useEffect(()=>{
        const path = window.location.hash.replace('#', '');
        if([routes.signIn(), routes.register(), routes.onboarding()].includes(path) || path.includes('test')){
            $(`#${alertIdRef.current}`).hide('fast');
        }
    }, [location]);

    useEffect(()=>{
        /*if(process.env.NODE_ENV === 'development'){
            setUser(mockData.user());
            setIsAuthenticated(true);
            return setLoading(false);
        }*/
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
        signOut,
    }

    return(
        <Context.Provider value={value}>
            {
                loading 
                ? null 
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
                            $(`#${alertIdRef.current}`).hide('fast');
                            navigate(routes.signIn());
                        }} className="btn btn-sm btn-primary">Okay</button>
                    </div>
                </ModalOverlay>
            </div>
        </Context.Provider>
    )
}