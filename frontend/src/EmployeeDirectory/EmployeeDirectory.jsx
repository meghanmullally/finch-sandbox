import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EmployeeDirectory = ({ employees, onEmployeeClick }) => {
    // Log the employees to verify the data
    console.log("Employee Directory");
    console.log('Employees:', employees);

    return (
        <div>
            {employees.map((employee) => (
                <Accordion key={employee.id}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{employee.first_name} {employee.last_name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>Department: {employee.department.name}</Typography>
                        <Typography>Status: {employee.is_active ? 'Active' : 'Inactive'}</Typography>

                        {/* Display manager information if available */}
                        {employee.manager ? (
                            <Typography>
                                Reports To: {employee.manager.first_name} {employee.manager.last_name}
                            </Typography>
                        ) : (
                            <Typography>Reports To: No manager assigned</Typography>
                        )}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onEmployeeClick(employee.id)}
                        >
                            View Details
                        </Button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default EmployeeDirectory;