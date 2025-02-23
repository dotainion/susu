import { BiSolidUpArrowAlt } from "react-icons/bi"
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md"
import { FcSimCardChip } from "react-icons/fc";
import { BiTransfer } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { BarChart } from "../../components/BarChart";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FaFilter } from "react-icons/fa";

export const Transaction = () =>{
    return(
        <div>
            <div className="d-flex align-items-center py-3 mb-3">
                <div className="d-flex align-items-center w-100">
                    <h4><b>Transactions</b></h4>
                </div>
                <FaBell className="mx-3"/>
                <select className="form-control form-select w-auto bg-transparent shadow-none border-0">
                    <option>Nick Rick</option>
                </select>
            </div>

            <div className="d-flex">
                <div className="w-100">
                    <div className="d-flex">
                        <div className="bg-light-faded p-3">
                            <div className="d-flex">
                                <div className="w-100">Checking Account</div>
                                <div><BiSolidUpArrowAlt/> 2.36%</div>
                            </div>
                            <div className="py-3">
                                <small>Balance</small>
                                <div className="h4">EXD 10,000.00</div>
                            </div>
                            <div className="py-3">
                                <small>Balance</small>
                                <div className="h5">EXD 8,000.00</div>
                            </div>
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

                        <div className="bg-light-faded rounded-3 p-3">
                            <div className="d-flex justify-content-between">
                                <div className=""><BiTransfer/></div>
                                <div className=""><FcSimCardChip/></div>
                            </div>
                            <div className="py-4">
                                <small>Balance</small>
                                <div className="h4">EXD 10,000.00</div>
                            </div>
                            <div className="fw-bold my-3">111 **** **** 0000</div>
                            <div className="d-flex justify-content-between">
                                <div className="">Nickola Rich</div>
                                <div className="">12/24</div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-light-faded my-5">
                        <BarChart/>
                    </div>
                </div>
                
                <div className="mx-3"></div>

                <div className="" style={{width: '400px'}}>
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="h4">Transactions</div>
                        <div className="small"><FaFilter/></div>
                    </div>
                    <input className="form-control my-3 py-4" placeholder="Search..."/>
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
                </div>
            </div>
        </div>
    )
}