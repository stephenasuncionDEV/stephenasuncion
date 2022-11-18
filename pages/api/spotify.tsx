import type { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";

const imageToBase64 = async (imageUrl: string) => {
  const res = await fetch(imageUrl);
  const blob = await res.arrayBuffer();
  return Buffer.from(blob).toString("base64");
};

class SpotifyAPI {
  accessToken: string;

  constructor() {
    this.accessToken = "";
  }

  getAccessToken: () => void = async () => {
    const token = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
    ).toString("base64");

    const data = qs.stringify({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
    });

    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data,
    });

    const tokenRes2 = await tokenRes.json();

    this.accessToken = tokenRes2.access_token;
  };

  getData: (uri: string) => Promise<any> = async (uri) => {
    try {
      const resTemp = await fetch(uri, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      });

      const res = await resTemp.json();
      return res;
    } catch (err: any) {
      return null;
    }
  };

  getRecentlyPlayed: () => Promise<any> = async () => {
    const data = await this.getData(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
    );
    if (!data) return null;

    return data.items;
  };

  getCurrentlyPlaying: () => Promise<any> = async () => {
    const data = await this.getData(
      "https://api.spotify.com/v1/me/player/currently-playing",
    );
    if (!data) return null;

    return data.item;
  };
}

const isColorHex = (color: string) => {
  return /^[0-9A-F]{6}$/i.test(color);
};

