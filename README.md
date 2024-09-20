# **Finch API Integration Project**

## **Table of Contents**
- [**Finch API Integration Project**](#finch-api-integration-project)
  - [**Table of Contents**](#table-of-contents)
  - [**Project Description**](#project-description)
  - [**Features**](#features)
  - [**Technologies Used**](#technologies-used)
  - [**Installation and Setup**](#installation-and-setup)
- [API Documentation](#api-documentation)
- [Handling Errors](#handling-errors)
- [Future Improvements](#future-improvements)

---

## **Project Description**

This project is a web application that integrates with Finch's Sandbox API to retrieve company and employee data from various providers. The application allows users to select a provider (Gusto, Paychex Flex, and Workday ), fetch access tokens, retrieve company information, view an employee directory, and access individual employee details. It is designed to provide clear error feedback and fallback messages for missing or incomplete data.

---

## **Features**

- **Provider Selection:** Choose from four providers (Gusto, Paychex Flex, and Workday ).
- **Access Token Retrieval:** Fetch an access token for the selected provider.
- **Company Info:** View company information such as legal name, phone number, and location.
- **Employee Directory:** Retrieve a list of employees with department, status, and reporting details.
- **Employee Details:** Click to view more detailed personal and employment information for each employee.
- **Error Handling:** Custom error messages for failed API calls or restricted endpoints.
- **Fallback Messages:** Default messages for missing fields such as "No manager assigned" or "No income history available."
- **Restricted Endpoints Handling:** Clear error messages for unauthorized access to restricted endpoints like `/payment` and `/pay-statement`.

---

## **Technologies Used**

- **React** (JavaScript library for building user interfaces)
- **Axios** (HTTP client for API requests)
- **Material-UI** (UI library for building responsive layouts)
- **Express.js** (Node.js framework for building the backend API)
- **Finch API Sandbox** (API used to retrieve company and employee data)

---

## **Installation and Setup**

1. **Clone the Repository**
```
git clone https://github.com/meghanmullally/finch-sandbox
```

2.	**Navigate to the project directory**
```
cd finch-sandbox
```

3. **Set up environment variables:**
You need to create an .env file in the root of the project with the following content:
```
CLIENT_ID=your_client_id_here
CLIENT_SECRET=your_client_secret_here
FINCH_API_URL=https://sandbox.tryfinch.com
PORT=3000
```
Replace your_client_id_here and your_client_secret_here with the actual values from Finch API.

4. **Run the Application:**
Once the dependencies are installed and environment variables are set, run the application using:

```
npm run dev
```

This command will run both the frontend and backend servers concurrently.

5. **Access the Application:**
Open your browser and go to http://localhost:3000 to access the Finch Sandbox Application.

# API Documentation

For more details on Finch’s API, refer to their official documentation:

- [Finch Sandbox API](https://sandbox.tryfinch.com/)
- [Finch Developer API Reference](https://developer.tryfinch.com/api-reference/organization/company)

# Handling Errors

- **Null fields**: The application handles null or missing fields by displaying fallback messages such as “No manager assigned” or “No income history available.”
  
- **Restricted endpoints**: If a restricted endpoint (such as `/payment` or `/pay-statement`) is accessed, the application will display a custom error message:  
  `"Access denied: This endpoint is restricted. Please contact the provider for further assistance."`

# Future Improvements

- **Enhance the user interface**: Improve the data visualization (e.g., filter the employee directory by department) to provide a better user experience.

- **Codebase cleanup**: Refactor the codebase to remove duplications and consider introducing state management solutions like Redux.

- **Error logging and monitoring**: Implement a more comprehensive error logging and monitoring system to better handle and troubleshoot errors in real time.
