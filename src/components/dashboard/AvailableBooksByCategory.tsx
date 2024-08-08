import React, { useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Box, Typography, CircularProgress, Card } from '@mui/material';
import { AppDispatch } from '../../app/store';
import { useDispatch, useSelector } from 'react-redux';
import { selectBook } from '../../features/book/bookSlice';
import { allAvailableBooksByCategory } from '../../features/book/bookActions';

const AvailableBooksByCategory = () => {
    const dispatch = useDispatch<AppDispatch>();
    const bookState = useSelector(selectBook);
    const { categorizedAvailableBooks, loading, error } = bookState;

    useEffect(() => {
        dispatch(allAvailableBooksByCategory());
    }, [dispatch]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error fetching data</Typography>;
    }

    const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

    const option = {
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'horizontal',
            bottom: 0,
            left: 'center',
            itemWidth: 15,
            itemHeight: 14,
            textStyle: {
                fontSize: 12
            },
            formatter: (name: string) => {
                const item = categorizedAvailableBooks.find((entry: any) => entry.categoryName === name);
                return item ? `${name} ${item.availableQuantity}` : name;
            }
        },
        // grid: {
        //     bottom: 80 // Adjust bottom margin to prevent overlap
        // },
        series: [
            {
                name: 'Available Books',
                type: 'pie',
                radius: ['50%', '60%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    formatter: '{b}: {c} ({d}%)',
                    position: 'outside',
                    textStyle: {
                        fontSize: 12
                    }
                },
                labelLine: {
                    show: true
                },
                data: categorizedAvailableBooks.map((entry: any, index: any) => ({
                    value: entry.availableQuantity,
                    name: entry.categoryName,
                    itemStyle: { color: COLORS[index % COLORS.length] }
                }))
            }
        ]
    };

    return (
        <Card sx={{ width: '100%', maxWidth: 300, padding: 2, backgroundColor:'#fff', borderRadius:'.5rem'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <Typography variant="h6" gutterBottom>
                Available Books
            </Typography>
            <Typography variant='button' gutterBottom sx={{backgroundColor:"rgba(0,0,0,.1)", padding:'.1rem .5rem'}}>
                Today
            </Typography>
            </div>
            <ReactECharts option={option} style={{ height: 300, width: '100%' }} />
        </Card>
    );
};

export default AvailableBooksByCategory;
