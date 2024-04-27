# Authentication API Documentation

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
