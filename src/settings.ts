let twitchID = "87763385";
let twitchLogin = "aidenwallis";
let [customTwitchID, customTwitchLogin] = window.location.pathname.split('?')[0].substring(1).split('-');
if (customTwitchID && customTwitchLogin) {
  twitchID = customTwitchID;
  twitchLogin = customTwitchLogin;
}


// TODO: This sucks :)
export const SETTINGS = {
  TWITCH_ID: twitchID,
  TWITCH_LOGIN: twitchLogin,
};
