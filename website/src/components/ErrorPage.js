import React from "react";

class ErrorPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <h1>Page not found!</h1>
                <p>Unfortunately, the page you are looking for does not exist! Please use the Navigation bar at the top to return to an existing page:</p>
            </div>
        )
    }
}

export default ErrorPage;