<?php

/**
 * Results Controller
 * 
 * This controller takes parameters from a "/api/team" request, and selected the appropriate gateway function based on the
 * parameters included in the request. 
 * 
 * @example If a game is included in the request, the findByGame() function will be used.
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

        $id = $this->getRequest()->getParameter("team");
        
        if (!is_null($id)) {
            $this->getGateway()->findTeam3Results($id);
        } else {
            $this->getGateway()->findAll();
        }
        
        return $this->getGateway()->getResult();
    }
}