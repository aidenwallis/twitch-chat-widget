let twitchID = "87763385";
let twitchLogin = "aiden";
const [customTwitchID, customTwitchLogin] = window.location.pathname
  .split("?")[0]
  .substring(1)
  .split("-");

const params = (window.location.search || "")
  .substring(1)
  .split("&")
  .reduce((acc, cur) => {
    const [key, value] = cur.split("=", 2);
    acc[decodeURIComponent(key)] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);

if (customTwitchID && customTwitchLogin) {
  console.log("Found custom Twitch ID & login...");
  twitchID = customTwitchID;
  twitchLogin = customTwitchLogin;
}

const validThemes = new Set([
  "default",
  "simple",
  "emote",
  "emote_black",
]);

// TODO: This sucks :)
export const SETTINGS = {
  TWITCH_ID: twitchID,
  TWITCH_LOGIN: twitchLogin,
  theme: validThemes.has(params.theme || "default")
    ? params.theme || "default"
    : "default",
};

export function isEmoteOnly() {
  return (
    SETTINGS.theme === "emote" || SETTINGS.theme === "emote_black"
  );
}
