// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;





// import React, { useState } from "react";
// import InputField from "./components/InputField";
// import SongList from "./components/SongList";
// import './styles/styles.css';

// function App() {
//     const [songs, setSongs] = useState([]);
//     const [query, setQuery] = useState("");
//     const [offset, setOffset] = useState(0);
//     const [hasMore, setHasMore] = useState(true); // Track if more results are available

//     const fetchSongs = async (input, append = false) => {
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ query: input, limit: 15, offset }),
//             });

//             const data = await response.json();

//             if (data.songs.length > 0) {
//                 setSongs((prevSongs) =>
//                     append ? [...prevSongs, ...data.songs] : data.songs
//                 );
//                 setOffset((prevOffset) => prevOffset + 15); // Increment offset for next request
//             } else {
//                 setHasMore(false); // No more results available
//             }
//         } catch (error) {
//             console.error("Error fetching songs:", error);
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
//             <h1>Song Suggestion App</h1>
//             <p>Enter your mood or genre to get song recommendations!</p>
//             <InputField onSearch={handleSearch} />
//             <SongList songs={songs} />
//             {hasMore && songs.length > 0 && (
//                 <button className="load-more-button" onClick={loadMoreSongs}>
//                     More Suggestions
//                 </button>
//             )}
//         </div>
//     );
// }

// export default App;

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//LATEST CODE

// import React, { useState } from "react";
// import InputField from "./components/InputField";
// import SongList from "./components/SongList";
// import './styles/styles.css';

// function App() {
//     const [songs, setSongs] = useState([]); // Store fetched songs
//     const [query, setQuery] = useState(""); // Current search query
//     const [offset, setOffset] = useState(0); // Offset for pagination
//     const [hasMore, setHasMore] = useState(true); // Track if more results are available
//     const [loading, setLoading] = useState(false); // Track loading state

//     // const fetchSongs = async (input, append = false) => {
//     //     if (loading) return; // Prevent duplicate requests
//     //     setLoading(true);

//     //     console.log(`Fetching songs with query: ${input}, offset: ${offset}, limit: 15`);

//     //     try {
//     //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend`, {
//     //             method: "POST",
//     //             headers: { "Content-Type": "application/json" },
//     //             body: JSON.stringify({ query: input, limit: 15, offset }),
//     //         });

//     //         const data = await response.json();
//     //         console.log("Fetched songs:", data.songs); // Log fetched songs

//     //         if (data.songs.length > 0) {
//     //             setSongs((prevSongs) =>
//     //                 append ? [...prevSongs, ...data.songs] : data.songs
//     //             );
//     //             setOffset((prevOffset) => prevOffset + 15); // Increment offset for next request
//     //         } else {
//     //             setHasMore(false); // No more results available
//     //         }
//     //     } catch (error) {
//     //         console.error("Error fetching songs:", error);
//     //     } finally {
//     //         setLoading(false); // Reset loading state
//     //     }
//     // };
//     const fetchSongs = async (input, append = false) => {
//         if (loading) return; // Prevent duplicate requests
//         setLoading(true);
    
//         console.log(`Fetching songs with query: ${input}, limit: 15, offset: ${offset}`); // Debugging
    
//         try {
//             const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ query: input, limit: 15, offset }),
//             });
    
//             const data = await response.json();
//             console.log("Fetched songs:", data.songs); // Debugging
    
//             if (data.songs.length > 0) {
//                 setSongs((prevSongs) =>
//                     append ? [...prevSongs, ...data.songs] : data.songs
//                 );
//                 setOffset((prevOffset) => prevOffset + 15); // Increment offset for pagination
//             } else {
//                 setHasMore(false); // No more results available
//             }
//         } catch (error) {
//             console.error("Error fetching songs:", error);
//         } finally {
//             setLoading(false); // Reset loading state
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
//             <h1>Song Suggestion App</h1>
//             <p>Enter your mood or genre to get song recommendations!</p>
//             <InputField onSearch={handleSearch} />
//             <SongList songs={songs} />
//             {hasMore && songs.length > 0 && (
//                 <button
//                     className="load-more-button"
//                     onClick={loadMoreSongs}
//                     disabled={loading}
//                 >
//                     {loading ? "Loading..." : "More Suggestions"}
//                 </button>
//             )}
//         </div>
//     );
// }

// export default App;
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------




import React, { useState } from "react";
import InputField from "./components/InputField";
import SongList from "./components/SongList";
import './styles/styles.css';

function App() {
    const [songs, setSongs] = useState([]); // Store fetched songs
    const [query, setQuery] = useState(""); // Current search query
    const [offset, setOffset] = useState(0); // Offset for pagination
    const [hasMore, setHasMore] = useState(true); // Track if more results are available
    const [loading, setLoading] = useState(false); // Track loading state

    const fetchSongs = async (input, append = false) => {
        if (loading) return; // Prevent duplicate requests
        setLoading(true);

        console.log(`Fetching songs with query: ${input}, offset: ${offset}, limit: 15`);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/recommend`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: input, limit: 15, offset }),
            });

            const data = await response.json();
            console.log("Fetched songs:", data.songs); // Log fetched songs

            if (data.songs.length > 0) {
                setSongs((prevSongs) =>
                    append ? [...prevSongs, ...data.songs] : data.songs
                );
                setOffset((prevOffset) => prevOffset + 15); // Increment offset for next request
            } else {
                setHasMore(false); // No more results available
            }
        } catch (error) {
            console.error("Error fetching songs:", error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleSearch = (input) => {
        setQuery(input);
        setOffset(0);
        setHasMore(true); // Reset for a new search
        fetchSongs(input);
    };

    const loadMoreSongs = () => {
        fetchSongs(query, true); // Fetch more songs and append to the existing list
    };

    return (
        <div className="app-container">
            <h1>Song Suggestion App</h1>
            <p>Enter your mood or genre to get song recommendations!</p>
            <InputField onSearch={handleSearch} />
            <SongList songs={songs} />
            {hasMore && songs.length > 0 && (
                <button
                    className="load-more-button"
                    onClick={loadMoreSongs}
                    disabled={loading}
                >
                    {loading ? "Loading..." : "More Suggestions"}
                </button>
            )}
        </div>
    );
}

export default App;
