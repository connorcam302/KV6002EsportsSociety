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

class ControllerPlayer extends Controller {
    
    protected function setGateway() {
        $this->gateway = new GatewayPlayer();
    }

    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest() {

        $id = $this->getRequest()->getParameter("id");
        $team = $this->getRequest()->getParameter("team");
        $game = $this->getRequest()->getParameter("game");
        
        if (!is_null($id)) {
            $this->getGateway()->findOne($id);
        } elseif (!is_null($team)) {
            $this->getGateway()->findByTeam($team);
        } elseif (!is_null($game)) {
            $this->getGateway()->findByGame($game);
        } else {
            $this->getGateway()->findAll();
        }
        
        return $this->getGateway()->getResult();
    }
}