import { useEffect, useRef, useState } from "react"
import { FaUserCircle } from "react-icons/fa";
import $ from "jquery";
import { api } from "../request/Api";

export const SelectMembersOverlay = ({isOpen, onClose, title, onSelect}) =>{
    const [selected, setSelected] = useState([]);
    const [members, setMembers] = useState([]);

    const hScrollRef = useRef();

    const toggleMemberHighlight = (e) =>{
        const button = $(e.target).closest('button');
        e.target.checked ? button.addClass('checked') : button.removeClass('checked');
    }

    const unSelect = (member) =>{
        setSelected((mbrs)=>[...mbrs.filter((mr)=>mr.id !== member.id)]);
    }

    const onChange = (member, e) =>{
        toggleMemberHighlight(e);
        if(e.target.checked) return setSelected((mbrs)=>[member, ...mbrs]);
        unSelect(member);
    }

    const removeSelection = (member) =>{
        const target = $(`#${member.id}`);
        target.get(0).checked = false;
        unSelect(member);
        if(!target.length) return;
        toggleMemberHighlight({target: target.get(0)});
    }

    const searchMembers = (e) =>{
        api.user.search(e.target.value).then((response)=>{
            setMembers(response.data.data);
        }).catch((error)=>{
            setMembers([]);
        });
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
        <div onClick={onClose} className="position-fixed top-0 start-0  w-100 vh-100 border" style={{zIndex: '99999999999'}}>
            <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <div onClick={(e)=>e.stopPropagation()} className="d-flex flex-column select-members-overlay px-2">
                    <div className="bg-white p-3 rounded-top-4">
                        <div className="h5">{title}</div>
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
                            <button className="selected-label btn bg-transparent d-block shadow-none text-start my-1 border-0 w-100" key={key}>
                                <label className="d-flex align-items-center pointer">
                                    <input className="d-none" onChange={(e)=>onChange(member, e)} type="checkbox" id={member.id}/>
                                    <div className="me-2">
                                        <FaUserCircle className="display-5"/>
                                    </div>
                                    <div className="w-100">
                                        <div className="text-truncate">{member.attributes.firstName} {member.attributes.lastName}</div>
                                        <div className="small"><small>First Name Last Name</small></div>
                                    </div>
                                </label>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}