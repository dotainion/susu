import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { FcClock } from "react-icons/fc";
import { useAuth } from "../provider/AuthProvider";
import { api } from "../request/Api";

export const Schedule = () =>{
    const { user } = useAuth();

    const [card, setCard] = useState();
    const [schedules, setSchedules] = useState([]);

    const  params = useParams();
    const navigate = useNavigate();

    const viewCard = (currentCard) =>{
        setCard(currentCard);
    }

    useEffect(()=>{
        api.schedule.list(params.groupId).then((response)=>{
            setSchedules(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="container">
            <button onClick={()=>navigate(routes.susu().groupSusuWallet(params.groupId))} className="btn bg-transparent p-0 my-4"><IoIosArrowBack/> To Susu Wallet</button>
            <div className="d-flex align-items-center h4 mb-4">
                <FcClock/>
                <div className="mx-2">Payout Schedule</div>
            </div>
            <div className="d-flex w-100">
                <div className="w-100 text-center py-3">
                    <div>Select a day</div>
                    <div className="mb-3 mt-2 fw-bold">Fri Aug - Sat Nov</div>
                    <div className="schedule-picker">
                        {schedules.map((schedule, key)=>(
                            <div className="d-inline-block p-1 rounded-2 text-center user-select-none" key={key}>
                                <div className="small">{schedule.attributes.date.split(', ')[0]},</div>
                                <div className="small">{schedule.attributes.date.split(', ')[1]}</div>
                                <div onClick={()=>viewCard(schedule)} className="card mt-1">
                                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                        <div>
                                            <div>{schedule.attributes.position || (key+1)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mx-4"></div>
                <div className="w-100 text-nowrap">
                    {
                        card?
                        <>
                            <div>Select a time</div>
                            <div className="d-flex align-items-center">
                                <div className="">10.00 AM</div>
                                <hr className="w-100"></hr>
                            </div>
                            <div className="my-2">
                                <span className="bg-info p-2 rounded-3">{card.attributes.date}</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="">10.00 AM</div>
                                <hr className="w-100"></hr>
                            </div>
                            <div className="my-2">
                                {
                                    card.attributes.user 
                                    ? <span>
                                        {
                                            card.attributes.user.id === user?.id
                                            ? <span>This time slot has already been selected by you</span>
                                            : <>
                                                <span className="me-2">This time slot has already been selected by</span> 
                                                <b>{card.attributes.user.attributes.firstName} {card.attributes.user.attributes.lastName}</b>
                                                <span className="link-primary pointer d-block text-truncate">Request swap from "{card.attributes.user.attributes.firstName}"</span>
                                            </>
                                        }
                                    </span>
                                    : <button className="btn">Select Week</button>
                                }
                            </div>
                        </>
                        :
                        <div>
                            <div>Select a card to view avaibale date</div>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}