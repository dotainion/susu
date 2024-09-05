import React, { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from "recharts";
import { api } from "../request/Api";

let colorIndex = 0;
const colors = [
    '#4B9CD3',
    '#F5A623',
    '#7ED321',
    '#D0021B',
    '#F8E71C',
    '#BD10E0',
    '#50E3C2',
    '#9013FE',
    '#FF6F61',
    '#B8E986',
    '#8884d8',
    '#9B6FDF',
    '#7C4DFF',
    '#6C5B9A',
    '#9B8AC8',
    '#6E41A1',
    '#B39DDB',
    '#8E7CC3',
    '#A397D1',
]

export const SchedulePayoutChart = ({communityId}) => {
    const [lines, setLines] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [payments, setPayments] = useState({contributions: 0, payouts: 0, refunds: 0});

    const dashboardNamesRef = useRef({});

    const toName = (payment) =>{
        const firstName = payment.attributes.user.attributes.firstName;
        const lastName = payment.attributes.user.attributes.lastName;
        return `${firstName} ${lastName}`;
    }

    const buildEmployeeContributions = (contributions) =>{
        let contribute = {};
        contributions.forEach((pay)=>{
            const name = dashboardNamesRef.current[pay.attributes.user.id];
            if(!contribute.hasOwnProperty(name)) contribute[name] = 0;
            contribute[name] += parseFloat(pay.attributes.contribution);
        });
        return contribute;
    }

    const buildPayouts = (payouts) =>{
        let total = 0;
        payouts.forEach((pay)=>total += parseFloat(pay.attributes.amount));
        return total;
    }

    const buildRefunds = (refunds) =>{
        let total = 0;
        refunds.forEach((refund)=>total += parseFloat(refund.attributes.amount));
        return total;
    }

    const getColor = () =>{
        const currentColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
        return currentColor;
    }
    
    const uniqueName = (name) =>{
        let newName = name;
        let count = 1;
        while (dashboardNamesRef.current.hasOwnProperty(newName)) {
            newName = `${name}(${count})`;
            count++;
        }
        return newName;
    }

    useEffect(()=>{
        if(!communityId) return;
        api.schedule.list(communityId).then((response)=>{
            let pay = {contributions: 0, payouts: 0, refunds: 0};
            response.data.data.forEach((p)=>p.attributes.contributions.forEach((r)=>pay.contributions += parseFloat(r.attributes.contribution)));
            response.data.data.forEach((p)=>p.attributes.payouts.forEach((r)=>pay.payouts += parseFloat(r.attributes.amount)));
            response.data.data.forEach((p)=>p.attributes.refunds.forEach((r)=>pay.refunds += parseFloat(r.attributes.amount)));
            setPayments(pay);

            response.data.data.forEach((p)=>dashboardNamesRef.current[p.attributes.user.id] = uniqueName(toName(p)));

            setLines(
                response.data.data.map((d)=>({
                    month: new Date(d.attributes.date).toLocaleDateString('en-US', {month: 'short'}),
                    payout: buildPayouts(d.attributes.payouts),
                    refund: buildRefunds(d.attributes.refunds),
                    ...buildEmployeeContributions(d.attributes.contributions)
                }))
            );

            setEmployees(Object.values(dashboardNamesRef.current));
        }).catch((error)=>{

        });
    }, [communityId]);

    return (
        <div>
            <h4>Susu Contributions</h4>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart  data={lines}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {employees.map((employee, key)=>(
                        <Bar dataKey={employee} fill={getColor()} stackId="a" key={key} />
                    ))}
                    <Bar dataKey="payout" fill="#ff7300" stackId="b" />
                    <Bar dataKey="refund" fill="#A397D1" stackId="c" />
                </BarChart >
            </ResponsiveContainer>
            <div className="my-4 p-3 bg-light rounded-3">
                <div className="h4">Contributions</div>
                <div className="d-flex">
                    <div className="border rounded-3 px-3">
                        <div>Payment:</div>
                        <div><b>${payments.contributions.toFixed(2)}</b></div>
                    </div>
                    <div className="border rounded-3 px-3 mx-2">
                        <div>Payout:</div>
                        <div><b>${payments.payouts.toFixed(2)}</b></div>
                    </div>
                    <div className="border rounded-3 px-3">
                        <div>Refund:</div>
                        <div><b>${payments.refunds.toFixed(2)}</b></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
