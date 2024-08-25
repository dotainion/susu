import { useParams } from "react-router-dom";
import { MembersInvite } from "../components/MembersInvite";

export const GroupMembersInvite = () =>{

    const params = useParams();

    return(
        <MembersInvite
            isSusu={false}
            referenceId={params.groupId}
            title="Group Members"
        />
    )
}
