import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Artwork } from '../App';
import './artworkDetail.css'; 

interface ArtworkDetails {
  id: string;
  title: string;
  artist_title: string | null;
  date_display: string;
  medium_display: string;
  credit_line: string;
  image_id: string;
}

interface ArtworkProps {
  artworkList: Artwork[];
}

const getImageUrl = (imageId: string) => {
  return `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`;
};

const ArtworkDetail: React.FC<ArtworkProps> = ({ artworkList }) => {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<ArtworkDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const currentId = id ? parseInt(id) : null;

  const currentIndex = artworkList.findIndex(a => a.id === currentId);
  const prevArtwork = artworkList[currentIndex - 1];
  const nextArtwork = artworkList[currentIndex + 1];
  useEffect(() => {
    const fetchArtworkDetails = async () => {
      if (!currentId) return;

        try {
          setLoading(true);
          const response = await axios.get(`https://api.artic.edu/api/v1/artworks/${currentId}`);
          setDetails(response.data.data);
        } 
        finally {
          setLoading(false);
        }
    };
    fetchArtworkDetails();
  }, [currentId]);

  if (loading) {
    return <div>loading :#{currentId}...</div>;
  }

  if (!details) {
    return <div >{'Artwork not found.'}</div>;
  }
  //<p><strong>image——ID:</strong> {details.image_id}</p>
  return (
    <div className="container">
      <div className="detail">
        <h2>{details.title}</h2>
        <img 
          src={getImageUrl(details.image_id)} 
          className="artwork-image" 
          alt={ details.title}
        />
        <div className="info">
          <p><strong>Artist:</strong> {details.artist_title || 'Unknown'}</p>
          <p><strong>Date:</strong> {details.date_display}</p>
          <p><strong>Medium:</strong> {details.medium_display}</p>
          <p><strong>Credit Line:</strong> {details.credit_line}</p>
          <p><strong>ID:</strong> {details.id}</p>
        </div>
      </div>

      <div className="navigation-buttons">
        {prevArtwork && (
          <Link to={`/artwork/${prevArtwork.id}`} className="nav-button prev">
            &larr; Previous
          </Link>
        )}
        
        {nextArtwork && (
          <Link to={`/artwork/${nextArtwork.id}`} className="nav-button next">
            Next  &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetail;
