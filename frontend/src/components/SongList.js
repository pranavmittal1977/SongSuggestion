// import React from "react";

// function SongList({ songs }) {
//     return (
//         <div>
//             {songs.map((song, index) => (
//                 <div key={index}>
//                     <h3>{song.title}</h3>
//                     <p>{song.artist}</p>
//                     <img src={song.cover} alt={`${song.title} cover`} />
//                     <audio controls src={song.preview}>
//                         Your browser does not support the audio element.
//                     </audio>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default SongList;



// import React from "react";
// function SongList({ songs }) {
//     console.log("Rendering songs:", songs); // Debugging
//     return (
//         <div className="song-list">
//             {songs.length > 0 ? (
//                 songs.map((song, index) => (
//                     <div className="song-item" key={index}>
//                         <img
//                             className="song-cover"
//                             src={song.cover}
//                             alt={`${song.title} cover`}
//                         />
//                         <div className="song-details">
//                             <h3>{song.title}</h3>
//                             <p>{song.artist}</p>
//                         </div>
//                         {song.preview && (
//                             <audio controls className="audio-player">
//                                 <source src={song.preview} type="audio/mpeg" />
//                                 Your browser does not support the audio element.
//                             </audio>
//                         )}
//                     </div>
//                 ))
//             ) : (
//                 <p>No songs found. Try a different query!</p>
//             )}
//         </div>
//     );
// }





//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// import React, { useState } from "react";

// function SongList({ songs }) {
//     const [currentlyPlaying, setCurrentlyPlaying] = useState(null);

//     const handlePlayPause = (index, previewUrl) => {
//         const audio = document.getElementById(`audio-${index}`);

//         if (currentlyPlaying === index) {
//             audio.pause();
//             setCurrentlyPlaying(null); // Stop the current song
//         } else {
//             if (currentlyPlaying !== null) {
//                 const prevAudio = document.getElementById(`audio-${currentlyPlaying}`);
//                 prevAudio.pause(); // Pause any previously playing audio
//             }
//             audio.play();
//             setCurrentlyPlaying(index); // Set the new playing song
//         }
//     };

//     return (
//         <div className="song-list">
//             {songs.length > 0 ? (
//                 songs.map((song, index) => (
//                     <div className="song-item" key={index}>
//                         <img
//                             className="song-cover"
//                             src={song.cover}
//                             alt={`${song.title} cover`}
//                         />
//                         <div className="song-details">
//                             <h3>{song.title}</h3>
//                             <p>{song.artist}</p>
//                         </div>
//                         {song.preview ? (
//                             <>
//                                 <audio id={`audio-${index}`} src={song.preview}></audio>
//                                 <button
//                                     className="play-pause-button"
//                                     onClick={() => handlePlayPause(index, song.preview)}
//                                 >
//                                     {currentlyPlaying === index ? "Pause" : "Play"}
//                                 </button>
//                             </>
//                         ) : (
//                             <p className="no-preview">Preview not available</p>
//                         )}
//                     </div>
//                 ))
//             ) : (
//                 <p></p>
//             )}
//         </div>
//     );
// }

// export default SongList;
import React, { useState } from "react";

    function SongList({ songs }) {
        const [currentSong, setCurrentSong] = useState(null);
        const [isPlaying, setIsPlaying] = useState(false);

        const handlePlayPause = (song) => {
            if (currentSong === song.preview) {
                if (isPlaying) {
                    document.getElementById(song.preview).pause();
                    setIsPlaying(false);
                } else {
                    document.getElementById(song.preview).play();
                    setIsPlaying(true);
                }
            } else {
                if (currentSong) {
                    document.getElementById(currentSong).pause();
                }
                setCurrentSong(song.preview);
                setIsPlaying(true);
                document.getElementById(song.preview).play();
            }
        };

        return (
            <div className="song-list">
                {songs.length > 0 ? (
                    songs.map((song, index) => (
                        <div className="song-item" key={index}>
                            <img
                                className="song-cover"
                                src={song.cover}
                                alt={`${song.title} cover`}
                            />
                            <div className="song-details">
                                <h3>{song.title}</h3>
                                <p>{song.artist}</p>
                            </div>
                            {song.preview ? (
    <audio id={song.preview} src={song.preview}></audio>
) : (
    <button
        className="spotify-play-button"
        onClick={() => window.open(song.spotifyUrl, "_blank")}
    >
        Play on Spotify
    </button>
)}

                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
        );
    }


// function SongList({ songs }) {
//     return (
//         <div className="song-list">
//             {songs.length > 0 ? (
//                 songs.map((song, index) => (
//                     <div className="song-item" key={index}>
//                         <img
//                             className="song-cover"
//                             src={song.cover}
//                             alt={`${song.title} cover`}
//                         />
//                         <div className="song-details">
//                             <h3>{song.title}</h3>
//                             <p>{song.artist}</p>
//                         </div>
//                         {song.preview ? (
//                             <audio controls className="audio-player">
//                                 <source src={song.preview} type="audio/mpeg" />
//                             </audio>
//                         ) : (
//                             <a
//                                 href={song.spotifyUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="spotify-link"
//                             >
//                                 Listen on Spotify
//                             </a>
//                         )}
//                     </div>
//                 ))
//             ) : (
//                 <p>No songs found. Try a different query!</p>
//             )}
//         </div>
//     );
// }

export default SongList;



