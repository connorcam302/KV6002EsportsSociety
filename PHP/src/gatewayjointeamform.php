<?php


/**
* GateWayCreateTeamForm

* This gateway provides the SQL queries needed for the Team form to function, collecting all details entered into the teams submission form and inserting them into the pendingTeams table in the database,
* which will then be held for approving, an additional query exists to check if a team of the same name exists within the database.

* @author Ethan Borrill W18001798
*/
class GateWayJoinTeamForm extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }


    /**
     * SQL query for submimtting a new team member.
     */
    public function joinTeam($teamid,$userid)
    {
        $sql = "INSERT into pendingMembers (team_id,user_id,) 
                       values(:teamid,:userid,)";
        $params = [
            ":teamid" => $teamid,
            ":userid" => $userid,
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}