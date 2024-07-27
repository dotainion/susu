import { useEffect, useState } from "react"

export const SelectOption = ({options, onChange, name, defaultValue}) =>{
    const [id] = useState(new Date().getTime());
    const [reRender, setReRender] = useState();

    /**
     * The useEfferct will set the reRender to true which will then trigger the second useEfferct
     * which will act as a little delay because of the asyc functionality built in
     * //when true then the component will be remove from the dom then place back so that the default value can be added
     */
    useEffect(()=>{
        setReRender(true);
    }, [defaultValue]);

    useEffect(()=>{
        setReRender(false);
    }, [reRender]);

    if(reRender) return;

    return(
        <div className="radio-group rounded-pill d-flex align-items-center mb-3">
            {options?.map((option, key)=>(
                <span key={key}>
                    <input 
                        id={`${id}-${key}`} 
                        name={name || 'options'} 
                        type="radio" 
                        onChange={onChange} 
                        value={option?.value || option.title}
                        defaultChecked={defaultValue === (option?.value || option.title)}
                    />
                    <label htmlFor={`${id}-${key}`} className="btn rounded-pill m-0">{option.title}</label>
                </span>
            ))}
        </div>
    )
}