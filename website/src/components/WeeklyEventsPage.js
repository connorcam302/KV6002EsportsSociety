import React from "react";
import WeeklyEvents from "./WeeklyEvents.js"
import TwitchStream from "./TwitchStream.js";
import Helmet from "react-helmet";

class WeeklyEventsPage extends React.Component {
render(){
    return(
    
    <html>
        <head>

        </head>
            <Helmet>
                <title>Events</title>
            </Helmet>
            <body>
            <h1>WEEKLY EVENTS AND NEWS</h1>
            <div className="news">

                <h2>News Item 1:</h2>
                <img src="https://pbs.twimg.com/profile_banners/1052178284170145794/1569603900/1500x500" 
                width="330" 
                height="125" />
                <p>Any geeks can help other geeks by writing
                articles on the GeeksforGeeks, publishing
                articles follow few steps that are Articles
                that need little modification/improvement
                from reviewers are published first.</p>

                <h2>News Item 2:</h2>
                <img src="https://pbs.twimg.com/profile_banners/1052178284170145794/1569603900/1500x500" 
                width="330" 
                height="125" />
                <p>Any geeks can help other geeks by writing
                articles on the GeeksforGeeks, publishing
                articles follow few steps that are Articles
                that need little modification/improvement
                from reviewers are published first.</p>

                <h2>News Item 3:</h2>
                <img src="https://pbs.twimg.com/profile_banners/1052178284170145794/1569603900/1500x500" 
                width="330" 
                height="125" />
                <p>Any geeks can help other geeks by writing
                articles on the GeeksforGeeks, publishing
                articles follow few steps that are Articles
                that need little modification/improvement
                from reviewers are published first.</p>

                <h2>News Item 4:</h2>
                <img src="https://pbs.twimg.com/profile_banners/1052178284170145794/1569603900/1500x500" 
                width="330" 
                height="125" />
                <p>Any geeks can help other geeks by writing
                articles on the GeeksforGeeks, publishing
                articles follow few steps that are Articles
                that need little modification/improvement
                from reviewers are published first.</p>
            </div>
            <TwitchStream/>
            <h2>CURRENT AND UPCOMING EVENTS</h2>
            <WeeklyEvents/>
        </body>
    </html>

    )
}
}


export default WeeklyEventsPage;
