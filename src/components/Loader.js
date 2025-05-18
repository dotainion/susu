import { useEffect} from "react";

export const Loader = ({show}) =>{

    useEffect(()=>{
        
    }, []);

    if(!show) return;

    return(
        <div className="position-absolute top-50 start-50 translate-middle" style={{zIndex: 999999}}>
            <div className="three-dot-loader">
                <span className="dot border-danger"></span>
                <span className="dot border-danger"></span>
                <span className="dot border-danger"></span>
            </div>
        </div>
    )
}