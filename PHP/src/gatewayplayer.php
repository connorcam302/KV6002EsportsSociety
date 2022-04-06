<?php

/**
 * Player Gateway
 * 
 * This gateway is used to obtain data regarding players specifically either targeting players
 * with specific criteria, or every player in the esports.db database.
 * 
 * @author Connor Campbell W18003255
 * 
 * @todo    - Append a list of teams and games the player has affiliations with.
 *          - Additional search criteria will be added as needed throughout development.
 */

class GatewayPlayer extends Gateway  {

    private $sql = "SELECT user.user_email, user.user_id, user_ign, user_firstName, user_lastName, user_twitch, user_twitter, user_instagram FROM user"; 

    public function __construct() {
        $this->setDatabase(DATABASE);
    }

    /**
     * Returns all players within the database.
     *
     * @return   array
     */

    public function findAll()
    {
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    /**
     * Returns specific player based on ID.
     *
     * @param    int  $id The ID of the team in question.
     * @return   array
     */

    public function findOne($id)
    {
        $this->sql .= " WHERE user_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    /**
     * Searches for all players currently competing in a specific game.
     *
     * @param    int  $id The ID of the game in question.
     * @return   array
     */

    public function findByGame($id)
    {
        $this->sql .= " JOIN userTeam ON user.user_id = userTeam.user_id
        JOIN team ON userTeam.userTeam_id = team.team_id
        WHERE game_id = :id
        GROUP BY user.user_id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    /**
     * Returns all of the players currently listed to a specific team/
     *
     * @param    int  $id The ID of the team in question.
     * @return   array
     */

    public function findByTeam($id) {
        $this->sql .= " JOIN userTeam on user.user_id = userTeam.user_ID
        WHERE userTeam.userTeam_ID = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }
}