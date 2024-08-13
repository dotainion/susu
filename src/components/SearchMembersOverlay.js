import { useEffect, useRef, useState } from "react"
import { FaCheck, FaUserCircle } from "react-icons/fa";
import $ from "jquery";
import { api } from "../request/Api";

export const SearchMembersOverlay = ({isOpen, onClose, onSelect}) =>{
    const [selected, setSelected] = useState([]);
    const [members, setMembers] = useState([]);

    const hScrollRef = useRef();
    const timeoutRef = useRef();

    const unSelect = (member) =>{
        setSelected((mbrs)=>[...mbrs.filter((mr)=>mr.id !== member.id)]);
    }

    const onChange = (member, e) =>{
        if(e.target.checked) return setSelected((mbrs)=>[member, ...mbrs]);
        unSelect(member);
    }

    const removeSelection = (member) =>{
        const target = $(`#${member.id}`);
        target.get(0).checked = false;
        unSelect(member);
    }

    const searchMembers = (e) =>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            api.user.search(e.target.value).then((response)=>{
                setMembers(response.data.data);
            }).catch((error)=>{
                setMembers([]);
            });
        }, 500);
    }

    const onTriggerSelect = () =>{
        onSelect(JSON.parse(JSON.stringify(selected)));
        onClose();
    }

    useEffect(()=>{
        const $scrollable = $(hScrollRef.current);

        let isDragging = false;
        let startX, scrollLeft;
      
        function onMove(e) {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX || e.originalEvent.touches[0].pageX; // Get touch or mouse position
          const walk = (x - startX) * 2; // Scroll speed multiplier
          $scrollable.scrollLeft(scrollLeft - walk);
        }
      
        $scrollable.on('mousedown touchstart', function(e) {
          isDragging = true;
          startX = e.pageX || e.originalEvent.touches[0].pageX;
          scrollLeft = $scrollable.scrollLeft();
          $scrollable.css('cursor', 'grabbing');
        });
      
        $(document).on('mouseup touchend', function() {
          isDragging = false;
          $scrollable.css('cursor', 'grab');
        });
      
        $(document).on('mousemove touchmove', onMove);
    }, []);

    if(!isOpen) return null;

    return(
        <div onClick={onClose} className="position-fixed top-0 start-0 w-100 vh-100" style={{zIndex: '99999999999'}}>
            <div className="w-100 h-100 d-flex align-items-start justify-content-center">
                <div onClick={(e)=>e.stopPropagation()} className="d-flex flex-column select-members-overlay px-2 my-2">
                    <div className="bg-white p-3 rounded-top-4">
                        <div className="h5">Invite someone to join your group</div>
                        <div className="fw-bold">Search Members</div>
                        <input onChange={searchMembers} className="form-control shadow-none" type="text" placeholder="Search members..."/>
                        <div className="small"><small>Click on a member's name to include or exclude them.</small></div>
                        <div className="small lh-1"><small>Changes are saved automatically.</small></div>
                        <div className="d-flex justify-content-end mt-1 px-3">
                            <button onClick={onTriggerSelect} className="btn btn-sm py-0">Send</button>
                        </div>
                    </div>
                    <div ref={hScrollRef} className="bg-white px-3 py-1 text-wrap overflow-x-auto w-100 text-nowrap scrollbar-hidden user-select-none small">
                        {selected.map((member, key)=>(
                            <div className="d-inline-block border rounded-pill px-2 m-1 small position-relative" key={key}>
                                <span>{member.attributes.firstName} {member.attributes.lastName}</span>
                                <button onClick={()=>removeSelection(member)} className="position-absolute top-0 translate-middle-y btn-close bg-danger shadow-none" style={{zIndex: '9999', right: '-8px'}}></button>
                            </div>
                        ))}
                    </div>
                    <div className="bg-white py-3 px-1 rounded-bottom-4 shadow-sm overflow-y-auto overflow-x-hidden">
                        {members.map((member, key)=>(
                            <ButtonRow member={member} onChange={(e)=>onChange(member, e)} key={key}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ButtonRow = ({member, onChange}) =>{
    const [checked, setChecked] = useState();

    const checkRef = useRef();

    const triggerChange = (e) =>{
        onChange(e);
        setChecked(checkRef.current.checked);
    }

    useEffect(()=>{
        setChecked(checkRef.current.checked);
    }, []);

    return(
        <button className="btn bg-transparent d-block shadow-none text-start my-1 border-0 w-100">
            <label className="d-flex align-items-center pointer">
                <input ref={checkRef} className="d-none" onChange={triggerChange} type="checkbox" id={member.id}/>
                <div className="position-relative me-2">
                    {checked ? <FaCheck className="display-5 text-success"/> : <FaUserCircle className="display-5"/>}
                </div>
                <div className="w-100">
                    <div className="text-truncate">{member.attributes.firstName} {member.attributes.lastName}</div>
                    <div className="small"><small>First Name Last Name</small></div>
                </div>
            </label>
        </button>
    )
}