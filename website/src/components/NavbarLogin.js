import React from "react";
import { Button } from "@mui/material";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function NavbarLogin() {

    let authenticated = false;
    let admin = false;

    let navigate = useNavigate();

    const toAdmin = () => {
        let path = `admin`;
        navigate(path);
    }

    const toLogin = () => {
        let path = `login`;
        navigate(path);
    }

    const logout = () => {
        authenticated = false;
        admin = false;
        localStorage.removeItem('UserLoginToken');
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
        return(
        <div>
            <Button
                key="toAdmin"
                onClick={() => toAdmin()}
                sx={{ color: 'white', display: 'block', }}
            >
                Admin
            </Button>
            <Button
                key="toLogin"
                onClick={() => logout()}
                sx={{ color: 'white', display: 'block', marginLeft: "auto" }}
            >
                Logout
            </Button>
        </div>
        )
    }

    if(authenticated && !admin) {
        console.log("User is not admin.")
        return(
            <div>
            <Button
                key="toLogin"
                onClick={() => logout()}
                sx={{ color: 'white', display: 'block', marginLeft: "auto" }}
            >
                Logout
            </Button>
            </div>
        )
    }

    else {
        return(
        <Button
            key="toLogin"
            onClick={() => toLogin()}
            sx={{ color: 'white', display: 'block', marginLeft: "auto" }}
        >
            Login
        </Button>
        )
    }
}
