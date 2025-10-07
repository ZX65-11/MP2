import React , { useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import ArtworkList from './components/artworkList';
import ArtworkGallery from './components/artworkGallery';
/*import ArtworkDetail from './components/artworkDetail';
 */

export interface Artwork {
  id: number;
  title: string;
  artist: string | null;
  image_id: string | null;
}

const App: React.FC = () =>  {
  const [artworkList, setArtworkList] = useState<Artwork[]>([]);

  useEffect (() => {
    const fetchApi = async() => {
      const response = await axios.get('https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,image_id&limit=100&include=place_pivots')
      const ArtworkData = response.data.data.map((artwork: any) => {
          return {
            id: artwork.id,
            title: artwork.title,
            artist: artwork.artist_title,
            image_id: artwork.image_id,
          };}
        );
      setArtworkList(ArtworkData ); 
    };
    fetchApi();
  }, []);

  return (
    <Router>
      <div className="App">
        <header>
          <h1>Artwork of Art Institute of Chicago</h1>
          <nav>
            <Link to="/">List View</Link> | <Link to="/gallery">Gallery View</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<ArtworkList artworkList={artworkList} />} />
          <Route path="/gallery" element={<ArtworkGallery artworkList={artworkList} />} />
        </Routes>
      </div>
    </Router>
  );
}
/* <Route path="/gallery" element={<ArtworkGallery artworkList={artworkList} />} />
<Route path="/artwork/:id" element={<ArtworkDetail artworkList={artworkList} />} />*/
export default App;
