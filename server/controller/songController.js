import { db } from "../server.js";

// Create a new artist

export const saveSong = async (req, res) => {
    const { name, date_of_release, cover_image, artistIds } = req.body;
  console.log(name);
  console.log(date_of_release);
  console.log(cover_image);

    if (!name || !date_of_release || !cover_image) {
      return res.status(400).json({ message: 'Missing or invalid input data' });
    }
  
    db.query('INSERT INTO songs (name, date_of_release, cover_image) VALUES (?, ?, ?)', [name, date_of_release, cover_image], (err, results) => {
      if (err) {
        console.error('Database error: ' + err.message);
        return res.status(500).json({ message: 'Failed to create the song' });
      }
  
      const songId = results.insertId;
  
      // Associate artists with the song in the join table
      const artistSongValues = artistIds.map((artistId) => [songId, artistId]);
      db.query('INSERT INTO artist_song (song_id, artist_id) VALUES ?', [artistSongValues], (err) => {
        if (err) {
          console.error('Database error: ' + err.message);
          return res.status(500).json({ message: 'Failed to associate artists with the song' });
        }
  
        res.status(201).json({ message: 'Song created successfully', songId });
      });
    });
}


// Get a list of all artists
export const getAllSongs = async (req, res) => {
    const q = "SELECT * FROM songs";
    db.query(q, (err, data) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).json(data)
        }
    })
}


// Get a single artist by ID

export const getSingleSong = async (req, res) => {
    const songId = req.params.id;
    const q = "SELECT * FROM songs WHERE song_id = ?";

    db.query(q, [songId], (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(data);
        }
    });
}



// Update an artist
export const updateSong = async (req, res) => {
    const { name, dateOfRelease, cover_image, artistIds } = req.body;
    const songId = req.params.id;

    db.query('UPDATE songs SET name=?, date_of_release=?, cover_image=? WHERE song_id=?', [name, dateOfRelease, cover_image, songId], (err) => {
        if (err) {
            console.error('Database error: ' + err.message);
            return res.status(500).json({ message: 'Database error' });
        }

        // Delete existing artist associations for the song
        db.query('DELETE FROM artist_song WHERE song_id=?', [songId], (err) => {
            if (err) {
                console.error('Database error: ' + err.message);
                return res.status(500).json({ message: 'Database error' });
            }

            // Associate artists with the song in the join table
            if (artistIds && artistIds.length > 0) {
                const values = artistIds.map((artistId) => [songId, artistId]);
                db.query('INSERT INTO artist_song (song_id, artist_id) VALUES ?', [values], (err) => {
                    if (err) {
                        console.error('Database error: ' + err.message);
                        return res.status(500).json({ message: 'Database error' });
                    }

                    res.status(200).json({ message: 'Song updated successfully' });
                });
            } else {
                res.status(200).json({ message: 'Song updated successfully' });
            }
        });
    });
}


// Delete an artist
export const deleteSong = async (req, res) => {
    const songId = req.params.id;

    try {
        const result = await db.query('DELETE FROM songs WHERE song_id=?', [songId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Song not found' });
        }

        res.status(200).json({ message: 'Song deleted successfully' });
    } catch (err) {
        console.error('Database error: ' + err.message);
        res.status(500).json({ message: 'Database error' });
    }
}



// Delete a song
// router.delete('/songs/:id', (req, res) => {
//     const songId = req.params.id;

//     db.query('DELETE FROM songs WHERE id=?', [songId], (err) => {
//         if (err) {
//             console.error('Database error: ' + err.message);
//             return res.status(500).json({ message: 'Database error' });
//         }

//         res.status(200).json({ message: 'Song deleted successfully' });
//     });
// });


