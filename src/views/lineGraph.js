import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    graph: {
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '800px',
        width: '800px'
    }
}));

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};



function LineGraph(props) {
    debugger
    const classes = useStyles();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (props.dataList) {
            SetGraphData();
        }
    }, [props.dataList])

    const SetGraphData = () => {
        let thislabel = [];
        let thisdata = [];
        if (props.dataList) {
            props.dataList.map(a => {
                thislabel.push(a.parameter);
                thisdata.push(a.value);
            });

            setData({
                labels: thislabel,
                datasets: [
                    {
                        label: 'Measurements',
                        data: thisdata,
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            })
        }       

    }

    return (
        <React.Fragment>
            {data ?
                <Line data={data} options={options} />
                : null}
        </React.Fragment>
    );
}

export default React.memo(LineGraph);