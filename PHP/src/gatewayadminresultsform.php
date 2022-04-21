<?php

/**
* GatewayAdminResultsForm
* 
* This gateway is used to insert details from the Match results Form on the Admin Page into the matchHistory table of the database.
*
* @author Ethan Borrill W18001798
*/
class GatewayAdminResultsForm extends Gateway
{
    public function __construct() {
        $this->setDatabase(DATABASE);
    }


/**
 * SQL Query for inserting match results form data.
 */
public function addResult($team_id, $match_date, $match_opponent, $match_result ) {
    $sql = "INSERT into matchHistory (match_teamId,match_date,match_opponent, match_outcome)
                         VALUES (:match_teamId, :match_date, :match_opponent, :match_outcome)";
    $params = [
        ":match_teamId" => $team_id, 
        ":match_date" => $match_date, 
        ":match_opponent" => $match_opponent, 
        ":match_outcome" => $match_result,
    ];
    $result = $this->getDatabase()->executeSQL($sql, $params);
    $this->setResult($result);
}
}
