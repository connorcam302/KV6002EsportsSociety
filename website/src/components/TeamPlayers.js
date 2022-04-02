import React from "react";
import ProfilePic from "../img/defaultprofilepicture.png"
import { Tooltip, Grid, Box } from "@mui/material";

export default class TeamPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            results : []
        }
    }
   
    componentDidMount() {
        let url = "http://localhost/KV6002/Assessment/api/player?team="
        this.fetchData(url)
    }

    componentDidUpdate(prevProps) {
        let url = "http://localhost/KV6002/Assessment/api/player?team="
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
            noData = <p>No data</p>
        }

        return(
            <div>
                 <Box sx={{paddingTop:2, borderLeft:"3%",borderRight:"3%", display: 'flex', flexWrap: 'wrap', justifyContent: 'center',}}>
                    {this.state.results.map( (player) => (<Tooltip title={player.user_ign}><img src={ProfilePic} className="profliepic"/></Tooltip>) )}
                </Box>
            </div>
        )
    }
}