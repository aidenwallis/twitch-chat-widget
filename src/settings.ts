let twitchID = "87763385";
let twitchLogin = "aidenwallis";
const [customTwitchID, customTwitchLogin] = window.location.pathname.split('?')[0].substring(1).split('-');
if (customTwitchID && customTwitchLogin) {
  console.log('Found custom Twitch ID & login...');
  twitchID = customTwitchID;
  twitchLogin = customTwitchLogin;
}

console.log({customTwitchID, customTwitchLogin});


// TODO: This sucks :)
export const SETTINGS = {
  TWITCH_ID: twitchID,
  TWITCH_LOGIN: twitchLogin,
};
