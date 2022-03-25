import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';


export default function RegisterLink() {
    let navigate = useNavigate();

    const toRegister = () => {
        let path = `register`;
        navigate(path);
    }

    return (
        <ul><Button
            key="toRegister"
            onClick={() => toRegister()}
            sx={{ color: 'black', display: 'inline-block' }}>
            Don't have an account? Register one here!
        </Button></ul>
    );
}