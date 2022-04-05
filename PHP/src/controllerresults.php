<?php

/**
 * Results Controller
 * 
 * This controller takes parameters from a "/api/results" request, and selected the appropriate gateway function based on the
 * parameters included in the request. If a game is included in the request, the findTeamResults() function will be used.
 * 
 * @example If the request contains ?team=2, the match information for team 2 will be returned.
 * 
 * @author Connor Campbell W18003255
 */

class ControllerResults extends Controller {
    
    protected function setGateway() {
        $this->gateway = new GatewayResults();
    }
    
    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest() {

        $teamid = $this->getRequest()->getParameter("team");
        $playerid = $this->getRequest()->getParameter("player");

        if (!is_null($teamid)) {
            $this->getGateway()->findTeamResults($teamid);
        } elseif (!is_null($playerid)) {
                $this->getGateway()->findPlayerResults($playerid);
        } else {
            $this->getGateway()->findAll();
        }
        
        return $this->getGateway()->getResult();
    }
}