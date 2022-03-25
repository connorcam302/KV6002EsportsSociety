<?php

/**
 * The child class of response responsible for handling data within the JSON areas of the webpage, containing the functions for setting status codes and messages on the API’s created. 
 * Both for when content is okay and in the case of an error.
 *
 * @author Ethan Borrill W18001798
 */

class ResponseJSON extends Response
{
    private $message;
    private $statusCode;

    protected function headers() {
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");
    }

    public function setMessage($message) {
        $this->message = $message;
    }

    public function setStatus($statusCode) {
        $this->statusCode = $statusCode;
    }

    public function getData() {
        if (is_null($this->data)) {
            $this->data = [];
        }

        if (is_null($this->message)) {
            if (count($this->data) > 0) {
                $this->message = "OK";
                $this->setStatus(200);
                //If data has a length greater than 0, an okay message is returned.
            } else {
                $this->message = "Resource Not Found";
                $this->setStatus(404);
                //If there is no data available, a 'Resource Not Found' message will be returned with a 404 status code.
            }
        }
        http_response_code($this->statusCode);

        $response['message'] = $this->message;
        $response['count'] = count($this->data);
        $response['results'] = $this->data;

        return json_encode($response);
    }
}