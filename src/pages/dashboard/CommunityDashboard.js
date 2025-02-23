import { FaBell } from "react-icons/fa";
import { BiSolidUpArrowAlt } from "react-icons/bi";
import { MdArrowDropUp } from "react-icons/md";
import { MdArrowDropDown } from "react-icons/md";
import { BsBarChartLineFill } from "react-icons/bs";
import { BarChart } from "../../components/BarChart";
import { GiStairsGoal } from "react-icons/gi";
import { RiSecurePaymentFill } from "react-icons/ri";
import { MdAdd } from "react-icons/md";

export const CommunityDashboard = () =>{
    return(
        <div className="">
            <div className="d-flex align-items-center py-3 mb-3">
                <div className="d-flex align-items-center w-100">
                    <h4><b>Community</b></h4>
                    <small className="ms-2">Dashboard</small>
                </div>
                <FaBell className="mx-3"/>
                <select className="form-control form-select w-auto bg-transparent shadow-none border-0">
                    <option>Nick Rick</option>
                </select>
            </div>

            <div className="d-flex">
                <div className="w-100">
                    <div className="d-flex text-nowrap mb-5">
                        <div className="bg-light-faded p-3">
                            <div className="d-flex">
                                <div className="w-100">Total Balance</div>
                                <div><BiSolidUpArrowAlt/> 2.36%</div>
                            </div>
                            <div className="h4 py-3">EXD 10,000.00</div>
                            <div className="d-flex">
                                <div className="w-50 border-end border-secondary p-2">
                                    <small><MdArrowDropUp/> Income</small>
                                    <div><b>EXD 30, 000.00</b></div>
                                </div>
                                <div className="w-50 border-start border-secondary p-2">
                                    <small><MdArrowDropDown/> Expense</small>
                                    <div><b>EXD 20, 000.00</b></div>
                                </div>
                            </div>
                        </div>

                        <div className="mx-3"></div>

                        <div className="bg-light-faded p-3">
                            <div className="d-flex">
                                <div className="w-100 me-3">Total Savings</div>
                                <div><BiSolidUpArrowAlt/> 2.36%</div>
                            </div>
                            <div className="h4 py-3">EXD 5,000.00</div>
                            <div className="d-flex justify-content-center">
                                <BsBarChartLineFill className="display-4"/>
                            </div>
                        </div>
                    </div>

                    <div className="bg-light-faded my-5">
                        <BarChart/>
                    </div>

                    <div className="d-flex my-5">
                        <div className="bg-light-faded p-3">
                            <div className="fw-bold mb-2">Goals</div>
                            <div>Summer Vacation</div>
                            <div className="d-flex align-items-center mt-3">
                                <GiStairsGoal className="display-1"/>
                                <div className="ms-2">
                                    <div className="fw-bold">62% reached</div>
                                    <progress/>
                                    <div className="small">$1,485 out of $2,385</div>
                                </div>
                            </div>
                        </div>

                        <div className="mx-3"></div>

                        <div className="bg-light-faded p-3">
                            <div className="fw-bold mb-2">Spendign Overview</div>
                            <div className="d-flex align-items-center">
                                <progress/>
                                <div className="ms-2">68% Groceries</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <progress/>
                                <div className="ms-2">68% Withdrawal</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <progress/>
                                <div className="ms-2">68% Retail</div>
                            </div>
                            <div className="d-flex align-items-center">
                                <progress/>
                                <div className="ms-2">68% Leisure</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="mx-3"></div>

                <div className="d-flex flex-column pb-5" style={{width: '400px'}}>
                    <div className="d-flex align-items-center text-nowrap">
                        <div className="h4 w-100">Transactions</div>
                        <div className="small">View all</div>
                    </div>
                    <div className="d-flex align-items-center">
                        <button className="btn">All</button>
                        <button className="btn mx-2">Expenses</button>
                        <button className="btn">Income</button>
                    </div>

                    <div className="mb-auto">
                        {[1,1,1,1,1].map((_, key)=>(
                            <div className="d-flex align-items-center border-bottom py-3" key={key}>
                                <RiSecurePaymentFill className="display-5"/>
                                <div className="ms-2 w-100">
                                    <div className="fw-bold">John Smith</div>
                                    <div className="small">RBTT Bank</div>
                                </div>
                                <div>$189.36</div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-light-faded py-3 mt-4" style={{width: '400px'}}>
                        <div className="d-flex align-items-center px-3 mb-2">
                            <div className="fw-bold w-100">Quick Transer</div>
                            <button className="btn btn-sm">{'<'}</button>
                            <button className="btn btn-sm">{'>'}</button>
                        </div>
                        <div className="overflow-y-hidden text-nowrap overflow-x-auto py-2" style={{width: '400px'}}>
                            <button className="btn mx-1 rounded-circle bg-white" style={{width: '50px', height: '50px'}}>
                                <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                    <MdAdd className="bg-transparent fs-2"/>
                                </div>
                            </button>
                            {[1,1,1,1,1,1,1,1,1,1,1,1,1].map((_, key)=>(
                                <button className="btn mx-1 rounded-circle bg-white" style={{width: '50px', height: '50px'}}>
                                    <div className="d-flex align-items-center justify-content-center w-100 h-100">
                                        <MdAdd className="invisible fs-2"/>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}