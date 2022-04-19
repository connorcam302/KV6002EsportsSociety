<?php


/**
* GatewayAdminJoinTeamFormApprove
* 
* This gateway provides the SQL query needed to insert an approved user into their requested team within the userTeam table used within the webpage.
*
* @author Ethan Borrill W18001798
*/
class GatewayAdminJoinTeamFormApprove extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }


    /**
     * SQL query for adding a user to a team from the pendingMembers table into the offical userTeam table used within the website.
     */
    public function ApproveMember($userid)
    {
        $sql = "INSERT into userTeam (userTeam_id,user_id) SELECT userTeam_id, user_id FROM pendingMembers WHERE pendingMembers.user_id = :userid;";
        $params = [":userid" => $userid];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }


}