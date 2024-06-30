import { useEffect, useState } from "react";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaRegCopy } from "react-icons/fa6";

export const Member = () => {
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
        }
    ]);

    useEffect(() => {
    }, []);
    return (
        <div className="container">
            <div className="d-flex justify-content-center w-100 my-5">
                <div className=" me-3">
                    <img style={{width: '150px', height: '150px'}} src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                </div>
                <div>
                    <div className="fs-3">John Wick And Sons</div>
                    <div className="my-2">Groups <b>45</b></div>
                    <div className="my-2">example@example.com</div>
                    <div className="my-2">1 473 4598999</div>
                </div>
            </div>
            <div className="d-flex justify-content-center w-100 my-5">
                <AiOutlineFileProtect className="display-1 text-dark"/>
                <div className="ms-2">
                    <div>This account is protected</div>
                    <div className="mt-2">Member ID</div>
                    <div className="d-flex align-items-center form-control bg-white">
                        <div className="w-100">d4cf6823-6670-4e92-806f-8585bfc4b281</div>
                        <button className="btn bg-transparent shadow-none border-0 p-0"><FaRegCopy className="fs-5 ms-2"/></button>
                    </div>
                </div>
            </div>
            <hr></hr>
            <div className="fw-bold">Groups</div>
            <div className="row">
                {groups.map((group, key) => (
                    <div className="col-12 col-xl-3 col-lg-4 col-md-6 p-1" key={key}>
                        <div className="card position-relative h-100 m-1">
                            <div className="card-body">
                                <div className="d-flex">
                                    <img className="card-img-sub" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                                    <div className="ms-2 ps-3 border-start">
                                        <div className="mb-2">{group.attributes.name}</div>
                                        <div className="mb-2">Members <b>487</b></div>
                                        <button className="btn btn-sm shadow-sm border-0 px-3">Join</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}