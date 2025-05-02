// BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { api } from '../request/Api';
import { useParams } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart = () => {
    const [labels, setLabels] = useState([]);
    const [amounts, setAmounts] = useState([]);

    const params = useParams();
    
    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Sales',
                data: amounts,
                backgroundColor: '#0d6efd',
                borderColor: '#0d6efd',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Sales Data',
            },
        },
    };
    
    useEffect(()=>{
        api.schedule.list(params.susuId).then((response)=>{
            const labelsList = [];
            const amountsList = [];
            response.data.data.forEach((p)=>{
                let amount = 0;
                p.attributes.contributions.forEach((r)=>amount += parseFloat(r.attributes.contribution));
                amountsList.push(amount);
                labelsList.push(p.attributes.contributions[0].attributes.user.firstName || p.attributes.contributions[0].attributes.user.lastName);
            });
            setLabels(labelsList);
            setAmounts(amountsList);
        }).catch(()=>{

        });
    }, []);

    return(
        <div className="w-100" style={{height: '400px'}}>
            <Bar data={data} options={options} />
        </div>
    );
};
