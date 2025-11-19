// "use client";

// import { useState } from "react";

// interface Props {
//   onSelect: (lat: number, lon: number) => void;
// }

// export default function LocationSearch({ onSelect }: Props) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (value: string) => {
//     setQuery(value);

//     if (value.length < 3) {
//       setResults([]);
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(
//         `https://api.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&q=${value}&limit=5`
//       );

//       const data = await res.json();
//       setResults(data);
//     } catch (error) {
//       console.error("LocationIQ Error:", error);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="relative w-full max-w-lg">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => handleSearch(e.target.value)}
//         placeholder="Search location..."
//         className="w-full p-3 border rounded-lg shadow focus:outline-none"
//       />

//       {loading && (
//         <p className="absolute left-3 top-full bg-white p-2">Searching...</p>
//       )}

//       {results.length > 0 && (
//         <ul className="absolute w-full bg-white border rounded mt-1 shadow-lg z-50">
//           {results.map((place, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 onSelect(parseFloat(place.lat), parseFloat(place.lon));
//                 setQuery(place.display_name);
//                 setResults([]);
//               }}
//               className="p-3 hover:bg-gray-100 cursor-pointer"
//             >
//               {place.display_name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
