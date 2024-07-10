export const ViewGroup = () =>{
    return(
        <div className="container">
            <div className="position-absolute h4 mx-3 my-3">Group</div>
            <div className="mb-4" style={{height: '30vh'}}>
                <img className="w-100 h-100" src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
            </div>
            <div className="">
                <div className="fw-bold">Group Name</div>
                <div className="mb-3" type="text">Group Name</div>
                <hr className="border-light"></hr>
                <div className="fw-bold">Contribution Amount</div>
                <div className="mb-3">Contribution Amount</div>
                <hr className="border-light"></hr>
                <div className="fw-bold">Description</div>
                <div className="mb-3">Description</div>
                <hr className="border-light"></hr>
                <div className="fw-bold">Duration Cycle</div>
                <div className="mb-3">monthly</div>
                <hr className="border-light"></hr>
                <div className="fw-bold">Payout Date</div>
                <div className=""></div>
                <hr className="border-light"></hr>
                <div className="fw-bold">Members</div>
                <div className="">50024</div>
            </div>
            <hr className="my-5"></hr>
            <div className="striped-list text-center">
                <div className="py-3 px-2">
                    <button className="btn px-4">Join Group</button>
                </div>
            </div>
        </div>
    )
}