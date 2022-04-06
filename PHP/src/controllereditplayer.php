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

class ControllerEditPlayer extends Controller {
    
    protected function setGateway() {
        $this->gateway = new GatewayEditPlayer();
    }

    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest() {

            $email  = $this->getRequest()->getParameter("email");
            $ign = $this->getRequest()->getParameter("ign");
            $first = $this->getRequest()->getParameter("first");
            $last = $this->getRequest()->getParameter("last");
            $twitch = $this->getRequest()->getParameter("twitch");
            $twitter = $this->getRequest()->getParameter("twitter");
            $instagram = $this->getRequest()->getParameter("instagram");
            $id = $this->getRequest()->getParameter("id");
        
            if (is_null($email) || is_null($ign) || is_null($first) || is_null($last) || is_null($id)) {
                $this->getResponse()->setMessage("Ensure that all mandatory fields are not null.");
                $this->getResponse()->setStatusCode(410);
            } elseif (!is_null($email) && !is_null($ign) && !is_null($first) && !is_null($last) && !is_null($id)) {
                $this->getGateway()->editPlayer($email,$ign,$first,$last,$twitch,$twitter,$instagram,$id);
            } else {
                $this->getResponse()->setMessage("Error was encountered.");
                $this->getResponse()->setStatusCode(505);
            }
        //     } else {
        //     $this->getResponse()->setMessage("Method not allowed");
        //     $this->getResponse()->setStatusCode(405);
        // }
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