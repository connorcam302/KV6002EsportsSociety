<?php

/**
 * GatewayEvent
 * 
 */         

class GatewayEvents extends Gateway  {

    private $sql = "SELECT event_id, event_name, event_description, event_img, event_date FROM events";

    public function __construct() {
        $this->setDatabase(DATABASE);
    }

    /**
     * Returns all events within the database.
     *
     * @return   array
     */

    public function findAll()
    {
        $result = $this->getDatabase()->executeSQL($this->sql);
        $this->setResult($result);
    }
}