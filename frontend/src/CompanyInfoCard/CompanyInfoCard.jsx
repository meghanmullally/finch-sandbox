import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import './CompanyInfoCard.css';

function CompanyInfoCard({ companyInfo }) {
    return (
        <Card variant="outlined" className="company-card">
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Company Info
                </Typography>

                {/* Display company legal name */}
                <Typography variant="body1" color="textPrimary">
                    <strong>Legal Name:</strong> {companyInfo.legal_name}
                </Typography>

                {/* Display company ID */}
                <Typography variant="body1" color="textSecondary">
                    <strong>ID:</strong> {companyInfo.id}
                </Typography>

                {/* Display primary email */}
                <Typography variant="body1" color="textPrimary">
                    <strong>Email:</strong> {companyInfo.primary_email}
                </Typography>

                {/* Display primary phone number */}
                <Typography variant="body1" color="textPrimary">
                    <strong>Phone:</strong> {companyInfo.primary_phone_number}
                </Typography>

                {/* Display entity type and subtype */}
                {companyInfo.entity && (
                    <Typography variant="body1" color="textPrimary">
                        <strong>Entity Type:</strong> {companyInfo.entity.type} (
                        {companyInfo.entity.subtype})
                    </Typography>
                )}

                {/* Display company location */}
                {companyInfo.locations && companyInfo.locations.length > 0 && (
                    <Box className="company-location">
                        <Typography variant="h6" gutterBottom>
                            Location
                        </Typography>
                        <Typography variant="body1" color="textPrimary">
                            {companyInfo.locations[0].line1},{" "}
                            {companyInfo.locations[0].line2 &&
                                companyInfo.locations[0].line2 + ","}
                            {companyInfo.locations[0].city}, {companyInfo.locations[0].state},{" "}
                            {companyInfo.locations[0].country}
                        </Typography>
                    </Box>
                )}

                {/* Display routing number */}
                {companyInfo.accounts && companyInfo.accounts.length > 0 && (
                    <Typography variant="body1" color="textPrimary">
                        <strong>Routing Number:</strong>{" "}
                        {companyInfo.accounts[0].routing_number}
                    </Typography>
                )}

                {/* Display departments */}
                {companyInfo.departments && companyInfo.departments.length > 0 && (
                    <Box className="company-departments">
                        <Typography variant="h6" gutterBottom>
                            Departments
                        </Typography>
                        {companyInfo.departments.map((dept, index) => (
                            <Typography key={index} variant="body2" color="textPrimary">
                                <li>{dept.name}</li>
                            </Typography>
                        ))}
                    </Box>
                )}
            </CardContent>
        </Card>
    );
}

export default CompanyInfoCard;