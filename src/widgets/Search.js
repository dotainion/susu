import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";

export const Search = ({onSearch}) =>{
    return(
        <div className="d-inline-block bg-light rounded-pill border pe-3">
            <div className="d-flex align-items-center gap-2">
                <div className="d-inline-block border-end bg-white rounded-pill overflow-hidden">
                    <div className="d-flex align-items-stretch align-items-center w-auto">
                        <input onKeyUp={onSearch} className="form-control bg-transparent shadow-none border-0 pe-1" placeholder="Search by name, email or ID..." type="search" />
                        <div className="d-flex align-items-center">
                            <IoSearchOutline className="fs-4 mx-2"/>
                        </div>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="btn bg-transparent border-0 shadow-none p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <MdOutlineFilterList className="text-dark fs-4" />
                    </button>
                    <ul className="dropdown-menu">
                        <li><a onClick={()=>onSearch?.({target: {value: null}})} className="dropdown-item pointer">Refresh</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}