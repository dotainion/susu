import { useAuth } from "../provider/AuthProvider";
import logo from "../images/logo.png";

export const Welcome = () =>{
    const { user } = useAuth();
    return(
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
            <div className="text-center">
                <img className="w-25" src={logo} alt="Susu Application"/>
                <h1>WELCOME</h1>
                <h4>{user?.attributes?.firstName} {user?.attributes?.lastName}</h4>
            </div>
        </div>
    )
}