const Spotify = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "GET") {
      const { v, bgColor, borderColor, borderRadius, barColor, color } =
        req.query;

      const spotify = new SpotifyAPI();
      await spotify.getAccessToken();
      const recentPlayed = await spotify.getRecentlyPlayed();
      const currentlyPlaying = await spotify.getCurrentlyPlaying();

      const recentIndex = Math.floor(Math.random() * recentPlayed.length);
      const {
        name: title,
        artists,
        album: { images },
        external_urls: { spotify: song_uri },
      } = currentlyPlaying || recentPlayed[recentIndex].track;

      const {
        name: artist_name,
        external_urls: { spotify: artist_uri },
      } = artists[0];

      const spotifyLogoInB64 = await imageToBase64(
        "https://www.freepnglogos.com/uploads/spotify-logo-png/file-spotify-logo-png-4.png",
      );
      const defCoverInB64 = await imageToBase64(
        "https://i.pinimg.com/736x/c9/e3/e8/c9e3e810a8066b885ca4e882460785fa.jpg",
      );
      const coverInB64 = await imageToBase64(images[0].url);

      const hasAFeature = title.indexOf("(") !== -1;

      const song = {
        title: !hasAFeature ? title : title.slice(0, title.indexOf("(") - 1),
        artist: artist_name,
        artist_uri,
        song_uri,
        cover: `data:image/png;base64, ${
          !images.length ? defCoverInB64 : coverInB64
        }`,
      };

      res.setHeader("Content-Type", "image/svg+xml");
      res.setHeader(
        "cache-control",
        "public, s-maxage=60, stale-while-revalidate=30",
      );

      if (v === "1") {
        res.send(`<svg width="480" height="133" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Stephen Asuncion's Portfolio</title>
          <foreignObject width="480" height="133">
              <div xmlns="http://www.w3.org/1999/xhtml" class="container">
                  <style>
                      .main {
                          display: flex;
                      }
      
                      .currentStatus {
                          float: left;
                          font-size: 24px;
                          position: static;
                          margin-top: -5px;
                          margin-left: 10px;
                      }
                      
                      .container {
                          border-radius: ${borderRadius || "5"}px;
                          padding: 10px 10px 10px 0px;
                          background-color: ${
                            (isColorHex(bgColor as string)
                              ? `#${bgColor}`
                              : bgColor) || "transparent"
                          };
                          border: 1px solid ${
                            (isColorHex(borderColor as string)
                              ? `#${borderColor}`
                              : borderColor) || "transparent"
                          };
                      }
      
                      .art {
                          width: 27%;
                          float: left;
                          margin-left: -5px;
                      }
      
                      .content {
                          width: 71%;
                      }
      
                      .song {
                          width: 330px;
                          color: ${
                            (isColorHex(color as string)
                              ? `#${color}`
                              : color) || "#202124"
                          };
                          overflow: hidden;
                          margin-top: 3px;
                          font-size: 24px;
                          text-align: center;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                      }
      
                      .artist {
                          width: 330px;
                          color: ${
                            (isColorHex(color as string)
                              ? `#${color}`
                              : color) || "#202124"
                          };
                          opacity: 0.6;
                          font-size: 20px;
                          margin-top: 4px;
                          text-align: center;
                          margin-bottom: 5px;
                          overflow: hidden;
                          white-space: nowrap;
                          text-overflow: ellipsis;
                      }
      
                      .cover {
                          width: 100px;
                          height: 100px;
                          border-radius: 5px;
                      }
      
                      #bars {
                          width: 40px;
                          height: 30px;
                          bottom: 23px;
                          position: absolute;
                          margin: -20px 0 0 0px;
                      }
      
                      .bar {
                          width: 3px;
                          bottom: 1px;
                          height: 3px;
                          position: absolute;
                          background: ${
                            (isColorHex(barColor as string)
                              ? `#${barColor}`
                              : barColor) || "#753FE5"
                          };
                          opacity: 0.8;
                          animation: sound 0ms -800ms linear infinite alternate;
                      }
                      
                      .spotify-logo {
                          position: fixed;
                          right: 20px;
                          top: 10px;
                          width: 25px;
                          filter: invert(1);
                      }
      
                      a {
                          text-decoration: none;
                      }
      
                      div {
                          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
                      }
                      
                      @keyframes sound {
                          0% {
                              height: 3px;
                              opacity: .35;
                          }
      
                          100% {
                              height: 15px;
                              opacity: 0.95;
                          }
                      }
      
                      .bar:nth-child(1)  { left: 1px; animation-duration: 1119ms; }.bar:nth-child(2)  { left: 5px; animation-duration: 1212ms; }.bar:nth-child(3)  { left: 9px; animation-duration: 1193ms; }.bar:nth-child(4)  { left: 13px; animation-duration: 1232ms; }.bar:nth-child(5)  { left: 17px; animation-duration: 1261ms; }.bar:nth-child(6)  { left: 21px; animation-duration: 1007ms; }.bar:nth-child(7)  { left: 25px; animation-duration: 1311ms; }.bar:nth-child(8)  { left: 29px; animation-duration: 1270ms; }.bar:nth-child(9)  { left: 33px; animation-duration: 1072ms; }.bar:nth-child(10)  { left: 37px; animation-duration: 1316ms; }.bar:nth-child(11)  { left: 41px; animation-duration: 1100ms; }.bar:nth-child(12)  { left: 45px; animation-duration: 1004ms; }.bar:nth-child(13)  { left: 49px; animation-duration: 1199ms; }.bar:nth-child(14)  { left: 53px; animation-duration: 1319ms; }.bar:nth-child(15)  { left: 57px; animation-duration: 1010ms; }.bar:nth-child(16)  { left: 61px; animation-duration: 1126ms; }.bar:nth-child(17)  { left: 65px; animation-duration: 1318ms; }.bar:nth-child(18)  { left: 69px; animation-duration: 1309ms; }.bar:nth-child(19)  { left: 73px; animation-duration: 1217ms; }.bar:nth-child(20)  { left: 77px; animation-duration: 1255ms; }.bar:nth-child(21)  { left: 81px; animation-duration: 1058ms; }.bar:nth-child(22)  { left: 85px; animation-duration: 1148ms; }.bar:nth-child(23)  { left: 89px; animation-duration: 1210ms; }.bar:nth-child(24)  { left: 93px; animation-duration: 1303ms; }.bar:nth-child(25)  { left: 97px; animation-duration: 1236ms; }.bar:nth-child(26)  { left: 101px; animation-duration: 1182ms; }.bar:nth-child(27)  { left: 105px; animation-duration: 1235ms; }.bar:nth-child(28)  { left: 109px; animation-duration: 1076ms; }.bar:nth-child(29)  { left: 113px; animation-duration: 1033ms; }.bar:nth-child(30)  { left: 117px; animation-duration: 1065ms; }.bar:nth-child(31)  { left: 121px; animation-duration: 1222ms; }.bar:nth-child(32)  { left: 125px; animation-duration: 1077ms; }.bar:nth-child(33)  { left: 129px; animation-duration: 1335ms; }.bar:nth-child(34)  { left: 133px; animation-duration: 1053ms; }.bar:nth-child(35)  { left: 137px; animation-duration: 1184ms; }.bar:nth-child(36)  { left: 141px; animation-duration: 1127ms; }.bar:nth-child(37)  { left: 145px; animation-duration: 1101ms; }.bar:nth-child(38)  { left: 149px; animation-duration: 1286ms; }.bar:nth-child(39)  { left: 153px; animation-duration: 1002ms; }.bar:nth-child(40)  { left: 157px; animation-duration: 1117ms; }.bar:nth-child(41)  { left: 161px; animation-duration: 1238ms; }.bar:nth-child(42)  { left: 165px; animation-duration: 1015ms; }.bar:nth-child(43)  { left: 169px; animation-duration: 1206ms; }.bar:nth-child(44)  { left: 173px; animation-duration: 1033ms; }.bar:nth-child(45)  { left: 177px; animation-duration: 1101ms; }.bar:nth-child(46)  { left: 181px; animation-duration: 1235ms; }.bar:nth-child(47)  { left: 185px; animation-duration: 1347ms; }.bar:nth-child(48)  { left: 189px; animation-duration: 1098ms; }.bar:nth-child(49)  { left: 193px; animation-duration: 1237ms; }.bar:nth-child(50)  { left: 197px; animation-duration: 1213ms; }.bar:nth-child(51)  { left: 201px; animation-duration: 1142ms; }.bar:nth-child(52)  { left: 205px; animation-duration: 1137ms; }.bar:nth-child(53)  { left: 209px; animation-duration: 1124ms; }.bar:nth-child(54)  { left: 213px; animation-duration: 1017ms; }.bar:nth-child(55)  { left: 217px; animation-duration: 1163ms; }.bar:nth-child(56)  { left: 221px; animation-duration: 1180ms; }.bar:nth-child(57)  { left: 225px; animation-duration: 1252ms; }.bar:nth-child(58)  { left: 229px; animation-duration: 1197ms; }.bar:nth-child(59)  { left: 233px; animation-duration: 1326ms; }.bar:nth-child(60)  { left: 237px; animation-duration: 1049ms; }.bar:nth-child(61)  { left: 241px; animation-duration: 1164ms; }.bar:nth-child(62)  { left: 245px; animation-duration: 1215ms; }.bar:nth-child(63)  { left: 249px; animation-duration: 1334ms; }.bar:nth-child(64)  { left: 253px; animation-duration: 1174ms; }.bar:nth-child(65)  { left: 257px; animation-duration: 1257ms; }.bar:nth-child(66)  { left: 261px; animation-duration: 1302ms; }.bar:nth-child(67)  { left: 265px; animation-duration: 1095ms; }.bar:nth-child(68)  { left: 269px; animation-duration: 1071ms; }.bar:nth-child(69)  { left: 273px; animation-duration: 1204ms; }.bar:nth-child(70)  { left: 277px; animation-duration: 1158ms; }.bar:nth-child(71)  { left: 281px; animation-duration: 1105ms; }.bar:nth-child(72)  { left: 285px; animation-duration: 1134ms; }.bar:nth-child(73)  { left: 289px; animation-duration: 1081ms; }.bar:nth-child(74)  { left: 293px; animation-duration: 1158ms; }.bar:nth-child(75)  { left: 297px; animation-duration: 1252ms; }.bar:nth-child(76)  { left: 301px; animation-duration: 1343ms; }.bar:nth-child(77)  { left: 305px; animation-duration: 1305ms; }.bar:nth-child(78)  { left: 309px; animation-duration: 1178ms; }.bar:nth-child(79)  { left: 313px; animation-duration: 1324ms; }.bar:nth-child(80)  { left: 317px; animation-duration: 1235ms; }.bar:nth-child(81)  { left: 321px; animation-duration: 1222ms; }.bar:nth-child(82)  { left: 325px; animation-duration: 1145ms; }.bar:nth-child(83)  { left: 329px; animation-duration: 1070ms; }.bar:nth-child(84)  { left: 333px; animation-duration: 1155ms; }
                  </style>
      
                  <div class="main">
                      <a class="art" href="${song.song_uri}" target="_blank">
                          <center>
                              <img src="${song.cover}" class="cover" />
                          </center>
                      </a>
                      <div class="content">
                          <a href="${song.song_uri}" target="_blank">
                              <div class="song">${song.title}</div>
                          </a>
                          <a href="${song.artist_uri}" target="_blank">
                              <div class="artist">${song.artist}</div>
                          </a>
                          <div id="bars">
                              <div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div  class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div    class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div  class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div    class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div  class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div    class='bar'></div><div class='bar'></div> <div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div  class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div    class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div  class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div    class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div  class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div    class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div  class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div><div class='bar'></div>
                          </div>
                      </div>
                  </div>
              </div>
          </foreignObject>
        </svg>`);
      } else {
        res.send(`<svg width="300" height="26" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Stephen Asuncion's Portfolio</title>
          <foreignObject width="300" height="26">
            <div xmlns="http://www.w3.org/1999/xhtml" class="container">
              <style>
                .main {
                  display: flex;
                  gap: .5em;
                  font-family: "Inter";
                  color: ${
                    (isColorHex(color as string) ? `#${color}` : color) ||
                    "black"
                  };
                  align-items: center;
                }

                .main p {
                  margin: 0;
                  font-size: 9pt;
                }

                .main p span {
                  font-weight: bold;
                  font-size: 10pt;
                }
              </style>
              <div class="main">
                <img src="data:image/png;base64,${spotifyLogoInB64}" width="26" height="26"/>
                <p>
                  ${
                    currentlyPlaying
                      ? !currentlyPlaying.explicit
                        ? `Listening to <span>${song.title}</span>`
                        : "Song is currently hidden 🤭"
                      : "Not Listening"
                  }
                </p>
              </div>
            </div>
          </foreignObject>
        </svg>`);
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default Spotify;
