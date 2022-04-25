<?php

/**
 * Teams Gateway
 * 
 * This gateway is used to obtain data regarding teams specifically either targeting teams
 * with specific criteria, or every team in the esports.db database.
 * 
 * @author Connor Campbell W18003255
 * 
 * @todo    - Additional search criteria will be added as needed throughout development.
 */

class GatewayTeam extends Gateway
{

    private $sql = "SELECT team_id, team_name, game.game_name, team_lead FROM team
    JOIN game ON team.game_id = game.game_id";

    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    /**
     * Returns all teams within the database.
     *
     * @return   array
     */

    public function findAll()
    {
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    /**
     * Returns specific team based on ID.
     *
     * @param    int  $id The ID of the player in question.
     * @return   array
     */

    public function findOne($id)
    {
        $this->sql .= " WHERE team_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    /**
     * Providing a game ID will return an array of the teams that currently are competing
     * in this game.
     *
     * @param    int  $id The ID of the game in question.
     * @return   array
     */

    public function findByGame($id)
    {
        $this->sql .= " WHERE game.game_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    public function findByPlayer($id)
    {
        $this->sql .= " JOIN userTeam ON userTeam.userTeam_id = team_id
                        WHERE user_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    /**
     * GatewayAdminJoinTeamFormApprove
     * 
     * This gateway provides the SQL query needed to insert an approved user into their requested team within the userTeam table used within the webpage.
     *
     * @author Ethan Borrill W18001798
     */

    /**
     * SQL query for adding a user to a team from the pendingMembers table into the offical userTeam table used within the website.
     */
    public function ApproveMember($userid)
    {
        $sql = "INSERT into userTeam (userTeam_id,user_id) SELECT userTeam_id, user_id FROM pendingMembers WHERE pendingMembers.user_id = :userid;";
        $params = [":userid" => $userid];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
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

    public function editTeam($name,$id) {
        $sql = "UPDATE team
                SET team_name = :name
                where team_id = :id";
        $params = [
                ":name" => $name,
                ":id" => $id,
                ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
