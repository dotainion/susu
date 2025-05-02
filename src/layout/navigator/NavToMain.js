import { useNavigate } from "react-router-dom";
import { NavGrid } from "../../components/NavGrid"
import { GiReturnArrow } from "react-icons/gi";
import { routes } from "../../routes/Routes";
import { NavHeader } from "../../components/NavHeader";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export const NavToMain = () =>{
    const navigate = useNavigate();

    const main = {
        title: 'To main',
        list: [
            {
                title: 'Main Menu',
                icon: GiReturnArrow,
                description: 'Returns you to the main menu.'
            }
        ]
    }

    return(
        <div className="container">
            <NavHeader/>
            <button onClick={()=>navigate(routes.nav().nested().main())} className="btn bg-transparent text-dark shadow-none border-0 btn-sm p-0 mt-3">
                <MdOutlineKeyboardBackspace className="fs-3"/>
            </button>
            <div className="small">Back to main menu</div>
        </div>
    )
}