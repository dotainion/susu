import { Sidebar } from "./Sidebar"

export const Layout = ({children}) =>{
    return(
        <div className="d-sm-flex d-block vh-100 w-100">
            <Sidebar/>
            <div className="overflow-auto w-100">{children}</div>
        </div>
    )
}