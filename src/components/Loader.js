import { useEffect, useRef, useState } from "react"

export const Loader = () =>{
    const [show, setShow] = useState(true);

    const loaderRef = useRef();
    const timeoutRef = useRef();

    useEffect(()=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setShow(false);
        }, 10000);

        return ()=>{
            setShow(true);
        }
    }, []);

    if(!show) return;

    return(
        <div ref={loaderRef} className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}