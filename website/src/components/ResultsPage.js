import React from "react";
import ResultsTable from "./ResultsTable";
import { Timeline } from 'react-twitter-widgets';
import { FacebookProvider, Page } from 'react-facebook';
import InstagramFeed from 'react-ig-feed';
import Helmet from "react-helmet";

/**
* ResultsPage
* 
* Creates a results page using the ResultTable component. Features a brief description
about the table along with widgets to display various social sites that also provide match
results for users.
*
* @author Jacob Clark w18003237
* @collab
*
* @todo sort out access tokens
*/


class ResultsPage extends React.Component {
    render() {
        return (
            <div className="resultsWrapper">
                <Helmet>
                    <title>Results</title>
                </Helmet>

                <div className="main">
                    <h1>Game Results</h1>
                    <p>Check out the latest results across all of our different teams inclduing information on opponents, dates, games and of course scoring. The table can be filtered using the toolbar at the top to search through all the matches played. Results will be added as new matches take place so be sure to check back here weekly to see how your favorite teams are performing.</p>
                </div>

                
                {/*calls the result table component to be displayed within the page*/}

                <div className="rTable">
                    <ResultsTable />
                </div>

                <div className="socials">
                    <p>Stay updated with the latest information by following the Northumbria Vikings socials where weekly results are also posted. Also be sure to check out our discord server if you have any questions about who we are and what we do or are interested in getting involved.</p>
                </div>

                {/*inserts a timeline of the Northumbria vikings twitter using a react twitter plugin*/}
                <div className="twitterFeed">
                    <Timeline
                        dataSource={{
                            sourceType: 'profile',
                            screenName: 'NorthumbriaGG'
                        }}
                        options={{
                            height: '600',
                            theme: 'dark'
                        }}
                    />
                </div>


                {/*inserts a page snapshot of the Northumbria vikings FaceBook using a react fb plugin*/}
                <div className="fbPage">
                    <FacebookProvider  appId="1392115417891241">
                        <Page class="twitter" href="https://www.facebook.com/NorthumbriaESports" tabs="timeline" />
                    </FacebookProvider>
                </div>

                 {/*inserts a discord frame onto the page using the discord widget api and the the Northumbria Vikings server ID*/}
                <div className="discServer">
                <iframe class="discord" src="https://discordapp.com/widget?id=365832164853678081&theme=dark"/>
                </div>
                
                {/* Need to configure access tokens for these socials in order for them to be displayed properly*/}

                {/*
                <div className="insta">
                    <InstagramFeed token="684773662810417" counter="6" />
                    </div>*/}

            </div>
        )
    }
}

export default ResultsPage;
