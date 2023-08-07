import "./App.css";
import React, { useState } from "react"; // Add this import statement

// IMPORT ICONS FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";

// VARIABLES

const data = {
  items: [
    {
      name: "cat",
      icon: faCat,
      sound: "/Sounds/Cat.wav",
      quote: "What does the cat say?",
    },
    {
      name: "dog",
      icon: faDog,
      sound: "/Sounds/Dog.wav",
      quote: "What does the dog say?",
    },
    {
      name: "frog",
      icon: faFrog,
      sound: "/Sounds/Frog.wav",
      quote: "What does the frog say?",
    },
    {
      name: "dragon",
      icon: faDragon,
      sound: "/Sounds/Dragon.wav",
      quote: "What does the dragon say?",
    },
    {
      name: "fish",
      icon: faFishFins,
      sound: "/Sounds/Fish.wav",
      quote: "What does the fish say?",
    },
  ],
};

function Soundboard({ items }) {
  const [quote, setQuote] = useState(null);
  return (
    <>
      {quote && <div className="quote">{quote}</div>}{" "}
      <div className="soundboard">
        {items.map((item) => (
          <SoundboardItem
            item={item}
            key={item.name}
            onSoundStart={(quote) => setQuote(quote)}
            onSoundStop={() => setQuote(null)}
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

  return (
    <div
      /*className={`Animal ${isPlaying ? "playing" : ""}`}*/ onClick={playSound}
    >
      <FontAwesomeIcon
        icon={item.icon}
        className={`Animal ${isPlaying ? "playing" : ""}`}
      />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Soundboard items={data.items} />
    </div>
  );
}

export default App;
