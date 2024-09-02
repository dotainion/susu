import { useEffect, useState } from "react";

export const ModalOverlay = ({show, onClose, title, footer, noHeader, backdropOff, centered, children}) =>{

    if(!show) return null;

    return(
        <div className="modal fade show" onClick={!backdropOff && onClose}>
            <div className={`modal-dialog ${centered ? 'modal-dialog-centered' : ''}`}>
                <div className="modal-content border-0" onClick={e=>e.stopPropagation()}>
                    {
                        !noHeader && 
                        <div className="modal-header">
                            <div className="modal-title fs-5">{title}</div>
                            <button onClick={onClose} className="btn-close btn-sm small"></button>
                        </div>
                    }
                    <div className="modal-body">{children}</div>
                    {
                        footer?.length &&
                        <div className="modal-footer">
                            {footer.map((option, key)=>(
                                <button 
                                    onClick={option?.onClick} 
                                    className={`btn btn-sm ${option?.color ? `btn-${option?.color}` : 'btn-secondary'}`} 
                                    key={key}
                                >{option.title}</button>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}