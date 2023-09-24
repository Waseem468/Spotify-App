import React from 'react';
import TopSongs from './TopSongs';
import TopArtists from './TopArtists';

function Home() {
  return (
    <div>
      <h1>Top Songs</h1>
      <TopSongs />
      <h1>Top Artists</h1>
      <TopArtists />
    </div>
  );
}

export default Home;
