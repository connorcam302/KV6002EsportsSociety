import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";


/**
* Navbar
* 
* Creates the navbar for the page. Depending on the users credentials options will be adjusted. For
* example, if the user is an admin, login will be replaced with logout and the admin panel option 
* will be shown.
*
* @author Connor Campbell W18003255
* @collab Ethan Borrill W18001798
*
* @todo - Add functionality for the user to go to their own profile.
        - Add vikings logo somewhere.
*/


export default function ButtonAppBar() {
    let navigate = useNavigate();

    
    /**
    * toPage(path)
    * 
    * Forwards the user to the page supplied in the parameters.
    * 
    * @param String path  The name of the page to be forwarded to.",
    */
    
    const toPage = (path) => {
        navigate(path);
    }

    
    /**
    * logout()
    * 
    * Used to logout the user, both admin and authenticated are set to false then the user has 
    * their token removed. The page is then refreshed to update the page to the changes.
    */
    
    let authenticated = false;
    let admin = false;

    const logout = () => {
        authenticated = false;
        admin = false;
        localStorage.removeItem('UserLoginToken');
        window.location.reload(true);
    }

    /**
     * Checks if the user has a token, if they have a token, authenticate them, if they are an 
     * admin, allocated admin permissions.
     */

    if(localStorage.getItem("UserLoginToken")) {
        authenticated = true;
        let decodedToken = jwt_decode(localStorage.getItem("UserLoginToken"))
        if(decodedToken.user_isAdmin == 1) {
            admin = true;
        }
    }

    /**
     * If the user is authenticated and an admin, they will have access to the admin panel.
     */

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
                    onClick={() => toPage("events")}
                    sx={{ color: 'white', display: 'block' }}
                >
                    Weekly Events
                </Button>
                <Button
                    key="toResults"
                    onClick={() => toPage("results")}
                    sx={{ color: 'white', display: 'block', height: "100%" }}
                >
                    Results
                </Button>
                <Button
                    key="toTeams"
                    onClick={() => toPage("teams")}
                    sx={{ color: 'white', display: 'block' }}
                >
                    Teams
                </Button>
                <Button
                    key="toAdmin"
                    onClick={() => toPage("admin")}
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

    /**
     * If the user is not an admin but is authenticated, they will still be shown the logged in navbar,
     * just without the admin panel option.
     */

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
                        onClick={() => toPage("events")}
                        sx={{ color: 'white', display: 'block' }}
                    >
                        Weekly Events
                    </Button>
                    <Button
                        key="toResults"
                        onClick={() => toPage("results")}
                        sx={{ color: 'white', display: 'block', height: "100%" }}
                    >
                        Results
                    </Button>
                    <Button
                        key="toTeams"
                        onClick={() => toPage("teams")}
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

    /**
     * The default navbar to be shown if the user is not logged in.
     */

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Box container spacing={2} alignItems="center" sx={{ display: 'flex', flexDirection: 'row', paddingRight: 2 }}>
                    <Typography sx={{ fontSize: 24, paddingLeft: 2, paddingRight: 2 }}>
                        NORTHUMBRIA VIKINGS
                    </Typography>
                    <Button
                        key="toEvents"
                        onClick={() => toPage("events")}
                        sx={{ color: 'white', display: 'block' }}
                    >
                        Weekly Events
                    </Button>
                    <Button
                        key="toResults"
                        onClick={() => toPage("results")}
                        sx={{ color: 'white', display: 'block', height: "100%" }}
                    >
                        Results
                    </Button>
                    <Button
                        key="toTeams"
                        onClick={() => toPage("teams")}
                        sx={{ color: 'white', display: 'block' }}
                    >
                        Teams
                    </Button>
                    <Button
                        key="toLogin"
                        onClick={() => toPage("login")}
                        sx={{ color: 'white', display: 'block', marginLeft: "auto" }}
                    >
                        Login
                    </Button>
                </Box>
            </AppBar>
        </Box>
    );
}