import React, { useState, useEffect } from 'react';
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
import paymentImg from '../images/card-payment.png';
import $ from 'jquery';

class Methods{
    cardTypes = ['visa', 'mastercard', 'amex', 'discover', 'jcb', 'dinersclub'];
    list = [
        {title: 'Card', icon: FaCreditCard, style: { backgroundColor: '#007bff', color: 'white' }, code: 'card'},
        {title: 'Google Pay', icon: SiGooglepay, style: { backgroundColor: '#34A853', color: 'white' }, code: 'googlePay'},
        {title: 'Apple Pay', icon: FaApple, style: { backgroundColor: '#000000', color: 'white' }, code: 'applePay'},
        {title: 'Microsoft Pay', icon: FaMicrosoft, style: { backgroundColor: '#00A4EF', color: 'white' }, code: 'microsoftPay'},
        {title: 'Payment Request', icon: IoIosSend, style: { backgroundColor: '#ffca28', color: 'black' }, code: 'paymentRequest'},
        {title: 'iDEAL', icon: IoLogoBitcoin, style: { backgroundColor: '#17a2b8', color: 'white' }, code: 'ideal'},
        {title: 'Bancontact', icon: IoLogoBitcoin, style: { backgroundColor: '#007fbb', color: 'white' }, code: 'bancontact'},
        {title: 'SEPA Direct Debit', icon: IoLogoBitcoin, style: { backgroundColor: '#f1c40f', color: 'black' }, code: 'sepa'},
        {title: 'Sofort', icon: IoLogoBitcoin, style: { backgroundColor: '#f39c12', color: 'white' }, code: 'sofort'},
        {title: 'Alipay', icon: IoLogoBitcoin, style: { backgroundColor: '#f44c32', color: 'white' }, code: 'alipay'},
        {title: 'WeChat Pay', icon: IoLogoBitcoin, style: { backgroundColor: '#1aad19', color: 'white' }, code: 'wechat'},
        {title: 'Klarna', icon: IoLogoBitcoin, style: { backgroundColor: '#00A3E0', color: 'white' }, code: 'klarna'},
        {title: 'Afterpay', icon: IoLogoBitcoin, style: { backgroundColor: '#111111', color: 'white' }, code: 'afterpay'},
        {title: 'PayPal', icon: FaPaypal, style: { backgroundColor: '#003087', color: 'white' }, code: 'paypal'},
        {title: 'ACH Payments', icon: IoLogoBitcoin, style: { backgroundColor: '#28a745', color: 'white' }, code: 'ach'},
        {title: 'Giropay', icon: IoLogoBitcoin, style: { backgroundColor: '#6c757d', color: 'white' }, code: 'giropay'},
        {title: 'EPS', icon: IoLogoBitcoin, style: { backgroundColor: '#e9ecef', color: 'black' }, code: 'eps'},
        {title: 'Card Payments with 3D Secure', icon: IoLogoBitcoin, style: { backgroundColor: '#6f42c1', color: 'white' }, code: '3dSecure'}
    ];
    codeToArray(){
        return this.list.map((ob)=>ob.code);
    }
};
const methods = new Methods();

