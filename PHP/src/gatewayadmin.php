<?php

/**
 * This function holds SQL queries that are necessary for the login functionality, 
 * this is performed through executing SQL relating to user information from the User.sqlite file.
 * 
 * @author Ethan Borrill W18001798
 */
class GatewayAdmin extends Gateway
{
    public function __construct() {
        $this->setDatabase(DATABASE);
    }


public function loginAdmin($email) {
        $sql = " Select user_id, user_password, user_isAdmin from user where user_email = :email AND user_isAdmin = 1"; //This SQL selects the Id and password from the database based on a corresponding email address.
        $params = [":email" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

}