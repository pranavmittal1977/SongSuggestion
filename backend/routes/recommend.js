// // const express = require("express");
// // const router = express.Router();
// // const recommendController = require("../controllers/recommendController");

// // router.post("/", recommendController.getRecommendations);

// // module.exports = router;

// const axios = require("axios");

// let accessToken = null;

// // Function to get Spotify access token
// const getSpotifyToken = async () => {
//     if (accessToken) return accessToken; // Reuse token if available

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

//         // Reset token after expiration
//         setTimeout(() => {
//             accessToken = null;
//         }, response.data.expires_in * 1000);

//         return accessToken;
//     } catch (error) {
//         console.error("Error fetching Spotify token:", error);
//         throw new Error("Failed to authenticate with Spotify");
//     }
// };

// // Function to get song recommendations
// const getRecommendations = async (req, res) => {
//     const query = req.body.query;

//     if (!query) {
//         return res.status(400).json({ error: "Query is required" });
//     }

//     try {
//         const token = await getSpotifyToken();

//         // Fetch songs from Spotify
//         const response = await axios.get("https://api.spotify.com/v1/search", {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { q: query, type: "track", limit: 25 },
//         });


//         console.log(response.data.tracks.items.map((track) => ({
//             title: track.name,
//             preview: track.preview_url,
//         })));

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
// };

// module.exports = {
//     getRecommendations,
// };



//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// const getRecommendations = async (req, res) => {
//     const query = req.body.query;
//     const limit = parseInt(req.body.limit) || 15; // Default to 25 songs
//     const offset = parseInt(req.body.offset) || 0; // Default to 0 (start of results)
//     console.log(`Query: ${query}, Limit: ${limit}, Offset: ${offset}`);
//     if (!query) {
//         return res.status(400).json({ error: "" });
//     }

//     try {
//         const token = await getSpotifyToken();

//         // Fetch songs from Spotify
//         const response = await axios.get("https://api.spotify.com/v1/search", {
//             headers: { Authorization: `Bearer ${token}` },
//             params: { q: query, type: "track", limit, offset },
//         });
//         console.log("Spotify Response:", response.data.tracks.items.map(item => item.name)); // Debugging Spotify Response


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
// };

const axios = require("axios");

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

        // Log the token for debugging
        console.log("Spotify Access Token:", accessToken);

        // Set a timeout to invalidate the token after it expires
        setTimeout(() => {
            accessToken = null;
        }, response.data.expires_in * 1000);

        return accessToken;
    } catch (error) {
        console.error("Error fetching Spotify token:", error.response?.data || error.message);
        throw new Error("Failed to authenticate with Spotify");
    }
};

// Function to fetch song recommendations
const getRecommendations = async (req, res) => {
    const query = req.body.query;
    const limit = parseInt(req.body.limit) || 15; // Default limit to 15 songs
    const offset = parseInt(req.body.offset) || 0; // Default offset to 0

    console.log(`Query: ${query}, Limit: ${limit}, Offset: ${offset}`); // Log query details

    if (!query) {
        return res.status(400).json({ error: "Query is required" });
    }

    try {
        const token = await getSpotifyToken();
        console.log("Requesting Spotify API with params:", { q: query, type: "track", limit, offset });

        // Fetch songs from Spotify
        const response = await axios.get("https://api.spotify.com/v1/search", {
            headers: { Authorization: `Bearer ${token}` },
            params: { q: query, type: "track", limit, offset },
        });


        // Debugging Spotify API response
        console.log("Spotify API Response:", response.data);
        response.data.tracks.items.forEach((track) => {
            if (!track.preview_url) {
                console.log(`Preview not available for track: ${track.name}`);
            }
        });        
        // Log the tracks received from Spotify
        console.log("Spotify Response Tracks:", response.data.tracks.items.map(track => track.name));

        const songs = response.data.tracks.items.map((track) => ({
            title: track.name,
            artist: track.artists[0].name,
            cover: track.album.images[0]?.url || "",
            preview: track.preview_url || null,
            spotifyUrl: track.external_urls.spotify || "",
        }));
        res.json({ songs });
        


    } catch (error) {
        console.error("Error fetching songs from Spotify:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch songs from Spotify" });
    }
};

module.exports = {
    getRecommendations,
};
