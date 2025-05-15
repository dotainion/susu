export const AccordionOptions = ({faqs, accordionItem}) =>{
    return(
        <div className="accordion" id="faqAccordion">
            {faqs.map((item, index) => (
                <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                        <button
                            className={`accordion-button ${index !== 0 ? 'collapsed' : ''} bg-light text-dark`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${index}`}
                            aria-expanded={index === 0 ? 'true' : 'false'}
                            aria-controls={`collapse${index}`}
                        >{item.q}</button>
                    </h2>
                    <div
                        id={`collapse${index}`}
                        className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                        aria-labelledby={`heading${index}`}
                        data-bs-parent="#faqAccordion"
                    >
                        <div className="accordion-body text-muted">{item.a}</div>
                    </div>
                </div>
            ))}

            {accordionItem && (
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button 
                            onClick={()=>accordionItem.action()} 
                            className="accordion-button no-chevron shadow-none bg-light link-primary"
                            type="button"
                        >{accordionItem.content}</button>
                    </h2>
                </div>
            )}
        </div>
    )
}