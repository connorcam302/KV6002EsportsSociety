<?php

class ControllerError extends Controller
{

    protected function processRequest() {
        $page = new ErrorPage("Page not found", "This page does not exist!");
        $page->addParagraph("Unfortunately, the page you are searching for does not exist! 
                            <br>
                            Please use the links below to return to pages used on the webpage:");
        $page->addLink("<li>
                        <ul><a href=\"/kf6012/coursework/part1/home\">Home</a></ul> 
                        <ul><a href=\"/kf6012/coursework/part1/documentation\">Documentation</a></ul>
                        </li>");

        return $page->generateWebPage();
    }
}