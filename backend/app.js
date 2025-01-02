// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const recommendRoute = require("./routes/recommend");

// app.use("/recommend", recommendRoute);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

//Secoond -------------------------------

// const express = require("express");
// const cors = require("cors");
// const app = express();

// app.use(cors()); // Enable CORS for all requests
// app.use(express.json());

// app.post("/recommend", (req, res) => {
//     const query = req.body.query;
//     res.json({
//         songs: [
//             { title: "Test Song 1", artist: "Artist 1", cover: "", preview: "" },
//             { title: "Test Song 2", artist: "Artist 2", cover: "", preview: "" },
//         ],
//     });
// });
// const PORT = 3001; // Change to a different port
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });



// //Helper function
// const axios = require("axios");

// let accessToken = null;

// // Fetch Spotify access token
// const getSpotifyToken = async () => {
//     if (accessToken) return accessToken; // Reuse token if already fetched

//     try {
//         const response = await axios.post(
//             "https://accounts.spotify.com/api/token",
//             "grant_type=client_credentials",
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                     Authorization: `Basic ${Buffer.from(
//                         `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
//                     ).toString("base64")}`,
//                 },
//             }
//         );

//         accessToken = response.data.access_token;
//         setTimeout(() => {
//             accessToken = null; // Reset token after expiration
//         }, response.data.expires_in * 1000);

//         return accessToken;
//     } catch (error) {
//         console.error("Error fetching Spotify token:", error);
//         throw new Error("Failed to authenticate with Spotify");
//     }
// };

//const express = require("express");




const express = require("express"); // Import express
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

    
app.use(cors()); // Enable CORS for all requests
app.use(express.json());

let accessToken = null;

// Fetch Spotify access token
const getSpotifyToken = async () => {
    if (accessToken) return accessToken; // Reuse token if already fetched

    try {
        const response = await axios.post(
            "https://accounts.spotify.com/api/token",
            "grant_type=client_credentials",
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString("base64")}`,
                },
            }
        );

        accessToken = response.data.access_token;
        setTimeout(() => {
            accessToken = null; // Reset token after expiration
        }, response.data.expires_in * 1000);

        return accessToken;
    } catch (error) {
        console.error("Error fetching Spotify token:", error);
        throw new Error("Failed to authenticate with Spotify");
    }
};
//--------------------------------------------------------------
//BEFORE 15
// Route to fetch recommendations from Spotify
// app.post("/recommend", async (req, res) => {
//     const query = req.body.query;

//     if (!query) {
//         return res.status(400).json({ error: "Query is required" });
//     }

//     try {
//         const token = await getSpotifyToken();

//         // Fetch songs from Spotify
//         const response = await axios.get("https://api.spotify.com/v1/search", {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { q: query, type: "track", limit: 5 },
//         });

//         const songs = response.data.tracks.items.map((track) => ({
//             title: track.name,
//             artist: track.artists[0].name,
//             cover: track.album.images[0]?.url || "",
//             preview: track.preview_url || "",
//         }));

//         res.json({ songs });
//     } catch (error) {
//         console.error("Error fetching songs from Spotify:", error);
//         res.status(500).json({ error: "Failed to fetch songs from Spotify" });
//     }
// });


//--------------------------------------------------------------
//AFTER 15 SONGS
// app.post("/recommend", async (req, res) => {
//     const query = req.body.query;
//     const limit = parseInt(req.body.limit) || 15; // Default limit to 15
//     const offset = parseInt(req.body.offset) || 0; // Default offset to 0

//     console.log(`Query: ${query}, Limit: ${limit}, Offset: ${offset}`); // Debugging logs

//     if (!query) {
//         return res.status(400).json({ error: "Query is required" });
//     }

//     try {
//         const token = await getSpotifyToken();

//         // Fetch songs from Spotify
//         const response = await axios.get("https://api.spotify.com/v1/search", {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { q: query, type: "track", limit, offset },
//         });

//         console.log("Spotify Response Tracks:", response.data.tracks.items.map(track => track.name)); // Log tracks for debugging

//         const songs = response.data.tracks.items.map((track) => ({
//             title: track.name,
//             artist: track.artists[0].name,
//             cover: track.album.images[0]?.url || "",
//             preview: track.preview_url || "",
//         }));

//         res.json({ songs });
//     } catch (error) {
//         console.error("Error fetching songs from Spotify:", error);
//         res.status(500).json({ error: "Failed to fetch songs from Spotify" });
//     }
// });

//--------------------------------------------------------------

// app.post("/recommend", async (req, res) => {
//     const query = req.body.query;
//     const limit = parseInt(req.body.limit) || 15;
//     const offset = parseInt(req.body.offset) || 0;

//     if (!query) {
//         return res.status(400).json({ error: "Query is required" });
//     }

//     try {
//         const token = await getSpotifyToken();

//         const response = await axios.get("https://api.spotify.com/v1/search", {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { q: query, type: "track", limit, offset },
//         });

//         const songs = response.data.tracks.items.map((track) => ({
//             title: track.name,
//             artist: track.artists[0].name,
//             cover: track.album.images[0]?.url || "",
//             preview: track.preview_url || "",
//         }));

//         res.json({ songs });
//     } catch (error) {
//         console.error("Error fetching songs from Spotify:", error);
//         res.status(500).json({ error: "Failed to fetch songs from Spotify" });
//     }
// });

app.post("/recommend", async (req, res) => {
    const query = req.body.query;
    const limit = parseInt(req.body.limit) || 15;
    const offset = parseInt(req.body.offset) || 0;

    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        const token = await getSpotifyToken();

        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: { Authorization: `Bearer ${token}` },
            params: { q: query, type: "track", limit, offset },
        });

        console.log("Full Spotify Response:", JSON.stringify(response.data, null, 2)); // Log the response

        const songs = response.data.tracks.items.map((track) => ({
            title: track.name,
            artist: track.artists[0].name,
            cover: track.album.images[0]?.url || "",
            preview: track.preview_url || null,
            spotifyUrl: track.external_urls.spotify || "",
        }));
        

        res.json({ songs });
    } catch (error) {
        console.error("Error fetching songs from Spotify:", error);
        res.status(500).json({ error: "Failed to fetch songs from Spotify" });
    }
});


const PORT = 3001; // Backend port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});