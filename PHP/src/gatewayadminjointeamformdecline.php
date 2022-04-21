<?php


/**
* GatewayAdminJoinTeamFormDecline
* 
* This gateway provides the SQL query needed to delete member applications from the 'pendingMembers' table of the database.
*
* @author Ethan Borrill W18001798
*/
class GatewayAdminJoinTeamFormDecline extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    /**
     * SQL will delete the Member application form from the pendingMembers table.
     */
    public function DeclineMember($userid)
    {
        $sql = "DELETE FROM pendingMembers WHERE pendingMembers.user_id = :user_id;";
        $params = [":user_id" => $userid];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}