import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from "@mui/material";

export default class TeamResults extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }

    componentDidMount() {
        let url = "http://localhost/KV6002/Assessment/api/results?team="
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
        let matchWinCount = 0;
        let matchLossCount = 0;
        let seriesWinCount = 0;
        let seriesLossCount = 0;


        function evaluateSeries(match) {
            let divider = match.lastIndexOf("-")
            let home = match.slice(0,divider)
            let away = match.slice(divider+1, match.length)
            let result = home - away

            if(result>0){
                seriesWinCount++
            } else seriesLossCount++
        }

        function evaluateMatch(match){
            let divider = match.lastIndexOf("-")
            let home = match.slice(0,divider)
            let away = match.slice(divider+1, match.length)

            matchWinCount += Number(home)
            matchLossCount += Number(away)
        }


        this.state.results.map((result) => evaluateSeries(result.match_outcome))
        this.state.results.map((result) => evaluateMatch(result.match_outcome))

        let matchCount = matchLossCount + matchWinCount
        let seriesCount = seriesLossCount + seriesWinCount
        let seriesWinRate = String(Math.floor((seriesWinCount/seriesCount)*100)+"%");
        let matchWinRate = String(Math.floor((matchWinCount/matchCount)*100)+"%");

        return(
            <div>
            <TableContainer  sx={{maxHeight: 320}}>
                <Table>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left"><Typography>Matches Played</Typography></TableCell>
                            <TableCell align="right"><Typography>{matchCount}</Typography></TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left"><Typography>Series Wins</Typography></TableCell>
                            <TableCell align="right"><Typography>{seriesWinCount}</Typography></TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left"><Typography>Series Win Rate</Typography></TableCell>
                            <TableCell align="right"><Typography>{seriesWinRate}</Typography></TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left"><Typography>Match Wins</Typography></TableCell>
                            <TableCell align="right"><Typography>{matchWinCount}</Typography></TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left"><Typography>Match Win Rate</Typography></TableCell>
                            <TableCell align="right"><Typography>{matchWinRate}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                 </Table>
            </TableContainer>
            </div>
        )
    }   
}