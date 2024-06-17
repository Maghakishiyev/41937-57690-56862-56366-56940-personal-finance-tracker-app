### Explanation
Valtio Integration: Uses Valtio to create a reactive state management system.
Functions: setUser, setIsUserLoading, and setIsUserLoggedIn modify the state in a controlled manner.
Usage: Demonstrates how to interact with the state by setting user data and changing loading and logged-in states.
This setup provides a straightforward approach to managing user-related state in TypeScript applications, leveraging reactive capabilities provided by Valtio for predictable and efficient state updates.

### IUser

Defines the structure of a user object.
Fields:
_id: Unique identifier for the user (string).
email: User's email address (string).
firstName: User's first name (string).
lastName: User's last name (string).
userName: User's username (string).
birthday: User's birthday (string).
imageFile: File path or URL to the user's profile image (string).
### IUserState

Defines the overall state structure for user-related data.
Fields:
user: An instance of IUser representing the current user's data.
isUserLoading: Boolean flag indicating whether user data is currently being loaded (true) or not (false).
isUserLoggedIn: Boolean flag indicating whether the user is logged in (true) or not (false).

### UserState:

proxy<IUserState>: Creates a reactive proxy object using Valtio, initialized with default values.
user: Initial values for user data fields are set to empty strings ('').
isUserLoading: Initial value set to false indicating no ongoing user data loading.
isUserLoggedIn: Initial value set to false indicating the user is not logged in initially.

### setUser(user: IUser):

Updates the user field in UserState with the provided user object.
setIsUserLoading(loading: boolean):

Sets the isUserLoading flag in UserState to indicate whether user data is currently being loaded (true) or not (false).
### setIsUserLoggedIn(loggedIn: boolean):

Sets the isUserLoggedIn flag in UserState to indicate whether the user is logged in (true) or not (false).