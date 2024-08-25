import { useParams } from "react-router-dom";
import { MembersInvite } from "../components/MembersInvite";

export const SusuMembersInvite = () =>{

    const params = useParams();

    return(
        <MembersInvite
            isSusu={true}
            referenceId={params.susuId}
            title="Susu Members"
        />
    )
}
