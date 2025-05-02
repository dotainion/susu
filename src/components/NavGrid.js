import { useSidebar } from "../layout/SidebarProvider";
import { FaLayerGroup } from "react-icons/fa";
import $ from "jquery";
import { NavHeader } from "./NavHeader";

export const NavGrid = ({nav, useMenu}) =>{

    return(
        <div className="container">
            {useMenu && (
                <NavHeader/>
            )}
            <div className="py-4">
                <div className="fw-bold text-secondary">{nav.title}</div>
                {nav?.description ? <p>{nav.description}</p> : null}
                <div className="row">
                    {nav.list.map((nav, key)=>(
                        <div className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-6 p-1 text-center" key={key}>
                            <div onClick={nav?.onClick} className={`card rounded-3 overflow-hidden h-100 ${nav?.disabled ? '' : 'card-hover'}`}>
                                <div className={`card-body ${nav?.disabled ? 'opacity-25 pe-none' : ''}`}>
                                    <div className="d-flex gap-3">
                                        <p className="card-text text-primary">
                                            {nav?.icon ? <nav.icon className="display-5"/> : <FaLayerGroup/>}
                                        </p>
                                        <div className="text-start">
                                            <h5 className="card-title">{nav.title}</h5>
                                            <small>{nav.description}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>            
        </div>
    )
}