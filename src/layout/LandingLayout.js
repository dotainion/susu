import { Footer } from "./Footer"
import { Header } from "./Header"

export const LandingLayout = ({children}) =>{
    return(
        <div className="landing">
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}