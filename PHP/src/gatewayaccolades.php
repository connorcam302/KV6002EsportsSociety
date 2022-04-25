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

class GatewayAccolades extends Gateway
{
    private $sql = "SELECT team.team_id, accolades.accolade_id, accolades.accolade_name, team.team_name FROM accolades
                    JOIN teamAccolades ON teamAccolades.accolade_id = accolades.accolade_id
                    JOIN team on team.team_id = teamAccolades.userTeam_id";

    public function __construct()
    {
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

    public function findByTeam($id)
    {
        $this->sql .= " WHERE team.team_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    public function findTeamBest($id)
    {
        $this->sql .= " WHERE team_id = :id
                        ORDER BY accolades.accolade_id
                        LIMIT 1";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    public function findByPlayer($id)
    {
        $this->sql .= " JOIN userTeam on team.team_id = userTeam.userTeam_id
                        where user_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    public function findPlayerBest($id)
    {
        $this->sql .= " JOIN userTeam on team.team_id = userTeam.userTeam_id
                        WHERE user_id = :id
                        ORDER BY accolades.accolade_id
                        LIMIT 1";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    public function findAllPossible()
    {
        $sql = "select * from accolades";
        $result = $this->getDatabase()->executeSQL($sql);
        $this->setResult($result);
    }

    /**
     * AdminAccoladesForm
     * 
     * This query is used to insert the TeamID and AccoladeID used in the Accolade Submission form on the Admin Page
     * The form will retrieve the ID associated with the Name displayed in the dropdown box and upon submission, this SQL query will take those 2 values and insert them
     * Into the teamAccolade table of the database.
     *
     * @author Ethan Borrill W18001798
     */

    public function AddAccolade($teamid, $accoladeid)
    {
        $sql = "INSERT into teamAccolades (userTeam_id,accolade_id) 
                       values(:TeamID,:AccoladeID)";
        $params = [
            ":TeamID" => $teamid,
            ":AccoladeID" => $accoladeid,
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
