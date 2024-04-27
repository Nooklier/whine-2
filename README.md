# Authentication API Documentation

This documentation outlines the API endpoints involved in managing user authentication within a Flask application. It includes functionalities for checking user authentication, logging in, logging out, and signing up users.

## Endpoints

### Authenticate

- **Method:** `GET`
- **Endpoint:** `/`
- **Description:** Checks if a user is currently authenticated.
- **Responses:**
  - **200 OK:** Returns the authenticated user's data.
  - **401 Unauthorized:** Error response if no user is authenticated.

### Login

- **Method:** `POST`
- **Endpoint:** `/login`
- **Description:** Logs in a user using username and password.
- **Payload:**
  - `username`: String (required)
  - `password`: String (required)
- **Responses:**
  - **200 OK:** Returns the logged-in user's data.
  - **401 Unauthorized:** Error response if login fails.

### Logout

- **Method:** `GET`
- **Endpoint:** `/logout`
- **Description:** Logs out the current user.
- **Responses:**
  - **200 OK:** Success message indicating user has been logged out.

### Sign Up

- **Method:** `POST`
- **Endpoint:** `/signup`
- **Description:** Registers a new user.
- **Payload:**
  - `first_name`: String (required)
  - `last_name`: String (required)
  - `username`: String (required)
  - `password`: String (required)
- **Responses:**
  - **200 OK:** Returns the newly registered user's data.
  - **401 Unauthorized:** Error response if signup fails.

### Unauthorized

- **Method:** `GET`
- **Endpoint:** `/unauthorized`
- **Description:** Provides an error response when a user is unauthorized.
- **Responses:**
  - **401 Unauthorized:** Error message indicating the user is unauthorized.

# Users API Documentation

This documentation describes the API endpoints related to user management in a Flask application, including retrieving all users, fetching a specific user by ID, updating user details, and deleting users.

## Endpoints

### Get All Users

- **Method:** `GET`
- **Endpoint:** `/`
- **Description:** Retrieves all users from the database.
- **Authorization:** Login required.
- **Responses:**
  - **200 OK:** Returns a list of all users.

### Get User by ID

- **Method:** `GET`
- **Endpoint:** `/<int:id>`
- **Description:** Fetches a specific user by their unique ID.
- **Authorization:** Login required.
- **Responses:**
  - **200 OK:** Returns the user's data if found.
  - **404 Not Found:** Error response if no user is found.

### Update Current User

- **Method:** `PUT`
- **Endpoint:** `/update`
- **Description:** Updates the currently logged-in user's information.
- **Payload:**
  - `first_name`: String (optional)
  - `last_name`: String (optional)
  - `username`: String (optional)
  - `password`: String (optional)
- **Responses:**
  - **200 OK:** Returns the updated user's data.
  - **401 Unauthorized:** Error response if the user is not logged in.

### Update User by ID

- **Method:** `PUT`
- **Endpoint:** `/update/<int:user_id>`
- **Description:** Updates a specific user's details by ID. Restricted to users with Manager role.
- **Authorization:** Manager role required.
- **Payload:**
  - `first_name`: String (optional)
  - `last_name`: String (optional)
  - `username`: String (optional)
  - `password`: String (optional)
- **Responses:**
  - **200 OK:** Returns the updated user's data.
  - **403 Forbidden:** Error response if the user does not have permission.
  - **404 Not Found:** Error response if no user is found.

### Delete User by ID

- **Method:** `DELETE`
- **Endpoint:** `/delete/<int:user_id>`
- **Description:** Deletes a user by their ID. Restricted to users with Manager role.
- **Authorization:** Manager role required.
- **Responses:**
  - **200 OK:** Success message indicating user was deleted successfully.
  - **403 Forbidden:** Error response if the user does not have permission.
  - **404 Not Found:** Error response if no user is found.

# PTO API Documentation

This documentation outlines the API endpoints related to managing Paid Time Off (PTO) in a Flask application. It covers retrieving PTO records, updating, and deleting PTO entries.

## Endpoints

### Get Current User's PTO

- **Method:** `GET`
- **Endpoint:** `/current`
- **Description:** Retrieves all PTO records for the currently logged-in user.
- **Authorization:** Login required.
- **Responses:**
  - **200 OK:** Returns a list of PTO records.
  - **404 Not Found:** Error response if no PTO records are found.

