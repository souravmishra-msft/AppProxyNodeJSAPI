const express = require('express');
const dotenv = require('dotenv');
const cors = require("cors");

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
    // console.log(headers_received);
    console.log(`Last Logon Time: ${headers_received[3]}`);
    try {
        res.status(200).json({
            status: 'success',
            messge: 'API is accessible successfully',
            headers_received: headers_received,
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