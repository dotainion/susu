import { Grid } from "../components/Grid"
import { SidebarProvider } from "../layout/SidebarProvider"

export const Home = () =>{
    return(
        <SidebarProvider>
            <Grid/>
        </SidebarProvider>
    )
}