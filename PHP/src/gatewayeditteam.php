<?php

class GatewayEditTeam extends Gateway
{
    public function __construct() {
        $this->setDatabase(DATABASE);
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