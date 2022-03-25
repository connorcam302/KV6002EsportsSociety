import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar.js';
import AdminPage from './components/AdminPage'
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import ErrorPage from './components/ErrorPage'
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/">
              <Route index element={<RegisterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="login/register" element={<RegisterPage />} />
              <Route path="login/register/login" element={<LoginPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<ErrorPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
