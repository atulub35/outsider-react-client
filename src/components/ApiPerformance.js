import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useApi from '../hooks/useApi';

const MetricValue = ({ value, unit }) => {
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        setOpacity(0);
        const timer = setTimeout(() => setOpacity(1), 50);
        return () => clearTimeout(timer);
    }, [value]);

    return (
        <div 
            key={value} 
            style={{ opacity: opacity }}
            className="transition-all duration-500 ease-in-out"
        >
            <p className="text-2xl font-bold text-blue-600">{value}{unit}</p>
        </div>
    );
};

const ApiPerformance = () => {
    const { loading, error, get, post, put, delete: del } = useApi();
    const [metrics, setMetrics] = useState({
        responseTime: 0,
        requestsPerSecond: 0,
        activeConnections: 0,
        totalMemory: 0,
        freeMemory: 0
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await get('/api/metrics');
                setMetrics(response);
            } catch (error) {
                console.error('Error fetching metrics:', error);
            }
        };

        // Fetch metrics every 2 seconds
        const interval = setInterval(fetchMetrics, 2000);
        fetchMetrics(); // Initial fetch

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-blue-600 mb-6">API Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-700">Response Time</h4>
                    <MetricValue value={metrics.responseTime} unit="ms" />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-700">Requests/Second</h4>
                    <MetricValue value={metrics.requestsPerSecond} unit="" />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-700">Active Connections</h4>
                    <MetricValue value={metrics.activeConnections} unit="" />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-700">Memory Usage</h4>
                    <MetricValue value={metrics.totalMemory} unit="MB" />
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-gray-700">Free Memory</h4>
                    <MetricValue value={metrics.freeMemory} unit="MB" />
                </div>
            </div>
        </div>
    );
};

export default ApiPerformance; 