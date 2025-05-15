import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaFacebookMessenger, FaTelegramPlane, FaTwitter, FaLinkedin, FaPinterest, FaInstagram, FaTiktok, FaReddit, FaShareAlt } from 'react-icons/fa';
import { FaThreads } from 'react-icons/fa6';
import { MdEmail, MdMoreHoriz } from 'react-icons/md';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { ModalOverlay } from "../container/ModalOverlay";
import { utils } from "../utils/Utils";
import { api } from "../request/Api";
import { routes } from "../routes/Routes";
import { ParseError } from "../utils/ParseError";
import icon from "../images/logo.png";
import $ from "jquery";

export const ShareSocialMediaOverlay = ({show, onClose, referenceId, isSusu, membersOnly}) =>{
    const [users, setUsers] = useState([]);
    const [selection, setSelection] = useState([]);
    const [invites, setInvites] = useState([]);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [errors, setErrors] = useState(false);

    const containerRef = useRef();
    const timeoutRef = useRef();

    const appUrl = `${window.location.href.split('#')[0]}/#`;
    const message = `Check out this susu application: ${appUrl}`;
    const phoneNumber = "";
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    const whatsappStatusUrl = `https://wa.me/?text=${encodeURIComponent(message)}%0A${encodeURIComponent(appUrl)}`;
    const facebookMessengerUrl = `https://m.me/?text=${encodeURIComponent(message)}`;
    const telegramUrl = `https://t.me/username?text=${encodeURIComponent(message)}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(appUrl)}`;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(appUrl)}&title=Check out this amazing app&summary=${encodeURIComponent(message)}`;
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(appUrl)}&description=${encodeURIComponent(message)}`;
    const emailUrl = `mailto:?subject=${encodeURIComponent("Check out this amazing app")}&body=${encodeURIComponent(message)}%0A${encodeURIComponent(appUrl)}`;
    const instagramUrl = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(message)}%20${encodeURIComponent(appUrl)}`;
    const tiktokUrl = `https://www.tiktok.com/share?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(message)}`;
    const threadsUrl = `https://www.threads.net/share?url=${encodeURIComponent(appUrl)}&text=${encodeURIComponent(message)}`;
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(appUrl)}&title=${encodeURIComponent(message)}`;

    const checkOverflow = () => {
        const size = 0;
        const isOverflowingLeft = containerRef.current.scrollLeft > size;
        const isOverflowingRight = containerRef.current.scrollWidth > (containerRef.current.clientWidth + containerRef.current.scrollLeft) + size;
        setShowLeft(isOverflowingLeft);
        setShowRight(isOverflowingRight);
    }

    const search = (e) =>{
        const value = e.target.value;
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.user.search(value).then((response)=>{
                setUsers(response.data.data);
            }).catch((error)=>{
                setUsers([]);
            });
        }, 500);
    }

    const select = (e, user) =>{
        setSelection((prevSelection) => {
            if (e.target.checked && !prevSelection.find((item)=>item.id === user.id)) {
                return [user, ...prevSelection];
            } else if (!e.target.checked && prevSelection.find((item)=>item.id === user.id)) {
                $(`#${user.id}`).get(0).checked = false;
                return prevSelection.filter((item)=>item.id !== user.id);
            }
            return prevSelection;
        });
    }

    const builtInShare = () =>{
        const key = isSusu ? 'susuId' : 'communityId';
        const baseUrl = window.location.href.split('#')[0];
        const url = `${baseUrl}/${routes.invited()}?${encodeURIComponent(key)}=${encodeURIComponent(referenceId)}`;

        utils.share.url(url).then(()=>{
            onClose?.();
        }).catch(()=>{

        });
    }

    const share = () =>{
        setErrors(null);
        const reset = () => setTimeout(()=>setSelection([]), 5000);
        selection.forEach((member, i)=>{
            clearTimeout(timeoutRef.current);
            const data = {
                id: null,
                memberId: member.id,
                targetId: referenceId,
                isSusu: isSusu,
            }
            api.invite.set(data).then((response)=>{
                setInvites((inviteIdArray)=>[response.data.data[0].id, ...inviteIdArray]);
                if((i+1) === selection.length){
                    timeoutRef.current = setTimeout(()=>setSelection([]), 5000);
                }
            }).catch((error)=>{
                setErrors(new ParseError().message(error));
            });
        })
    }

    const undoShare = () =>{
        setErrors(null);
        invites.forEach((inviteId)=>{
            api.invite.delete(inviteId).then((response)=>{
                setInvites((inviteIdArray)=>inviteIdArray.filter((id)=>id !== response.data.data[0].id));
            }).catch((error)=>{
                setErrors(new ParseError().message(error));
            });
        });
    }

    useEffect(()=>{
        if(!containerRef.current) return;
        checkOverflow();
        const handleResize = ()=>checkOverflow();
        window.addEventListener('resize', handleResize);
        utils.dom.setScrollElement(containerRef.current)
        utils.dom.enableDragScroll();
        utils.dom.on('scroll', handleResize);
        return ()=>{
            utils.dom.removeDragScroll();
            window.removeEventListener('resize', handleResize);
        }
    }, [show]);

    return (
        <ModalOverlay title="Share Directly with Someone" show={show} onClose={onClose}>
            <div className="d-flex position-relative">
                <div>
                    {showLeft && (
                        <button onClick={()=>utils.dom.scrollLeft()} className="position-absolute start-0 top-50 translate-middle-y btn bg-white rounded-circle border border-primary p-0" style={{zIndex: 10}}>
                            <IoIosArrowDropleftCircle className="text-primary rounded-circle" size={32}/>
                        </button>
                    )}
                </div>
                <div ref={containerRef} className="share-icons d-flex overflow-auto scrollbar-hidden">
                    <a href={whatsappUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaWhatsapp className="whatsapp" size={32}/>
                        <div className="title">Message</div>
                    </a>
                    <a href={whatsappStatusUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaWhatsapp className="whatsapp" size={32}/>
                        <div className="title">Status</div>
                    </a>
                    <a href={facebookMessengerUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaFacebookMessenger className="facebook-messenger" size={32}/>
                        <div className="title">Facebook</div>
                    </a>
                    <a href={telegramUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaTelegramPlane className="telegram" size={32}/>
                        <div className="title">Felegram</div>
                    </a>
                    <a href={twitterUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaTwitter className="twitter" size={32}/>
                        <div className="title">Twitter</div>
                    </a>
                    <a href={linkedinUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaLinkedin className="linkedin" size={32}/>
                        <div className="title">Linkedin</div>
                    </a>
                    <a href={pinterestUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaPinterest className="pinterest" size={32}/>
                        <div className="title">Pinterest</div>
                    </a>
                    <a href={emailUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <MdEmail className="email" size={32}/>
                        <div className="title">Email</div>
                    </a>
                    <a href={instagramUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaInstagram className="instagram" size={32}/>
                        <div className="title">Instagram</div>
                    </a>
                    <a href={tiktokUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaTiktok className="tiktok" size={32}/>
                        <div className="title">Tiktok</div>
                    </a>            
                    <a href={threadsUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaThreads className="threads" size={32}/>
                        <div className="title">Threads</div>
                    </a>
                    <a href={redditUrl} className="text-center px-2" target="_blank" rel="noopener noreferrer" draggable={false}>
                        <FaReddit className="reddit" size={32}/>
                        <div className="title">Reddit</div>
                    </a>
                </div>
                <div>
                    {showRight && (
                        <button onClick={()=>utils.dom.scrollRight()} className="position-absolute end-0 top-50 translate-middle-y btn bg-white rounded-circle border border-primary p-0" style={{zIndex: 10}}>
                            <IoIosArrowDroprightCircle className="text-primary rounded-circle" size={32}/>
                        </button>
                    )}
                </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
                {!membersOnly && (
                    <button onClick={builtInShare} className="btn btn-sm bg-transparent text-dark shadow-none border-0 p-0">
                        <small><small>More</small></small><MdMoreHoriz className="text-dark" size={25}/>
                    </button>
                )}
            </div>
            <hr></hr>
            <input onKeyUp={search} className="form-control" placeholder="members..."/>
            <div className="small text-muted">Search members</div>
            <div className="d-flex justify-content-end my-3 px-3">
                {!!users.length && (
                    <>
                        {
                            !!invites.length 
                            ? <button onClick={undoShare} className="btn btn-sm btn-secondary d-flex align-items-center justify-content-center me-3">
                                <FaShareAlt />
                                <span className="ms-1">Undo</span>
                            </button>
                            : <button onClick={share} className="btn btn-sm d-flex align-items-center justify-content-center" disabled={!selection.length}>
                                <FaShareAlt />
                                <span className="ms-1">Share</span>
                            </button>
                        }
                    </>
                )}
            </div>
            <div className="d-flex flex-wrap gap-2">
                {selection.map((user, key)=>(
                    <div onClick={()=>select({target: {checked: false}}, user)} className="border rounded-3 pointer small px-2" title="Click to remove" key={key}>
                        <small>{user.attributes.firstName} {user.attributes.lastName}</small>
                    </div>
                ))}
            </div>
            <div className="my-3">
                {users.map((user)=>(
                    <label className="d-flex align-items-center my-2 py-2 border rounded-3 pointer" key={user.id}>
                        <div className="position-relative">
                            <img src={icon} width={32} height={32} alt=""/>
                            <input onChange={(e)=>select(e, user)} className="position-absolute top-50 me-1 form-check-input shadow-none" id={user.id} type="checkbox"/>
                        </div>
                        <div className="w-100">{user.attributes.firstName} {user.attributes.lastName}</div>
                    </label>
                ))}
            </div>
        </ModalOverlay>
    )
}