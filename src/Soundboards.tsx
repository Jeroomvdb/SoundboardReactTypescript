import { useState, useEffect } from "react"; // Add this import statement
import axios from "axios";
import Soundboard from "./Soundboard"
import {Link} from "react-router-dom"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

//
interface SoundboardProps{
  id: string;
  name: string;
  image: string;
}

export default function Soundboards(){
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
    <div className="landing">
      {soundboards.map((x) => (
        <Link key={x.id} to={`/boards/${x.id}`}> 
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              sx={{ height: 140 }}
              image={x.image}
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {x.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click to go to {x.name}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}