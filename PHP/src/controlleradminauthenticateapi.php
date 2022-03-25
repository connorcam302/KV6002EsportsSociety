<?php

use Firebase\JWT\JWT; //Implements the FireBase JWT Class.

class ControllerAdminAuthenticateAPI extends Controller
{

    protected function setGateway() {
        $this->gateway = new GatewayAdmin();
    }

    protected function processRequest() {
        $data = [];

        $email = $this->getRequest()->getParameter("user_email"); //Assigns the value $email to be the same as the email address within the SQL.
        $password = $this->getRequest()->getParameter("user_password"); //Assigns the value $password to be the same as the password within the SQL.

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!is_null($email) && !is_null($password)) { //If values are entered for both email and password, the password is entered is checked to if it matches the email address entered

                $this->getGateway()->loginAdmin($email);

                //If statement used if an password is found to a corresponding email within the database, retrieving the password in a hashed form for the user.
                if (count($this->getGateway()->getResult()) == 1) {
                    $hashpassword = $this->getGateway()->getResult()[0]['user_password'];

                    if (password_verify($password, $hashpassword)) {
                        $key = SECRET_KEY; //$key refers to the encryption key.

                        $payload = array(
                            "user_id" => $this->getGateway()->getResult()[0]['user_id'], //Assigns the user_id in the token to be the same as the id collected when checking the email address and password.
                            "exp" => time() + 2592000 //Set to 30 days till expiration.
                        );

                        $jwt = JWT::encode($payload, $key, 'HS256'); //Encodes the web token using JWT Class from Firebase.
                        $data = ['token' => $jwt];
                    }
                }
            }

            if (!array_key_exists('token', $data)) {
                $this->getResponse()->setMessage("Unauthorized");
                $this->getResponse()->setStatus(401);
            }
        } else {
            $this->getResponse()->setMessage("Method not Allowed");
            $this->getResponse()->setStatus(405);
        }

        return $data;
    }
}