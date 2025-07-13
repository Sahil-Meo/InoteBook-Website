import React, { useState, useRef } from 'react';
import Chart from 'react-apexcharts';

const GraphCard = () => {
    // State for dropdown visibility
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedTimeRange, setSelectedTimeRange] = useState('Last week');

    // Chart options with two series
    const chartOptions = {
        series: [
            {
                name: 'Clicks',
                data: [30, 40, 35, 50, 49, 60, 70],
            },
            {
                name: 'Impressions',
                data: [40, 50, 45, 60, 70, 80, 90],
            }
        ],
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                show: false,
            },
        },
        colors: ['#3b82f6', '#10b981'], // Blue for clicks, green for impressions
        stroke: {
            width: 3,
            curve: 'smooth',
        },
        grid: {
            show: false,
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: '#6b7280',
                    fontSize: '12px',
                },
            },
        },
        yaxis: [
            {
                seriesName: 'Clicks',
                show: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#3b82f6'
                },
                labels: {
                    style: {
                        colors: '#3b82f6',
                    },
                },
                title: {
                    text: 'Clicks',
                    style: {
                        color: '#3b82f6',
                    }
                }
            },
            {
                seriesName: 'Impressions',
                opposite: true,
                show: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#10b981'
                },
                labels: {
                    style: {
                        colors: '#10b981',
                    },
                },
                title: {
                    text: 'Impressions',
                    style: {
                        color: '#10b981',
                    }
                }
            }
        ],
        tooltip: {
            enabled: true,
            style: {
                fontSize: '12px',
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
        },
    };

    return (
        <div className="max-w-7xl md:min-w-4xl w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-6 sm:p-4 md:p-6">
            <div className="flex justify-between mb-5">
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">
                            Clicks
                        </h5>
                        <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">42,3k</p>
                    </div>
                    <div>
                        <h5 className="inline-flex items-center text-gray-500 dark:text-gray-400 leading-none font-normal mb-2">
                            Impressions
                        </h5>
                        <p className="text-gray-900 dark:text-white text-2xl leading-none font-bold">78,5k</p>
                    </div>
                </div>
            </div>

            <Chart
                options={chartOptions}
                series={chartOptions.series}
                type="line"
                height={350}
            />

            <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-2.5">
                <div className="pt-5">
                    <a href="#" className="px-5 py-2.5 text-sm font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        View full report
                    </a>
                </div>
            </div>
        </div>
    );
};

export default GraphCard;