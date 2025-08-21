import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/common/db/prisma";
import errorHandler from "@/common/error";

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { code, error } = req.query;
    if (error) {
      throw new Error(`Spotify authorization error: ${error}`);
    }

    if (typeof code !== "string") {
      throw new Error("Invalid authorization code.");
    }

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_HOST}/api/spotify/callback`,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET,
            ).toString("base64"),
        },
      },
    );

    const { access_token, refresh_token, expires_in } = response.data;

    await prisma.spotify.update({
      where: {
        id: "68a2a6ddd29a4b03ad668abb",
      },
      data: {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresAt: new Date(Date.now() + expires_in * 1000),
      },
    });

    return res.redirect("/");
  } catch (err) {
    const msg = errorHandler(err);
    return res.status(500).json({
      success: false,
      error: msg,
    });
  }
}
