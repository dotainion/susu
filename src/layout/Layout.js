import { Sidebar } from "./Sidebar"
import { SidebarProvider } from "./SidebarProvider"

export const Layout = ({children}) =>{
    return(
        <div className="d-sm-flex d-block vh-100 w-100">
            <SidebarProvider>
                <Sidebar/>
            </SidebarProvider>
            <div className="overflow-auto w-100">{children}</div>
        </div>
    )
}