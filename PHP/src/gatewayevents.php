<?php

/**
 * GatewayEvent
 * 
 */

class GatewayEvents extends Gateway
{

    private $sql = "SELECT event_id, event_name, event_description, event_img, event_date FROM events";

    public function __construct()
    {
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

    /**
     * GatewayAdminEventForm
     * 
     * This gateway is used to insert details from the Event Form on the Admin Page into the Events table of the database.
     * It additionally includes an SQL query which checks to see if the event being entered has already been used.
     *
     * @author Ethan Borrill W18001798
    */


    /**
     * SQL Query for inserting Event form data.
     */
    public function AddEvent($eventName, $eventDesc, $eventDate)
    {
        $sql = "INSERT into events (event_name,event_description,event_date) 
                       values(:eventName,:eventDesc,:eventDate)";
        $params = [
            ":eventName" => $eventName,
            ":eventDesc" => $eventDesc,
            ":eventDate" => $eventDate,
        ];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        $this->setResult($result);
    }

    /**
     * SQL query checks if the event's name is already being used in the Database.
     */
    public function eventExists($eventName)
    {
        $sql = "SELECT * FROM events WHERE event_name  = :eventName";
        $params = [":eventName" => $eventName];
        $result = $this->getDatabase()->executeSQL($sql, $params);
        if ($result == FALSE) {
            return false;
        } else {
            return true;
        }
    }
}
