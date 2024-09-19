import axios from 'axios';

// Function to call the backend to get access token
export const getAccessToken = async (providerId) => {
    try {
        const response = await axios.post('http://localhost:3000/getAccessToken', {
            providerId,  // Passing providerId from the selected value in the dropdown
            employeeSize: 50,
            products: ['company', 'directory', 'individual', 'employment'],  // Requested products
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to call the backend to get company info
export const getCompanyInfo = async (accessToken) => {
    try {
        const response = await axios.get('http://localhost:3000/getCompanyInfo', {
            headers: {
                Authorization: `Bearer ${accessToken}`,  // Pass the access token
                'Finch-API-Version': '2020-09-17',  // Add the Finch API version header
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching company info:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to call the backend to get employee directory
export const getEmployeeDirectory = async (accessToken) => {
    try {
        const response = await axios.get('http://localhost:3000/getEmployeeDirectory', {
            headers: {
                Authorization: `Bearer ${accessToken}`,  // Pass the access token
                'Finch-API-Version': '2020-09-17',  // Add the Finch API version header
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching employee directory:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to call the backend to get individual employee details
export const getEmployeeDetails = async (accessToken, employeeId) => {
    try {
        const response = await axios.get(`http://localhost:3000/getEmployeeDetails/${employeeId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,  // Pass the access token
                'Finch-API-Version': '2020-09-17',  // Add the Finch API version header
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching employee details:', error.response ? error.response.data : error.message);
        throw error;
    }
};