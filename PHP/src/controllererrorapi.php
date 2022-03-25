<?php

class ControllerErrorApi extends Controller
{
    protected function processRequest()
    {
        $this->getResponse()->setMessage("Page not found");
        $this->getResponse()->setStatus(404);
    }

}