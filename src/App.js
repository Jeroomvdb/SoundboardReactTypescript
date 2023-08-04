import './App.css';

// IMPORT ICONS FONTAWESOME
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat } from '@fortawesome/free-solid-svg-icons';
import { faDog } from '@fortawesome/free-solid-svg-icons';
import { faFrog } from '@fortawesome/free-solid-svg-icons';
import { faDragon } from '@fortawesome/free-solid-svg-icons';
import { faFishFins } from '@fortawesome/free-solid-svg-icons';

// VARIABLES

const data ={
  items: [
    {
      name: "cat",
      icon: faCat,
      sound: "/Sounds/Cat.wav"
    },
    {
      name: "dog",
      icon: faDog,
      sound: "/Sounds/Dog.wav"
    },
    {
      name: "frog",
      icon: faFrog,
      sound: "/Sounds/Frog.wav"
    },
    {
      name: "dragon",
      icon: faDragon,
      sound: "/Sounds/Dragon.wav"
    },
    {
      name: "fish",
      icon: faFishFins,
      sound: "/Sounds/Fish.wav"
    },
  ]
}



function App() {
  return (
    <div className="App">
      <div className="animalCollection">
        {data.items.map((item) => 
          {console.log(item.sound);
          console.log(new Audio(item.sound))
          return <FontAwesomeIcon className="Animal" icon={item.icon} key={item.name} onClick={() => new Audio(item.sound).play()} >{item.icon}</FontAwesomeIcon>
        })}
      </div>
    </div>
  );
}

export default App;