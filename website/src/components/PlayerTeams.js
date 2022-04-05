import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default class PlayerTeams extends React.Component {

constructor(props){
    super(props)
    this.state = {
        results : []
    }
}

componentDidMount() {
    let url = "http://localhost/KV6002/Assessment/api/team?player="
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
        noData = <p>Not a member of any teams.</p>
    }

    function createData(team_name, team_id, game_name) {
        return { team_name, team_id, game_name };
    }

    const rows = [
    this.state.results.map( (result) => createData(result.team_name, result.team_id, result.game_name))
    ];

    function makeTeamLink(id) {
        return "../team/" + id
    }

    return(
        <div>
            <TableContainer  sx={{maxHeight: 320}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}><Typography>Teams</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {this.state.results.map((result) => (
                        <TableRow
                        key={result.team_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell align="left"><Link to={makeTeamLink(result.team_id)}><Box><Typography>{result.team_name}</Typography></Box></Link></TableCell>
                        <TableCell align="right"><Typography>{result.game_name}</Typography></TableCell>
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