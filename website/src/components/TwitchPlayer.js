import { TwitchChat, TwitchClip, TwitchEmbed,TwitchPlayer } from "react-twitch-embed";

export default class RegisterPage extends React.Component {
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