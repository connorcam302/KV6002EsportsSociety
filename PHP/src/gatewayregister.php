<?php


class GatewayRegister extends Gateway
{
    public function __construct() {
        $this->setDatabase(DATABASE);
    }


public function registerUser($email,$password,$userign,$userFirst,$userLast) {
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

public function emailUsed($email) {
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

//public function registerUser($userid,$email,$password,$userign,$userFirst,$userLast,$usertwitch, $usertwitter,$userinstagram, $userisAdmin,)
//user_id,user_email,user_password,user_ign,user_firstName,user_lastName,user_twitch,user_twitter,user_instagram,user_isAdmin 
//:userid,:useremail,:userpassword,:userign,:userfirstName,:userlastName,:usertwitch,:usertwitter,:userinstagram,:userisAdmin
//user_email,user_password,user_ign,user_firstName,user_lastName