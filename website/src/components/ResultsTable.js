import React from "react";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';


/**
 * Results Table Component
 * 
 * Uses the MUI datagrid compononent to render and display result data provided by the     
 * results api. The table can filtered and searched through using the filter options 
 * provided by the component in the toolbar. Currently limited to one filter at a time.
 *
 * @author Jacob Clark w18003237
 * 
 * 
 * @todo consider adding custom filters such as winning matches
 */

class ResultsTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    componentDidMount() {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/results"
        this.fetchData(url)
    }

    /**
    * componentDidMount()
    * 
    * Ran when the page is initially loaded. In this case, data from the 'api/results'  
    * will be returned.
    */


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

    /**
    * fetchData(url)
    * 
    * Fetches API data from a given URL. The data is stored in state.
    */

    render() {
        let noData = ""
        if (this.state.results.length === 0) {
            noData = <p>No data</p>
        }
        
        function createData(id, teamname, opponent, date, result, game) {
            return { id, teamname, opponent, date, result, game };
        }

        /*
        * Checks data length before creating an an array to store the different variables 
        * supplied. 
        * 
        */

        const columns = [
            //Creates the columns for the grid with appropriate lengthing and then flex to make the content stretch when there is space
            { field: 'teamname', headerName: 'Team Name', minWidth: 350,
            flex: 1 },
            { field: 'opponent', headerName: 'Opponent', minWidth: 350,
            flex: 1 },
            { field: 'game', headerName: 'Game', minWidth: 300,
            flex: 1 },
            { field: 'date', headerName: 'Match Date', minWidth: 150,
            flex: 1},
            { field: 'result', headerName: 'Match Outcome', minWidth: 150,
            flex: 1}
        ];

        
        //Fills a rows variable with the data collected from the results api 
        const rows =
            this.state.results.map((result) => createData(result.match_id, result.team_name, result.match_opponent, result.match_date, result.match_outcome, result.game_name))
        ;


       
         //Builds up the table to be displayed using the rows and columns variables
        return (

            <div style={{ width: '100%' }}>
                <DataGrid className="DataGrid"
                    components={{ Toolbar: GridToolbar }}
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    sx={{backgroundColor:"#424242", border: 2, borderColor: '#D5761D',}}
                />
            </div>
        );
    }

}

export default ResultsTable