export const NewGroup = () =>{
    return(
        <div className="container">
            <div className="h4 my-3">Group</div>
            <div className="d-xl-flex d-block w-100">
                <div className="me-5 mb-4">
                    <img style={{width: '200px', height: '200px'}} src="https://media.istockphoto.com/id/1327592506/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=BpR0FVaEa5F24GIw7K8nMWiiGmbb8qmhfkpXcp1dhQg=" alt="" />
                </div>
                <div className="text-nowrap w-100">
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Group Name</div>
                        <input className="form-control mb-3" placeholder="Group Name" type="text" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Contribution Amount</div>
                        <input className="form-control mb-3" placeholder="Contribution Amount" type="number" style={{maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Description</div>
                        <textarea className="form-control mb-3" placeholder="Description" style={{resize: 'none', maxWidth: '500px'}}/>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Duration Cycle</div>
                        <select className="form-control form-select mb-3" style={{maxWidth: '500px'}}>
                            <option>weekly</option>
                            <option>bi-weekly</option>
                            <option>monthly</option>
                            <option>bi-monthly</option>
                        </select>
                    </div>
                    <div className="d-md-flex d-block">
                        <div style={{minWidth: '200px'}}>Payout Date</div>
                        <input className="form-control" type="date" style={{maxWidth: '500px'}}/>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center my-5">
                <button className="btn btn-sm px-4">Save</button>
            </div>
        </div>
    )
}