import { Fragment, useEffect, useState } from "react";
import { api } from "../request/Api";
import { useParams } from "react-router-dom";
import { ParseError } from "../utils/ParseError";
import { useAuth } from "../provider/AuthProvider";
import { SpinnerButton } from "../widgets/SpinnerButton";
import { utils } from "../utils/Utils";

export const LikesAndComment = ({className, onComment, viewingReplies, onViewReplies, posts, object}) =>{
    const { user } = useAuth();

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [hasOwnLike, setHasOwnLike] = useState();
    const [comments, setComments] = useState(0);
    const [likeSpin, setLikeSpin] = useState(false);
    const [dislikeSpin, setDislikeSpin] = useState(false);

    const params = useParams();

    const handleOwnLikes = (reaction) =>{
        if(hasOwnLike){
            if(hasOwnLike.attributes.like === reaction.attributes.like) return;
            else if(reaction.attributes.like){
                setLikes((lks)=>(lks + 1));
                setDislikes((dislks)=>(dislks - 1));
            }else if(!reaction.attributes.like){
                setLikes((lks)=>(lks - 1));
                setDislikes((dislks)=>(dislks + 1));
            }
            return setHasOwnLike(()=>reaction);
        }
        if(reaction.attributes.like) setLikes((lks)=>(lks + 1));
        else if(!reaction.attributes.like) setDislikes((dislks)=>(dislks + 1));
        setHasOwnLike(()=>reaction);
    }
    
    const onLike = (e) =>{
        const data = {
            targetId: object.id,
            communityId: params.communityId,
            like: true
        }
        setLikeSpin(true);
        api.likes.set(data).then((response)=>{
            handleOwnLikes(response.data.data[0]);
        }).catch((error)=>{
            console.log(new ParseError().message(error));
        }).finally(()=>{
            setLikeSpin(false);
        });
    }

    const onDislike = (e) =>{
        const data = {
            targetId: object.id,
            communityId: params.communityId,
            like: false
        }
        setDislikeSpin(true);
        api.likes.set(data).then((response)=>{
            handleOwnLikes(response.data.data[0]);
        }).catch((error)=>{
            console.log(new ParseError().message(error));
        }).finally(()=>{
            setDislikeSpin(false);
        });
    }
    
    const countReplies = (comments) => {
        let count = 0;
        for (let comment of comments) {
            count += 1;
            if (comment.attributes.replies && comment.attributes.replies.length > 0) {
                count += countReplies(comment.attributes.replies);
            }
        }
        return count;
    }

    useEffect(()=>{
        if(!Array.isArray(posts)) return;
        setComments(countReplies(posts));
    }, [posts]);

    useEffect(()=>{
        if(!object) return;
        const likesList = object.attributes.likes.filter((like)=>like.attributes.like);
        const dislikesList = object.attributes.likes.filter((like)=>!like.attributes.like);
        setLikes(likesList.length);
        setDislikes(dislikesList.length);
        setHasOwnLike(object.attributes.likes.find((like)=>like.attributes.authorId === user.id));
    }, [object]);

    return(
        <div className={className}>
            <div className="d-flex gap-2 text-nowrap">
                <SpinnerButton 
                    onClick={onLike} 
                    className="btn btn-sm bg-transparent border-0 text-dark shadow-none p-0" spin={likeSpin}
                >👍 Like {utils.num.uiFormat(likes)}</SpinnerButton>
                <SpinnerButton 
                    onClick={onDislike} 
                    className="btn btn-sm bg-transparent border-0 text-dark shadow-none p-0" spin={dislikeSpin}
                >👎 Dislike {utils.num.uiFormat(dislikes)}</SpinnerButton>
                <button onClick={onComment} className="btn btn-sm bg-transparent border-0 text-dark shadow-none p-0">
                    {object ? <span>💬 {utils.num.uiFormat(comments)} Comments</span> : <span>Reply</span>}
                </button>
            </div>
            {onViewReplies && posts.length > 0 && (
                <div className="d-flex px-2">
                    <div className="border-start border-bottom border-2 rounded-bottom-start-3" style={{width: '100px', height: '15px'}}></div>
                    <div className="px-1">
                        <button 
                            onClick={onViewReplies} 
                            className="btn btn-sm bg-transparent border-0 text-dark shadow-none p-0"
                        >{viewingReplies ? 'Hide' : 'View'} {countReplies(posts)} replies</button>
                    </div>
                </div>
            )}
        </div>

    )
}
