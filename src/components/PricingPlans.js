export const PricingPlans = () =>{
    const plans = [
        {
          title: "🔹 Free Member",
          price: "Free",
          description: "Great for casual users just starting out",
          features: [
            "Join 1 susu group",
            "Manual contributions",
            "In-app notifications only",
            "Limited history (30 days)",
            "Basic rotation and payout view",
            "Ads supported",
          ],
        },
        {
          title: "🔸 Premium Member",
          price: "$4.99 one-time",
          description: "Ideal for regular susu members",
          features: [
            "Join up to 5 susu groups",
            "SMS/email reminders",
            "Auto-schedule contributions",
            "Full access to history & payouts",
            "Export reports (PDF/CSV)",
          ],
        },
        {
          title: "🟢 Group Admin Plus",
          price: "$9.99 one-time per group",
          description: "Best for leaders or community organizers",
          features: [
            "Create & manage unlimited susu groups",
            "Admin dashboard",
            "Co-admin roles and approvals",
            "Custom branding for groups",
            "Payout control & penalties",
          ],
        },
        {
          title: "🟣 Trusted Organizer Pro",
          price: "$19.99 or % commission",
          description: "For susu managers at scale",
          features: [
            "Host susu groups for others",
            "Verified badge & priority listing",
            "Collect commission from payouts",
            "Payout auto-distribution tools",
            "Dispute resolution system",
          ],
        },
    ];

    return(
        <div className="container py-5">
            <h2 className="text-center mb-3">SusuSpice Monetization Plans</h2>
            <p className="text-center text-muted mb-5">
                Start free and unlock powerful features as you grow.
            </p>
            <div className="row">
                {plans.map((plan, index) => (
                    <div className="col-md-6 col-lg-3 mb-4" key={index}>
                        <div className="card h-100 shadow-sm overflow-hidden">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{plan.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{plan.price}</h6>
                                <p className="card-text small">{plan.description}</p>
                                <ul className="list-unstyled small mb-4">
                                {plan.features.map((f, i) => (
                                    <li key={i}>✔️ {f}</li>
                                ))}
                                </ul>
                                <button className="btn btn-primary mt-auto">Choose Plan</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}