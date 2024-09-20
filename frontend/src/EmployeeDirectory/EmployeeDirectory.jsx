import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './employeeDirectory.css'; 

const EmployeeDirectory = ({ employees, onEmployeeClick }) => {
    // Log the employees to verify the data
    console.log("Employee Directory");
    console.log('Employees:', employees);

    return (
        <div className="employee-directory">
            {employees.map((employee) => (
                <Accordion key={employee.id} className="employee-accordion">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <h4 className="employee-name">{employee.first_name} {employee.last_name}</h4>
                    </AccordionSummary>
                    <hr/>
                    <AccordionDetails>
                        <p>
                            {employee.department ? (
                                <span>Department: {employee.department.name}</span>
                            ) : (
                                <span>No Department Assigned</span>
                            )}
                        </p>
                        
                        <p>Status: {employee.is_active ? 'Active' : 'Inactive'}</p>

                        {/* Display manager information if available */}
                        <p>
                            {employee.manager ? (
                                <span>Reports To ID: {employee.manager.id}</span>
                            ) : (
                                <span>Reports To: No manager assigned</span>
                            )}
                        </p>

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