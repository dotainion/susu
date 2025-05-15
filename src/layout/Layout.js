import React, { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { PageHeader } from "./PageHeader"
import { Sidebar } from "./Sidebar"
import { useLocation } from "react-router-dom";

const Context = createContext();
export const useLayout = () => useContext(Context);

export const Layout = ({children}) =>{
    const [layoutParams, setLayoutParams] = useState({});

    const location = useLocation();

    const setParams = (params) =>{
        if (typeof value !== 'object' || value === null || Array.isArray(value)) {
            throw new Error('setParams in Layout only allow a json object');
        }
        setLayoutParams((parms)=>({...parms, ...params}))
    }

    const value = {
        layoutParams,
        setParams,
        setLayoutParams
    }

    return(
        <Context.Provider value={value}>
            <div className="d-sm-flex d-block vh-100 w-100">
                <Sidebar/>
                <div className="overflow-auto w-100">
                    <PageHeader/>
                    {children}
                </div>
            </div>
        </Context.Provider>
    )
}