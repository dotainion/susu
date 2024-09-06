import { useSidebar } from "../layout/SidebarProvider";
import { FaLayerGroup } from "react-icons/fa";
import $ from "jquery";
import { utils } from "../utils/Utils";

export const NavGrid = ({nav}) =>{

    return(
        <div className="container">
            <div className="my-4">
                <div className="fw-bold text-secondary">{nav.title}</div>
                {nav?.description ? <p>{nav.description}</p> : null}
                <div className="row">
                    {nav.list.map((nav, key)=>(
                        <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1 text-center" key={key}>
                            <div onClick={nav?.onClick} className={`card bg-transparent rounded-3 overflow-hidden h-100 ${nav?.disabled ? '' : 'card-hover'}`}>
                                <div className={`card-body bg-transparent ${nav?.disabled ? 'opacity-25 pe-none' : ''}`}>
                                    <p className="card-text text-primary my-4">
                                        {nav?.icon ? <nav.icon className="display-5"/> : <FaLayerGroup/>}
                                    </p>
                                    <h5 className="card-title">{nav.title}</h5>
                                    <small>{nav.description}</small>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>            
        </div>
    )
}