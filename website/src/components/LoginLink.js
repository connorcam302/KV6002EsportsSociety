import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function LoginLink() {
    let navigate = useNavigate();

    const toLogin = () => {
        let path = `login`;
        navigate(path);
    }

    return (
        <ul><Button
            key="toLogin"
            onClick={() => toLogin()}
            sx={{ color: 'black', display: 'inline-block' }}>
            Already have an account? Login here!
        </Button></ul>

    );
}