import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import './employee.css';  // Import the CSS file

const Employee = ({ employee, employment }) => {
    return (
        <Box className="employee-container">
            {/* Job Info */}
            <Typography variant="h5" gutterBottom>Job Title: {employment.title}</Typography>
            <Divider className="job-title-divider" />

            <Box className="section">
                {/* Personal Info Section */}
                <Typography className="section-title">Personal Info</Typography>
                <Typography><strong>First Name:</strong> {employee.first_name}</Typography>
                {employee.middle_name && <Typography><strong>Middle Name:</strong> {employee.middle_name}</Typography>}
                <Typography><strong>Last Name:</strong> {employee.last_name}</Typography>
                <Typography><strong>Date of Birth:</strong> {employee.dob}</Typography>
                <Typography><strong>Emails:</strong></Typography>
                {employee.emails.map((email, index) => (
                    <Typography key={index}>&bull; {email.data} ({email.type})</Typography>
                ))}
                <Typography><strong>Phone Numbers:</strong></Typography>
                {employee.phone_numbers.map((phone, index) => (
                    <Typography key={index}>&bull; {phone.data} ({phone.type})</Typography>
                ))}
                <Typography><strong>Address:</strong></Typography>
                <Typography>
                    {employee.residence.line1}, {employee.residence.line2},
                    {employee.residence.city}, {employee.residence.state},
                    {employee.residence.postal_code}, {employee.residence.country}
                </Typography>
            </Box>

            {/* Employment Info */}
            <Box className="section">
                <Typography className="section-title">Employment Info</Typography>
                <Typography><strong>Start Date:</strong> {employment.start_date}</Typography>
                <Typography><strong>End Date:</strong> {employment.end_date || 'Currently Employed'}</Typography>
                <Typography><strong>Employment Type:</strong> {employment.employment.type}</Typography>
                <Typography><strong>Employment Subtype:</strong> {employment.employment.subtype}</Typography>

                <Typography><strong>Manager Info:</strong></Typography>
                {employment.manager ? (
                    <Typography>Manager ID: {employment.manager.id}</Typography>
                ) : (
                    <Typography>No manager assigned</Typography>
                )}
            </Box>

            {/* Income Info */}
            <Box className="section">
                <Typography className="section-title">Income History</Typography>
                <Typography><strong>Latest Income:</strong> {employment.income.amount} {employment.income.currency} ({employment.income.unit})</Typography>
                <Typography><strong>Income History:</strong></Typography>
                {employment.income_history.map((income, index) => (
                    <Typography key={index}>&bull; {income.amount} {income.currency} (effective date: {income.effective_date})</Typography>
                ))}
            </Box>

            {/* Custom Fields */}
            <Box className="section">
                <Typography className="section-title">Custom Fields</Typography>
                {employment.custom_fields.length > 0 ? (
                    employment.custom_fields.map((field, index) => (
                        <Typography key={index} className="custom-field">{field.name}: {field.value.toString()}</Typography>
                    ))
                ) : (
                    <Typography>No custom fields</Typography>
                )}
            </Box>
        </Box>
    );
};

export default Employee;