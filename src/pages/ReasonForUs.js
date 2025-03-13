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

export const ReasonForUs = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    return(
        <div className="container d-flex flex-column vh-100">
            <Header/>
            <div className="container pt-sm-4 pt-0">
                <div className="my-5">
                    <div className="display-5 fw-bold my-4">Reason For Us</div>
                    <div className="my-3">Our app is designed to facilitate collective saving and support users in achieving their financial independence goals. By collaborating with others, you enhance your likelihood of reaching your financial objectives more efficiently. The app provides several distinctive features, including:</div>
                    <ul className="my-4">
                        <li className="mb-2"><b>Convenience Redefined:</b> Effortlessly manage your financial commitments with SusuApp, which offers unparalleled convenience right at your fingertips. Track, contribute, and receive payments with minimal effort.</li>
                        <li className="mb-2"><b>Automated Reminders:</b> Streamline the contribution process with timely notifications that alert members to their payment obligations. This feature eliminates the need for susu managers to manually follow up, reducing their administrative burden.</li>
                        <li className="mb-2"><b>Secure and Transparent Transactions:</b> Trust in the security of your financial information with SusuApp’s robust encryption and security measures. Benefit from real-time tracking of financial activities, ensuring transparency and fostering trust and accountability within the community.</li>
                        <li className="mb-2"><b>Financial Education Resources:</b> Enhance your financial literacy with access to valuable resources directly through the app. Explore articles, tips, and tools designed to help you make informed decisions and achieve your financial goals.</li>
                        <li className="mb-2"><b>Community Building and Support:</b> SusuApp not only addresses financial needs but also fosters a supportive community. Engage with fellow members through integrated communication features, such as chat and discussion forums, to exchange advice and build meaningful connections.</li>
                        <li className="mb-2"><b>Customer Support Excellence:</b> Enjoy exceptional customer support with our dedicated team, ready to assist you with any queries and ensure a smooth and positive experience with SusuApp.</li>
                    </ul>
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