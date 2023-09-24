import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "Spotify-App"
})

db.connect(function(err) {
    if (err) {
        console.log(err)
    } else {
        const createArtistsTable = `
            CREATE TABLE IF NOT EXISTS artists (
                artist_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                dob DATE,
                bio TEXT
            )
        `;

        const createSongsTable = `
            CREATE TABLE IF NOT EXISTS songs (
                song_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                date_of_release DATE,
                cover_image VARCHAR(255)
            )
        `;

        const createUsersTable = `
            CREATE TABLE IF NOT EXISTS users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL
            )
        `;

        const createArtistSongTable = `
            CREATE TABLE IF NOT EXISTS artist_song (
                artist_id INT,
                song_id INT,
                PRIMARY KEY (artist_id, song_id),
                FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
                FOREIGN KEY (song_id) REFERENCES songs(song_id)
            )
        `;

        const createRatingsTable = `
            CREATE TABLE IF NOT EXISTS ratings (
                rating_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                song_id INT,
                rating INT CHECK (rating >= 1 AND rating <= 5),
                FOREIGN KEY (user_id) REFERENCES users(user_id),
                FOREIGN KEY (song_id) REFERENCES songs(song_id)
            )
        `;

        // Execute each table creation query
        db.query(createArtistsTable, (err) => {
            if (err) {
                console.error('Error creating artists table:', err);
            } else {
                console.log('Artists table created successfully');
            }
        });

        db.query(createSongsTable, (err) => {
            if (err) {
                console.error('Error creating songs table:', err);
            } else {
                console.log('Songs table created successfully');
            }
        });

        db.query(createUsersTable, (err) => {
            if (err) {
                console.error('Error creating users table:', err);
            } else {
                console.log('Users table created successfully');
            }
        });

        db.query(createArtistSongTable, (err) => {
            if (err) {
                console.error('Error creating artist_song table:', err);
            } else {
                console.log('Artist_Song table created successfully');
            }
        });

        db.query(createRatingsTable, (err) => {
            if (err) {
                console.error('Error creating ratings table:', err);
            } else {
                console.log('Ratings table created successfully');
            }
        });
    }
})
