import { useEffect, useRef, useState } from "react";
import { CommunityUpdate } from "../components/CommunityUpdate";

export const NewCommunity = () =>{
    return(
        <div className="container py-2 mt-2">
            <CommunityUpdate className="m-auto mt-3" />
        </div>
    )
}