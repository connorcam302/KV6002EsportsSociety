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
* PlayerResults
* 
* Creates a list of player results and returns it in component format. Uses a playerid supplied in props to create a list
* of results the player was involved in using the 'api/results' endpoint.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/


export default class PlayerResults extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }

    /**
    * componentDidMount()
    * 
    * Ran when the page is initially loaded. In this case, data from the 'api/player' regarding  the playerid supplied in 
    * props will be returned.
    */

    componentDidMount() {
        let url = "http://unn-w18003255.newnumyspace.co.uk/KV6002/Assessment/api/results?player="
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
        let noData = ""         
        /*
        * If the player was in no matches, "No data." will be displayed.
        */
        if (this.state.results.length === 0) {
            noData = <p>No data</p>
        }

        /**
        * createData(date, opponent, result, matchid, team_name, match_teamId)
        * 
        * Creates an array from the six variables given. This is to be used to make a row in a table.
        *
        * @param String $date               The date of the match.
        * @param String $opponent           The opponent of the match.
        * @param String $result             The result of the match.
        * @param String $matchid            The id of the match.
        * @param String $team_name          The name of the team playing the match.
        * @param String $match_teamId       The id of the team playing.
        * 
        * @returns Array
        */

        function createData(date, opponent, result, matchid, team_name, match_teamId) {
            return { date, opponent, result, matchid, team_name,match_teamId };
        }

        /*
        * Iterrates through the results and makes an array of the array of match data.
        */

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