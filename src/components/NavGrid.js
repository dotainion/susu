import { useSidebar } from "../layout/SidebarProvider";
import { FaLayerGroup } from "react-icons/fa";
import $ from "jquery";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useAuth } from "../provider/AuthProvider";

export const NavGrid = ({nav, useMenu}) =>{
    const { signOut } = useAuth();

    return(
        <div className="container">
            <div className="my-4">
                <div className="d-flex justify-content-between fw-bold text-secondary">
                    <div>{nav.title}</div>
                    {useMenu && (
                        <div className="dropdown mb-sm-3 me-2 me-sm-0">
                            <a href="#" className="d-flex justify-content-center d-block w-100" id="dropdownMenu1" data-bs-toggle="dropdown" aria-expanded="false">
                                <FaEllipsisVertical/>
                            </a>
                            <ul className="dropdown-menu text-smallshadow" aria-labelledby="dropdownMenu1">
                                <li><a onClick={signOut} className="dropdown-item pointer">Sign out</a></li>
                            </ul>
                        </div>
                    )}
                </div>
                {nav?.description ? <p>{nav.description}</p> : null}
                <div className="row">
                    {nav.list.map((nav, key)=>(
                        <div className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-6 p-1 text-center" key={key}>
                            <div onClick={nav?.onClick} className={`card bg-transparent rounded-3 overflow-hidden h-100 ${nav?.disabled ? '' : 'card-hover'}`}>
                                <div className={`card-body bg-transparent ${nav?.disabled ? 'opacity-25 pe-none' : ''}`}>
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