import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useAuth } from "../provider/AuthProvider";
import { Dropdown } from "../widgets/Dropdown";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import mobileView from "../images/mobile-view.png";
import tabletView from "../images/tablet-view.png";
import logo from "../images/logo.png";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";

export const AboutUs = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    return(
        <div className="container d-flex flex-column vh-100">
            <Header/>
            <div className="container pt-sm-4 pt-0">
                <div className="my-5">
                    <div className="display-5 fw-bold my-4">About Us</div>
                    <h4 className="fw-bold">Achieve Financial Independence Without Relying on Credit Cards or High-Interest Bank Loans</h4>
                    <div className="my-3">This application enables you to initiate a rotating credit association, or Susu, with trusted friends and family members. Effortlessly establish a Susu community and collaborate to achieve savings goals by pooling resources together</div>
                    <h4>Overview of the Susu Savings Method</h4>
                    <div className="my-3">A Susu is a widely-used savings method that enables family and friends to build wealth collaboratively. In this practice, a community of individuals contributes a fixed amount of money on a monthly, bi-weekly, or weekly basis over a specified period. Each cycle, one member receives the total accumulated amount until all participants have had their turn to collect the lump sum. Contributions are equally shared, ensuring that each member ultimately receives the full amount once during the cycle.</div>
                    <div className="my-3">The Susu savings method fosters accountability in your financial journey by integrating you into a reliable network of individuals working collectively towards their savings goals. This approach not only encourages disciplined saving but also provides financial support to others within the community.</div>
                </div>
            </div>
            <div className="d-flex justify-content-center my-5 mb-auto">
                <div className="text-center p-3">
                    <img className="w-100" src={tabletView} alt=""/>
                    <div className="fw-bold">Choose your journey</div>
                    <small>what is your role at the company. this can help lead where yopu start within our app.</small>
                </div>
            </div>
            <Footer/>
        </div>
    )
}