<?php


/**
* GatewayAdminPendingTeamsFormApprove
* 
* This gateway provides the SQL query needed to insert an approved team into the offical Teams table used within the webpage.
*
* @author Ethan Borrill W18001798
*/
class GatewayAdminPendingTeamsFormApprove extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }


    /**
     * SQL query for registering a new team from the pendingTeams table into the offical Teams table used within the website.
     */
    public function ApproveTeam($teamid)
    {
        $sql = "INSERT into team (team_name,game_id,team_lead) SELECT team_name,game_id,team_lead FROM pendingTeams WHERE pendingTeams.team_id = :teamid;";
        $params = [":teamid" => $teamid];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

}