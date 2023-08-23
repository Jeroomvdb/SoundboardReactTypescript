import "./App.css";
import { useState, useEffect } from "react"; // Add this import statement
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Soundboard, { SoundboardProps } from './Soundboard'
import Soundboards from './Soundboards'

//
axios.defaults.baseURL = "http://localhost:4000";


//
function App() {
  //
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

  //
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/boards/:id" element={<Soundboard/>} />
          <Route path="/" element={<Soundboards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