### View All PTO

- **Method:** `GET`
- **Endpoint:** `/all`
- **Description:** Fetches all PTO records across all users. Restricted to users with Manager role.
- **Authorization:** Manager role required.
- **Responses:**
  - **200 OK:** Returns a detailed list of all PTO records with user details.
  - **403 Forbidden:** Error response if the user does not have permission.
  - **404 Not Found:** Error response if no PTO records are found.

### Update PTO by User ID

- **Method:** `PUT`
- **Endpoint:** `/update/<int:pto_id>`
- **Description:** Updates the PTO entry for a specific user by PTO ID. Restricted to users with Manager role.
- **Authorization:** Manager role required.
- **Payload:**
  - `total_hours`: Integer (optional)
  - `used_hours`: Integer (optional)
- **Responses:**
  - **200 OK:** Returns the updated PTO record's data.
  - **400 Bad Request:** Error response if the input data is invalid.
  - **403 Forbidden:** Error response if the user does not have permission.
  - **404 Not Found:** Error response if no PTO record is found.

### Delete PTO

- **Method:** `DELETE`
- **Endpoint:** `/delete/<int:pto_id>`
- **Description:** Deletes a PTO record by its ID. Restricted to users with Manager role.
- **Authorization:** Manager role required.
- **Responses:**
  - **200 OK:** Success message indicating the PTO record was deleted successfully.
  - **403 Forbidden:** Error response if the user does not have permission.
  - **404 Not Found:** Error response if no PTO record is found.
 

# Time Off API Documentation

This documentation outlines the API endpoints related to managing Time Off Requests within a Flask application. It includes functionalities for creating, retrieving, updating, and deleting time off requests.

## Endpoints

### Create Time Off Request

- **Method:** `POST`
- **Endpoint:** `/create`
- **Description:** Creates a new time off request for the current user.
- **Payload:**
  - `start_date`: Date (required, format: YYYY-MM-DD)
  - `end_date`: Date (required, format: YYYY-MM-DD)
  - `pto_use`: Integer (optional, defaults to 0)
- **Authorization:** Login required.
- **Responses:**
  - **201 Created:** Returns the newly created time off request's data.
  - **400 Bad Request:** Error response if required fields are missing or the data is invalid.

### Get Time Off Requests for Current User

- **Method:** `GET`
- **Endpoint:** `/current`
- **Description:** Retrieves all time off requests made by the currently logged-in user.
- **Authorization:** Login required.
- **Responses:**
  - **200 OK:** Returns a list of time off requests.
  
### Get All Time Off Requests

- **Method:** `GET`
- **Endpoint:** `/all`
- **Description:** Fetches all time off requests across all users. Restricted to users with Manager role.
- **Authorization:** Manager role required.
- **Responses:**
  - **200 OK:** Returns a detailed list of all time off requests with user details.
  - **403 Forbidden:** Error response if the user does not have permission.
  - **404 Not Found:** Error response if no time off requests are found.

### Update Time Off Request

- **Method:** `PUT`
- **Endpoint:** `/update/<int:request_id>`
- **Description:** Updates an existing time off request. Allowed for the request owner or a manager.
- **Payload:**
  - `start_date`: Date (optional, format: YYYY-MM-DD)
  - `end_date`: Date (optional, format: YYYY-MM-DD)
  - `pto_use`: Integer (optional)
- **Authorization:** The owner of the request or a manager.
- **Responses:**
  - **200 OK:** Returns the updated time off request's data.
  - **400 Bad Request:** Error response if the input data is invalid.
  - **403 Forbidden:** Error response if the user does not have permission.
  - **404 Not Found:** Error response if no time off request is found.

### Delete Time Off Request

- **Method:** `DELETE`
- **Endpoint:** `/delete/<int:request_id>`
- **Description:** Deletes a time off request. Allowed for the request owner or a manager.
- **Authorization:** The owner of the request or a manager.
- **Responses:**
  - **200 OK:** Success message indicating the time off request was deleted successfully.
  - **403 Forbidden:** Error response if the user does not have permission.
  - **404 Not Found:** Error response if no time off request is found.

