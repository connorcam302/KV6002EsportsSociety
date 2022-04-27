import { Box } from "@mui/material";
import { FaInstagram, FaTwitter, FaTwitch, FaFacebook, FaDiscord } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Divider } from "@mui/material";

/**
* Footer
* 
* Creates a footer for the website to be shown on every page at the bottom. This contains
* all of the Northumbria Vikings socials links shown as their respective icons. Icons
* are taken from the ReactIcons package.
*
* @author Connor Campbell W18003255
* @collab
*
* @todo
*/

function Footer(){
    return(
    <Box sx={{marginLeft:20, marginRight:20, paddingTop:1 }}>
        <Divider style={{ background: '#D5761D' }}/>
            <Box  sx={{justifyContent: 'center', x:2,paddingTop:2, paddingBottom:2}} >
                <IconContext.Provider
                    value={{ color: '#827C74', size: '50px', paddingLeft:100 }}
                >
               <a href="https://www.instagram.com/northumbriagg/" target="_blank"><FaInstagram /></a> 
               <a href="https://twitter.com/NorthumbriaGG" target="_blank"><FaTwitter /> </a>
               <a href="https://www.facebook.com/NorthumbriaESports" target="_blank"><FaDiscord /></a>
               <a href="https://twitch.tv/northumbria_esports" target="_blank"><FaTwitch /></a>
               <a href="https://www.facebook.com/NorthumbriaESports" target="_blank"><FaFacebook /></a>
                </IconContext.Provider>
            </Box>
    </Box>
    )
}

export default Footer;