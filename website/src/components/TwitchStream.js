import React from "react";
import { TwitchChat, TwitchClip, TwitchEmbed,TwitchPlayer } from "react-twitch-embed";

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