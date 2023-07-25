# Technical Test for White Swan Data

## Brief
Create a React app that allows users view fixtures, and display odds for available bookmakers. 

## Requirements
- Implement user authentication and authorization features to restrict access to odds information.
- Display a list of all available fixtures in a user-friendly format.
- If no odds exist for a bookmaker, do not display the bookmaker.
- When a user clicks on a fixture, navigate them to a detail screen that displays the odds for available bookmakers, defaulting to the most recent odds for each bookmaker.
- Allow the user filter the view to see what the odds were for each bookmaker at a particular point in time. E.g. what were the odds at 3pm yesterday, etc.
- Implement pagination or infinite scrolling for the fixtures list if the number of events is extensive.
- So the user knows how fresh the odds are, allow the user to see timestamp for each of the odds displayed without crowding the view.
- Implement server-side rendering (SSR) or static site generation (SSG) for improved performance.
- Design and style the app to provide a visually appealing and intuitive user interface.
- Add filtering and sorting options for the fixtures and odds.
- Implement proper error handling.

- Allow the user to view the odds for different markets. -- Need Clarification 

### Folder Structure

- components //Shared components
- context //Shared context
- data //Data files
- features //Feature components
- pages //Pages within the application
- layouts //Base layout templates
- utils //Utilities for the application

### Authentication and authorisation
login details: 
- user/user
- manager/manager
