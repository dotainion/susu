import { useParams } from "react-router-dom";
import { MembersInvite } from "../components/MembersInvite";

export const CommunityMembersInvite = () =>{

    const params = useParams();

    return(
        <MembersInvite
            isSusu={false}
            referenceId={params.communityId}
            title="Community Members"
        />
    )
}
