import { useNavigate } from "react-router-dom";
import { NavGrid } from "../../components/NavGrid"
import { GiReturnArrow } from "react-icons/gi";
import { routes } from "../../routes/Routes";

export const NavToMain = () =>{
    const navigate = useNavigate();

    const main = {
        title: 'To main',
        list: [
            {
                title: 'Main Menu',
                onClick: ()=>navigate(routes.nav().nested().main()),
                icon: GiReturnArrow,
                description: 'Returns you to the main menu.'
            }
        ]
    }

    return(
        <NavGrid nav={main}/>
    )
}