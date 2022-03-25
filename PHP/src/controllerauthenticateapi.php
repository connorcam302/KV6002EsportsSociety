<?php

use Firebase\JWT\JWT; //Implements the FireBase JWT Class.

class ControllerAuthenticateApi extends Controller
{

    protected function setGateway() {
        $this->gateway = new GatewayUser();
    }
    protected function processRequest() {
        $data = [];

        //Sets the parameters used
        $email = $this->getRequest()->getParameter("user_email");
        $password = $this->getRequest()->getParameter("user_password");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!is_null($email) && !is_null($password)) { //If values are entered for both email and password, the password is entered is checked to if it matches the email address entered

                $this->getGateway()->loginUser($email);

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