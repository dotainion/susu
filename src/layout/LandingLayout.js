import { useLayoutEffect } from "react"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { utils } from "../utils/Utils";

export const LandingLayout = ({children}) =>{

    useLayoutEffect(()=>{
        utils.dom.loggedOutNotification().hide();
    }, []);

    return(
        <div className="landing">
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}