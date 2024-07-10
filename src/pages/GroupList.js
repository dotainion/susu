import { useEffect, useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import { IoMdShare } from "react-icons/io";
import { routes } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
import { utils } from "../utils/Utils";

export const GroupList = () => {
    const [groups, setGroups] = useState([
        {
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: 'This is a test tis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will looko see how this will look',
                payment: 254,
                duration: 'weekly'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: 'This is ',
                payment: 254,
                duration: 'bi-weekly'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: '',
                payment: 254,
                duration: 'monthly'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: 'This is a test to see how this will look',
                payment: 254,
                duration: 'monthly'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: 'This is a test to see is a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookhow this will look',
                payment: 254,
                duration: 'weekly'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: 'This is a test to see how this will look',
                payment: 254,
                duration: 'bi-weekly'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: 'This is a ook',
                payment: 254,
                duration: 'bi-weekly'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: 'This is a test to see how this will look',
                payment: 254,
                duration: 'bi-weekly'
            }
        },{
            id: 'd4cf6823-6670-4e92-806f-8585bfc4b281',
            attributes: {
                name: 'John Wick',
                mumbersAmount: 125,
                payoutDate: '25/74/8545',
                description: 'This is a testis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will lookis a test to see how this will look',
                payment: 254,
                duration: 'weekly, bi-weekly, monthly'
            }
        }
    ]);

    const navigate = useNavigate();

    const onShare = (group) =>{
        utils.share.url(routes.group(group.id));
    }

    useEffect(() => {
    }, []);
    return (
        <div className="container">
            <div className="search-row mb-3">
                <div className="my-3 d-inline-block border border-light rounded-3 bg-light">
                    <div className="d-flex align-items-center w-auto">
                        <input className="form-control bg-transparent shadow-none border-0 pe-1" placeholder="Search..." type="search" />
                        <IoSearchOutline className="fs-4 me-2"/>
                    </div>
                </div>
                <button onClick={()=>navigate(routes.newGroup())} className="d-flex align-items-center btn d-block shadow-none"><IoAdd className="me-2"/>Create Group</button>
            </div>
            <div className="row row-with-search-above">
                {groups.map((group, key) => (
                    <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1" key={key}>
                        <div onClick={()=>navigate(routes.viewGroup())} className="card position-relative h-100 m-1">
                            <img className="card-img-top" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                            <div className="card-body">
                                <div className="d-flex">
                                    <img className="card-img-mini" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                                    <div>
                                        <div className="fw-bold">{group.attributes.name}</div>
                                        <div className="small text-success lh-1"><small>In prgress</small></div>
                                    </div>
                                </div>
                                <div className="text-muted small my-2">{group.attributes.description}</div>
                                <div className="d-flex small mt-2">
                                    <img className="card-img-mini" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                                    <div>Members <b>{group.attributes.mumbersAmount}</b></div>
                                </div>
                                <div className="w-100 small">
                                    <div>Contribution Amount: ${group.attributes.payment}</div>
                                    <div><MdAccessTime /> Cycle Duration: {group.attributes.duration}</div>
                                    <div>Payout Date: {group.attributes.payoutDate}</div>
                                </div>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button onClick={(e)=>e.stopPropagation()} className="btn btn-sm">Join Group</button>
                                <button onClick={(e)=>{
                                    e.stopPropagation();
                                    navigate(routes.group());
                                }} className="btn btn-sm text-primary">Edit Group</button>
                            </div>
                            <button onClick={()=>onShare(group)} className="btn bg-transparent shadow-none border-0 position-absolute top-0 end-0 p-1"><IoMdShare className="fs-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}