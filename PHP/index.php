<?php

include "config/config.php";

$request = new Request();

if(substr($request->getpath(),0,3)=== "api"){
    $response = new ResponseJSON();
}
else{
    set_exception_handler("exceptionHandlerHTML");
    $response = new ResponseHTML();
}

switch ($request->getPath()) {
    case '':
    case 'api/userlogin':
        $controller = new ControllerAuthenticateApi($request,$response);
            break;
    case 'api/adminlogin':
        $controller = new ControllerAdminAuthenticateApi($request,$response);
            break;
    case 'api/register':
        $controller = new ControllerRegisterApi($request,$response);
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