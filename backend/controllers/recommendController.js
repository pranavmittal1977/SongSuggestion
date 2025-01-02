const axios = require("axios");

let accessToken = null;

const getSpotifyToken = async () => {
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
};

exports.getRecommendations = async (req, res) => {
    const { query } = req.body;
    if (!accessToken) await getSpotifyToken();

    try {
        const response = await axios.get(
            "https://api.spotify.com/v1/search",
            {
                headers: { Authorization: `Bearer ${accessToken}` },
                params: { q: query, type: "track", limit: 10 },
            }
        );

        const tracks = response.data.tracks.items.map((track) => ({
            title: track.name,
            artist: track.artists[0].name,
            cover: track.album.images[0].url,
            preview: track.preview_url,
        }));

        res.json({ songs: tracks });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch songs" });
    }
};