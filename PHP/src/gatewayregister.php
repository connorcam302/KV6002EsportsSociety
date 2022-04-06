<?php


class GatewayRegister extends Gateway
{
    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }


    public function registerUser($email, $password, $userign, $userFirst, $userLast)
    {
        $sql = "INSERT into user (user_email,user_password,user_ign,user_firstName,user_lastName) 
                       values(:useremail,:hashedpassword,:userign, :userfirstName, :userlastName)";
        $params = [
            ":useremail" => $email,
            ":hashedpassword" => $password,
            ":userign" => $userign,
            ":userfirstName" => $userFirst,
            ":userlastName" => $userLast

        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    public function emailUsed($email)
    {
        $sql = "SELECT * FROM user WHERE user_email  = :useremail";
        $params = [":useremail" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result == FALSE) {
            return false;
        } else {
            return true;
        }
    }
}