<?php

/**
* App
* 
* The index page for routing users to the correct endpoint of the API.
*
* @author Ethan Borrill W18001798
* @collab Connor Campbell W18003255
*
* @todo
*/


include "config/config.php";

$request = new Request();

if(substr($request->getpath(),0,3)=== "api"){
    $response = new ResponseJSON();
}
else{
    set_exception_handler("exceptionHandlerHTML");
    print_r("html response");
    $response = new ResponseHTML();
}

switch ($request->getPath()) {
    case '':
    case 'api/userlogin':
        $controller = new ControllerAuthenticateApi($request,$response);
            break;
    case 'api/register':
        $controller = new ControllerRegisterApi($request,$response);
            break;
    case 'api/team':
        $controller = new ControllerTeam($request,$response);
            break;
    case 'api/player':
        $controller = new ControllerPlayer($request,$response);
            break;
    case 'api/results':
        $controller = new ControllerResults($request,$response);
            break;
    case 'api/accolades':
        $controller = new ControllerAccolades($request,$response);
            break;
    case 'api/eventsform':
        $controller = new ControllerEventFormApi($request,$response);
            break;        
    case 'api/editplayer':
        $controller = new ControllerEditPlayer($request,$response);
            break;
    case 'api/editteam':
        $controller = new ControllerEditTeam($request,$response);
            break;
    default:
        if(is_a($response, "ResponseHTML")){
            $controller = new ControllerError($request, $response);
        } else {
            $controller = new ControllerErrorApi($request, $response);
        }
        break;
    }

    echo $response->getData();