<?php

class ControllerAccoladesFormApi extends Controller
{

    protected function setGateway()
    {
        $this->gateway = new GatewayAccoladesForm();
    }

    protected function processRequest()
    {
        $teamid = $this->getRequest()->getParameter("userTeam_id");
        $accoladeid = $this->getRequest()->getParameter("accolade_id");

        if ($this->getRequest()->getRequestMethod() === "POST") {
            //if the user does not exist (has not previously registered with this email)
            //then try to add user to database
            if (!is_null($teamid) && !is_null($accoladeid)) {
                $this->getGateway()->AddAccolade($teamid, $accoladeid);
            } else {
                $this->getResponse()->setMessage("");
                $this->getResponse()->setStatus(406);
            }
        } else {
            $this->getResponse()->setMessage("Method not allowed");
            $this->getResponse()->setStatus(405);
        }
    }
}
