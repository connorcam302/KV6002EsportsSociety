import { TwitchEmbed } from "react-twitch-embed";
import React from "react";

/**
* Twitch Player
* 
* Creates a component of a Twitch popout player using the TwitchEmbeded framework.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/


export default class TwitchPlayer extends React.Component {
    render() {
        return(
            <TwitchEmbed
                channel="northumbria_esports"
                id="northumbria_esports"
                theme="dark"
                muted />
        )
    }
}