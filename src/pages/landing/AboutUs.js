import { useNavigate } from "react-router-dom";
import { useAuth } from "../../provider/AuthProvider";
import tabletView from "../../images/tablet-view.png";
import { LandingLayout } from "../../layout/LandingLayout";
import { MdAccountBalanceWallet, MdAutorenew, MdPeopleAlt } from "react-icons/md";
import { routes } from "../../routes/Routes";

export const AboutUs = () =>{
    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();
    return(
        <LandingLayout>
            <div className="container mt-5 pt-5">
                <section className="text-center py-5 mb-5 bg-primary text-light rounded shadow-sm">
                    <h1 className="display-4 fw-bold">Welcome to SusuSpice</h1>
                    <p className="lead mt-3">
                        Save smarter. Build wealth. Empower your community.
                    </p>
                    <p>
                        Create or join a trusted Susu group to contribute and receive lump-sum payouts — the modern way to save together.
                    </p>
                    <button onClick={()=>navigate(routes.register())} className="btn btn-light btn-lg mt-3">Get Started</button>
                </section>

                <section className="mb-5">
                    <h2 className="fw-bold mb-4">How It Works</h2>
                    <div className="row g-4">
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="p-4 border rounded h-100">
                                <h4 className="fw-bold">1. Create or Join a Group</h4>
                                <p>Start your own Susu group with friends and family, or join one that fits your goals.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="p-4 border rounded h-100">
                                <h4 className="fw-bold">2. Start a Susu</h4>
                                <p>Set the rules for your group payout order, contribution amount, and schedule and invite members to join.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="p-4 border rounded h-100">
                                <h4 className="fw-bold">3. Contribute Regularly</h4>
                                <p>Choose your contribution schedule weekly, bi-weekly, or monthly and contribute easily via mobile money or bank.</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                            <div className="p-4 border rounded h-100">
                                <h4 className="fw-bold">4. Receive Your Payout</h4>
                                <p>On your assigned round, receive the total pooled amount. Everyone gets their turn no interest, no debt.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="py-3"></div>

                <section className="py-5 bg-light rounded mb-5">
                    <h2 className="fw-bold text-center mb-4">Why SusuSpice?</h2>
                    <div className="row text-center">
                        <div className="col-12 col-sm-6 col-md-3">
                            <h5 className="fw-bold">Trusted & Secure</h5>
                            <p>Private groups and verified users ensure your circle is safe and reliable.</p>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <h5 className="fw-bold">Flexible Contributions</h5>
                            <p>Set amounts and frequency that fit your budget and goals.</p>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <h5 className="fw-bold">No Interest or Fees</h5>
                            <p>You get back what you put in — no strings attached.</p>
                        </div>
                        <div className="col-12 col-sm-6 col-md-3">
                            <h5 className="fw-bold">Community Wealth</h5>
                            <p>Support each other and grow financially together.</p>
                        </div>
                    </div>
                </section>

                <div className="py-3"></div>

                <section className="mb-5">
                    <h2 className="fw-bold text-center mb-4">Key Features That Make Saving Simple</h2>
                    <div className="row text-center">
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="p-4 bg-light rounded shadow-sm h-100">
                                <MdAutorenew size={60} className="mb-3 text-primary" />
                                <h5 className="fw-bold">Flexible Cycles</h5>
                                <p className="text-muted">Set up weekly, bi-weekly, or monthly Susu cycles to match your group’s needs and personal cash flow.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="p-4 bg-light rounded shadow-sm h-100">
                                <MdAccountBalanceWallet size={60} className="mb-3 text-primary" />
                                <h5 className="fw-bold">Easy Payouts</h5>
                                <p className="text-muted">Get your payout directly to your bank or mobile wallet when it's your turn — no hassle, no delays.</p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4 mb-4">
                            <div className="p-4 bg-light rounded shadow-sm h-100">
                                <MdPeopleAlt size={60} className="mb-3 text-primary" />
                                <h5 className="fw-bold">Built on Trust</h5>
                                <p className="text-muted">We prioritize trusted connections, so every group is filled with real people you know and rely on.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="py-3"></div>

                <section className="text-center py-5 bg-primary text-white rounded">
                    <h2 className="fw-bold">Ready to Save Smarter?</h2>
                    <p className="lead mb-4">Join thousands using SusuCircle to take control of their finances.</p>
                    <button onClick={()=>navigate(routes.register())} className="btn btn-light btn-lg">Create Your Group</button>
                </section>
            </div>
        </LandingLayout>
    )
}