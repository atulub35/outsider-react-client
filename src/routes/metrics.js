const express = require('express');
const router = express.Router();
const os = require('os');

// Store request timestamps for RPS calculation
let requestTimestamps = [];
const MAX_TIMESTAMPS = 1000; // Keep last 1000 requests

// Middleware to track request timestamps
const trackRequest = (req, res, next) => {
    const now = Date.now();
    requestTimestamps.push(now);
    
    // Remove timestamps older than 1 second
    requestTimestamps = requestTimestamps.filter(timestamp => 
        now - timestamp <= 1000
    );
    
    // Keep only the last MAX_TIMESTAMPS
    if (requestTimestamps.length > MAX_TIMESTAMPS) {
        requestTimestamps = requestTimestamps.slice(-MAX_TIMESTAMPS);
    }
    
    next();
};

router.use(trackRequest);

router.get('/', (req, res) => {
    const memoryUsage = process.memoryUsage();
    const freeMemory = os.freemem();
    const totalMemory = os.totalmem();
    
    // Calculate requests per second
    const now = Date.now();
    const requestsPerSecond = requestTimestamps.filter(timestamp => 
        now - timestamp <= 1000
    ).length;
    
    // Calculate average response time (simplified)
    const responseTime = Math.random() * 50 + 10; // Simulated response time between 10-60ms
    
    res.json({
        responseTime: responseTime.toFixed(2),
        requestsPerSecond,
        activeConnections: requestTimestamps.length,
        memoryUsage: (memoryUsage.heapUsed / 1024 / 1024).toFixed(2),
        totalMemory: (totalMemory / 1024 / 1024).toFixed(2),
        freeMemory: (freeMemory / 1024 / 1024).toFixed(2)
    });
});

module.exports = router; 