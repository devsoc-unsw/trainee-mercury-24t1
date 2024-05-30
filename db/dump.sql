CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS goddle_stats (
    stats_id SERIAL,
    user_id INT NOT NULL,
    top_attempt INT DEFAULT 0,
    top_time INT DEFAULT 0,
    games_played INT DEFAULT 0,
    PRIMARY KEY (stats_id, user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
