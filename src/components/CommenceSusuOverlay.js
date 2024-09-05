import { useEffect, useRef, useState } from "react"
import { api } from "../request/Api";
import { SelectOption } from "../widgets/SelectOption";
import { useParams } from "react-router-dom";
import { ParseError } from "../utils/ParseError";
import { utils } from "../utils/Utils";
import $ from "jquery";

export const CommenceSusuOverlay = ({isOpen, onClose, onResponse}) =>{
    const [cycle , setCycle] = useState();
    const [cycles , setCycles] = useState([]);
    const [errors , setErrors] = useState();

    const params = useParams();

    const accuranceRef = useRef();
    const contributionRef = useRef();

    const startSusu = () =>{
        setErrors(null);
        const data = {
            communityId: params.communityId,
            accurance: accuranceRef.current.value,
            contribution: contributionRef.current.value,
            cycle: cycle
        }
        api.susu.start(data).then((response)=>{
            onResponse?.(response.data.data[0]);
            onClose?.();
        }).catch((error)=>{
            setErrors(new ParseError().message(error));
        });
    }

    useEffect(() => {
        api.susu.cycles().then((response)=>{
            setCycles(
                response.data.data.map((cyc)=>({
                    title: cyc.attributes.cycle, 
                    value: cyc.attributes.cycle
                }))
            );
        }).catch((error)=>{
            console.log(error);
        });

        $(accuranceRef.current).on('input', (e)=>{
            if (parseFloat(e.target.value) < parseInt(e.target.min)) {
                e.target.value = e.target.min;
            }
        });
    }, []);

    if(!isOpen) return null;

    return(
        <div onClick={onClose} className="position-fixed top-0 start-0 w-100 vh-100" style={{zIndex: '99999999999'}}>
            <div className="w-100 h-100 d-flex align-items-start justify-content-center">
                <div onClick={(e)=>e.stopPropagation()} className="d-flex flex-column select-members-overlay px-2 my-2">
                    <div className="bg-white rounded-4 overflow-hidden">
                        <div className="bg-sec p-3 h5">Commence susu</div>
                        <div className="p-3 pt-0">
                            {errors ? <div className="small text-danger">{errors}</div> : null}
                            <div className="small text-secondary">Contribution</div>
                            <input ref={contributionRef} className="form-control shadow-none mb-3" type="number" placeholder="0.00" />
                            <div className="border-top pt-2 small text-secondary">Duration Cycle</div>
                            <SelectOption options={cycles} onChange={(e)=>setCycle(e.target.value)} defaultValue={cycle}/>
                            <div className="border-top pt-2 small text-secondary">Accurances</div>
                            <input ref={accuranceRef} className="form-control shadow-none" type="number" min={1} step={1} defaultValue={1} />
                            <div className="small">
                                <small>The "Accurance" defines how many complete rotation cycles each member will receive their payout before the susu ends. For instance, with an accurance of 2, every member gets their payout twice in total before the susu concludes.</small>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button onClick={onClose} className="btn btn-sm bg-sidebar shadow-none me-2">Cancel</button>
                                <button onClick={startSusu} className="btn btn-sm bg-sidebar shadow-none">Commence susu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
