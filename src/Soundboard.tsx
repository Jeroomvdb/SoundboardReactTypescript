// Soundboard.tsx
import { useState } from 'react';
import SoundboardForm from './ItemForm'; // Adjust the import path accordingly
import useGetCollection from "./useGetCollection";
import SoundboardItem from "./SoundboardItem";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


//
export interface SoundboardProps {
  id: string;
  name: string;
}

interface Item {
  id: string;
  name: string;
  quote: string;
  icon: string;
  sound: string;
  soundboardId: string;
}

async function addItem(selectedAnimal: string, soundboardID:string|undefined) {
  if(soundboardID == null){
    return
  }

  return axios.post(`/items`, {
    name: selectedAnimal,
    quote: `What does the ${selectedAnimal} say`,
    icon: `fa${selectedAnimal}`,
    sound: `/Sounds/${selectedAnimal}.wav`,
    soundboardId: soundboardID,
  });
}

export default function Soundboard() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [quote, setQuote] = useState<string>("");
  const [showSounds, setShowSounds] = useState(true);

  const [showName, setShowName] = useState(false);

  const {
    data: soundboardItems,
    refetch,
  } = useGetCollection(`/soundboards/${id}/items`);

  const handleAddItemClick = async (selectedAnimal: string) => {
    await addItem(selectedAnimal, id);
    refetch();
  };

//menubutton
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id=""
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate('/')}>Boards (back to home)</MenuItem>
        <MenuItem>
          <FormGroup>Settings
            <FormControlLabel control={<Checkbox checked={showName} />} label="Show soundboard name" onChange={()=>setShowName(!showName)}/>
            <FormControlLabel control={<Checkbox checked={showSounds} />} label="Show sounds" onChange={()=>setShowSounds(!showSounds)}/>
          </FormGroup>
          {showSounds && quote && <p>{quote}</p>}
        </MenuItem>
        <MenuItem onClick={handleClose}>About</MenuItem>
      </Menu>

      {showName && <p className="soundboardName">Soundboard {id}</p>}
      <div className="soundboard">
        {soundboardItems.map((item: Item) => (
          <SoundboardItem
            item={item}
            key={item.id}
            onSoundStart={(quote: string) => {
              if(showSounds){
              setQuote(quote);}
            }}
            onSoundStop={() => setQuote("")}
          />
        ))}
        {showSounds && quote && <p>{quote}</p>}
        </div>

      <SoundboardForm onSubmit={handleAddItemClick} />
    </>
  );
}
