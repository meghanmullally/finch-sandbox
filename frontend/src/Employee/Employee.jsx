import React from 'react';
import { Box, Divider } from '@mui/material';
import './employee.css';

const Employee = ({ employee, employment }) => {
    return (
        <Box className="employee-container">
            {/* Job Info */}
            <h2>Employee Profile: {employee.first_name} {employee.last_name}</h2>
            <Divider className="job-title-divider" />

            <Box className="section">
                {/* Personal Info Section */}
                <h6 className="section-title">Personal Info</h6>
                <p><strong>First Name:</strong> {employee.first_name}</p>
                {employee.middle_name && <p><strong>Middle Name:</strong> {employee.middle_name}</p>}
                <p><strong>Last Name:</strong> {employee.last_name}</p>
                <p><strong>Date of Birth:</strong> {employee.dob}</p>
                <p><strong>Emails:</strong></p>
                {employee.emails?.length > 0 ? (
                    employee.emails.map((email, index) => (
                        <p key={index}>&bull; {email.data} ({email.type})</p>
                        ))
                        ) : (
                            <p>No emails available</p>
                            )}
                <p><strong>Phone Numbers:</strong></p>
                {employee.phone_numbers?.length > 0 ? (
                    employee.phone_numbers.map((phone, index) => (
                        <p key={index}>&bull; {phone.data} ({phone.type})</p>
                        ))
                        ) : (
                            <p>No phone numbers available</p>
                            )}
                <p><strong>Address:</strong></p>
                {employee.residence ? (
                    <p>
                        {employee.residence.line1}, {employee.residence.line2},
                        {employee.residence.city}, {employee.residence.state},
                        {employee.residence.postal_code}, {employee.residence.country}
                    </p>
                ) : (
                    <p>No address available</p>
                    )}
            </Box>

            {/* Employment Info */}
            <Box className="section">
                <h6 className="section-title">Employment Info</h6>
                <p><strong>Job Title:</strong> {employment.title}</p>
                <p><strong>Start Date:</strong> {employment.start_date}</p>
                <p><strong>End Date:</strong> {employment.end_date || 'YYYY-MM-DD'}</p>
                <p><strong>Employment Type:</strong> {employment.employment?.type || 'Not available'}</p>
                <p><strong>Employment Subtype:</strong> {employment.employment?.subtype || 'Not available'}</p>

                <p><strong>Manager Info:</strong></p>
                {employment.manager ? (
                    <p>Manager ID: {employment.manager.id}</p>
                ) : (
                    <p>No manager assigned</p>
                )}
            </Box>

            {/* Income Info */}
            <Box className="section">
                <h6 className="section-title">Income History</h6>
                <p><strong>Latest Income:</strong> {employment.income?.amount || 'N/A'} {employment.income?.currency || ''} ({employment.income?.unit || ''})</p>
                <p><strong>Income History:</strong></p>
                {employment.income_history?.length > 0 ? (
                    employment.income_history.map((income, index) => (
                        <p key={index}>&bull; {income.amount} {income.currency} (effective date: {income.effective_date})</p>
                    ))
                ) : (
                    <p>No income history available</p>
                )}
            </Box>

            {/* Custom Fields */}
            <Box className="section">
                <h6 className="section-title">Custom Fields</h6>
                {employment.custom_fields?.length > 0 ? (
                    employment.custom_fields.map((field, index) => (
                        <p key={index} className="custom-field">{field.name}: {field.value.toString()}</p>
                    ))
                ) : (
                    <p>No custom fields available</p>
                )}
            </Box>
        </Box>
    );
};

export default Employee;