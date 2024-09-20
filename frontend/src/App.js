import React, { useState } from "react";
import axios from 'axios';
import { getAccessToken, getCompanyInfo, getEmployeeDirectory } from "./services/api";
import { Button, MenuItem, Select, FormControl, InputLabel, Typography, Box, CircularProgress, Alert } from "@mui/material";
import CompanyInfoCard from "./CompanyInfoCard/CompanyInfoCard";
import EmployeeDirectory from "./EmployeeDirectory/EmployeeDirectory";
import Employee from './Employee/Employee';
import { handleApiError } from "./utils";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [employeeDirectory, setEmployeeDirectory] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState(null); // Store employee details
  const [employeeEmployment, setEmployeeEmployment] = useState(null);
  const [provider, setProvider] = useState(""); // Store selected provider
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  // List of providers for the dropdown
  const providers = [
    { id: "gusto", name: "Gusto" },
    { id: "paychex_flex", name: "Paychex Flex" },
    { id: "workday", name: "Workday" },
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
      setError(handleApiError(err));
    } finally {
      // Set loading to false after fetching completes
      setLoading(false);
    }
  };

  // Fetch employee directory
  const handleGetEmployeeDirectory = async () => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      const directory = await getEmployeeDirectory(accessToken);
      setEmployeeDirectory(directory.individuals);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  // Fetch employee details and employment data
  const handleEmployeeClick = async (employeeId) => {
    if (!accessToken) return;

    // Set loading to true when fetching starts
    setLoading(true);
    setError(null);

    try {
      // testing which employee data I am fetching when clicking on "View Details"
      console.log("Fetching employee details for ID:", employeeId);

      // Post request to fetch employee details
      const details = await axios.post(
        "http://localhost:3000/getEmployeeDetails",
        {
          employeeId, // Send the employeeId in the body
        }
      );
      // Store the fetched employee details
      setEmployeeDetails(details.data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      // Set loading to false after fetching completes
      setLoading(false);
    }

    // Fetch employment data
    try {
      // Post request to fetch employee employment
      const employments = await axios.post(
        "http://localhost:3000/getEmployeeEmployment",
        {
          employeeId, // Send the employeeId in the body
        }
      );

      // Log employment response
      console.log("Employment Data Response:", employments);

      // Store the fetched employment data
      setEmployeeEmployment(employments.data);
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      // Set loading to false after fetching completes
      setLoading(false);
    }
  };

  // attempt to fetch restricted endpoint
  const handleRestrictedEndpoint = async () => {
    if (!accessToken) return;

    // Set loading to true
    setLoading(true);
    setError(null)

    try {
      // Attempt to access the /payment endpoint
      const response = await axios.get('http://localhost:3000/payment', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Finch-API-Version': '2020-09-17',
          'Content-Type': 'application/json',
        }
      });
    } catch (err) {
      // Handle the error and display a custom error message
      setError("Access denied: This endpoint is restricted. Please contact the provider for further assistance.");
      console.error("Error accessing restricted endpoint:", err);
    } finally {
      setLoading(false);
    }
  };

  // attempt to fetch restricted endpoint: /pay-statement
  const handlePayStatementEndpoint = async () => {
    if (!accessToken) return;

    // Set loading to true
    setLoading(true);
    setError(null)

    try {
      // Attempt to access the /pay-statement endpoint
      const response = await axios.get('http://localhost:3000/pay-statement', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Finch-API-Version': '2020-09-17',
          'Content-Type': 'application/json',
        }
      });
    } catch (err) {
      // Handle the error and display a custom error message
      setError("Access denied: This endpoint is restricted. Please contact the provider for further assistance.");
      console.error("Error accessing restricted endpoint:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Finch API Integration
      </Typography>

      {/* Display error message */}
      {error && (
        <Alert severity="error" sx={{ marginBottom: "20px" }}>
          {error}
        </Alert>
      )}

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
        disabled={!provider || loading} // Disable button while loading
        sx={{ margin: "12px" }}
      >
        Get Access Token for {provider || "selected provider"}
      </Button>

      {/* Button to fetch Restricted Endpoint: payment */}
      <Button
        variant="contained"
        color="error"
        onClick={handleRestrictedEndpoint}
        disabled={!accessToken || loading}  // Disable if there's no access token
        sx={{ margin: "12px" }}
      >
        Try Restricted Endpoint (/payment)
      </Button>

      <Button
        variant="contained"
        color="error"
        onClick={handlePayStatementEndpoint}
        disabled={!accessToken || loading}  // Disable if there's no access token
        sx={{ margin: "12px" }}
      >
        Try Restricted Endpoint (/pay-statement)
      </Button>

      {/* Button to get employee directory */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGetEmployeeDirectory}
        disabled={!accessToken || loading}
        sx={{ margin: "12px" }}
      >
        Get Employee Directory
      </Button>

      {/* Show loading spinner while data is being fetched */}
      {loading && (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      )}

      {/* Render Company Info Card when companyInfo is available */}
      {companyInfo && <CompanyInfoCard companyInfo={companyInfo} />}

      {/* Render Employee Directory */}
      {employeeDirectory.length > 0 && (
        <EmployeeDirectory
          employees={employeeDirectory}
          onEmployeeClick={handleEmployeeClick}
        />
      )}

      {/* Display Employee Details & Employment Card */}
      {employeeDetails && employeeEmployment && (
        <Employee employee={employeeDetails} employment={employeeEmployment} />
      )}
    </Box>
  );
}

export default App;