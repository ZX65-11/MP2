import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Artwork } from '../App';
import './artworkList.css';

interface ArtworkListProps {
  artworkList: Artwork[];
}

const ArtworkList: React.FC<ArtworkListProps> = ({ artworkList }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sort, setSort] = useState<'title' | 'artist'>('title'); 
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); 
  const filteredArtwork = useMemo(() => {
    let filtered = artworkList;
    if (searchTerm) {
      filtered =  artworkList.filter(artwork =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (artwork.artist && artwork.artist.toLowerCase().includes(searchTerm.toLowerCase())));
    }

    const sorted = [...filtered].sort((a, b) => {
      const valA = a[sort] || 'Unknown'; 
      const valB = b[sort] || 'Unknown';

      if (sortOrder === 'asc') {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });
    return sorted;
  }, [artworkList, searchTerm, sort, sortOrder]); 

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

      <div className="sort-controls">
          <label htmlFor="sort-select">Sort By:</label>
          <select 
            id="sort-select"
            value={sort} 
            onChange={(e) => setSort(e.target.value as 'title' | 'artist')}
          >
            <option value="title">Title</option>
            <option value="artist">Artist</option>
          </select>

          <button 
            onClick={() => setSortOrder('asc')} 
            className={`sort-button ${sortOrder === 'asc' ? 'active' : ''}`}
          >
          Ascending
          </button>
          <button 
            onClick={() => setSortOrder('desc')} 
            className={`sort-button ${sortOrder === 'desc' ? 'active' : ''}`}
          >
          Descending
          </button>
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