import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useStripe, useElements, CardElement, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { api } from '../request/Api';
import { loadStripe } from '@stripe/stripe-js';
import { FaCreditCard } from 'react-icons/fa';
import { SiGooglepay } from 'react-icons/si';
import { FaApple } from 'react-icons/fa';
import { FaMicrosoft } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import { IoLogoBitcoin } from 'react-icons/io';
import { FaPaypal } from 'react-icons/fa';
import { ParseError } from '../utils/ParseError';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { routes } from '../routes/Routes';
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcJcb } from 'react-icons/fa';
import $ from 'jquery';
import paymentImg from '../images/card-payment.png';
import { useLayout } from '../layout/Layout';

export const Payments = () => {
    const { setParams, setLayoutParams } = useLayout();

    const params = useParams();

    useLayoutEffect(() => {
        setParams({communityId: params.communityId});
        return () => setLayoutParams({});
    }, []);

    return(
        <div className="container">
            <div className="card overflow-hidden mt-3">
                <div className="card-body overflow-hidden">
                    <h4>Card Payment is Currently Unavailable </h4>
                    <p>Payment is Currently Unavailable
                        We regret to inform you that payments are not available on our app at the moment. We are actively working on resolving this and will notify you once payment processing is up and running again. Thank you for your understanding and patience.
                        If you have any questions or need assistance, please contact our support team at [support email].</p>
                </div>
            </div>
        </div>
    )
}