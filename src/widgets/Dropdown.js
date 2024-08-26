export const Dropdown = ({className, options, defaultValue, children}) =>{
    return(
        <div className="dropdown">
            <button class={`btn ${className || ''} dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {children}
            </button>
            <ul className="dropdown-menu">
                {options?.map((option, key)=>(
                    <li key={key}>
                        <a onClick={option?.onClick} className="dropdown-item pointer">{option.title}</a>
                    </li>
                ))}
                {defaultValue && !options?.length ? <li><a className="dropdown-item pointer">{defaultValue}</a></li> : null}
            </ul>
        </div>
    )
}