export const StripePayments = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');
    const [paymentRequest, setPaymentRequest] = useState(null);
    const [susu, setSusu] = useState();
    const [errors, setErrors] = useState();
    const [loading, setLoading] = useState(false);
    const [showMethods, setShowMethods] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const showMethodOption = (e) =>{
        e.stopPropagation();
        setShowMethods(!showMethods);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return setErrors('Stripe has not loaded.');
        setErrors(null);
        setLoading(true);
    
        const createPaymentMethod = async (type, additionalParams = {}) => {
            try {
                const {error, paymentMethod} = await stripe.createPaymentMethod({type, ...additionalParams});
                if (error) return null;
                return paymentMethod;
            } catch (err) {
                return null;
            }
        }
    
        let paymentMethod;
        try{
            if (selectedPaymentMethod === 'card') paymentMethod = await createPaymentMethod('card', {card: elements.getElement(CardElement)});
            else if (methods.codeToArray().includes(selectedPaymentMethod)) paymentMethod = await createPaymentMethod(selectedPaymentMethod);
            else return setErrors('Invalid payment method selected.');
            if (!paymentMethod) return setErrors('Error: No valid payment method selected');
    
            const response = await api.payment.createIntent(params.memberId, 'usd', parseFloat(susu.attributes.contribution), paymentMethod.id);
            const intent = response.data.data[0];
    
            if (!intent || !intent.attributes.clientSecret) return setErrors('Error: Client secret not received from the server');

            const data = {
                susuId: susu.id, 
                memberId: params.memberId, 
                contribution: susu.attributes.contribution,
                paymentIntentId: intent.id,
                type: 'Card'
            }
            await api.contribution.add(data);
            navigate(routes.susu().nested().receipt(intent.id, susu.id, params.memberId));
        }catch(err){
            setErrors(new ParseError().message(err));
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        api.susu.active(params.communityId).then((response)=>{
            setSusu(response.data.data[0]);
        }).catch((error)=>{

        });

        const hideMethods = () => setShowMethods(false);
        $(window).on('click', hideMethods);
        return ()=>{
            $(window).off('click', hideMethods);
        }
    }, []);

    useEffect(() => {
        if (!stripe || !susu) return;
        const pr = stripe.paymentRequest({
            country: 'US',
            currency: 'usd',
            requestPayerName: true,
            requestPayerEmail: true,
            total: {
                label: 'Total',
                amount: parseFloat(susu.attributes.contribution),
            },
        });

        pr.canMakePayment().then((result) => {
            if (result && (result.applePay || result.googlePay || result.microsoftPay)) setPaymentRequest(pr);
        });

        return () => {
            if (pr) pr.abort();
        };
    }, [stripe]);

    if(!susu) return <Loader center/>

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-12 border p-3 rounded-3 mt-3" style={{maxWidth: '500px'}}>
                    <div className="h4 mb-3">Susu Payment</div>

                    {showMethods && (
                        <div className="position-relative">
                            <div className="position-absolute w-100 top-0 start-0 shadow-sm p-3 bg-light rounded-3" style={{zIndex: '9999'}}>
                                <div className="d-flex justify-content-evenly flex-wrap gap-2">
                                    {methods.list.map((method, key)=>(
                                        <button onClick={() => setSelectedPaymentMethod(method.code)} className="btn btn-sm" style={method.style} key={key}>
                                            <FaCreditCard /> {method.title}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mb-3" style={{height: '200px'}}>
                        <img className="w-100 h-100" src={paymentImg}/>
                    </div>

                    <div className="d-flex flex-wrap gap-2 text-light">
                        {methods.list.map((method, key)=>{
                            if(selectedPaymentMethod !== method.code) return null;
                            return(
                                <span className="d-flex align-items-center bg-primary px-2" key={key}>
                                    <FaCreditCard className="me-2" /> {method.title}
                                </span>
                            )
                        })}
                        <span onClick={showMethodOption} className="d-flex align-items-center bg-primary" title="More...">
                            <FaEllipsisVertical />
                        </span>
                    </div>
                    
                    <hr></hr>

                    <form onSubmit={handleSubmit}>
                        {selectedPaymentMethod === 'card' && (
                            <div className="py-3">
                                <div className="d-flex justify-content-between">
                                    <div className="small fw-bold mb-3">Credit/Debit Card</div>
                                    <div className="d-flex gap-2">
                                        <FaCcVisa size={40} color="#1A1F71"/>
                                        <FaCcMastercard size={40} color="#EB001B"/>
                                        <FaCcAmex size={40} color="#2A9FD6"/>
                                        <FaCcDiscover size={40} color="#FF6A13"/>
                                        <FaCcJcb size={40} color="#3E7B31"/>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <h4 className="mb-0">${susu?.attributes?.contribution || 254}</h4>
                                    <div className="text-muted small">Susu contribution</div>
                                </div>
                                <div className="border rounded-3 p-3">
                                    <CardElement />
                                </div>
                            </div>
                        )}

                        {selectedPaymentMethod !== 'card' && paymentRequest && (
                            <PaymentRequestButtonElement
                                options={{
                                    paymentRequest,
                                    style: {
                                        paymentRequestButton: {
                                            type: 'default',
                                            theme: 'dark',
                                            height: '40px',
                                        },
                                    },
                                }}
                            />
                        )}

                        {methods.codeToArray().includes(selectedPaymentMethod) && selectedPaymentMethod !== 'card' && (
                            <div>
                                <p>Processing {selectedPaymentMethod.toUpperCase()} payment...</p>
                            </div>
                        )}

                        {errors ? <div className="py-2 text-danger">{errors}</div> : null}

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-sm bg-primary mt-4 m-auto" type="submit" disabled={loading} style={{width: '200px'}}>
                                {susu 
                                ? <span>{loading 
                                    ? <div className="spinner-border spinner-border-sm text-white" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div> 
                                    : <span>Pay ${susu.attributes.contribution}</span>}</span> 
                                : <span>Make Payment</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

/*const stripePromise = loadStripe('pk_test_51HMQLOBZvIBjqI0ERBmRc4Feu7qu6fXdnc8IZ9whUpTWAMIEZyYRSUsFCc2LQlXIPJJqBYgzcIbQJY5WODNXdiuf00TucXVjmM');
export const Payments = () => {
    return (
        <Elements stripe={stripePromise}>
            <StripePayments />
        </Elements>
    )
}*/

export const Payments = () => {
    const [isFygaroLoaded, setIsFygaroLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the Fygaro script from the correct CDN
    const script = document.createElement('script');
    script.src = "https://cdn.fygaro.com/your-fygaro-script.js"; // Replace with the actual Fygaro script URL
    script.async = true;

    // On script load, set the state to indicate that Fygaro is available
    script.onload = () => {
      // Check if Fygaro is loaded and available in the window object
      if (window.Fygaro) {
        setIsFygaroLoaded(true);
        console.log('Fygaro script loaded successfully.');
      } else {
        console.error('Fygaro did not load correctly.');
      }
    };

    // On script error, log an error
    script.onerror = () => {
      console.error('Failed to load Fygaro script.');
    };

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup: Remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (!isFygaroLoaded) {
      console.error('Fygaro is not loaded.');
      return;
    }

    // Trigger Fygaro's payment window when the button is clicked
    if (window.Fygaro) {
      window.Fygaro.openPaymentWindow({
        amount: 1000, // Amount in cents (e.g., $10.00)
        currency: 'USD',
        description: 'Example Product', // Description of the product
        successCallback: (response) => {
          console.log('Payment successful:', response);
        },
        errorCallback: (error) => {
          console.error('Payment failed:', error);
        },
      });
    } else {
      console.error('Fygaro is not defined or loaded.');
    }
  };

  return (
    <div>
      <button onClick={handlePayment} disabled={!isFygaroLoaded}>
        Pay with Fygaro
      </button>
    </div>
  );
}