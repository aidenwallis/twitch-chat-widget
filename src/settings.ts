let twitchID = "87763385";
let twitchLogin = "aiden";
const [
  customTwitchID,
  customTwitchLogin,
] = window.location.pathname.split("?")[0].substring(1).split("-");
console.log({customTwitchID, customTwitchLogin});
if (customTwitchID && customTwitchLogin) {
  console.log("Found custom Twitch ID & login...");
  twitchID = customTwitchID;
  twitchLogin = customTwitchLogin;
}

// TODO: This sucks :)
export const SETTINGS = {
  TWITCH_ID: twitchID,
  TWITCH_LOGIN: twitchLogin,
};
