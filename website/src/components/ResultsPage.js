import React from "react";
import ResultsTable from "./ResultsTable";
import { Timeline } from 'react-twitter-widgets';
import { FacebookProvider, Page } from 'react-facebook';
import InstagramFeed from 'react-ig-feed';
import AdminResultsForm from "./AdminResultsForm";

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

                <div className="main">
                    <h1>Game Results</h1>
                    <p>Check out the latest results across all of our different teams inclduing information on opponents, dates, games and of course scoring. The table can be filtered using the toolbar at the top to search through all the matches played.</p>
                </div>

                <div className="rTable">
                    <h2>Results Table</h2>
                    <ResultsTable />
                </div>


                <div className="socials">
                    <p>Stay updated with the latest information by following the Northumbria Vikings socials where weekly results are also posted.</p>
                </div>

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

                {/* Need to configure access tokens for these socials in order for them to be displayed properly*/}
                
                
                <div className="fbPage">
                    <FacebookProvider appId="123456789">
                        <Page href="https://www.facebook.com/NorthumbriaESports" tabs="timeline" />
                    </FacebookProvider>
                </div>

                {/*
                <div className="insta">
                    <InstagramFeed token="684773662810417" counter="6" />
                    </div>*/}

            </div>
        )
    }
}

export default ResultsPage;
