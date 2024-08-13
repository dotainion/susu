import { useEffect, useRef } from "react";
import { utils } from "../utils/Utils";
import { ViewGroup } from "../pages/ViewGroup";
import { Member } from "../pages/Member";
import { useParams } from "react-router-dom";
import $ from "jquery";
import { GroupWallet } from "../pages/GroupSusuWallet";
import { api } from "../request/Api";
import { Schedule } from "../pages/Schedule";
import { NewGroup } from "../pages/NewGroup";
import { UpdateMemberSusuWallet } from "../pages/UpdateMemberSusuWallet";
import { Group } from "../pages/Group";
import { GroupMembers } from "../pages/GroupMembers";
import { Dashboard } from "../pages/Dashboard";
import { Messangers } from "../pages/Messangers";
import { GroupMessages } from "../pages/GroupMessages";
import { Messages } from "../pages/Messages";
import { MessangerSearchGroupOrMember } from "../pages/MessangerSearchGroupOrMember";
import { SelectMembersOverlay } from "../components/SelectMembersOverlay";

let start = false;
export const Test = () =>{
    const dateRef = useRef();

    const params = useParams();

    const getSchedules = () =>{
        api.schedule.list(params?.memberId).then((response)=>{
            console.log(response.data.data);
        }).catch((error)=>{
            console.log(error);
        });
    }

    useEffect(()=>{
        if(start === true) return;
        start = true;

        var ws = new WebSocket('ws://caribbeancodingacademygrenada.com:8080');
        
        /*ws.onmessage = function(event) {
            var messages = document.getElementById('messages');
            var item = document.createElement('li');
            item.textContent = event.data;
            messages.appendChild(item);
        };*/
        ws.onopen = function() {
            console.log('WebSocket connection established');
            ws.send('Hello Server');
        };
        
        ws.onmessage = function(event) {
            console.log('Message from server:', event.data);
        };
        
        ws.onerror = function(error) {
            console.error('WebSocket error:', error);
            console.log(error);
        };

        var form = document.getElementById('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            var input = document.getElementById('input');
            ws.send(input.value);
            input.value = '';
        });
    }, []);

    return(
        <div className="container">
             <ul id="messages"></ul>
            <form id="form">
                <input id="input" autoComplete="off" /><button>Send</button>
            </form>
        </div>
    )
}