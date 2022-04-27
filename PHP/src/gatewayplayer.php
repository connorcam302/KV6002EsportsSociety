<?php

/**
 * Player Gateway
 * 
 * This gateway is used to obtain data regarding players specifically either targeting players
 * with specific criteria, or every player in the esports.db database.
 * 
 * @author Connor Campbell W18003255
 * 
 * @todo    - Append a list of teams and games the player has affiliations with.
 *          - Additional search criteria will be added as needed throughout development.
 */

class GatewayPlayer extends Gateway
{

    private $sql = "SELECT user.user_email, user.user_id, user_ign, user_firstName, user_lastName, user_twitch, user_twitter, user_instagram, user_bio, user_profilepicture FROM user";

    public function __construct()
    {
        $this->setDatabase(DATABASE);
    }

    /**
     * Returns all players within the database.
     *
     * @return   array
     */

    public function findAll()
    {
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }

    /**
     * Returns specific player based on ID.
     *
     * @param    int  $id The ID of the team in question.
     * @return   array
     */

    public function findOne($id)
    {
        $this->sql .= " WHERE user_id = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    /**
     * Searches for all players currently competing in a specific game.
     *
     * @param    int  $id The ID of the game in question.
     * @return   array
     */

    public function findByGame($id)
    {
        $this->sql .= " JOIN userTeam ON user.user_id = userTeam.user_id
        JOIN team ON userTeam.userTeam_id = team.team_id
        WHERE game_id = :id
        GROUP BY user.user_id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    /**
     * Returns all of the players currently listed to a specific team/
     *
     * @param    int  $id The ID of the team in question.
     * @return   array
     */

    public function findByTeam($id)
    {
        $this->sql .= " JOIN userTeam on user.user_id = userTeam.user_ID
        WHERE userTeam.userTeam_ID = :id";
        $params = ["id" => $id];
        $result = $this->getDatabase()->executeSQL($this->sql, $params);
        $this->setResult($result);
    }

    public function editPlayer($email, $userign, $userFirst, $userLast, $userTwitch, $userTwitter, $userInstagram, $id)
    {
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

    /**
     * SQL query for registering a new user on the webpage and to the database.
     */
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

    /**
     * SQL query checks if the email address entered is already in use within the database.
     */
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

     /**
     * Function executes an SQL query to locate the password, ID and admin status of a user based on the email address associated that is provided.
     * 
     */
    public function loginUser($email) {
        $sql = " Select user_id, user_password,user_ign, user_isAdmin from user where user_email = :user_email";
        $params = [":user_email" => $email];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }
}
