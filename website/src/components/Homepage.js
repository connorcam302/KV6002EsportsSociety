import React from "react";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Box } from "@mui/system";

class Homepage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={4} sx={{ justifyContent: 'center' }}>
                        <Typography sx={{ fontSize: 30, fontWeight: 500 }}>
                            Welcome to the Northumbria eSports Societie's webpage
                        </Typography>
                        <Typography sx={{ fontSize: 24, fontWeight: 350 }}>
                            This page is just a temporary hold for us to land onto till we decide on a landing page for the site.
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}
export default Homepage;