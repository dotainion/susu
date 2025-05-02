import { useRef, useState } from "react"
import { LandingLayout } from "../../layout/LandingLayout"
import { api } from "../../request/Api"
import $ from "jquery"
import { ParseError } from "../../utils/ParseError"
import { MdOutlineError } from "react-icons/md";
import { Loader } from "../../components/Loader"

export const ContactUs = () =>{
    const [loading, setLoading] = useState(false);

    const subjectRef = useRef();
    const bodyRef = useRef();
    const recipientRef = useRef();

    const toastRef = useRef();

    const sendMail = (e) =>{
        e.preventDefault();
        setLoading(true);

        const data = {
            subject: subjectRef.current.value,
            body: bodyRef.current.value,
            recipient: recipientRef.current.value,
        }
        api.mail.set(data).then((response)=>{

        }).catch((error)=>{
            $(toastRef.current).find('[data-content]').text(new ParseError().message(error));
            new window.bootstrap.Toast(toastRef.current).show();
        }).finally(()=>{
            setLoading(false);
        });
    }

    return(
        <LandingLayout>
            <section className="contact mt-5 pt-5 bg-light">
                <div className="container">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold text-primary">Get in Touch</h2>
                        <p className="text-muted">Have questions about group savings, need support, or want to partner with us? We’re here to help.</p>
                    </div>

                    <div className="row g-5">
                        <div className="col-md-6">
                            <form onSubmit={sendMail}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input ref={subjectRef} type="text" className="form-control" id="name" placeholder="Subject of your message" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Your Email</label>
                                    <input ref={recipientRef} type="email" className="form-control" id="email" placeholder="you@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea ref={bodyRef} className="form-control" id="message" rows="4" placeholder="How can we assist you?"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">Send Message</button>
                            </form>
                        </div>

                        <div className="col-md-6">
                            <div className="bg-white p-4 shadow-sm rounded-3 mb-4">
                                <h5 className="fw-bold mb-3">Contact Information</h5>
                                <p><strong>Email:</strong> caribbeancodingacademy@gmail.com</p>
                                <p><strong>Phone:</strong> +1 (473) 456-1568</p>
                                <p><strong>Location:</strong> Caribbean Coding Academy, H.A. Blaize Street, St. George’s, Grenada</p>
                                <p className="text-muted small">Available Monday to Friday, 8 AM to 4 PM AST.</p>
                            </div>

                            <div className="ratio ratio-16x9">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.1234567890123!2d-61.748920!3d12.050070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c3e5a1234567890%3A0xabcdef1234567890!2sCaribbean%20Coding%20Academy!5e0!3m2!1sen!2sgd!4v1610000000000"
                                    width="100%"
                                    height="100%"
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Caribbean Coding Academy Location"
                                    className="border-0"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="position-fixed top-0 end-0 mt-5 p-3" style={{zIndex: 9999}}>
                <div ref={toastRef} className="toast show align-items-center text-white bg-danger bg-opacity-75 border-0 hide" role="alert">
                    <div className="d-flex">
                        <div className="toast-body d-flex align-items-center gap-1">
                            <MdOutlineError className="text-warning fs-3"/>
                            <div data-content></div>
                        </div>
                        <button type="button" className="btn-close btn-close-dark me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                </div>
            </div>

            {loading && (
                <div className="position-absolute top-0 start-0 w-100 vh-100 bg-dark bg-opacity-10">
                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                        <Loader keepAlive />
                    </div>
                </div>
            )}
        </LandingLayout>
    )
}