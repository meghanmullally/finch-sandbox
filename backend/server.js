require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

let accessToken = null;  // Store access token in memory

// Log environment variables for debugging (Remove this after testing)
console.log('CLIENT_ID:', process.env.CLIENT_ID);
console.log('CLIENT_SECRET:', process.env.CLIENT_SECRET);

// POST route to obtain access token from Finch Sandbox
app.post('/getAccessToken', async (req, res) => {
    try {
        const { providerId, employeeSize, products } = req.body;

        console.log({
            provider_id: providerId,
            products: products,
            employee_size: employeeSize
        });

        // Finch API request to get access token
        const response = await axios.post(`${process.env.FINCH_API_URL}/sandbox/connections`, {
            provider_id: providerId,
            products: products,
            employee_size: employeeSize
        }, {
            auth: {
                username: process.env.CLIENT_ID,
                password: process.env.CLIENT_SECRET
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Save access token to memory
        accessToken = response.data.access_token;

        console.log('Access Token received:', accessToken);

        // Return the access token to the client (frontend)
        res.json({ access_token: accessToken });
    } catch (error) {
        console.error('Error obtaining access token:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        res.status(500).json({
            message: 'Failed to obtain access token',
            error: error.message,
            details: error.response ? error.response.data : 'No additional details'
        });
    }
});

// GET route to fetch company information
app.get('/getCompanyInfo', async (req, res) => {
    try {
        if (!accessToken) {
            return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
        }

        const response = await axios.get(`${process.env.FINCH_API_URL}/employer/company`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Finch-API-Version': '2020-09-17'
            }
        });

        console.log('Company Info response:', response.data);

        // Return company info to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching company info:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        res.status(500).json({
            message: 'Failed to fetch company info',
            error: error.message,
            details: error.response ? error.response.data : 'No additional details'
        });
    }
});

// GET route to fetch employee directory
app.get('/getEmployeeDirectory', async (req, res) => {
    try {
        if (!accessToken) {
            return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
        }

        const response = await axios.get(`${process.env.FINCH_API_URL}/employer/directory`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Finch-API-Version': '2020-09-17'
            }
        });

        console.log('Employee Directory response:', response.data);

        // Return employee directory to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching employee directory:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        res.status(500).json({
            message: 'Failed to fetch employee directory',
            error: error.message,
            details: error.response ? error.response.data : 'No additional details'
        });
    }
});

app.post('/getEmployeeDetails', async (req, res) => {
    // Extract the employeeId from the request body
    const { employeeId } = req.body;

    try {
        if (!accessToken) {
            return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
        }

        // Send a POST request to Finch's /individual API
        const response = await axios.post(`${process.env.FINCH_API_URL}/employer/individual`, {
            requests: [{ individual_id: employeeId }]
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Finch-API-Version': '2020-09-17'
            }
        });

        // Return the first response body
        res.json(response.data.responses[0].body);
    } catch (error) {
        console.error('Error fetching employee details:', error.message);
        res.status(500).json({
            message: 'Failed to fetch employee details',
            error: error.message,
            details: error.response ? error.response.data : 'No additional details'
        });
    }
});


app.post('/getEmployeeEmployment', async (req, res) => {
    // Extract the employeeId from the request body
    const { employeeId } = req.body;

    try {
        if (!accessToken) {
            return res.status(401).json({ error: 'Unauthorized: Access token is missing' });
        }

        // Send a POST request to Finch's /employment API
        const response = await axios.post(`${process.env.FINCH_API_URL}/employer/employment`, {
            // Finch expects this in the body
            requests: [{ individual_id: employeeId }]
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Finch-API-Version': '2020-09-17'
            }
        });

        // Return the first response body
        res.json(response.data.responses[0].body);
    } catch (error) {
        console.error('Error fetching employee employment details:', error.message);
        res.status(500).json({
            message: 'Failed to fetch employee employment details',
            error: error.message,
            details: error.response ? error.response.data : 'No additional employment details'
        });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});