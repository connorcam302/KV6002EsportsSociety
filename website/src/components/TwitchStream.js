import React from "react";
import {TwitchEmbed} from "react-twitch-embed";


/**
* TwitchStream
* 
* Creates a widget of the northumbria_esports twitch.tv stream using the TwitchEmbed package.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/

export default class TwitchStream extends React.Component {
    render() {
        return(
    <div className="streamcontainer">    
        <div className="streamplayer">
            <TwitchEmbed channel="northumbria_esports" id="northumbria_esports" muted />
        </div>
    </div> 
        )
    }
}