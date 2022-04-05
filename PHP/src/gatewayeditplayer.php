<?php


class GatewayEditPlayer extends Gateway
{
    public function __construct() {
        $this->setDatabase(DATABASE);
    }

    public function editPlayer($email,$userign,$userFirst,$userLast,$userTwitch,$userTwitter,$userInstagram, $id) {
        $sql = "UPDATE user
                SET user_email = :useremail, 
                    user_ign = :userign, 
                    user_firstName = :userfirstName, 
                    user_lastName = :userlastName, 
                    user_twitch = :usertwitch, 
                    user_twitter = :usertwitter,
                    user_instagram = :userinstagram
                where user_id = :id";
        $params = [
                ":useremail" => $email,
                ":userign" => $userign,
                ":userfirstName" => $userFirst,
                ":userlastName" => $userLast,
                ":usertwitch" => $userTwitch,
                ":usertwitter" => $userTwitter,
                ":userinstagram" => $userInstagram,
                ":id" => $id,
                ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}

//public function registerUser($userid,$email,$password,$userign,$userFirst,$userLast,$usertwitch, $usertwitter,$userinstagram, $userisAdmin,)
//user_id,user_email,user_password,user_ign,user_firstName,user_lastName,user_twitch,user_twitter,user_instagram,user_isAdmin 
//:userid,:useremail,:userpassword,:userign,:userfirstName,:userlastName,:usertwitch,:usertwitter,:userinstagram,:userisAdmin
//user_email,user_password,user_ign,user_firstName,user_lastName