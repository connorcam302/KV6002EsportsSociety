<?php

class ControllerRegisterApi extends Controller {

    protected function setGateway() {
        $this->gateway = new GatewayRegister();
    }

    protected function processRequest() {
        $email = $this->getRequest()->getParameter("user_email");
        $password = $this->getRequest()->getParameter("user_password");
        $userign = $this->getRequest()->getParameter("user_ign");
        $userFirst = $this->getRequest()->getParameter("user_firstName");
        $userLast = $this->getRequest()->getParameter("user_lastName");

        if ($this->getRequest()->getRequestMethod() === "POST"){
            //if the user does not exist (has not previously registered with this email)
            //then try to add user to database
            if (!$this->getGateway()->emailUsed($email)){

                if (!is_null($email) && !is_null($password) && !is_null($userign)  && !is_null($userFirst)  && !is_null($userLast)) {

                    if (strpos($email, '@gmail.com') 
                        || strpos($email, '@outlook.com') 
                        || strpos($email, '@yahoo.com') 
                        && strlen($password)>8 
                        && strlen($password)<=16)
                    {

                        $hashedpassword = password_hash($password, PASSWORD_DEFAULT);
                        $this->getGateway()->registerUser($email,$hashedpassword,$userign,$userFirst,$userLast);
                
                    } else {
                        $this->getResponse()->setMessage("The password or email you have entered cannot be used.");
                        $this->getResponse()->setStatusCode(406);
                    }
                } else {
                    $this->getResponse()->setMessage("The password or email you have entered cannot be used.");
                    $this->getResponse()->setStatusCode(406);
                }
            } else {
                //if the user is registered prompt a corresponding message
                //set status code to 403 forbidden
                $this->getResponse()->setMessage("Sorry, this email address is already in use!");
                $this->getResponse()->setStatusCode(403);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatusCode(405);
        }
    }
}