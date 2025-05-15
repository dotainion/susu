import { useEffect, useRef, useState } from "react";

export const Loader = ({keepAlive, center}) =>{
    const [show, setShow] = useState(true);

    const timeoutRef = useRef();

    useEffect(()=>{
        if(keepAlive) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setShow(false);
        }, 10000);

        return ()=>{
            setShow(false);
        }
    }, []);

    if(!show && !keepAlive) return;

    return(
        <div className={`d-flex justify-content-center ${center ? 'align-items-center w-100 vh-100' : ''}`}>
            <div className="spinner-border" role="status" style={center ? {width: '3rem', height: '3rem'} : {}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}