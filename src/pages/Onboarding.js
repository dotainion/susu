import { useNavigate } from "react-router-dom";
import { routes } from "../routes/Routes";
import { useAuth } from "../provider/AuthProvider";
import { Dropdown } from "../widgets/Dropdown";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import mobileView from "../images/mobile-view.png";
import tabletView from "../images/tablet-view.png";

export const Onboarding = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    return(
        <div className="w-100" style={{minHeight: '100vh'}}>
            <div className="container pt-5">
                <div className="d-flex pt-5">
                    <div className="w-100">
                        <h1>Boost your savings:</h1>
                        <h1>Smarter.</h1>
                        <p>Jon the community of users who are revolutionizing their financial habits</p>
                        <ul>
                            <li>Flexible Saving Plans</li>
                            <li>Instant Access</li>
                            <li>Automated Transactions</li>
                            <Dropdown 
                                className="btn-lg btn-light mt-4"
                                asContent
                                options={[{
                                    title: 'Please note that the application is currently unavailable for download. We are working to solve this issue.'
                                }]}>Download App</Dropdown>
                            <button hidden className="btn btn-lg btn-light mt-4">Download App</button>
                            {/* the button is hidden untill and dropdown is use until download is available */}
                        </ul>
                    </div>
                    <div className="w-100">
                        <div className="d-flex justify-content-end">
                            {
                                isAuthenticated
                                    ? <button onClick={()=>navigate(routes.susu().default())} className="btn btn-sm btn-success">Continue as {user?.attributes?.firstName} {user?.attributes?.lastName}</button>
                                    : <button onClick={()=>navigate(routes.signIn())} className="btn btn-sm btn-success">Sign in</button>
                            }
                            <button onClick={()=>navigate(routes.register())} className="btn btn-sm btn-primary ms-3">Sign up</button>
                        </div>
                        <img className="w-50" src={mobileView} alt=""/>
                    </div>
                </div>
                <div className="my-5">
                    <div className="display-5 fw-bold my-4">About Us</div>
                    <h4 className="fw-bold">Achieve Financial Independence Without Relying on Credit Cards or High-Interest Bank Loans</h4>
                    <div className="my-3">This application enables you to initiate a rotating credit association, or Susu, with trusted friends and family members. Effortlessly establish a Susu group and collaborate to achieve savings goals by pooling resources together</div>
                    <h4>Overview of the Susu Savings Method</h4>
                    <div className="my-3">A Susu is a widely-used savings method that enables family and friends to build wealth collaboratively. In this practice, a group of individuals contributes a fixed amount of money on a monthly, bi-weekly, or weekly basis over a specified period. Each cycle, one member receives the total accumulated amount until all participants have had their turn to collect the lump sum. Contributions are equally shared, ensuring that each member ultimately receives the full amount once during the cycle.</div>
                    <div className="my-3">The Susu savings method fosters accountability in your financial journey by integrating you into a reliable network of individuals working collectively towards their savings goals. This approach not only encourages disciplined saving but also provides financial support to others within the group.</div>
                </div>
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
            <div className="d-flex justify-content-center my-5">
                <div className="text-center p-3">
                    <img className="w-100" src={tabletView} alt=""/>
                    <div className="fw-bold">Choose your journey</div>
                    <small>what is your role at the company. this can help lead where yopu start within our app.</small>
                    <div className="d-flex justify-content-center m-4">
                        <button onClick={()=>navigate(routes.signIn())} className="btn px-4">Sign in</button>
                        <button onClick={()=>navigate(routes.register())} className="btn px-4 ms-3">Sign up</button>
                    </div>
                </div>
            </div>
            <div className="container">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
                            <svg className="bi" width="30" height="24"><use xlink="#bootstrap"></use></svg>
                        </a>
                        <span className="mb-3 mb-md-0 text-body-secondary fw-bold">Susu Application</span>
                    </div>
                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex fs-4">
                        <li className="ms-3"><a className="text-body-secondary"><FaTwitter/></a></li>
                        <li className="ms-3"><a className="text-body-secondary"><FaInstagram/></a></li>
                        <li className="ms-3"><a className="text-body-secondary"><FaFacebook/></a></li>
                    </ul>
                </footer>
            </div>
        </div>
    )
}