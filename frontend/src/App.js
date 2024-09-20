import React, { useState } from "react";
import axios from 'axios';
import { getAccessToken, getCompanyInfo, getEmployeeDirectory } from "./services/api";
import { Button, MenuItem, Select, FormControl, InputLabel, Typography, Box, CircularProgress, Alert } from "@mui/material";
import CompanyInfoCard from "./CompanyInfoCard/CompanyInfoCard";
import EmployeeDirectory from "./EmployeeDirectory/EmployeeDirectory";
import Employee from './Employee/Employee';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [employeeDirectory, setEmployeeDirectory] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null);  // Store employee details
  const [employeeEmployment, setEmployeeEmployment] = useState(null);
  const [provider, setProvider] = useState("");  // Store selected provider
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Add loading state

  // List of providers for the dropdown
  const providers = [
    { id: "gusto", name: "Gusto" },
    { id: "paychex_flex", name: "Paychex Flex" },
    { id: "workday", name: "Workday" },
    // kept in to show example of custom error message
    {id: "justworks", name: "JustWorks"}
  ];

  // Function to get access token
  const handleGetAccessToken = async () => {
    if (!provider) {
      setError("Please select a provider");
      return;
    }

    // Set loading to true when fetching starts
    setLoading(true);
    
    // Clear any previous error
    setError(null);

    try {
      // Log provider
      console.log("Fetching access token for provider:", provider);
  
      // Fetch access token for selected provider
      const token = await getAccessToken(provider);
  
      // Store access token
      setAccessToken(token);
  
      // Log access token
      console.log("Access Token:", token);
  
      // Fetch company info after getting the token
      const company = await getCompanyInfo(token);
  
      // Store company info
      setCompanyInfo(company);
  
      // Log company info
      console.log("Company Info:", company);
    } catch (err) {
      // Handle error with detailed status code and message
      let errorMessage = "Error fetching access token or company info";
      if (err.response) {
        // Check the status code and customize the message
        switch (err.response.status) {
          case 400:
            errorMessage = `Bad request: The provider ${provider} may not support this authentication method.`;
            break;
          case 401:
            errorMessage = "Unauthorized: Please check your credentials.";
            break;
          case 404:
            errorMessage = "Not found: The requested resource is not available.";
            break;
          case 500:
            errorMessage = "Server error: The server encountered an internal error. Please try again later.";
            break;
          default:
            errorMessage = `Unexpected error: ${err.response.status}`;
        }
      }
      setError(errorMessage);
      console.error("Error in handleGetAccessToken:", err);
    } finally {
      // Set loading to false after fetching completes
      setLoading(false);
    }
  };

  // Fetch employee directory
  const handleGetEmployeeDirectory = async () => {
    if (!accessToken) return;

    // Set loading to true when fetching starts
    setLoading(true);

    try {
      // Log when fetching starts
      console.log('Fetching employee directory...');
      
      // Fetch employee directory
      const directory = await getEmployeeDirectory(accessToken);
      
      // Store the employee directory
      setEmployeeDirectory(directory.individuals);
      
      // Log employee directory
      console.log('Employee Directory:', directory.individuals);
    } catch (err) {
      // Handle error with detailed status code
      let errorMessage = "Error fetching employee directory";
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = "Bad request: There was an issue with your request.";
            break;
          case 500:
            errorMessage = "Server error: The server encountered an error. Please try again later.";
            break;
          default:
            errorMessage = `Unexpected error: ${err.response.status}`;
        }
      }
      setError(errorMessage);
      console.error('Error in handleGetEmployeeDirectory:', err);
    } finally {
      // Set loading to false after fetching completes
      setLoading(false);
    }
  };

  // Fetch employee details and employment data
  const handleEmployeeClick = async (employeeId) => {
    if (!accessToken) return;

    // Set loading to true when fetching starts
    setLoading(true);

    try {
      // Log employee ID
      console.log('Fetching employee details for ID:', employeeId);
      
      // Post request to fetch employee details
      const details = await axios.post('http://localhost:3000/getEmployeeDetails', {
        employeeId  // Send the employeeId in the body
      });
      
      // Log response
      console.log('Employee Details Response:', details);
      
      // Store the fetched employee details
      setEmployeeDetails(details.data);
    } catch (err) {
      // Handle error with status code
      let errorMessage = "Error fetching employee details";
      if (err.response) {
        switch (err.response.status) {
          case 400:
            errorMessage = "Bad request: Invalid employee ID.";
            break;
          case 500:
            errorMessage = "Server error: Unable to fetch employee details. Please try again later.";
            break;
          default:
            errorMessage = `Unexpected error: ${err.response.status}`;
        }
      }
      setError(errorMessage);
      console.error('Error fetching employee details:', err);
    } finally {
      // Set loading to false after fetching completes
      setLoading(false);
    }

    // Fetch employment data
    try {
      // Log employee ID
      console.log('Fetching employee employment for ID:', employeeId);
      
      // Post request to fetch employee employment
      const employments = await axios.post('http://localhost:3000/getEmployeeEmployment', {
        employeeId  // Send the employeeId in the body
      });
      
      // Log employment response
      console.log("Employment Data Response:", employments);
      
      // Store the fetched employment data
      setEmployeeEmployment(employments.data);
    } catch (err) {
      // Handle error with status code
      let errorMessage = "Error fetching employee employment data";
      if (err.response) {
        switch (err.response.status) {
          case 500:
            errorMessage = "Server error: Unable to fetch employment data. Please try again later.";
            break;
          default:
            errorMessage = `Unexpected error: ${err.response.status}`;
        }
      }
      setError(errorMessage);
      console.error('Error fetching employee employment:', err);
    } finally {
      // Set loading to false after fetching completes
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Finch API Integration
      </Typography>

      {/* Display error message */}
      {error && <Alert severity="error" sx={{ marginBottom: "20px" }}>{error}</Alert>}

      {/* Dropdown to select a provider */}
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: "20px" }}>
        <InputLabel id="provider-label">Select Provider</InputLabel>
        <Select
          labelId="provider-label"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          label="Select Provider"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
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
        sx={{ margin: "12px" }}
      >
        Get Access Token for {provider || "selected provider"}
      </Button>

      {/* Show loading spinner while data is being fetched */}
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      )}

      {/* Render Company Info Card when companyInfo is available */}
      {companyInfo && <CompanyInfoCard companyInfo={companyInfo} />}

      {/* Button to get employee directory */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGetEmployeeDirectory}
        disabled={!accessToken || loading}
        sx={{ margin: '12px' }}
      >
        Get Employee Directory
      </Button>

      {/* Render Employee Directory */}
      {employeeDirectory.length > 0 && (
        <EmployeeDirectory employees={employeeDirectory} onEmployeeClick={handleEmployeeClick} />
      )}

      {/* Display Employee Details & Employment Card */}
      {employeeDetails && employeeEmployment && <Employee employee={employeeDetails} employment={employeeEmployment} />}
    </Box>
  );
}

export default App;