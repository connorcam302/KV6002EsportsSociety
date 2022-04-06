import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";


/**
* PlayerTeams
* 
* Creates a list of teams that the player is in and returns it in component format. Uses the 'api/team' endpoint with a 
* playerid supplied in props to get the list.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/

export default class PlayerTeams extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }

    /**
    * componentDidMount()
    * 
    * Ran when the page is initially loaded. In this case, data from the 'api/team' regarding 
    * the playerid supplied in props will be returned.
    */

    componentDidMount() {
        let url = "http://unn-w18003255.newnumyspace.co.uk/KV6002/Assessment/api/team?player="
        this.fetchData(url)
    }

    /**
    * fetchData(url)
    * 
    * Fetches API data from a given URL with a player ID appended. The data is stored in state.
    */

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
        /**
        * createData(team_name, team_id, game_name)
        * 
        * Creates an array from the three variables given. This is to be used to make a row in a table.
        *
        * @param String $team_name   The name of the team.
        * @param String $team_id   The id of the team
        * @param String $game_name   The name of the game the team plays.
        * 
        * @returns Array
        */
        
        function createData(team_name, team_id, game_name) {
            return { team_name, team_id, game_name };
        }

        /*
        * Iterrates through the results and makes an array of the array of match data.
        */
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
            </div>
        )
    }
}