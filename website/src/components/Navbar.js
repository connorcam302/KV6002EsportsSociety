import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import { Grid } from '@mui/material';
import { Divider } from '@mui/material';




export default function ButtonAppBar() {
    let navigate = useNavigate();

    const toEvents = () =>{ 
        let path = `events`; 
        navigate(path);
    }

    const toLogin = () =>{ 
        let path = `login`; 
        navigate(path);
    }

    const toResults = () =>{ 
        let path = `results`; 
        navigate(path);
    }

    const toTeams = () =>{ 
        let path = `teams`; 
        navigate(path);
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
            <Box container spacing={2} alignItems="center" sx={{display: 'flex',flexDirection: 'row', paddingRight:2}}>
                    <Typography sx={{fontSize:24, paddingLeft:2,paddingRight:2}}>
                        NORTHUMBRIA VIKINGS
                    </Typography>
                    <Button
                        key="home"
                        onClick={() => toEvents()}
                        sx={{color: 'white', display: 'block'}}
                    >
                    Weekly Events
                    </Button>
                    <Button
                        key="home"
                        onClick={() => toResults()}
                        sx={{color: 'white', display: 'block', height:"100%"}}
                    >
                    Results
                    </Button>
                    <Button
                        key="home"
                        onClick={() => toTeams()}
                        sx={{color: 'white', display: 'block'}}
                    >
                    Teams
                    </Button>
                    <Button
                        key="home"
                        onClick={() => toLogin()}
                        sx={{color: 'white', display: 'block', marginLeft: "auto"}}
                    >
                    Login
                    </Button>
                </Box>
      </AppBar>
    </Box>
  );
}