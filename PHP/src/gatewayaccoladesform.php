<?php


class GatewayAccoladeForm extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }


    public function registerUser($teamid, $accoladeid)
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
