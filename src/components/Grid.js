import { useSidebar } from "../layout/SidebarProvider";
import { FaLayerGroup } from "react-icons/fa";
import $ from "jquery";
import { utils } from "../utils/Utils";

export const Grid = () =>{
    const { categories } = useSidebar();

    const navigate = (nav) =>{
        $(utils.element.nameToId(nav.title)).trigger('click');
    }

    return(
        <div className="container">
            {categories.map((cat, index)=>(
                <div className="my-4" key={index}>
                    {cat?.category ? <div className="fw-bold text-secondary">{cat.category}</div> : null}
                    {
                        cat.devider
                        ? null
                        : <div className="row">
                            {cat.menus.map((nav, key)=>(
                                <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1 text-center" key={key}>
                                    <div onClick={()=>navigate(nav)} className="card bg-transparent rounded-3 h-100">
                                        <div className={`card-body bg-transparent ${nav?.disabled ? 'opacity-25' : ''}`}>
                                            <p className="card-text text-primary mb-0">
                                                {nav?.icon ? <nav.icon className="display-5"/> : <FaLayerGroup/>}
                                            </p>
                                            <h5 className="card-title">{nav.title}</h5>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    }
                    
                </div>
            ))}
            
        </div>
    )
}