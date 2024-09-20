import React from "react";
import { Card, CardContent, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import './CompanyInfoCard.css';

function CompanyInfoCard({ companyInfo }) {
    return (
        <Card variant="outlined" className="company-card">
            <CardContent className="company-content">
                <Grid container spacing={2}>
                    {/* Company Info Column */}
                    <Grid item xs={12} sm={6}>
                        <h2 className="company-info-title">Company Info</h2>
                        <p className="company-field">
                            <strong>Company Name:</strong> {companyInfo.legal_name}
                        </p>
                        <p className="company-field">
                            <strong>ID:</strong> {companyInfo.id}
                        </p>
                        <p className="company-field">
                            <strong>Email:</strong> {companyInfo.primary_email}
                        </p>
                        <p className="company-field">
                            <strong>Phone:</strong> {companyInfo.primary_phone_number}
                        </p>
                    </Grid>

                    {/* Location Column */}
                    <Grid item xs={12} sm={6}>
                        <h3 className="company-subtitle">Location</h3>
                        <p className="company-field">
                            {companyInfo.locations[0].line1},{" "}
                            {companyInfo.locations[0].line2 && companyInfo.locations[0].line2 + ", "}
                            {companyInfo.locations[0].city}, {companyInfo.locations[0].state},{" "}
                            {companyInfo.locations[0].country}
                        </p>
                    </Grid>
                </Grid>

                {/* Departments Section */}
                {companyInfo.departments && companyInfo.departments.length > 0 && (
                    <Box className="company-departments" sx={{ marginTop: "16px" }}>
                        <h3 className="company-subtitle">Departments</h3>
                        <ul className="department-list">
                            {companyInfo.departments.map((dept, index) => (
                                <li key={index} className="company-field">{dept.name}</li>
                            ))}
                        </ul>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

export default CompanyInfoCard;