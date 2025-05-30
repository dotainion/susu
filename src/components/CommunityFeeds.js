import { Fragment, useEffect, useRef, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { MdSend } from "react-icons/md";
import { utils } from "../utils/Utils";
import { api } from "../request/Api";
import { ParseError } from "../utils/ParseError";
import { useParams } from "react-router-dom";
import { LikesAndComment } from "./LikesAndComment";
import { mockData } from "../contents/MockData";
import $ from "jquery";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

const THEME = {
    BUBBLE: 'bubble',
    SNOW: 'snow'
};

export const CommunityFeeds = ({community}) => {
    const [value, setValue] = useState('');
    const [posts, setPosts] = useState([]);
    const [showPosts, setShowPosts] = useState(false);

    const params = useParams();

    const submitPost = () => {
        if (!value.trim().replace('<p><br></p>', '')) return;
        savePost(value, null, (response)=>{
            setPosts(prev => [...prev, response.data.data[0]]);
            setValue(()=>'');
        });
    }

    const savePost = (contents, parentId, callback) =>{
        const data = {
            id: null,//id might be use to upate the post
            contents: contents, 
            created: utils.date.dbFormat(new Date()),
            parentId: parentId,
            communityId: params.communityId
        }
        api.feed.set(data).then((response)=>{
            callback(response);
        }).catch((error)=>{
            console.log(new ParseError().message(error));
        });
    }

    const addReply = (parentId, replyContent) => {
        let data = null;
        const addRecursive = (items) =>
            items.map(item =>
                item.id === parentId
                    ? {...item, attributes: {...item.attributes, replies: [...item.attributes.replies, data]}}
                    : {...item, attributes: {...item.attributes, replies: addRecursive(item.attributes.replies)}}
            )
        
        savePost(replyContent, parentId, (response)=>{
            data = response.data.data[0];
            setPosts(()=>addRecursive(posts));
        });
    }

    useEffect(()=>{
        api.feed.list(params.communityId).then((response)=>{
            setPosts(response.data.data);
        }).catch((error)=>{
            console.log(new ParseError().message(error));
        });
        if(process.env.NODE_ENV === 'development'){
            setPosts(mockData.posts());
        }
    }, []);

    return (
        <div className="position-relative bg-white rounded-4" data-community-feed="">
            <div className="position-relative mb-4 pb-4">
                <div className="mb-4 pt-3 px-2">
                    <Editor value={value} onChange={setValue} onSubmit={submitPost} size="sm" placeholder="Share something with your group..." />
                </div>
                <h6 className="fw-bold mb-3 px-2">Group Activity</h6>
                <div className="overflow-x-auto px-2">
                    <LikesAndComment className="mb-2" object={community} posts={posts} onComment={()=>setShowPosts(!showPosts)} />
                    <button onClick={()=>setShowPosts(!showPosts)} className="btn btn-sm bg-transparent text-dark shadow-none border-0 p-0">{showPosts ? 'Hide' : 'Show'} Comments</button>
                    {showPosts && (
                        <div>
                            {
                                posts.length?
                                posts.map(post => (
                                    <Feed key={post.id} post={post} onReply={addReply} />
                                )):
                                <div className="text-center text-muted">
                                    <p className="mb-1 fw-semibold">No posts yet</p>
                                    <small>Be the first to share something with your group!</small>
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const Feed = ({post, onReply, level = 0}) => {
    const { user } = useAuth();

    const [showReply, setShowReply] = useState(false);
    const [showLine, setShowLine] = useState(false);
    const [replyValue, setReplyValue] = useState('');
    const [viewReplies, setViewReplies] = useState(false);

    const feedRef = useRef();
    const replayContainerRef = useRef();
    const replyEditorRef = useRef();

    const handleReply = () => {
        if (!replyValue.trim()) return;
        onReply(post.id, replyValue);
        setReplyValue('');
        setShowReply(false);
    }

    const onOpenComment = (e) =>{
        e.stopPropagation();
        $(window).trigger('click');
        setShowReply(!showReply);
    }

    useEffect(()=>{
        const closeReplyOverlay = () => setShowReply(false);
        $(window).on('click', closeReplyOverlay);
        return ()=>$(window).off('click', closeReplyOverlay);
    }, []);

    useEffect(()=>{
        const resize = () =>{
            const rectY = replayContainerRef.current.getBoundingClientRect();
            const rectX = $(feedRef.current).closest('[data-community-feed]').get(0).getBoundingClientRect();
            $(replyEditorRef.current).css({top: (rectY.top - 20), left: rectX.left, width: rectX.width});
        }
        $(window).on('scroll', resize);
        $(window).on('resize', resize).trigger('resize');
        return () => {
            $(window).off('resize', resize);
            $(window).off('scroll', resize);
        }
    }, [showReply]);

    useEffect(()=>{
        const updatePostFeedLinkLines = () =>{
            const query = `[data-parent-id="${post.attributes.parentId}"]`;
            setShowLine(!!$(feedRef.current).nextAll(query).length);
        }
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type !== 'childList') return;
                updatePostFeedLinkLines();
                break;
            }
        })
        observer.observe($(feedRef.current).closest('[data-community-feed]').get(0), {
            childList: true,
            subtree: true
        });
        updatePostFeedLinkLines();
        return () => observer.disconnect();
    }, []);

    return (
        <Fragment>
            <div ref={feedRef} className="position-relative" data-parent-id={post.attributes.parentId}>
                <div className="d-flex">
                    {level > 0 && (
                        <Fragment>
                            <div className="position-relative" style={{width: '30px'}}>
                                <svg className="position-absolute top-0 start-0" width="30" height="60">
                                    <path d="M15 0 v20 q0 10 10 10 h5" stroke="lightgray" fill="transparent" strokeWidth="2"/>
                                </svg>
                            </div>
                            {showLine && (
                                <div
                                    className="border-start border-2 position-absolute bottom-0 start-0 h-100" 
                                    style={{marginLeft: '14px', borderColor: 'lightgray'}}
                                ></div>
                            )}
                        </Fragment>
                    )}
                    <div className="card border-0 bg-transparent w-100 my-2">
                        <div className="card-body px-0 py-0">
                            <div className="d-flex gap-1">
                                <div
                                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                    style={{width: '30px', height: '30px', minWidth: '30px', minHeight: '30px', fontWeight: '600'}}
                                >{`${post.attributes.author.attributes.firstName[0]}${post.attributes.author.attributes.lastName[0]}`.toUpperCase()}</div>
                                <div className="bg-light px-2 rounded-3">
                                    <h6 className="fw-bold small m-0">{user.id === post.attributes.author.id ? 'You' : `${post.attributes.author.attributes.firstName} ${post.attributes.author.attributes.lastName}`}</h6>
                                    <div className="text-muted" style={{fontSize: '8px'}}>{utils.date.toLocalDate(post.attributes.created)}</div>
                                    <div className="quill-content" dangerouslySetInnerHTML={{__html: post.attributes.contents}} />
                                </div>
                            </div>
                            <LikesAndComment onComment={onOpenComment} viewingReplies={viewReplies} onViewReplies={()=>setViewReplies(!viewReplies)} posts={post.attributes.replies}/>
                            <div ref={replayContainerRef}></div>
                        </div>
                    </div>
                </div>
                {viewReplies && (
                    <div className="ms-0 ms-sm-4">
                        {
                            post.attributes.replies.length?
                            post.attributes.replies.map(reply => (
                                <Feed key={reply.id} post={reply} onReply={onReply} level={level + 1} />
                            )):
                            <div className="position-relative small ms-5 ps-3 pt-2" style={{zIndex: 9999}}>
                                <div className="position-absolute bottom-0">No replies right now</div>
                            </div>
                        }
                    </div>
                )}
            </div>

            {showReply && (
                <div ref={replyEditorRef} className="position-fixed bg-white px-3" style={{zIndex: 99999}}>
                    <Editor value={replyValue} onChange={setReplyValue} onSubmit={handleReply} size="sm" placeholder="Reply to the comment..." />
                </div>
            )}
        </Fragment>
    )
}

const Editor = ({value, onChange, onSubmit, size, placeholder}) => {
    const [error, setError] = useState(false);

    const timeoutRef = useRef();
    const editorRef = useRef();

    const submitCheck = () =>{
        if(!value) return setError(true);
        onSubmit?.();
    }

    const focus = (e) =>{
        editorRef.current.focus();
        e.stopPropagation();
    }

    useEffect(()=>{
        if(!error) return;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setError(false);
        }, 500);
    }, [error]);

    return (
        <div onClick={focus} onKeyUp={focus} className={`d-flex flex-column border rounded-4 p-2 bg-transparent ${error ? 'shake border-danger' : ''}`} style={{zIndex: 99}}>
            <ReactQuill
                ref={editorRef}
                theme={THEME.BUBBLE}
                value={value}
                onChange={onChange}
                className="w-100 bg-transparent"
                placeholder={placeholder}
                style={{ minHeight: (!size || size === 'sm') ? '40px' : '80px' }}
            />
            <div className="d-flex justify-content-end mt-2">
                <button onClick={submitCheck} className="btn btn-sm bg-transparent text-primary shadow-none border-0 p-0" title="Send post">
                    <MdSend className="fs-3"/>
                </button>
            </div>
        </div>
    )
}