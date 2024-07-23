import os from "os";

import "dotenv/config";

// setup environment defaults
if (!process.env.ENVIRONMENT)
  process.env.ENVIRONMENT = `development-{os.hostname()}`;

if (!process.env.INTERVAL_SECONDS) process.env.INTERVAL_SECONDS = 60;

import { RefreshingAuthProvider } from "@twurple/auth";
import { ApiClient } from "@twurple/api";

import { insert } from "./controllers/mongodb.js";

const authProvider = new RefreshingAuthProvider({
  clientId: process.env.TWITCH_CLIENT_ID,
  clientSecret: process.env.TWITCH_CLIENT_SECRET,
});

// setup own user auth
await authProvider.addUserForToken({
  accessToken: process.env.TWITCH_CLIENT_ACCESS_TOKEN,
  refreshToken: process.env.TWITCH_CLIENT_REFRESH_TOKEN,
});

const api = new ApiClient({ authProvider });

const channels = ["area96digital", "yayjaybae", "kazuhaamanogawa"];

setInterval(async () => {
  channels.forEach(async (channelName) => {
    const user = await api.users.getUserByName(channelName);
    const userStream = await user.getStream();

    if (userStream) {
      await insert("streamViewers", {
        channelName,
        viewers: userStream.viewers,
      });

      console.log(`Channel ${channelName} has ${userStream.viewers} viewers`);
    }
  });
}, 1000 * process.env.INTERVAL_SECONDS);
