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

class GatewayAccolades extends Gateway  {
    private $sql = "SELECT team.team_id, accolades.accolade_id, accolades.accolade_name, team.team_name FROM accolades
                    JOIN teamAccolades ON teamAccolades.accolade_id = accolades.accolade_id
                    JOIN team on team.team_id = teamAccolades.userTeam_id";
    
    public function __construct() {
        $this->setDatabase(DATABASE);
    }
    /**
     * Returns all results within the database.
     *
     * @return   array
     */

    public function findAll()
    {
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    /**
     * Returns a team's 3 latest results.
     *
     * @return   array
     */


    public function findByTeam($id)
    {
        $this->sql .= " WHERE team.team_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

}