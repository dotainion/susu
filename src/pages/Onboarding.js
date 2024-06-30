export const Onboarding = () =>{
    return(
        <div className="bg-dark text-white w-100" style={{minHeight: '100vh'}}>
            <div className="container pt-5">
                <div className="d-flex pt-5">
                    <div className="w-100">
                        <h1>Boost your savings:</h1>
                        <h1>Smarter.</h1>
                        <p>Jon the community of users who are revolutionizing their financial habits</p>
                        <ul>
                            <li>Flexible Saving Plans</li>
                            <li>Instant Access</li>
                            <li>Automated Transactions</li>
                            <button className="btn btn-lg btn-light">Download App</button>
                        </ul>
                    </div>
                    <div className="w-100">
                        <img className="w-50" src="https://fastsusu.com/wp-content/uploads/2022/06/Frame-167-5.png" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}