<?php

/**
 * Accolades Controller
 * 
 * This controller takes parameters from a "/api/accolades" request, and selected the appropriate gateway function based on the
 * parameters included in the request. If a teamID is included in the request, the findByGame() function will be used.
 * 
 * @example If the request contains ?team=2, the accolades of team 2 will be returned.
 * 
 * @author Connor Campbell W18003255
 */
class ControllerAccolades extends Controller {
    
    protected function setGateway() {
        $this->gateway = new GatewayAccolades();
    }
    
    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest() {

        $teamid = $this->getRequest()->getParameter("team");
        $playerid = $this->getRequest()->getParameter("player");
        $teamidbest = $this->getRequest()->getParameter("teambest");
        $playeridbest = $this->getRequest()->getParameter("playerbest");

        
        if ($teamid == "all") {
            $this->getGateway()->findAll();
        } elseif (!is_null($teamid)) {
            $this->getGateway()->findByTeam($teamid);
        } elseif ($playerid == "all") {
            $this->getGateway()->findAll();
        } elseif (!is_null($playerid)) {
            $this->getGateway()->findByPlayer($playerid);
        } elseif (!is_null($teamidbest)) {
            $this->getGateway()->findTeamBest($teamidbest);
        } elseif (!is_null($playeridbest)) {
            $this->getGateway()->findPlayerBest($playeridbest);
        }else {
            $this->getGateway()->findAllPossible();
        }
        
        return $this->getGateway()->getResult();
    }
}