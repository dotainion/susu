import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useAuth } from "../provider/AuthProvider";
import { Dropdown } from "../widgets/Dropdown";
import mobileView from "../images/mobile-view.png";
import tabletView from "../images/tablet-view.png";
import logo from "../images/logo.png";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

export const Onboarding = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    return(
        <div className="container d-flex flex-column vh-100">
            <Header/>
            <div className="container pt-sm-5 pt-0 mb-auto">
                <div className="d-block d-sm-flex pt-sm-5 pt-sm-0">
                    <div className="w-100 pe-sm-4 pe-0">
                        <div className="d-block d-sm-flex">
                            <img src={logo} style={{height: '100px'}} alt="Susu Application"/>
                            <div>
                                <h1>Boost your savings:</h1>
                                <h1>Smarter.</h1>
                            </div>
                        </div>
                        <p>Jon the community of users who are revolutionizing their financial habits</p>
                        <ul>
                            <li>Flexible Saving Plans</li>
                            <li>Instant Access</li>
                            <li>Automated Transactions</li>
                            <Dropdown 
                                className="btn-lg btn-light mt-4"
                                asContent
                                options={[{
                                    title: 'The application will be available for download soon'
                                }]}>Download App</Dropdown>
                            <button hidden className="btn btn-lg btn-light mt-4">Download App</button>
                            {/* the button is hidden untill and dropdown is use until download is available */}
                        </ul>
                    </div>
                    <div className="w-100 mt-5 mt-sm-0 pt-5 pt-sm-0">
                        <img className="w-50 w-sm-100" src={mobileView} alt=""/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}