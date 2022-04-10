<?php

/**
 * ControllerPendingTeamsFormRemove
 * 
 * This controller handles and manages the papers on users reading lists.
 * 
 * The class uses a POST request method within an if statement to reject an pending team application, deleting it from the database.
 *
 * @author Ethan Borrill W18001798
 */
class ControllerPendingTeamsFormRemove extends Controller
{
    /**
     * The setGateway function allocates the List Gateway to this controller in order to access the relevant 'params' objects collected from their respective SQL Queries. 
     */
    protected function setGateway()
    {
        $this->gateway = new GatewayPendingTeamsFormRemove();
    }

     /**
     * Processrequest takes the parameters implemented in the gateway.
     * 
     * @return mixed $this - Returns the results collected from the gateway.
     */
    protected function processRequest()
    {

        $teamid = $this->getRequest()->getParameter("team_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            if (!is_null($teamid)) {
                $this->getGateway()->DeleteTeam($teamid);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
        return $this->getGateway()->getResult();
    }
}
