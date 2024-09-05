import { useState } from "react";
import { useAuth } from "../provider/AuthProvider"
import { Onboarding } from "./Onboarding"

export const Appearance = () =>{
    const [theme, setTheme] = useState('--bg-primary');

    const changeTheme = (theme) =>{
        setTheme(theme);
    }

    return(
        <div>
            <div className="d-flex bg-white">
                <div className="pe-none user-select-none border border-5">
                    <div className="pe-none user-select-none" style={{backgroundColor: theme}}>
                        <Onboarding/>
                    </div>
                </div>
                <div className="p-5">
                    <h4>SAnd Wual on me on you</h4>
                    <p>heklaldf akg kaj gkajsd kajg kajd ljgsk jhklj sdklfj alj hlaj dlhja hj ajsdg jhj asdlgj aslhj alha dfa</p>
                    <div>
                        <div onClick={()=>changeTheme('var(--bg-primary)')} className="card d-inline-block me-2 p-1" style={{width: '10rem'}}>
                            <div className="bg-danger py-5"></div>
                            <div>Standard</div>
                        </div>
                        <div onClick={()=>changeTheme('rgba(210, 184, 255, 0.15)')} className="card d-inline-block ms-2 p-1" style={{width: '10rem'}}>
                            <div className="bg-danger py-5"></div>
                            <div>Electric</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}