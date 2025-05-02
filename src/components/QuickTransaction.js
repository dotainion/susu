import { useEffect, useRef, useState } from "react";
import { MdAdd } from "react-icons/md";
import { api } from "../request/Api";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { ShareSocialMediaOverlay } from "./ShareSocialMediaOverlay";

export const QuickTransaction = () =>{
    const [members, setMembers] = useState([]);
    const [openSusuInvite, setOpenSusuInvite] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const amount = 100;
    
    const scrollRef = useRef(null);
    const scrollInterval = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth'
            });
        }
    }

    const startScrolling = (direction) => {
        scroll(direction);
        scrollInterval.current = setInterval(() => {
            scroll(direction);
        }, 100);
    }
  
    const stopScrolling = () => {
        clearInterval(scrollInterval.current);
    }

    const randomBlueColor = () => {
        const hue = Math.floor(Math.random() * 50) + 200;
        const saturation = Math.floor(Math.random() * 20) + 70;
        const lightness = Math.floor(Math.random() * 20) + 60;
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    useEffect(() => {
        api.user.byCommunity(params.communityId).then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{
            
        });
    }, []);

    return(
        <div className="bg-light-faded py-3 mt-4 w-100">
            <div className="d-flex gap-2 align-items-center px-3 mb-2">
                <div className="fw-bold w-100">Quick Transaction</div>
                <button 
                    onMouseDown={() => startScrolling('left')}
                    onMouseUp={stopScrolling}
                    onMouseLeave={stopScrolling}
                    onTouchStart={() => startScrolling('left')}
                    onTouchEnd={stopScrolling}
                    className="btn btn-sm"
                >{'<'}</button>
                <button 
                    onMouseDown={() => startScrolling('right')}
                    onMouseUp={stopScrolling}
                    onMouseLeave={stopScrolling}
                    onTouchStart={() => startScrolling('right')}
                    onTouchEnd={stopScrolling}
                    className="btn btn-sm"
                >{'>'}</button>
            </div>
            <div className="d-flex py-2">
                <button onClick={()=>setOpenSusuInvite(true)} className="btn mx-1 rounded-circle btn-primary my-1" style={{width: '50px', height: '50px'}}>
                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                        <MdAdd className="bg-transparent fs-2"/>
                    </div>
                </button>
                <div ref={scrollRef} className="overflow-y-hidden text-nowrap overflow-x-auto scrollbar-hidden w-100">
                    {members.map((member, key)=>(
                        <button
                            onClick={()=>navigate(routes.susu().nested().updateMemberSusuWallet(params.communityId || 'none', member.id || 'some'))}
                            className="btn mx-1 rounded-circle size-50px my-1"
                            style={{backgroundColor: randomBlueColor()}}
                            title={`${member.attributes.firstName} ${member.attributes.lastName}`}
                            key={key}
                        >
                            <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                {`${member.attributes.firstName}${member.attributes.lastName}`?.[0] || key}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
            <ShareSocialMediaOverlay
                show={openSusuInvite}
                onClose={()=>setOpenSusuInvite(false)}
                referenceId={params.susuId}
                isSusu={true}
            />
        </div>
    )
}