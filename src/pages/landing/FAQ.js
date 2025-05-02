import React from "react";
import { MdHelpOutline, MdEmail } from "react-icons/md";
import { LandingLayout } from "../../layout/LandingLayout";

export const FAQ = () =>{
    const faqs = [
        {
            q: 'What exactly is a Susu?',
            a: 'A Susu is a traditional community-based savings circle where members contribute a fixed amount regularly, and each member takes turns receiving the full pot. SusuSpice digitizes this process so you can do it safely from anywhere.'
        },
        {
            q: 'Who can use SusuSpice?',
            a: 'Anyone over 18 with access to mobile money or a bank account can use SusuSpice. We’re designed for people across the Caribbean and those who send or receive money globally.'
        },
        {
            q: 'How does SusuSpice keep my money safe?',
            a: 'We use bank-grade encryption, secure transactions, fraud detection tools, and identity verification. Your money never sits in an unregulated location — payouts go directly to your connected wallet or account.'
        },
        {
            q: 'Can I invite people outside my country to join my group?',
            a: 'Yes. SusuSpice supports international group members. Just make sure everyone can pay using one of our supported payment methods.'
        },
        {
            q: 'What happens if someone stops contributing?',
            a: 'Groups can define rules to skip turns, pause the group, or remove unreliable members. Our system helps detect issues early and notifies both admin and members of any concerns.'
        },
        {
            q: 'Is SusuSpice a loan or credit service?',
            a: 'Nope. A Susu is not a loan. It’s a savings rotation system built on mutual trust. There’s no interest, no debt, and no credit checks.'
        },
        {
            q: 'How are payouts handled?',
            a: 'Once your turn comes, the full pooled amount is automatically sent to your linked bank or mobile wallet account. No waiting. No paperwork.'
        },
        {
            q: 'Are there any hidden fees?',
            a: 'We’re transparent. A small platform fee (around 1.5–2%) is deducted to cover security, infrastructure, and support. No surprises.'
        },
        {
            q: 'Can I have more than one Susu running at the same time?',
            a: 'Yes. Many users manage multiple Susus for different savings goals. Each group works independently — just make sure you can keep up with your commitments.'
        }
    ];

    return(
        <LandingLayout>
            <div className="container my-5 pt-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5">Frequently Asked Questions</h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '720px' }}>Need help understanding how SusuSpice works? We've got you covered with answers to the most common questions about starting, joining, and managing your Susu groups.</p>
                </div>

                <div className="accordion" id="faqAccordion">
                    {faqs.map((item, index) => (
                        <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
                                <button
                                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''} bg-light text-dark`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${index}`}
                                    aria-expanded={index === 0 ? 'true' : 'false'}
                                    aria-controls={`collapse${index}`}
                                >
                                    {item.q}
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`}
                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#faqAccordion"
                            >
                                <div className="accordion-body text-muted">{item.a}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-5 pt-5 border-top">
                    <MdHelpOutline size={60} className="text-primary mb-3" />
                    <h4 className="fw-bold mb-2">Still need assistance?</h4>
                    <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>If your question wasn’t answered above, our friendly support team is here to help. We typically respond within 24 hours.</p>
                    <a href="mailto:mb.repairss@gmail.com" className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2 mt-2">
                        <MdEmail size={20} />
                        <span>Contact Support</span>
                    </a>
                </div>
            </div>
        </LandingLayout>
    )
}