import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default class TeamResults extends React.Component {

constructor(props){
    super(props)
    this.state = {
        results : []
    }
}

componentDidMount() {
    let url = "http://localhost/KV6002/Assessment/api/results?player="
    this.fetchData(url)
}

fetchData = (url) => {
    url += this.props.playerid
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
        noData = <p>No data</p>
    }

    function createData(date, opponent, result, matchid, team_name, match_teamId) {
        return { date, opponent, result, matchid, team_name,match_teamId };
    }

    const rows = [
    this.state.results.map( (result) => createData(result.match_date, result.match_opponent, result.match_outcome, result.match_id, result.team_name, result.match_teamId))
    ];

    function makeTeamLink(id) {
        return "../team/" + id
    }

    return(
        <div>
            <TableContainer  sx={{maxHeight: 320}}>
                <Table stickyHeader >
                    <TableHead sx={{ backgroundColor: 'red' }} >
                        <TableRow >
                            <TableCell align="left"><Typography>Date</Typography></TableCell>
                            <TableCell align="left"><Typography>Team</Typography></TableCell>
                            <TableCell align="left"><Typography>Opponent&nbsp;</Typography></TableCell>
                            <TableCell align="right"><Typography>Result&nbsp;</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.results.map((result) => (
                        <TableRow
                        key={result.match_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="left"><Typography>{result.match_date}</Typography></TableCell>
                        <TableCell align="left"><Link to={makeTeamLink(result.match_teamId)}><Box><Typography>{result.team_name}</Typography></Box></Link></TableCell>
                        <TableCell align="left"><Typography>{result.match_opponent}</Typography></TableCell>
                        <TableCell align="right"><Typography>{result.match_outcome}</Typography></TableCell>
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