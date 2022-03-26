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

class GatewayTeam extends Gateway  {

    private $sql = "SELECT team_id, team_name, game.game_name, team_lead FROM team
    JOIN game ON team.game_id = game.game_id";

    public function __construct() {
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

    public function findByGame($id) {
        $this->sql .= " WHERE game.game_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }
}