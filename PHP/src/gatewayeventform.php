<?php


class GatewayEventForm extends Gateway
{
    public function __construct() {
        $this->setDatabase(DATABASE);
    }


public function AddEvent($eventName,$eventDesc,$eventImg,$eventDate) {
    $sql = "INSERT into events (event_name,event_description,event_img,event_date) 
                       values(:eventName,:eventDesc,:eventImg, :eventDate)";
    $params = [
               ":eventName" => $eventName,
               ":eventDesc" => $eventDesc,
               ":eventImg" => $eventImg,
               ":eventDate" => $eventDate,     
            ];
    $result = $this->getDatabase()->executeSQL($sql, $params);
    $this->setResult($result);
}

public function eventExists($eventName) {
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
