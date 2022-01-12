DROP TABLE IF EXISTS todos CASCADE;
CREATE TABLE todos (
  id SERIAL PRIMARY KEY NOT NULL,
  text VARCHAR(255) NOT NULL,
  is_done BOOLEAN NOT NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);