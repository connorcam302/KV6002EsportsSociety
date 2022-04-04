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

        $id = $this->getRequest()->getParameter("team");
        
        if (!is_null($id)) {
            $this->getGateway()->findByTeam($id);
        } else {
            $this->getGateway()->findAll();
        }
        
        return $this->getGateway()->getResult();
    }
}