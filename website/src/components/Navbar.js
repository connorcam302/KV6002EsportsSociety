import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import NavbarLogin from './NavbarLogin.js'
import jwt_decode from "jwt-decode";

export default function ButtonAppBar() {
    let navigate = useNavigate();

    const toEvents = () => {
        let path = `events`;
        navigate(path);
    }

    const toLogin = () => {
        let path = `login`;
        navigate(path);
    }

    const toResults = () => {
        let path = `results`;
        navigate(path);
    }

    const toTeams = () => {
        let path = `teams`;
        navigate(path);
    }

    const toAdmin = () => {
        let path = `admin`;
        navigate(path);
    }

    let authenticated = false;
    let admin = false;

    const logout = () => {
        authenticated = false;
        admin = false;
        localStorage.removeItem('UserLoginToken');
        window.location.reload(false);
    }

    if(localStorage.getItem("UserLoginToken")) {
        authenticated = true;
        let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
        if(decodedToken.user_isAdmin == 1) {
            admin = true;
        }
    }

    if(authenticated && admin) {
        console.log("User is admin.")
        return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Box container spacing={2} alignItems="center" sx={{ display: 'flex', flexDirection: 'row', paddingRight: 2 }}>
                <Typography sx={{ fontSize: 24, paddingLeft: 2, paddingRight: 2 }}>
                    NORTHUMBRIA VIKINGS
                </Typography>
                <Button
                    key="toEvents"
                    onClick={() => toEvents()}
                    sx={{ color: 'white', display: 'block' }}
                >
                    Weekly Events
                </Button>
                <Button
                    key="toResults"
                    onClick={() => toResults()}
                    sx={{ color: 'white', display: 'block', height: "100%" }}
                >
                    Results
                </Button>
                <Button
                    key="toTeams"
                    onClick={() => toTeams()}
                    sx={{ color: 'white', display: 'block' }}
                >
                    Teams
                </Button>
                <Button
                    key="toAdmin"
                    onClick={() => toAdmin()}
                    sx={{ color: 'white', display: 'block', marginLeft: "auto" }}
                >
                    Admin
                </Button>
                <Button
                    key="toLogin"
                    onClick={() => logout()}
                    sx={{ color: 'white', display: 'block', }}
                >
                    Logout
                </Button>
            </Box>
        </AppBar>
        </Box>
        )
    }

    if(authenticated && !admin) {
        console.log("User is not admin.")
        return(
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Box container spacing={2} alignItems="center" sx={{ display: 'flex', flexDirection: 'row', paddingRight: 2 }}>
                    <Typography sx={{ fontSize: 24, paddingLeft: 2, paddingRight: 2 }}>
                        NORTHUMBRIA VIKINGS
                    </Typography>
                    <Button
                        key="toEvents"
                        onClick={() => toEvents()}
                        sx={{ color: 'white', display: 'block' }}
                    >
                        Weekly Events
                    </Button>
                    <Button
                        key="toResults"
                        onClick={() => toResults()}
                        sx={{ color: 'white', display: 'block', height: "100%" }}
                    >
                        Results
                    </Button>
                    <Button
                        key="toTeams"
                        onClick={() => toTeams()}
                        sx={{ color: 'white', display: 'block' }}
                    >
                        Teams
                    </Button>
                    <Button
                        key="toLogin"
                        onClick={() => logout()}
                        sx={{ color: 'white', display: 'block', marginLeft: "auto" }}
                    >
                        Logout
                    </Button>
                </Box>
            </AppBar>
        </Box>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Box container spacing={2} alignItems="center" sx={{ display: 'flex', flexDirection: 'row', paddingRight: 2 }}>
                    <Typography sx={{ fontSize: 24, paddingLeft: 2, paddingRight: 2 }}>
                        NORTHUMBRIA VIKINGS
                    </Typography>
                    <Button
                        key="toEvents"
                        onClick={() => toEvents()}
                        sx={{ color: 'white', display: 'block' }}
                    >
                        Weekly Events
                    </Button>
                    <Button
                        key="toResults"
                        onClick={() => toResults()}
                        sx={{ color: 'white', display: 'block', height: "100%" }}
                    >
                        Results
                    </Button>
                    <Button
                        key="toTeams"
                        onClick={() => toTeams()}
                        sx={{ color: 'white', display: 'block' }}
                    >
                        Teams
                    </Button>
                    <Button
                        key="toLogin"
                        onClick={() => toLogin()}
                        sx={{ color: 'white', display: 'block', marginLeft: "auto" }}
                    >
                        Login
                    </Button>
                </Box>
            </AppBar>
        </Box>
    );
}