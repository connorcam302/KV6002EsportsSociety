import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar.js';
import Homepage from './components/Homepage';
import LoginRegisterPage from './components/LoginRegisterPage';
import AdminPage from './components/AdminPage'
import ErrorPage from './components/ErrorPage'
import TeamPage from './components/TeamPage';
import Router from './components/Router'

/**
* App
* 
* Main class component for displaying content.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/


/**
* theme
* 
* Uses MUI to create a theme, this is used to give default styling to all MUI components 
* throughout the website.
*
*/


const theme = createTheme({
  palette: {
    primary: {
      main: "#170D05",
      light: "#84847C",
      contrastText: "#f7f7f7"
    },
    secondary: {
      main: "#D5761D",
      light: "#827C74",
      contrastText: "#1a1a1a"
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  
});


/**
* App()
* 
* Main function for displaying the website.
*/


function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <Router />
      </ThemeProvider>
    </div>
  );
}

export default App;
