import React from "react";
import Teams from "./Teams.js";
import TeamSubmissionForm from "./TeamSubmissionForm.js";
import SearchBox from "./SearchBox.js";

/**
 * Team page
 *
 * @author Harry Laws w19024957
 * @collab Ethan Borrill W18001798 - Worked on the Team Submission form functionality.
 */

class AllTeamsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            TeamName: null,
            GamesDropDown: "",
            TeamsDropDown: "",
            error: "",
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleTeamName = this.handleTeamName.bind(this);
        this.handleGameSelect = this.handleGameSelect.bind(this);
        this.handleTeamSelect = this.handleTeamSelect.bind(this);
        this.handleTeamSubmit = this.handleTeamSubmit.bind(this);
    }

    //Functionality for the Team Submission Form

    /**
    * handleTeamName(e)
    * 
    * Handles the input and change of text within the 'Team name' field used within the Team Submission form on the Teams Page.
    *
    * Ethan Borrill W18001798
    */
    handleTeamName = (e) => {
        this.setState({ TeamName: e.target.value })
    }

    /**
    * handleGameSelect(e)
    * 
    * Applies functionality to the dropdown box needed to show Games the team will be playing in their team for the team application form.
    *
    * Ethan Borrill W18001798
    */
    handleGameSelect = (e) => {
        this.setState({ GamesDropDown: e.target.value })
    }

    /**
    * handleTeamSelect(e)
    * 
    * Applies functionality to the dropdown box needed to show Users who will be the leader of the team being sent for application.
    *
    * Ethan Borrill W18001798
    */
    handleTeamSelect = (e) => {
        this.setState({ TeamsDropDown: e.target.value })
    }

    /**
    * handleTeamSubmit
    * 
    * Provides functionality to the 'Submit application' Button at the end of the Team Application Form, this includes checks for if any fields are empty - resulting in error codes being displayed.
    *
    * Ethan Borrill W18001798
    */
    handleTeamSubmit = () => {
        let url = "http://unn-w18001798.newnumyspace.co.uk/KV6002/Assessment/api/teamsform"

        let formData = new FormData();
        formData.append('team_name', this.state.TeamName);
        formData.append('game_id', this.state.GamesDropDown);
        formData.append('team_lead', this.state.TeamsDropDown);
        fetch(url, {
            method: 'POST',
            headers: new Headers(),
            body: formData
        })
            .then((response) => {
                if ((this.state.TeamName === null) && (this.state.GamesDropDown === "") && (this.state.TeamsDropDown === "")) {
                    this.setState({ error: "Please complete your form before submitting!" })
                } else if (this.state.TeamName === null) {
                    this.setState({ error: "Please enter a team name!" })
                } else if (this.state.GamesDropDown === "") {
                    this.setState({ error: "Please select a game your team will play!" })
                } else if (this.state.TeamsDropDown === "") {
                    this.setState({ error: "Please provide a team leader!" })
                } else if (response.status === 403) {
                    this.setState({ error: "This team name has already been submitted for approval, please try another name." })
                } else if ((response.status === 200) || (response.status === 204)) {
                    this.setState({ error: "This team application has been submitted, please wait for approval." })
                    return response.json()
                }
            })
            .catch((err) => {
                console.log("something went wrong ", err)
                console.warn(xhr.responseText) 
            }
            );
    }



    /**
    * handleSearch(e)
    * 
    * Applies the functionality for the search box.
    *
    */
    handleSearch = (e) => {
        this.setState({ search: e.target.value })
    }


    /**
    * render
    * 
    * This function will create and display the required functionalities for the Teams page to operate as intended, This consists of several other components required to make it work as intended -
    * including the Search box, team details and the team application form.
    *
    * @returns {Page} - Will display the rendered page content based on the conditions required.
    */
    render() {
        let page;
        let errorMessage = this.state.error
        page = (
            <div class="wrapper sidebar right">
                <div class="inner">
                    <header >
                        <h2>Teams</h2>
                    </header>
                    <div class="content">
                        <div class="inner">
                            <Teams search={this.state.search} />
                        </div>
                    </div>
                    <div class="sidebar">
                        <section>
                            <SearchBox
                                search={this.state.search}
                                handleSearch={this.handleSearch} />

                            <TeamSubmissionForm
                                handleTeamName={this.handleTeamName}
                                handleTeamSelect={this.handleTeamSelect}
                                handleGameSelect={this.handleGameSelect}
                                handleTeamSubmit={this.handleTeamSubmit} />
                            <ul><p className="errorMessage">{errorMessage}</p></ul>
                        </section>
                    </div>
                </div>

            </div>
        );

        return (
            <div>{page}</div>
        )
    }
}


export default AllTeamsPage;