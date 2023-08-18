import "./App.css";
import { useState, useEffect } from "react"; // Add this import statement
import axios from "axios";

// IMPORT ICONS FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCat } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";

import { faCow } from "@fortawesome/free-solid-svg-icons";
import { faSpider } from "@fortawesome/free-solid-svg-icons";
import { faCrow } from "@fortawesome/free-solid-svg-icons";

import useGetCollection from "./useGetCollection";



axios.defaults.baseURL = "http://localhost:4000";


const imageMap : {[index:string] : IconDefinition} = {
  faCat: faCat,
  faDog: faDog,
  faFrog: faFrog,
  faDragon: faDragon,
  faFishFins: faFishFins,
  faCow: faCow,
  faSpider: faSpider,
  faCrow: faCrow,
};

async function addItem(selectedAnimal: string) {
  return axios.post(`/items`, {
    name: selectedAnimal,
    quote: `What does the  ${selectedAnimal} say`,
    icon: `fa${selectedAnimal}`,
    sound: `/Sounds/${selectedAnimal}.wav`,
    soundboardId: "1",
  });
}

interface Item{
  id: string;
  name: string;
  quote: string;
  icon: string;
  sound: string;
  soundboardId: string;
}

interface SoundboardProps{
  id: string;
  name: string;
}

function Soundboard( {id, name }:SoundboardProps) {
  const [quote, setQuote] = useState<string>("");

  const {
    loading,
    data: soundboardItems,
    refetch,
  } = useGetCollection(`/soundboards/${id}/items`);

  // if (!soundboardItems || soundboardItems.length === 0) {
  //   alert("no data to fill soundboard");
  // }

  const handleAddItemClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedAnimal) {
      await addItem(selectedAnimal);
      refetch();
    }
  };

  const [selectedAnimal, setSelectedAnimal] = useState("");

  const handleAnimalChange = (event: any) => {
    setSelectedAnimal(event.target.value);
  };

  return (
    <>
      <h1>{name}</h1>
      <div className="soundboard">
        {soundboardItems.map((item: Item) => (
          <SoundboardItem
            item={item}
            key={item.id}
            onSoundStart={(quote:string) => {
              setQuote(quote);
            }}
            onSoundStop={() => setQuote("")}
          />
        ))}
        {quote && <p>{quote}</p>}
      </div>

      <form onSubmit={handleAddItemClick}>
        <label>
          <select value={selectedAnimal} onChange={handleAnimalChange}>
            <option value="">-- Add an extra animal --</option>
            <optgroup label="Fruits">
              <option value="Cow">Cow</option>
              <option value="Spider">Spider</option>
              <option value="Crow">Crow</option>
            </optgroup>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

interface SoundboardItemProps{
  item: Item;
  onSoundStart:(quote: string) => void;
  onSoundStop: () => void;
}



function SoundboardItem({ item, onSoundStart, onSoundStop } : SoundboardItemProps) {
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
    <div className={`Animal ${isPlaying ? "playing" : ""}`} onClick={playSound}>
      <FontAwesomeIcon
        icon={imageMap[item.icon]}
        className={`AnimalIcon ${isPlaying ? "playing" : ""}`}
      />
    </div>
  );
}

function App() {
  const [loading, setIsLoading] = useState(true);
  const [soundboards, setSoundboards] = useState<SoundboardProps[]>([]);

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
        <Soundboard key={x.id} id={x.id} name={x.name}/>
      ))}
    </div>
  );
}

export default App;
