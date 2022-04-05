<?php

/**
 * Results Gateway
 * 
 * This gateway is used to obtain data regarding results specifically either targeting teams
 * with specific criteria, or every result in the esports.db database.
 * 
 * @author Connor Campbell W18003255
 * 
 * @todo    - Additional search criteria will be added as needed throughout development.
 */         

class GatewayResults extends Gateway  {
    private $sql = "SELECT match_id, match_date, match_opponent, match_outcome, match_teamId, team_name FROM matchHistory
                    JOIN team ON team_id = match_teamId";
    
    public function __construct() {
        $this->setDatabase(DATABASE);
    }

    /**
     * Adds order to the query so that results are in chronological order.
     */

    public function addOrder(){
      $this->sql .= " ORDER BY match_date DESC";
    }

    /**
     * Returns all results within the database.
     *
     * @return   array
     */

    public function findAll()
    {
        $this->addOrder();
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    /**
     * Returns a team's 3 latest results.
     *
     * @return   array
     */


    public function findTeamResults($id)
    {
        $this->sql .= " WHERE match_teamid = :id";
        $params = ["id" => $id];
        $this->addOrder();
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    public function findPlayerResults($id)
    {
        $this->sql .= " JOIN userTeam ON team.team_id = userTeam.userTeam_id
                        WHERE userTeam.user_id = :id";
        $params = ["id" => $id];
        $this->addOrder();
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

}