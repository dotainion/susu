export const ProgressBar = ({value}) =>{
    return(
        <div className="progress-bar rounded-pill">
            <div className="progress rounded-0" style={{width: `${value}%`}}></div>
        </div>
    )
}