<?php

class ControllerEvents extends Controller {
    
    protected function setGateway() {
        $this->gateway = new GatewayEvents();
    }
    
    /**
     * Takes a the request and selects one gateway function to use based on the parameters provided.
     *
     * @return   array
     */

    protected function processRequest() {

            $this->getGateway()->findAll();
        
        return $this->getGateway()->getResult();
    }
}