import React from "react";
/**
 * Component displays the content needed for the Homepage users will land on when entering the website. 
 * 
 * @author Ethan Borrill W18001798
 */
class Homepage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div id="App">
                <h1>Home</h1>
                <h2>Northumbria eSports Society</h2>
                <h3>Lorem Ipsum Edit</h3>
            </div>
        );
    }
}
export default Homepage;