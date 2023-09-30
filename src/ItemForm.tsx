import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

interface SoundboardFormProps {
  onSubmit: (selectedAnimal: string) => void;
}

const SoundboardForm: React.FC<SoundboardFormProps> = ({ onSubmit }) => {
  const [selectedAnimal, setSelectedAnimal] = useState("");

  const handleAnimalChange = (event: SelectChangeEvent<string>) => {
    setSelectedAnimal(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedAnimal) {
      onSubmit(selectedAnimal);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Add your animal</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAnimal}
            label="Select an animal to add to the soundboard"
            onChange={handleAnimalChange}
          >
            <MenuItem value="Cow">Cow</MenuItem>
            <MenuItem value="Spider">Spider</MenuItem>
            <MenuItem value="Crow">Crow</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button variant="contained" disableElevation type="submit">
      Submit
    </Button>
    </form>
  );
};

export default SoundboardForm;
