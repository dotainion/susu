export const ProgressBar = ({className, value, max, inBackground, children}) =>{
    const percent = Math.min(((value || 0) / (max || 100)) * 100, 100);
    return(
        <div className={`progress position-relative mb-3 ${className}`} style={{ height: "20px" }}>
            <div 
                className="progress-bar bg-primary" 
                role="progressbar" 
                aria-valuenow={value} 
                aria-valuemin={0} 
                aria-valuemax={max} 
                style={{width: `${percent}%`}}
            >{inBackground 
                ? null 
                : typeof children === 'function' 
                    ? children(percent, value, max) 
                    : children}</div>
            {inBackground 
                ? <div className="position-absolute top-50 start-50 translate-middle" style={{zIndex: 9999}}>{
                    typeof children === 'function' 
                        ? children(percent, value, max) 
                        : children}</div> 
                : null}
        </div>
    )
}