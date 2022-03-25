<?php

/**
 * The Webpage class generates a webpage template for all HTML/php webpages to use, this is intended to prevent retyping code on each webpage, helping to increase modularity.
 * 
 * @author Ethan Borrill W18001798
 */
abstract class Webpage
{
    private $head; //Sets variable used in conjunction with the Header of the webpage
    private $foot; //Sets variable used in conjunction with the Footer of the webpage
    private $body; //Sets variable used in conjunction with the Body of the webpage.

    /** 
     * The constructor used initialises the objects of setHead and addHeading1 for use. 
     * 
     * @param string $title - Contains the text entered to be displayed as the title of the webpage.
     * @param string $heading - ???????????
     */
    public function __construct($title, $heading) {
        $this->setHead($title);
        $this->addHeading1($heading);
        $this->setFoot();
    }

    /**
     * the setHead function initialisies important aspects of the webpage. This includes the addition of the CSS file, important HTML code, the header and declaration of the head and body.
     * 
     * @param string $title - Contains the text entered to be displayed as the title of the webpage.
     */
    protected function setHead($title) {
        $css = BASEPATH . "assets/style.css";
        $this->head = <<<EOT
<!DOCTYPE html>
<html lang="en-gb">
<head>
    <title>$title</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href=$css>
</head>
<body>
EOT;
    }

    /**
     * getHead retrieves the head implemented by setHead and returns it to be generated on the webpage.
     */
    private function getHead() {
        return $this->head;
    }

    /**
     * setBody collects text written in functions such as addParagraph,Heading1,Heading2,List and List and implements it.
     * 
     * @param string $text - Contains the text used in the body.
     */
    protected function setBody($text) {
        $this->body .= $text;
    }

    /**
     * getBody collects the values and information within setBody and returns it onto the webpage.
     */
    private function getBody() {
        return $this->body;
    }

    /**
     * setFoot declares the end of both the body and the webpage. 
     */
    protected function setFoot() {
        $this->foot = <<<EOT
</body>
</html>
EOT;
  }

    /**
     * getFoot retrieves the setFoot to be generated on the webpage.
     */
    private function getFoot() {
        return $this->foot;
    }

    /**
     * addHeading1 is used for general titles on webpages, can be seen on the Documentation page in the writing of 'The Endpoints'.
     * 
     * @param string $text - Contains the text used to represent the heading.
     */
    protected function addHeading1($text) {
        $this->setBody("<h1>$text</h1>");
    }

    /**
     * addHeading2 is used for smaller and minor titles on webpages, this can also be seen on the Documentation page on the title of API endpoints.
     * 
     * @param string $text - Contains the text used to represent the heading.
     */
    protected function addHeading2($text) {
        $this->setBody("<h2>$text</h2>");
    }

    /**
     * addParagraph is utilised to display text within a <p> tag, this will be used on all HTML/php webpages.
     * 
     * @param string $text - contains the text entered within a paragraph created by the method, which is then displayed on the webpage.
     */
    public function addParagraph($text) {
        $this->setBody("<p>$text</p>");
    }

    /**
     * addList is utilised to display text within a <ul> tag, this will be used on all HTML/php webpages.
     * 
     * @param string $text - contains the text entered within an unordered list created by the method, which is then displayed on the webpage.
     */
    public function addList($text) {
        $this->setBody("<ul>$text</ul>");
    }

    /**
     * addCode is utilised to display text within a <pre> tag, this will be used on all HTML/php webpages.
     * 
     * @param string $text - contains the text in a preformatted manner created by the method, which is then displayed on the webpage.
     */
    public function addCode($text) {
        $this->setBody("<pre>$text</pre>");
    }

    /**
     * addLink displays links to other webpahes within a <a> tag, this is used in the Controller error.
     * 
     * @param string $text - contains the link entered within the method to be displayed on the webpage.
     */
    public function addLink($text) {
        $this->setBody("<a>$text</a>");
    }

    /**
     * Generates the webpage content utilisied the head, body and foot components generated.
     * 
     * @return mixed head - Content of the header.
     * @return mixed body - Content set within the body.
     * @return mixed foot - Content contained within the footer.
     */
    public function generateWebpage() {
        return $this->head . $this->body . $this->foot;
    }
}
