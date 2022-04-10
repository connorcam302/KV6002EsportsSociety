<?php


/**
* GateWayCreateTeamForm

* This gateway provides the SQL queries needed for the Team form to function, collecting all details entered into the teams submission form and inserting them into the pendingTeams table in the database,
* which will then be held for approving, an additional query exists to check if a team of the same name exists within the database.

* @author Ethan Borrill W18001798
*/
class GateWayCreateTeamForm extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }


    /**
     * SQL query for submimtting a new team on the webpage and to the database.
     */
    public function submitTeam($teamname,$gameid,$teamlead)
    {
        $sql = "INSERT into pendingTeams (team_name,game_id,team_lead) 
                       values(:teamname,:gameid,:teamlead)";
        $params = [
            ":teamname" => $teamname,
            ":gameid" => $gameid,
            ":teamlead" => $teamlead,
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * SQL query checks if the team name entered is already in use within the database.
     */
    public function teamPending($teamname)
    {
        $sql = "SELECT * FROM pendingTeams WHERE team_name  = :teamname";
        $params = [":teamname" => $teamname];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result == FALSE) {
            return false;
        } else {
            return true;
        }
    }
}