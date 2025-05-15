import React from "react";
import { MdHelpOutline, MdEmail } from "react-icons/md";
import { LandingLayout } from "../../layout/LandingLayout";
import { routes } from "../../routes/Routes";
import { useNavigate } from "react-router-dom";
import { AccordionOptions } from "../../components/AccordionOptions";

export const FAQ = () =>{
    const navigate = useNavigate();

    const faqs = [
        {
            q: 'What exactly is a Susu?',
            a: 'A Susu is a traditional community-based savings circle where members contribute a fixed amount regularly, and each member takes turns receiving the full pot. SusuSpice digitizes this process so you can do it safely from anywhere.'
        },{
            q: 'Who can use SusuSpice?',
            a: 'Anyone over 18 with access to mobile money or a bank account can use SusuSpice. We’re designed for people across the Caribbean and those who send or receive money globally.'
        },{
            q: 'How does SusuSpice keep my money safe?',
            a: 'We use bank-grade encryption, secure transactions, fraud detection tools, and identity verification. Your money never sits in an unregulated location — payouts go directly to your connected wallet or account.'
        },{
            q: 'Can I invite people outside my country to join my group?',
            a: 'Yes. SusuSpice supports international group members. Just make sure everyone can pay using one of our supported payment methods.'
        },{
            q: 'What happens if someone stops contributing?',
            a: 'Groups can define rules to skip turns, pause the group, or remove unreliable members. Our system helps detect issues early and notifies both admin and members of any concerns.'
        },{
            q: 'Is SusuSpice a loan or credit service?',
            a: 'Nope. A Susu is not a loan. It’s a savings rotation system built on mutual trust. There’s no interest, no debt, and no credit checks.'
        },{
            q: 'How are payouts handled?',
            a: 'Once your turn comes, the full pooled amount is automatically sent to your linked bank or mobile wallet account. No waiting. No paperwork.'
        },{
            q: 'Are there any hidden fees?',
            a: 'We’re transparent. A small platform fee (around 1.5–2%) is deducted to cover security, infrastructure, and support. No surprises.'
        },{
            q: 'Can I have more than one Susu running at the same time?',
            a: 'Yes. Many users manage multiple Susus for different savings goals. Each group works independently — just make sure you can keep up with your commitments.'
        },{
            q: 'How do I start a new Susu group?',
            a: 'You can start a new group from your dashboard. Simply set the contribution amount, schedule, and invite participants. We’ll guide you through the setup.'
        },{
            q: 'Can I schedule automatic contributions?',
            a: 'Yes. You can link your payment method and enable auto-contributions to avoid missing a turn and ensure group stability.'
        },{
            q: 'What happens if someone leaves the group early?',
            a: 'Group admins can define policies for early exits. Typically, leaving early may mean forfeiting future payouts or being replaced. The group must approve changes.'
        },{
            q: 'Is there customer support if I need help?',
            a: 'Absolutely. Our support team is available via chat and email, and we offer in-app assistance for quick help.'
        },{
            q: 'Can I track my contributions and payout history?',
            a: 'Yes. Every transaction is logged in your account with timestamps and receipts so you can track your full history at any time.'
        },{
            q: 'Do I need a smartphone to use SusuSpice?',
            a: 'While the full experience is optimized for smartphones, you can also access SusuSpice from any internet-enabled device, including tablets and computers.'
        },{
            q: 'Is SusuSpice available in my country?',
            a: 'SusuSpice is currently available in select Caribbean countries with expanding coverage. Check our website for a full list of supported regions.'
        },{
            q: 'Can I use SusuSpice if I’m living abroad?',
            a: 'Yes. Many users living abroad use SusuSpice to participate in family or community Susus back home, as long as they have a supported payment method.'
        },{
            q: 'How are group rules enforced?',
            a: 'Group creators set the rules, and SusuSpice automates reminders, tracks contributions, and flags missed payments. Admins are notified of any issues.'
        },{
            q: 'What payment methods are supported?',
            a: 'We support bank transfers, mobile wallets, and select debit/credit cards, depending on your country. Check your dashboard for available options.'
        },{
            q: 'Is there a mobile app available?',
            a: 'Our mobile app is launching soon! In the meantime, you can use our fully responsive web platform on any device.'
        }
    ];

    return(
        <LandingLayout>
            <div className="container my-5 pt-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5">Frequently Asked Questions</h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '720px' }}>Need help understanding how SusuSpice works? We've got you covered with answers to the most common questions about starting, joining, and managing your Susu groups.</p>
                </div>

                <AccordionOptions faqs={faqs} accordionItem={{
                    content: 'Contact us',
                    action: ()=>navigate(routes.contact())
                }}/>

                <div className="text-center mt-5 pt-5 border-top">
                    <MdHelpOutline size={60} className="text-primary mb-3" />
                    <h4 className="fw-bold mb-2">Still need assistance?</h4>
                    <p className="text-muted mx-auto" style={{ maxWidth: '640px' }}>If your question wasn’t answered above, our friendly support team is here to help. We typically respond within 24 hours.</p>
                    <a onClick={()=>navigate(routes.contact())} className="btn btn-primary btn-lg d-inline-flex align-items-center gap-2 mt-2">
                        <MdEmail size={20} />
                        <span>Contact Support</span>
                    </a>
                </div>
            </div>
        </LandingLayout>
    )
}