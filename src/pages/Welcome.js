import { useAuth } from "../provider/AuthProvider"

export const Welcome = () =>{
    const { user } = useAuth();
    return(
        <div className="d-flex justify-content-center align-items-center w-100 vh-100">
            <div className="text-center">
                <h1>WELCOME</h1>
                <h4>{user?.attributes?.firstName} {user?.attributes?.lastName}</h4>
            </div>
        </div>
    )
}