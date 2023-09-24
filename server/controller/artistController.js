import { db } from "../server.js";

// Create a new artist

export const saveArtist = async (req, res) => {
    try {
        const { name, dob, bio } = req.body;
        const result = await db.query('INSERT INTO artists (name, dob, bio) VALUES (?, ?, ?)', [name, dob, bio]);
        res.status(201).json({ message: 'Artist created successfully', artistId: result.insertId });
    } catch (err) {
        console.error('Database error: ' + err.message);
        res.status(500).json({ message: 'Database error' });
    }
}


// Get a list of all artists
export const getAllArtist = async (req, res) => {
    try {
        const results = await db.query('SELECT * FROM artists');
        res.status(200).json(results);
    } catch (err) {
        console.error('Database error: ' + err.message);
        res.status(500).json({ message: 'Database error' });
    }
}


// Get a single artist by ID

export const getSingleArtist = async (req, res) => {
    const artistId = req.params.id;
    try {
        const [artist] = await db.query('SELECT * FROM artists WHERE id = ?', [artistId]);

        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json(artist);
    } catch (err) {
        console.error('Database error: ' + err.message);
        res.status(500).json({ message: 'Database error' });
    }
}


// Update an artist
export const updateArtist = async (req, res) => {
    const { name, dob, bio } = req.body;
    const artistId = req.params.id;

    try {
        const result = await db.query('UPDATE artists SET name=?, dob=?, bio=? WHERE id=?', [name, dob, bio, artistId]);

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
export const deleteArtist=async(req,res)=>{
    const artistId = req.params.id;

    try {
        const result = await db.query('DELETE FROM artists WHERE id=?', [artistId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (err) {
        console.error('Database error: ' + err.message);
        res.status(500).json({ message: 'Database error' });
    }
}

