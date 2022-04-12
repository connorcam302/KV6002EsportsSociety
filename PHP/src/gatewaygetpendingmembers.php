<?php

/**
 * GatewayGetPendingMembers
 * 
 * This gateway is used to obtain the details of users from the pendingMembers form to be displayed within the Join Team application's form prior to submission or deletion.
 * 
 * @author Ethan Borrill W18001798
 * 
 */         

class GatewayGetPendingMembers extends Gateway  {
    private $sql = "SELECT pendingMembers.userTeam_id, pendingMembers.user_id, team_name, user_ign FROM pendingMembers
                    JOIN team ON pendingMembers.userTeam_id = team.team_id JOIN user ON pendingMembers.user_id = user.user_id";
    
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

    public function filterMember($id)
    {
        $this->sql .= " WHERE pendingMembers.user_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    
    
}