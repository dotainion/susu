import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { useAuth } from "../../provider/AuthProvider";
import { Dropdown } from "../../widgets/Dropdown";
import mobileView from "../../images/mobile-view.png";
import logo from "../../images/logo.png";
import { LandingLayout } from "../../layout/LandingLayout";
import { MdGroup, MdNotifications, MdSecurity } from "react-icons/md";

export const Home = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    return(
        <LandingLayout>
            <section className="home">
                <div className="container py-5">
                    <div className="p-4 rounded-3 w-auto d-inline-block">
                        <div className="d-block d-sm-flex align-items-center mb-4 gap-4">
                            <img src={logo} alt="Susu Application" style={{ height: '100px' }} />
                            <div className="display-5 fw-bold text-dark">
                                <div>Boost your savings:</div>
                                <div className="text-primary">Smarter.</div>
                            </div>
                        </div>

                        <div className="fw-bold text-dark fs-5 mb-3">
                            <div>SusuApp makes group saving simple, automated, and clear.</div>
                            <div>Whether it’s a big goal or better habits, we help you stay on track.</div>
                        </div>

                        <ul className="list-unstyled text-dark fs-5 mb-4">
                            <li className="mb-2">✔️ Flexible Saving Plans</li>
                            <li className="mb-2">✔️ Instant Access to Your Contributions</li>
                            <li className="mb-2">✔️ Automated and Secure Transactions</li>
                            <li className="mb-2">✔️ Real-Time Tracking & Notifications</li>
                        </ul>

                        <p className="text-dark small mb-4">Trusted by communities across Grenada, Carriacou & Petite Martinique.</p>

                        <div className="d-flex gap-3 my-4">
                            <a onClick={()=>navigate(routes.contact())} className="btn btn-outline-primary shadow-none">Contact Us</a>
                            <button onClick={()=>navigate(routes.register())} className="btn btn-primary shadow-none">Get Started</button>
                        </div>

                        <Dropdown
                            className="btn btn-lg btn-outline-primary"
                            asContent
                            options={[{title: 'The application will be available for download soon'}]}
                        >
                            Download App
                        </Dropdown>
                    </div>
                </div>
            </section>
            
            <section>
                <div className="container mt-5 pt-5 border-top">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5">Why Choose SusuSpice?</h2>
                        <p className="lead text-muted">SusuSpice isn't just another savings platform. It's a community-driven tool that brings people together to achieve financial independence.</p>
                    </div>

                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <div className="p-4 bg-light rounded shadow-sm h-100">
                                <MdGroup size={60} className="mb-3" />
                                <h5 className="fw-bold">Community-Focused</h5>
                                <p className="text-muted">SusuSpice is built around the concept of mutual support. We bring together people you trust to help each other achieve financial goals.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="p-4 bg-light rounded shadow-sm h-100">
                                <MdSecurity size={60} className="mb-3" />
                                <h5 className="fw-bold">Secure Transactions</h5>
                                <p className="text-muted">With top-tier encryption and secure systems, we ensure that your financial information stays safe while you collaborate with your community.</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4">
                            <div className="p-4 bg-light rounded shadow-sm h-100">
                                <MdNotifications size={60} className="mb-3" />
                                <h5 className="fw-bold">Automated Reminders</h5>
                                <p className="text-muted">Never forget a payment with our automatic reminders. Stay on track with your contributions and ensure the success of your Susu group.</p>
                            </div>
                        </div>
                    </div>

                    <div className="py-3"></div>

                    <div className="text-center mt-5">
                        <h5 className="fw-bold">Got Questions?</h5>
                        <p className="text-muted">Learn more about how SusuSpice can help you reach your financial goals by checking out our FAQs or contacting support.</p>
                        <button onClick={()=>navigate(routes.faq())} className="btn btn-lg btn-primary mt-3">View FAQ</button>
                    </div>
                </div>

                <div className="py-3"></div>

                <div className="container mt-5 pt-5 border-top">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold display-5">Join the SusuSpice Movement Today</h2>
                        <p className="lead text-muted">Take the first step toward financial freedom by joining a community that helps you save and build wealth together.</p>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-lg btn-primary mt-3">Get Started Now</button>
                    </div>
                </div>
            </section>
        </LandingLayout>
    )
}