import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddSong() {
  const [songData, setSongData] = useState({
    name: '',
    dateOfRelease: '',
    coverImage: '',
    artistIds: [],
  });

  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({ name: '', dob: '', bio: '' });

  // Fetch the list of artists when the component mounts
  useEffect(() => {
    axios.get('/api/artists').then((response) => {
      setArtists(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongData({
      ...songData,
      [name]: value,
    });
  };

  const handleArtistChange = (e) => {
    const selectedArtists = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    setSongData({
      ...songData,
      artistIds: selectedArtists,
    });
  };

  const handleNewArtistInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtist({
      ...newArtist,
      [name]: value,
    });
  };

  const handleAddNewArtist = () => {
    axios.post('/api/artists', newArtist).then((response) => {
      // After adding a new artist, update the list of artists and select the new artist
      setArtists([...artists, response.data]);
      setSongData({
        ...songData,
        artistIds: [...songData.artistIds, response.data.artistId],
      });
    });
  };

  const handleAddSong = () => {
    axios.post('/api/songs', songData).then(() => {
      // After successfully adding the song, reset the form
      setSongData({
        name: '',
        dateOfRelease: '',
        coverImage: '',
        artistIds: [],
      });
    });
  };

  return (
    <div>
      <h2>Add a New Song</h2>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={songData.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Date of Release:</label>
          <input type="date" name="dateOfRelease" value={songData.dateOfRelease} onChange={handleInputChange} />
        </div>
        <div>
          <label>Cover Image:</label>
          <input type="text" name="coverImage" value={songData.coverImage} onChange={handleInputChange} />
        </div>
        <div>
          <label>Artists:</label>
          <select multiple name="artistIds" value={songData.artistIds} onChange={handleArtistChange}>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
      </form>
      <button onClick={handleAddNewArtist}>Add New Artist</button>
      <div>
        <label>New Artist Name:</label>
        <input type="text" name="name" value={newArtist.name} onChange={handleNewArtistInputChange} />
      </div>
      <div>
        <label>New Artist Date of Birth:</label>
        <input type="date" name="dob" value={newArtist.dob} onChange={handleNewArtistInputChange} />
      </div>
      <div>
        <label>New Artist Bio:</label>
        <input type="text" name="bio" value={newArtist.bio} onChange={handleNewArtistInputChange} />
      </div>
      <button onClick={handleAddSong}>Add Song</button>
    </div>
  );
}

export default AddSong;
