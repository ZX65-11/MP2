import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Artwork } from '../App';
import './artworkList.css';

interface ArtworkListProps {
  artworkList: Artwork[];
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworkList }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const filteredArtwork = useMemo(() => {
    if (!searchTerm) {
      return artworkList;
    }

    return artworkList.filter(artwork =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artwork.artist && artwork.artist.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [artworkList, searchTerm]); 

  return (
    <div className="artwork-list">
      <div className="controls">
        <input
          type="text"
          placeholder="Search title or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <ul className="artwork-list">
        {filteredArtwork.map(artwork => (
          <li key={artwork.id}>
            <Link to={`/artwork/${artwork.id}`}>
              <strong>{artwork.title}</strong> by {artwork.artist || 'unknown'}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArtworkList;