import "./App.css";
import React, { useState, useEffect } from "react"; // Add this import statement
import axios from "axios";

// IMPORT ICONS FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";

axios.defaults.baseURL = "http://localhost:4000";

const imageMap = {
  faCat: faCat,
  faDog: faDog,
  faFrog: faFrog,
  faDragon: faDragon,
  faFishFins: faFishFins,
};
// VARIABLES

// const data = {
//   items: [
//     {
//       name: "cat",
//       icon: faCat,
//       sound: "/Sounds/Cat.wav",
//       quote: "What does the cat say?",
//     },
//     {
//       name: "dog",
//       icon: faDog,
//       sound: "/Sounds/Dog.wav",
//       quote: "What does the dog say?",
//     },
//     {
//       name: "frog",
//       icon: faFrog,
//       sound: "/Sounds/Frog.wav",
//       quote: "What does the frog say?",
//     },
//     {
//       name: "dragon",
//       icon: faDragon,
//       sound: "/Sounds/Dragon.wav",
//       quote: "What does the dragon say?",
//     },
//     {
//       name: "fish",
//       icon: faFishFins,
//       sound: "/Sounds/Fish.wav",
//       quote: "What does the fish say?",
//     },
//   ],
// };

function Soundboard({ soundboardData }) {
  const [loading, setIsLoading] = useState(true);
  const [soundboardItems, setSoundboardItems] = useState();

  useEffect(() => {
    async function getSoundboardItems() {
      try {
        const { data } = await axios.get("/soundboards/1/items");
        setSoundboardItems(data);
      } catch (error) {
        alert(error);
      }
      setIsLoading(false);
    }
    getSoundboardItems();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!soundboardItems) {
    alert("no data to fill soundboard");
  }

  //const [quote, setQuote] = useState(null);
  return (
    <>
      <h1>{soundboardData.name}</h1>
      {/* {soundboardItems.quote && (
        <div className="quote">{soundboardItems.quote}</div>
      )}{" "} */}
      <div className="soundboard">
        {soundboardItems.map((item) => (
          <SoundboardItem
            item={item}
            key={item.name}
            // onSoundStart={(quote) => setQuote(item.quote)}
            // onSoundStop={() => setQuote(null)}
          />
        ))}{" "}
      </div>
    </>
  );
}

function SoundboardItem({ item, onSoundStart, onSoundStop }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio(item.sound);

  audio.addEventListener("ended", () => {
    setIsPlaying(false);
    onSoundStop();
  });

  function playSound() {
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
      onSoundStart(item.quote);
    }
  }
  console.log(item.icon);
  return (
    <div
      /*className={`Animal ${isPlaying ? "playing" : ""}`}*/ onClick={playSound}
    >
      <FontAwesomeIcon
        icon={imageMap[item.icon]}
        className={`Animal ${isPlaying ? "playing" : ""}`}
      />
    </div>
  );
}

function App() {
  const [loading, setIsLoading] = useState(true);
  const [soundboards, setSoundboards] = useState();

  useEffect(() => {
    async function getSoundboard() {
      try {
        const { data } = await axios.get("/soundboards");
        setSoundboards(data);
      } catch (err) {
        alert(err);
      }
      setIsLoading(false);
    }
    getSoundboard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!soundboards) {
    alert("soundboards is undefined");
  }

  return (
    <div className="App">
      {soundboards.map((x) => (
        <Soundboard key={x.id} soundboardData={x} />
      ))}
    </div>
  );
}

export default App;
