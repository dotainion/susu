export const SpinnerButton = ({className, onClick, spin, children}) =>{
    return(
        <button onClick={onClick} className={`position-relative ${className || ''}`}>
            {children}
            {spin && (
                <div className="position-absolute top-0 start-0 w-100 h-100">
                    <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </button>
    )
}