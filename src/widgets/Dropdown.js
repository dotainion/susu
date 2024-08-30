export const Dropdown = ({className, options, defaultValue, asContent, children}) =>{
    return(
        <div className="dropdown">
            <button className={`btn ${className || ''} dropdown-toggle`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {children}
            </button>
            <ul className="dropdown-menu">
                {options?.map((option, key)=>(
                    <li key={key}>
                        {
                            asContent
                            ? <div className="px-3">{option.title}</div>
                            : <a onClick={option?.onClick} className="dropdown-item pointer">{option.title}</a>
                        }
                    </li>
                ))}
                {
                    defaultValue && !options?.length 
                    ?   <li>
                            {
                                asContent
                                ? <div className="px-3">{defaultValue}</div>
                                : <a className="dropdown-item pointer">{defaultValue}</a>
                            }
                        </li> 
                    : null
                }
            </ul>
        </div>
    )
}