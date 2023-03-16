import {IRCMessage} from "irc-message-ts";
import React from "react";
import {ChatBadge} from "./chat-badge";
import {ChatEmote} from "./chat-emote";
import {ChatEmotePlacement} from "./chat-emote-placement";
import {ChatMessageUser} from "./chat-message-user";

// eslint-disable-next-line no-control-regex
const isActionRegex = /^\u0001ACTION (.*)\u0001$/;

export class ChatMessage {
  public readonly badges: ChatBadge[] = [];
  public readonly id: string = "";
  public readonly isAction: boolean = false;
  public readonly content: string = "";
  public isEmoteOnly = false;
  public parsedNodes: React.ReactNode[] = [];
  public readonly emotes: ChatEmote[] = [];
  public readonly user: ChatMessageUser;
  public readonly createdAt = Date.now();

  public constructor(private ircMessage: IRCMessage) {
    this.id = ircMessage.tags.id || "";
    this.content = ircMessage.trailing;

    const actionMatch = ircMessage.trailing.match(isActionRegex);
    if (actionMatch) {
      this.content = actionMatch[1];
      this.isAction = true;
    }

    this.user = new ChatMessageUser(
      ircMessage.tags["user-id"] || "",
      ircMessage.prefix?.split("!")[0] || "",
      ircMessage.tags["display-name"] || "",
      ircMessage.tags.color || "#666",
    );

    this.parseBadges();
    this.parseEmotes();
  }

  private parseBadges() {
    const badgeSpl = (this.ircMessage.tags.badges || "").split(",");

    for (let i = 0; i < badgeSpl.length; ++i) {
      const [name, version] = badgeSpl[i].split("/");
      if (!(name && version)) continue;
      this.badges.push(new ChatBadge(name, version));
    }
  }

  private parseEmotes() {
    const emotesSpl = (this.ircMessage.tags.emotes || "").split("/");

    for (let i = 0; i < emotesSpl.length; ++i) {
      const [emoteID, placementStr] = emotesSpl[i].split(":");
      if (!(emoteID && placementStr)) continue;

      const placements: ChatEmotePlacement[] = [];
      const placementSpl = placementStr.split(",");
      for (let i = 0; i < placementSpl.length; ++i) {
        const [startStr, endStr] = placementSpl[i].split("-");
        if (!(startStr && endStr)) continue;
        const start = parseInt(startStr);
        const end = parseInt(endStr);
        if (isNaN(start) || isNaN(end)) continue;
        placements.push(new ChatEmotePlacement(start, end));
      }

      placements.length &&
        this.emotes.push(new ChatEmote(emoteID, placements));
    }
  }
}
