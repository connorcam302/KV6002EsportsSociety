<?php

/**
 * Team Controller
 * 
 * This controller takes parameters from a "/api/team" request, and selected the appropriate gateway function based on the
 * parameters included in the request. If a game is included in the request, the findByGame() function will be used.
 * 
 * @example If the request contains ?game=3, the teams that play game 3 will returned.
 * 
 * @author Connor Campbell W18003255
 */

class ControllerTeam extends Controller {
    
    protected function setGateway() {
        $this->gateway = new GatewayTeam();
    }
    
    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest() {

        $id = $this->getRequest()->getParameter("id");
        $game = $this->getRequest()->getParameter("game");
        
        if (!is_null($id)) {
            $this->getGateway()->findOne($id);
        } elseif (!is_null($game)){
            $this->getGateway()->findByGame($game);
        } else {
            $this->getGateway()->findAll();
        }
        
        return $this->getGateway()->getResult();
    }
}