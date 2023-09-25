import { db } from "../server.js";

// Create a new artist
export const saveArtist = async (req, res) => {
    try {
        const { name, dob, bio } = req.body;
        const result = await db.query('INSERT INTO artists (name, dob, bio) VALUES (?, ?, ?)', [name, dob, bio]);
        res.status(201).json({ message: 'Artist created successfully', artistId: result.insertId });
        // Use result.insertId to get the ID of the newly created artist
    } catch (err) {
        console.error('Database error: ' + err.message);
        res.status(500).json({ message: 'Database error' });
    }
}

// Get a list of all artists
export const getAllArtists = async (req, res) => {
    const q = "SELECT * FROM artists";
    db.query(q, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(data);
        }
    });
}


// Get a single artist by ID

export const getSingleArtist = async (req, res) => {
    const artistId = req.params.id;
    const q = "SELECT * FROM artists WHERE artist_id = ?";

    db.query(q, [artistId], (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).json(data);
        }
    });
}



// Update an artist
export const updateArtist = async (req, res) => {
    const { name, dob, bio } = req.body;
    const artistId = req.params.id;

    try {
        const result = await db.query('UPDATE artists SET name=?, dob=?, bio=? WHERE artist_id=?', [name, dob, bio, artistId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json({ message: 'Artist updated successfully' });
    } catch (err) {
        console.error('Database error: ' + err.message);
        res.status(500).json({ message: 'Database error' });
    }
}


// Delete an artist
export const deleteArtist = async (req, res) => {
    const artistId = req.params.id;

    try {
        const result = await db.query('DELETE FROM artists WHERE artist_id=?', [artistId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (err) {
        console.error('Database error: ' + err.message);
        res.status(500).json({ message: 'Database error' });
    }
}

