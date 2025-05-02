import { GiStairsGoal } from "react-icons/gi"
import { ProgressBar } from "./ProgressBar"
import { useState } from "react"
import { kbd } from "framer-motion/client";

export const ProgressPercentage = () =>{
    const [goals, setGoals] = useState({
        goal: 0,
        roundsComplete: 0,
        contributedRound: 0
    });
    const [membersActivit, setMembersActivit] = useState({
        onTimePayments: 0,
        paidInThisCycle: 0,
        missedPayments: 0
    });
    const [payoutTracking, setPayoutTracking] = useState({
        fundsDisbursed: 0,
        availableToWithdraw: 0,
        received: 0
    });
    const [participationBreakdown, setParticipationBreakdown] = useState({
        emergencySavings: 0,
        businessStartup: 0,
        received: 0
    });
    return(
        <div className="row py-5">
            <div className="col-4 p-2">
                <div className="card overflow-hidden h-100">
                    <div className="card-body">
                        <div className="fw-bold mb-2">Goals</div>
                        <div>Summer Vacation</div>
                        <div className="d-flex align-items-center mt-3">
                            <GiStairsGoal className="display-1"/>
                            <div className="ms-2">
                                <div className="fw-bold">{goals.goal}% Goal Reached</div>
                                <ProgressBar value={goals.goal}/>
                                <div className="small">62% Round Completed</div>
                                <ProgressBar value={goals.roundsComplete}/>
                                <div className="small">{goals.contributedRound}% Contributed This Round</div>
                                <ProgressBar value={goals.contributedRound}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-4 p-2">
                <div className="card overflow-hidden h-100">
                    <div className="card-body">
                        <div className="fw-bold mb-2">Members Activity</div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={membersActivit.onTimePayments}/>
                            <div className="ms-2">{membersActivit.onTimePayments}% On-Time Payments</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={membersActivit.paidInThisCycle}/>
                            <div className="ms-2">{membersActivit.paidInThisCycle}% of Members Paid in this cycle</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={membersActivit.missedPayments}/>
                            <div className="ms-2">{membersActivit.missedPayments}% Missed Payments</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-4 p-2">
                <div className="card overflow-hidden h-100">
                    <div className="card-body">
                        <div className="fw-bold mb-2">Payout Tracking</div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={payoutTracking.fundsDisbursed}/>
                            <div className="ms-2">{payoutTracking.fundsDisbursed}% of Funds Disbursed</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={payoutTracking.availableToWithdraw}/>
                            <div className="ms-2">{payoutTracking.availableToWithdraw}% Available to Withdraw</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={payoutTracking.received}/>
                            <div className="ms-2">{payoutTracking.received}% Received</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-4 p-2">
                <div className="card overflow-hidden h-100">
                    <div className="card-body">
                        <div className="fw-bold mb-2">Participation Breakdown</div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={participationBreakdown.emergencySavings}/>
                            <div className="ms-2">{participationBreakdown.emergencySavings}% to Emergency Savings</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={participationBreakdown.businessStartup}/>
                            <div className="ms-2">{participationBreakdown.businessStartup}% for Business Startup</div>
                        </div>
                        <div className="d-flex align-items-center">
                            <ProgressBar value={participationBreakdown.received}/>
                            <div className="ms-2">{participationBreakdown.received}% Received</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}