// import React, { useState } from "react";

// function InputField({ onSearch }) {
//     const [input, setInput] = useState("");

//     const handleSearch = () => {
//         if (input) onSearch(input);
//     };

//     return (
//         <div>
//             <input
//                 type="text"
//                 placeholder="Describe your mood or genre..."
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//         </div>
//     );
// }

// export default InputField;



// import React, { useState } from "react";

// function InputField({ onSearch }) {
//     const [input, setInput] = useState("");

//     const handleSearch = () => {
//         if (input.trim() !== "") {
//             onSearch(input);
//         } else {
//             alert("Please enter a mood or genre.");
//         }
//     };

//     return (
//         <div className="input-field">
//             <input
//                 type="text"
//                 placeholder="Enter a mood or genre"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//             />
//             <button onClick={handleSearch}>Search</button>
//         </div>
//     );
// }

// export default InputField;

import React from "react";

function InputField({ onSearch, query, setQuery }) {
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSearch(query);
        }
    };

    return (
        <div className="input-field">
            <input
                type="text"
                placeholder="Enter a mood or genre"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress} // Allow Enter key to trigger search
            />
        </div>
    );
}

export default InputField;
