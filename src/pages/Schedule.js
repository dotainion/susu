import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes/Routes";
import { FcClock } from "react-icons/fc";
import { useAuth } from "../provider/AuthProvider";
import { api } from "../request/Api";
import { utils } from "../utils/Utils";
import { ParseError } from "../utils/ParseError";

export const Schedule = () =>{
    const { user } = useAuth();

    const [card, setCard] = useState();
    const [schedules, setSchedules] = useState([]);
    const [errors, setErrors] = useState();

    const  params = useParams();
    const navigate = useNavigate();

    const viewCard = (currentCard) =>{
        setCard(currentCard);
    }

    const selectPayout = () =>{
        setErrors(null);
        api.schedule.select(card.id, user.id).then((response)=>{
            let temptCard = JSON.parse(JSON.stringify(card));
            temptCard.attributes.memberId = user.id;
            setCard(temptCard);
            setSchedules((scheds)=>[...scheds.map((sch)=>{
                sch.attributes.memberId = user.id;
                return sch;
            })]);
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    useEffect(()=>{
        api.schedule.list(params.groupId).then((response)=>{
            setSchedules(response.data.data);
        }).catch((error)=>{

        });
    }, []);

    return(
        <div className="container">
            <button onClick={()=>navigate(routes.susu().nested().groupSusuWallet(params.groupId))} className="btn bg-transparent p-0 my-4"><IoIosArrowBack/> To Susu Wallet</button>
            <div className="d-flex align-items-center h4 mb-4">
                <FcClock/>
                <div className="mx-2 w-100">Payout Schedule</div>
            </div>
            {errors ? <div className="alert alert-danger border-0">{errors}</div> : null}
            <div className="d-flex w-100">
                <div className="w-100 text-center py-3" style={{minHeight: '30vh'}}>
                    <div>Select a day</div>
                    <div className="mb-3 mt-2 fw-bold">Fri Aug - Sat Nov</div>
                    <hr></hr>
                    <div className="schedule-picker scrollbar-hidden">
                        {schedules.map((schedule, key)=>(
                            <div className="d-inline-block p-1 rounded-2 text-center user-select-none" key={key}>
                                <div onClick={()=>viewCard(schedule)} className="card mt-1">
                                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                        <div className="px-3">
                                            <div>{schedule.attributes.position}</div>
                                            <div className="small">{utils.date.toLocalDate(schedule.attributes.date)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mx-4 border"></div>
                <div className="w-100 text-nowrap">
                    {
                        card?
                        <>
                            <div>Select a time</div>
                            <div className="d-flex align-items-center">
                                <div className="">{utils.date.toLocalDate(card.attributes.date)}</div>
                                <hr className="w-100"></hr>
                            </div>
                            <div className="my-2">
                                <span className="bg-info p-2 rounded-3">{card.attributes.date}</span>
                            </div>
                            <hr className="w-100"></hr>
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
                                    : <button onClick={selectPayout} className="btn">Select Week</button>
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