import React from "react";
/**
 * Team Select Menu
 *
 * @author Jacob Clark w18003237
 */
class SelectMenu extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    componentDidMount() {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/team"
        this.fetchData(url)
    }

    fetchData = (url) => {
        fetch(url)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw Error(response.statusText);
                }
            })
            .then((data) => {
                this.setState({ results: data.results })
            })
            .catch((err) => {
                console.log("something went wrong ", err)
            });
    }

    render() {
        let noData = ""
        if (this.state.results.length === 0) {
            noData = <p>No data</p>
        }

        function createData(id, teamname) {
            return { id, teamname };
        }

        /*
        * Checks data length before creating an an array to store the different variables 
        * supplied. 
        * 
        */

        const teams =
            this.state.results.map((result) => createData(result.team_id, result.team_name))
            ;

        return (
            <select name="team" value={teams.id} onChange={this.props.handleMatchTeam}>
                {teams.map((e, key) => {
                    return <option key={key} value={e.id}>{e.teamname}</option>;
                })}
            </select>
        )
    }
}

export default SelectMenu;