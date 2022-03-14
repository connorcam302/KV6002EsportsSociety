import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import VikingProfile from './img/vikingclearback.png';

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
        <header className="App-header">
          <Box sx={{width:"px", backgroundColor:"secondary.main", paddingTop:2, paddingBottom:2}}>
                
          </Box>
          <Grid container alignItems="center" justifyContent="center" >

            <Grid item xs={12}>
              <Typography variant="h1" sx={{paddingBottom:2}}>
                Northumbria Vikings
              </Typography>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={8}>
              <Box>
                <img src={VikingProfile} width="100%" alt='Vikings Logo'/>
              </Box>
            </Grid>
            <Grid item xs={2}/>
            <Grid item xs={8}>
              <Box sx={{backgroundColor:"primary.main", paddingTop:2, paddingBottom:2}}>
                <Typography>
                  Box 1
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
            <Box sx={{backgroundColor:"secondary.main", paddingTop:2, paddingBottom:2}}>
                <Typography color="secondary.contrastText">
                  Box 2
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
            <Box sx={{backgroundColor:"primary.light", paddingTop:2, paddingBottom:2}}>
                <Typography color="secondary.contrastText">
                  Box 3
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
            <Box sx={{backgroundColor:"secondary.light", paddingTop:2, paddingBottom:2}}>
                <Typography color="secondary.contrastText">
                  Box 4
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;
