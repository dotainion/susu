import { ModalOverlay } from "../container/ModalOverlay"
import { utils } from "../utils/Utils";
import { IoMdShare } from "react-icons/io";
import { FaRegShareSquare } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { routes } from "../routes/Routes";

export const InviteOption = ({show, onClose, urlParams, onMemberShare}) =>{
    const urlRef = useRef();

    const onShare = () =>{
        utils.share.url(urlRef.current).then(()=>{
            onClose?.();
        });
    }

    useEffect(()=>{
        if(typeof urlParams === 'object' && urlParams !== null && !Array.isArray(urlParams)){
            const baseUrl = window.location.href.split('#')[0];
            const queryString = Object.keys(urlParams).map((key)=>`${encodeURIComponent(key)}=${encodeURIComponent(urlParams[key])}`).join('&');
            urlRef.current = `${baseUrl}/${routes.invited()}?${queryString}`;
        }
    }, [urlParams]);

    return(
        <ModalOverlay show={show} onClose={onClose} centered title={'Share Your Experience'}>
            <div>Share with app members</div>
            <button onClick={onMemberShare} className="btn btn-sm btn-primary d-flex align-items-center">
                <FaRegShareSquare/>
                <span className="ms-2">Share with existing members</span>
            </button>
            <hr></hr>
            <div>Share with social media applications</div>
            <button onClick={onShare} className="btn btn-sm btn-primary d-flex align-items-center">
                <IoMdShare/>
                <span className="ms-2">Share on social media</span>
            </button>
        </ModalOverlay>
    )
}