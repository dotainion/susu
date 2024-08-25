import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, BarChart } from 'recharts';
import { api } from '../request/Api';

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

export const SchedulePayoutChart = ({groupId}) => {
    const [lines, setLines] = useState([]);
    const [employees, setEmployees] = useState([]);

    const buildEmployeeContributions = (contributions) =>{
        let contribute = {};
        contributions.forEach((pay)=>contribute[pay.attributes.user.attributes.firstName] = pay.attributes.contribution);
        return contribute;
    }

    const buildPayouts = (payouts) =>{
        let total = 0;
        payouts.forEach((pay)=>total += parseFloat(pay.attributes.amount));
        return total;
    }

    const getColor = () =>{
        const currentColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
        return currentColor;
    }

    useEffect(()=>{
        if(!groupId) return;
        api.schedule.list(groupId).then((response)=>{
            setLines(
                response.data.data.map((d)=>({
                    month: new Date(d.attributes.date).toLocaleDateString('en-US', {month: 'short'}),
                    payout: buildPayouts(d.attributes.payouts),
                    ...buildEmployeeContributions(d.attributes.contributions)
                }))
            );
            setEmployees(response.data.data.map((d)=>d.attributes.user.attributes.firstName));
        }).catch((error)=>{

        });
    }, [groupId]);

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
                </BarChart >
            </ResponsiveContainer>
        </div>
    );
};
