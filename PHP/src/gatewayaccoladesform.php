<?php


/**
* GatewayAccoladesForm
* 
* This gateway is used to insert the TeamID and AccoladeID used in the Accolade Submission form on the Admin Page
* The form will retrieve the ID associated with the Name displayed in the dropdown box and upon submission, this SQL query will take those 2 values and insert them
* Into the teamAccolade table of the database.
*
* @author Ethan Borrill W18001798
* @collab
*
* @todo
*/
class GatewayAccoladesForm extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }


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
