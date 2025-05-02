import { useEffect, useRef, useState } from "react";
import { BiSolidUpArrowAlt } from "react-icons/bi";
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { BsBarChartLineFill } from "react-icons/bs";
import { BarChart } from "../../components/BarChart";
import { GiStairsGoal } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { QuickTransaction } from "../../components/QuickTransaction";
import { useParams } from "react-router-dom";
import { api } from "../../request/Api";
import { ProgressBar } from "../../components/ProgressBar";
import { ProgressPercentage } from "../../components/ProgressPercentage";

const FILTER = {
    all: 'ALL',
    refund: 'REFUND',
    income: 'INCOME',
    expenses: 'EXPENSES'
}

export const CommunityDashboard = () =>{
    const [filter, setFilter] = useState(FILTER.all);
    const [payouts, setPayouts] = useState([]);
    const [refunds, setRefunds] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [totalPayout, setTotalPayout] = useState(0);
    const [totalContribution, setTotalContribution] = useState(0);
    const [totalSavings, setTotalSavings] = useState(0);
    const [totalExpectedContribution, setTotalExpectedContribution] = useState(0);

    const params = useParams();

    useEffect(()=>{
        if(!params.susuId) return;
        api.schedule.list(params.susuId).then((response)=>{
            const payoutsList = [];
            const refundsList = [];
            const contributionsList = [];
            response.data.data.forEach((schedule)=>{
                payoutsList = [...payoutsList, ...schedule.attributes.payouts];
                refundsList = [...refundsList, ...schedule.attributes.refunds];
                contributionsList = [...contributionsList, ...schedule.attributes.contributions];
            });
            setPayouts(()=>[...payoutsList]);
            setRefunds(()=>[...refundsList]);
            setContributions(()=>[...contributionsList]);
            setSchedules(response.data.data);

            let totalCont = 0;
            contributionsList.forEach((con)=>totalCont += parseFloat(con.attributes.contribution))
            setTotalContribution(totalCont);

            let totalPay = 0;
            payoutsList.forEach((con)=>totalPay += parseFloat(con.attributes.amount))
            setTotalPayout(totalPay);
        }).catch((error)=>{

        });        
    }, []);

    useEffect(()=>{
        if(!schedules.length) return;
        api.susu.fetch(params.susuId).then((response)=>{
            const susu = response.data.data;
            const expectedContribution = ((parseFloat(susu.attributes.contribution) * schedules.length) * susu.attributes.accurance);
            setTotalExpectedContribution(expectedContribution);

            let totalRefund = 0;
            refunds.forEach((con)=>totalRefund += parseFloat(con.attributes.amount))
            setTotalSavings(expectedContribution - totalRefund);
        }).catch((error)=>{

        });
    }, [schedules]);

    useEffect(()=>{
        if(filter === FILTER.refund){
            setTransactions(()=>[...refunds]);
        }else if(filter === FILTER.income){
            setTransactions(()=>[...payouts]);
        }else if(filter === FILTER.expenses){
            setTransactions(()=>[...contributions]);
        }else if(filter === FILTER.all){
            setTransactions(()=>[...payouts, ...refunds, ...contributions]);
        }
    }, [filter]);

    return(
        <div>
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className="d-block d-sm-flex gap-3 text-nowrap mb-5">
                        <div className="bg-light-faded p-3">
                            <div className="d-flex">
                                <div className="w-100">Total Balance</div>
                                <div><BiSolidUpArrowAlt/> 0%</div>
                            </div>
                            <div className="h4 py-3">EXD {totalExpectedContribution}</div>
                            <div className="d-flex">
                                <div className="border-end border-secondary p-2">
                                    <small><MdArrowDropUp/> Income</small>
                                    <div><b>EXD {totalPayout}</b></div>
                                </div>
                                <div className="border-start border-secondary p-2">
                                    <small><MdArrowDropDown/> Expense</small>
                                    <div><b>EXD {totalContribution}</b></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-light-faded p-3">
                            <div className="d-flex">
                                <div className="w-100 me-3">Total Savings</div>
                                <div><BiSolidUpArrowAlt/> 0%</div>
                            </div>
                            <div className="h4 py-3">EXD {totalSavings}</div>
                            <div className="d-flex justify-content-center">
                                <BsBarChartLineFill className="display-4"/>
                            </div>
                        </div>
                    </div>

                    <div className="bg-light-faded my-5">
                        <BarChart/>
                    </div>
                </div>
                
                <div className="col-12 col-lg-4 pb-5">
                    <div className="d-flex align-items-center text-nowrap">
                        <div className="h4 w-100">Transactions</div>
                        <a className="small pointer">View all</a>
                    </div>
                    <div className="d-flex align-items-center gap-1 pb-2">
                        <button onClick={()=>setFilter(FILTER.all)} className={`btn btn-sm btn-primary ${filter === FILTER.all ? 'active' : ''}`}>All</button>
                        <button onClick={()=>setFilter(FILTER.expenses)} className={`btn btn-sm btn-primary ${filter === FILTER.expenses ? 'active' : ''}`}>Expenses</button>
                        <button onClick={()=>setFilter(FILTER.income)} className={`btn btn-sm btn-primary ${filter === FILTER.income ? 'active' : ''}`}>Income</button>
                        <button onClick={()=>setFilter(FILTER.refund)} className={`btn btn-sm btn-primary ${filter === FILTER.refund ? 'active' : ''}`}>Refund</button>
                    </div>

                    <div className="mb-auto overflow-auto" style={{maxHeight: '600px'}}>
                        {transactions.map((tran, key)=>(
                            <div className="d-flex align-items-center border-bottom py-3" key={key}>
                                <RiSecurePaymentFill className="display-5"/>
                                <div className="ms-2 w-100">
                                    <div className="fw-bold">{tran.attributes.user.attributes.firstName} {tran.attributes.user.attributes.lastName}</div>
                                    <div className="small">Bank not specified</div>
                                </div>
                                <div>${tran.attributes.contribution || tran.attributes.amount}</div>
                            </div>
                        ))}
                    </div>

                    <QuickTransaction />
                </div>
            </div>

            <ProgressPercentage/>
        </div>
    )
}