import React, { useState } from 'react';
import { getAccessToken, getCompanyInfo, getEmployeeDirectory, getEmployeeDetails } from './services/api';

// Import MUI components
import { Button, MenuItem, Select, FormControl, InputLabel, Typography, Box, CircularProgress } from '@mui/material';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [employeeDirectory, setEmployeeDirectory] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [provider, setProvider] = useState('');  // Store selected provider
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Add loading state

  // List of providers for the dropdown
  const providers = [
    { id: 'gusto', name: 'Gusto' },
    { id: 'bamboohr', name: 'BambooHR' },
    { id: 'justworks', name: 'Justworks' },
    { id: 'paychex_flex', name: 'Paychex Flex' },
    { id: 'workday', name: 'Workday' },
  ];

  // Function to get access token
  const handleGetAccessToken = async () => {
    if (!provider) {
      setError('Please select a provider');
      return;
    }

    setLoading(true);  // Set loading to true when fetching starts
    setError(null);  // Clear any previous error

    try {
      const token = await getAccessToken(provider);  // Fetch access token for selected provider
      setAccessToken(token);

      // Fetch company info after getting the token
      const company = await getCompanyInfo(token);
      setCompanyInfo(company);
    } catch (err) {
      setError('Error fetching access token or company info');
      console.error(err);
    } finally {
      setLoading(false);  // Set loading to false after fetching completes
    }
  };

  // Fetch employee directory
  const handleGetEmployeeDirectory = async () => {
    if (!accessToken) return;

    setLoading(true);  // Show loading spinner during fetch
    try {
      const directory = await getEmployeeDirectory(accessToken);
      setEmployeeDirectory(directory);
    } catch (err) {
      setError('Error fetching employee directory');
      console.error(err);
    } finally {
      setLoading(false);  // Hide spinner when done
    }
  };

  // Fetch individual employee details
  const handleEmployeeSelect = async (employeeId) => {
    if (!accessToken) return;

    setLoading(true);  // Show loading spinner during fetch
    try {
      const details = await getEmployeeDetails(accessToken, employeeId);
      setSelectedEmployee(employeeId);
      setEmployeeDetails(details);
    } catch (err) {
      setError('Error fetching employee details');
      console.error(err);
    } finally {
      setLoading(false);  // Hide spinner when done
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Finch API Integration</Typography>

      {/* Dropdown to select a provider */}
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '20px' }}>
        <InputLabel id="provider-label">Select Provider</InputLabel>
        <Select
          labelId="provider-label"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          label="Select Provider"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          {providers.map((prov) => (
            <MenuItem key={prov.id} value={prov.id}>
              {prov.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Button to fetch access token */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetAccessToken}
        disabled={!provider || loading}  // Disable button while loading
        sx={{ marginBottom: '20px' }}
      >
        Get Access Token for {provider || 'selected provider'}
      </Button>

      {/* Show loading spinner while data is being fetched */}
      {loading && <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />}

      {companyInfo && (
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h6">Company Info</Typography>
          <Typography>Company Name: {companyInfo.name}</Typography>
          <Typography>Company ID: {companyInfo.id}</Typography>
        </Box>
      )}

      {/* Button to fetch employee directory */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGetEmployeeDirectory}
        disabled={!accessToken || loading}  // Disable button while loading
        sx={{ marginBottom: '20px' }}
      >
        Get Employee Directory
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {/* Display Employee Directory */}
      {employeeDirectory.length > 0 && (
        <Box>
          <Typography variant="h6" gutterBottom>Employee Directory</Typography>
          {employeeDirectory.map(employee => (
            <Box key={employee.id} sx={{ marginBottom: '10px' }}>
              <Typography>{employee.first_name} {employee.last_name}</Typography>
              <Button
                variant="outlined"
                onClick={() => handleEmployeeSelect(employee.id)}
                disabled={loading}  // Disable button while loading
              >
                View Details
              </Button>
            </Box>
          ))}
        </Box>
      )}

      {/* Display Selected Employee's Details */}
      {employeeDetails && (
        <Box>
          <Typography variant="h6">Employee Details</Typography>
          <Typography>Name: {employeeDetails.first_name} {employeeDetails.last_name}</Typography>
          <Typography>Email: {employeeDetails.email}</Typography>
          <Typography>Title: {employeeDetails.title}</Typography>
          <Typography>Employment Status: {employeeDetails.employment.status}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default App;