import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from "@mui/material";

/**
* TeamAccolades
* 
* Creates the accolades list and returns it in component format. Uses the 'api/accolades' endpoint to get a teams accolades and
* displays them in list format.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/

export default class TeamAccolades extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }

    /**
    * componentDidMount()
    * 
    * Ran when the page is initially loaded. In this case, data from the 'api/accolades' regarding 
    * the teamid supplied in props will be returned.
    */

    componentDidMount() {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/accolades?team="
        this.fetchData(url)
    }

    /**
    * fetchData(url)
    * 
    * Fetches API data from a given URL with a team ID appended. The data is stored in state.
    */

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
        /*
        * If a team is yet you achieve no accolades, "No Accolades Yet Achieved." will be displayed.
        */
        if (this.state.results.length === 0) {
            noData = <p>No Accolades Yet Achieved.</p>
        }

        /**
        * createData(accolade_name, accolade_id)
        * 
        * Creates an array from the six variables given. This is to be used to make a row in a table.
        *
        * @param String $accolade_name      The name of the accolade.
        * @param String $accolade_id        The id of the accolade.
        * 
        * @returns Array
        */
        function createData(accolade_name, accolade_id) {
            return { accolade_name, accolade_id };
        }

        /*
        * Iterrates through the results and makes an array of the array of accolade data.
        */
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