const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");
const { Service } = require('node-windows');
const service = require("node-windows").Service;

dotenv.config({ path: './config/main.env' });

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ type: 'application/json' }));

// Enable CORS (for local testing only - remove in production/deployment)
app.use(cors());

app.get('/api/test', (req, res) => {
    const headers_received = req.rawHeaders;
    const header_object = {};

    for (let i = 0; i < headers_received.length; i += 2) {
        const key = headers_received[i];
        const value = headers_received[i + 1];
        header_object[key] = value
    }

    console.log(header_object)


    try {
        res.status(200).json({
            status: 'success',
            message: 'API is accessible successfully',
            custom_header_claims: {
                username: header_object.USERNAME,
                employee_id: header_object.EMPLOYEE_ID,
                department: header_object.EMP_DEPARTMENT
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    }
})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});