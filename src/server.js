const express = require('express');
const app = express();
const metricsRouter = require('./routes/metrics');

// ... existing code ...

// Add metrics route
app.use('/api/metrics', metricsRouter);

// ... existing code ... 