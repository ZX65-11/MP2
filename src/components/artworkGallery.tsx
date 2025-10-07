import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Artwork } from '../App';
import './artworkGallery.css'; 

interface ArtworkGalleryProps {
  artworkList: Artwork[];
}

const getImageUrl = (imageId: string) => {
  return `https://www.artic.edu/iiif/2/${imageId}/full/200,/0/default.jpg`;
};

const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ artworkList }) => {
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);

  const allArtists = useMemo(() => {
    const artists = new Set<string>();
    artworkList.forEach(a => {
      if (a.artist ){
        artists.add(a.artist);
      }
    });
    return Array.from(artists).sort();
  }, [artworkList]);

  // 根据选择的艺术家筛选艺术品
  const filteredArtwork = useMemo(() => {
    if (selectedArtists.length === 0) {
      return artworkList;
    }
    
    return artworkList.filter(artwork =>
      artwork.artist && selectedArtists.includes(artwork.artist)
    );
  }, [artworkList, selectedArtists]);

  // 切换筛选艺术家
  const handleArtistToggle = (artist: string) => {
    setSelectedArtists(prevArtists => {
      if (prevArtists.includes(artist)) {
        return prevArtists.filter(a => a !== artist);
      } else {
        return [...prevArtists, artist];
      }
    });
  };

  return (
    <div className="gallery-container">
      <div className="filter-controls">
        <h3>Filter by Artist:</h3>
        <div className="artist-buttons">
          {allArtists.map(artist => (
            <button
              key={artist}
              className={`filter-button ${selectedArtists.includes(artist) ? 'active' : ''}`}
              onClick={() => handleArtistToggle(artist)}
            >
              {artist}
            </button>
          ))}
        </div>
      </div>

      <div className="image">
        {filteredArtwork.map(artwork => (
          <Link to={`/artwork/${artwork.id}`} key={artwork.id} className="items">
            <img 
              src={getImageUrl(artwork.image_id || '')} 
              alt={artwork.title} 
            />
            <p className="artwork-title">{artwork.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ArtworkGallery;
