// import React, { useState } from "react";
// import InputField from "./components/InputField";
// import SongList from "./components/SongList";
// import './styles/styles.css';

// function App() {
//     const [songs, setSongs] = useState([]);

//     const fetchSongs = async (input) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ query: input }),
//             });
//             const data = await response.json();
//             setSongs(data.songs);
//         } catch (error) {
//             console.error("Error fetching songs:", error);
//         }
//     };

//     return (
//         <div>
//             <h1>Song Suggestion App</h1>
//             <InputField onSearch={fetchSongs} />
//             <SongList songs={songs} />
//         </div>
//     );
// }

// export default App;



// import React, { useState } from "react";
// import InputField from "./components/InputField";
// import SongList from "./components/SongList";
// import './styles/styles.css';

// function App() {
//     const [songs, setSongs] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");

//     const fetchSongs = async (input) => {
//         try {
//             setIsLoading(true); // Show loading
//             setError(""); // Reset any previous errors

//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ query: input }),
//             });

//             if (!response.ok) {
//                 throw new Error(`Server error: ${response.status}`);
//             }

//             const data = await response.json();
//             setSongs(data.songs || []);
//         } catch (error) {
//             console.error("Error fetching songs:", error);
//             setError("Failed to fetch song recommendations. Please try again.");
//         } finally {
//             setIsLoading(false); // Hide loading
//         }
//     };

//     return (
//         <div className="app-container">
//             <h1>Song Suggestion App</h1>
//             <p>Enter your mood or genre to get song recommendations!</p>
//             <InputField onSearch={fetchSongs} />
//             {isLoading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p className="error">{error}</p>
//             ) : (
//                 <SongList songs={songs} />
//             )}
//         </div>
//     );
// }

// export default App;



// import React, { useState } from "react";
// import InputField from "./components/InputField";
// import SongList from "./components/SongList";
// import './styles/styles.css';

// function App() {
//     const [songs, setSongs] = useState([]);
//     const [query, setQuery] = useState("");
//     const [offset, setOffset] = useState(0); // Offset for pagination
//     const [hasMore, setHasMore] = useState(true); // Track if more results are available
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState("");

//     const fetchSongs = async (input, append = false) => {
//         try {
//             setIsLoading(true);
//             setError("");

//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ query: input, offset, limit: 15 }),
//             });

//             if (!response.ok) {
//                 throw new Error(`Server error: ${response.status}`);
//             }

//             const data = await response.json();
//             if (data.songs.length > 0) {
//                 setSongs((prevSongs) => (append ? [...prevSongs, ...data.songs] : data.songs));
//                 setOffset((prevOffset) => prevOffset + 15); // Increment offset for next request
//             } else {
//                 setHasMore(false); // No more results available
//             }
//         } catch (error) {
//             console.error("Error fetching songs:", error);
//             setError("Failed to fetch song recommendations. Please try again.");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSearch = (input) => {
//         setQuery(input);
//         setOffset(0);
//         setHasMore(true); // Reset for a new search
//         fetchSongs(input);
//     };

//     const loadMoreSongs = () => {
//         fetchSongs(query, true); // Fetch more songs and append to the existing list
//     };

//     return (
//         <div className="app-container">
//             <h1>Melody Match</h1>
            
//             <p>Feel it, search it, play it!</p>
//             <InputField onSearch={handleSearch} />
//             {isLoading && <p>Loading...</p>}
//             {error && <p className="error">{error}</p>}
//             <SongList songs={songs} />
//             {hasMore && songs.length > 0 && !isLoading && (
//                 <button className="load-more-button" onClick={loadMoreSongs}>
//                     More Suggestions
//                 </button>
//             )}
//         </div>
//     );
// }

// export default App;

import React, { useState } from "react";
import InputField from "./components/InputField";
import SongList from "./components/SongList";
import "./styles/styles.css";

function App() {
    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState("");
    const [offset, setOffset] = useState(0); // Offset for pagination
    const [hasMore, setHasMore] = useState(true); // Track if more results are available
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Fetch songs from backend
    const fetchSongs = async (append = false) => {
        if (!query.trim()) return; // Do nothing if query is empty
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query, offset, limit: 15 }),
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            if (data.songs.length > 0) {
                setSongs((prevSongs) => (append ? [...prevSongs, ...data.songs] : data.songs));
                setOffset((prevOffset) => prevOffset + 15); // Increment offset for next request
            } else {
                setHasMore(false); // No more results available
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
            setError("Failed to fetch song recommendations. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle search button click
    const handleSearch = () => {
        setOffset(0);
        setHasMore(true); // Reset for a new search
        fetchSongs();
    };

    // Handle clear button click
    const clearResults = () => {
        setQuery("");
        setSongs([]);
        setOffset(0);
        setHasMore(true);
        setError("");
    };

    // Fetch more songs when "More Suggestions" is clicked
    const loadMoreSongs = () => {
        fetchSongs(true); // Fetch more songs and append to the list
    };

    return (
        <div className="app-container">
            <h1>MelodyMatch</h1>
            <p>Feel the vibe, live the tune.</p>
            <InputField query={query} setQuery={setQuery} onSearch={handleSearch} />
            <div className="button-group">
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
                <button className="clear-button" onClick={clearResults}>
                    Clear
                </button>
            </div>
            {isLoading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <SongList songs={songs} />
            {hasMore && songs.length > 0 && !isLoading && (
                <button className="load-more-button" onClick={loadMoreSongs}>
                    More Suggestions
                </button>
            )}
        </div>
    );
}

export default App;
