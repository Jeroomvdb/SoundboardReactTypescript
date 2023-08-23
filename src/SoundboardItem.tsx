import {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCat } from "@fortawesome/free-solid-svg-icons";
import { faDog } from "@fortawesome/free-solid-svg-icons";
import { faFrog } from "@fortawesome/free-solid-svg-icons";
import { faDragon } from "@fortawesome/free-solid-svg-icons";
import { faFishFins } from "@fortawesome/free-solid-svg-icons";
import { faCow } from "@fortawesome/free-solid-svg-icons";
import { faSpider } from "@fortawesome/free-solid-svg-icons";
import { faCrow } from "@fortawesome/free-solid-svg-icons";


//
interface Item{
  id: string;
  name: string;
  quote: string;
  icon: string;
  sound: string;
  soundboardId: string;
}

interface SoundboardItemProps{
  item: Item;
  onSoundStart:(quote: string) => void;
  onSoundStop: () => void;
}

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


export default function SoundboardItem({ item, onSoundStart, onSoundStop } : SoundboardItemProps) {
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