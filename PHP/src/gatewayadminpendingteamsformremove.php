<?php


/**
* GatewayAdminPendingTeamsFormRemove
* 
* This gateway provides the SQL query needed to delete team applications from the 'PendingTeams' table of the database - whihc is used to deny the creation of a new team.
*
* @author Ethan Borrill W18001798
*/
class GatewayAdminPendingTeamsFormRemove extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    /**
     * SQL will delete the pendingTeams application form from the PendingTeams table.
     */
    public function DeleteTeam($teamid)
    {
        $sql = "DELETE FROM pendingTeams WHERE pendingTeams.team_id = :team_id;";
        $params = [":team_id" => $teamid];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}