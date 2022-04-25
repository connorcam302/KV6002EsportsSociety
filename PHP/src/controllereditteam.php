<?php

/**
 * Player Controller
 * 
 * This controller takes parameters from a "/api/player" request, and selected the appropriate gateway function based on the
 * parameters included in the request. If a team is included in the request, the findByTeam() function will be used.
 * 
 * @example If the request contains ?team=2, the players of team 2 will be returned.
 * 
 * @author Connor Campbell W18003255
 */

class ControllerEditTeam extends Controller {
    
    protected function setGateway() {
        $this->gateway = new GatewayTeam();
    }

    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest() {

        if ($this->getRequest()->getRequestMethod() === "POST") {

            $name  = $this->getRequest()->getParameter("name");
            $id = $this->getRequest()->getParameter("id");
        
            if (!is_null($name) && !is_null($id)) {
                $this->getGateway()->editTeam($name,$id);
            } elseif (is_null($name) || is_null($id)) {
                $this->getResponse()->setMessage("Ensure that all mandatory fields are not null.");
                $this->getResponse()->setStatus(410);
            } else {
                $this->getResponse()->setMessage("Error was encountered.");
                $this->getResponse()->setStatus(505);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
    }
}

// ":useremail" => $email,
// ":userign" => $userign,
// ":userfirstName" => $userFirst,
// ":userlastName" => $userLast,
// ":usertwitch" => $userTwitch,
// ":usertwitter" => $userTwitter,
// ":userinstagram" => $userInstagram,
// ":id" => $id,