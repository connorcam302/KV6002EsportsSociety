import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from "@mui/material";

export default class TeamAccolades extends React.Component {

constructor(props){
    super(props)
    this.state = {
        results : []
    }
}

componentDidMount() {
    let url = "http://localhost/KV6002/Assessment/api/accolades?team="
    this.fetchData(url)
}

fetchData = (url) => {
    url += this.props.teamid
    fetch(url)
    .then( (response) => {
        if (response.status === 200) {
            return response.json() 
        } else {
            throw Error(response.statusText);
        }
    })
    .then( (data) => {
        this.setState({results:data.results})
    })
    .catch ((err) => { 
        console.log("something went wrong ", err) 
    });
}



render() {
    let noData = "" 
    if (this.state.results.length === 0) {
        noData = <p>No Accolades Yet Achieved.</p>
    }

    function createData(accolade_name, accolade_id) {
        return { accolade_name, accolade_id };
    }

    const rows = [
    this.state.results.map( (result) => createData(result.accolade_name, result.accolade_id))
    ];

    return(
        <div>
            <TableContainer  sx={{maxHeight: 320}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center"><Typography>Accolades</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.results.map((result) => (
                        <TableRow
                        key={result.accolade_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="left"><Typography>{result.accolade_name}</Typography></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                 </Table>
            </TableContainer>
            {noData}
        </div>
        )
    }
}
//{this.state.results.map( (result) => result.match_opponent)}
// result.match_date
// result.match_opponent
// result.match_outcome
{/* <TableRow
key={row.name}
sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>
<TableCell align="left">{row.date}</TableCell>
<TableCell align="left">{row.opponent}</TableCell>
<TableCell align="right">{row.result}</TableCell>
</TableRow> */}