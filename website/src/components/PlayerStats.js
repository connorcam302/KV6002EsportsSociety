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
            results : [],
            accoladeResults : []
        }
    }

    componentDidMount() {
        let url = "http://localhost/KV6002/Assessment/api/results?player="
        this.fetchData(url)
        let accoladesurl = "http://localhost/KV6002/Assessment/api/accolades?playerbest="
        this.fetchAccoladeData(accoladesurl)
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

    fetchAccoladeData = (url) => {
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
            this.setState({accoladeResults:data.results})
        })
        .catch ((err) => { 
            console.log("something went wrong ", err) 
        });
    }

    render() {
        let seriesWinCount = 0;
        let seriesLossCount = 0;
        let longestSeriesLength = 0;
        let longestSeries = "";


        function evaluateSeries(match) {
            let divider = match.lastIndexOf("-")
            let home = match.slice(0,divider)
            let away = match.slice(divider+1, match.length)
            let result = home - away
            let length = home + away

            if(result>0){
                seriesWinCount++
            } else seriesLossCount++

            if(length > longestSeriesLength) {
                longestSeries = match;
                longestSeriesLength = length
            }
        }

        this.state.results.map((result) => evaluateSeries(result.match_outcome))


        let bestAccolade

        this.state.accoladeResults.map((accolade) => bestAccolade = accolade.accolade_name)

        if(bestAccolade == null){
            bestAccolade = seriesWinCount + " Series Wins"
        }
        
        let seriesCount = seriesLossCount + seriesWinCount
        let seriesWinRate = String(Math.floor((seriesWinCount/seriesCount)*100)+"%");

        return(
            <div>
            <TableContainer  sx={{maxHeight: 320}}>
                <Table>
                    <TableBody>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left"><Typography>Series Played</Typography></TableCell>
                            <TableCell align="right"><Typography>{seriesCount}</Typography></TableCell>
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
                            <TableCell align="left"><Typography>Longest Series</Typography></TableCell>
                            <TableCell align="right"><Typography>{longestSeries}</Typography></TableCell>
                        </TableRow>
                        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell align="left"><Typography>Best Accolade</Typography></TableCell>
                            <TableCell align="right"><Typography>{bestAccolade}</Typography></TableCell>
                        </TableRow>
                    </TableBody>
                 </Table>
            </TableContainer>
            </div>
        )
    }   
}