import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/Routes";
import { useAuth } from "../../provider/AuthProvider";
import tabletView from "../../images/tablet-view.png";
import logo from "../../images/logo.png";
import { LandingLayout } from "../../layout/LandingLayout";

export const ReasonForUs = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    return(
        <LandingLayout>
            <section className="bg-primary text-light pt-5 px-5 wave-section">
                <div className="container py-5">
                    <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center justify-content-lg-between py-5">
                        <div className="text-center text-lg-start">
                            <h2 className="display-4 fw-bold mb-4" style={{fontSize: '2.5rem', lineHeight: '1.3', color: '#ffffff'}}>Unlock Your Financial Freedom with SusuApp</h2>
                            <p className="lead mb-4" style={{fontSize: '1.25rem', color: '#e0f7fa'}}>Transform the way you save, grow, and achieve your financial goals. With SusuApp, saving with a community is easier, smarter, and more secure.</p>
                            <p className="mb-4" style={{fontSize: '1.1rem', color: '#e0f7fa'}}>Join a trusted platform that connects you with people you trust, to build your financial future together.</p>
                            <div className="text-start mb-4" style={{fontSize: '1.1rem', color: '#e0f7fa'}}>
                                <strong>How it works:</strong>
                                <ul>
                                    <li>Collaborate with like-minded individuals</li>
                                    <li>Enjoy automated payments and secure savings</li>
                                    <li>Reach your financial goals faster with accountability</li>
                                </ul>
                            </div>
                            <button 
                                onClick={()=>navigate(routes.register())} 
                                className="btn btn-lg btn-light rounded-pill fw-bold px-5 py-3 mt-3 position-absolute"
                                style={{zIndex: 2}}
                            >Get Started</button>
                        </div>

                        <div className="mt-4 mt-lg-0 d-flex justify-content-center">
                            <img
                                src={logo}
                                alt="SusuApp Logo"
                                className="rounded-circle p-3 bg-white"
                                style={{
                                    width: '250px',
                                    height: '250px',
                                    objectFit: 'cover',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s ease',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mb-5">
                <section className="my-5">
                    <h3 className="fw-bold text-center mb-4">Key Features & Benefits</h3>
                    <div className="row g-4">
                        {[
                            {
                                title: "📱 Mobile-First Simplicity",
                                text: "Set up your susu group, manage contributions, and receive payouts — all in just a few taps."
                            },{
                                title: "🔔 Smart Notifications",
                                text: "Get friendly reminders and real-time alerts for payments, payouts, and updates."
                            },{
                                title: "🔒 Bank-Level Security",
                                text: "Your data and transactions are encrypted and protected at every step."
                            },{
                                title: "📚 Built-in Financial Literacy",
                                text: "Access helpful articles, videos, and budgeting tools to help you grow smarter financially."
                            },{
                                title: "👥 Community Driven",
                                text: "Save as a team, support each other’s goals, and grow stronger together."
                            },{
                                title: "🌍 Local & Global Support",
                                text: "Whether you're in Ghana, Nigeria, or abroad, SusuApp works across borders."
                            }
                        ].map(({ title, text }, i) => (
                            <div className="col-md-6" key={i}>
                                <div className="p-4 bg-light border rounded shadow-sm h-100">
                                    <h5 className="fw-bold">{title}</h5>
                                    <p>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="py-3"></div>

                <section className="my-5">
                    <h3 className="fw-bold text-center mb-4">Who Uses SusuSpice?</h3>
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold">🎓 Students</h5>
                            <p>Save for tuition, laptops, or rent by pooling with classmates or roommates.</p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold">💼 Entrepreneurs</h5>
                            <p>Use Susu to raise rotating capital for small business inventory or restocking.</p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold">👨‍👩‍👧‍👦 Families</h5>
                            <p>Plan ahead for school fees, emergencies, or holidays while staying accountable together.</p>
                        </div>
                    </div>
                </section>

                <div className="py-3"></div>

                <section className="my-5">
                    <h3 className="fw-bold text-center my-4">Frequently Asked Questions</h3>
                    <div className="accordion" id="faqAccordion">
                        {[
                            {
                                question: "Is SusuSpice free to use?",
                                answer: "Yes! Creating an account and forming a group is free. Some premium features may be added in the future, but core susu functionality remains free."
                            },{
                                question: "How do payouts work?",
                                answer: "Each group has a set cycle. When it’s your turn, you receive the total pooled amount automatically into your connected account or wallet."
                            },{
                                question: "Can I invite people from outside my country?",
                                answer: "Yes! As long as they have internet access and a mobile payment method, they can join your group."
                            },{
                                question: "What if someone misses a payment?",
                                answer: "The app will notify them instantly and notify the admin. You can set grace periods or remove inactive members based on your group’s rules."
                            }
                        ].map(({question, answer}, i) => (
                            <div className="accordion-item" key={i}>
                                <h2 className="accordion-header" id={`heading${i}`}>
                                    <button
                                        className="accordion-button collapsed bg-light text-dark"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#collapse${i}`}
                                        aria-expanded="false"
                                        aria-controls={`collapse${i}`}
                                    >
                                    {question}
                                    </button>
                                </h2>
                                <div id={`collapse${i}`} className="accordion-collapse collapse" aria-labelledby={`heading${i}`} data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">{answer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="py-3"></div>

                <section className="text-center bg-primary text-white py-5 rounded mt-5">
                    <h2 className="fw-bold mb-3">Ready to Build Financial Freedom Together?</h2>
                    <p className="lead mb-4">Join thousands who are using SusuSpice to reach their goals and support one another.</p>
                    <button onClick={() => routes.register()} className="btn btn-light btn-lg">Create Your Group Now</button>
                </section>
            </div>
        </LandingLayout>
    )
}