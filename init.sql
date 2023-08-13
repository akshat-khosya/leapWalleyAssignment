
CREATE TABLE users (
  user_id VARCHAR(255) PRIMARY KEY
);
CREATE TABLE content (
  content_id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(user_id)
);

CREATE TABLE likes (
  id VARCHAR(255) PRIMARY KEY,
  content_id VARCHAR(255) REFERENCES content(content_id),
  user_id VARCHAR(255) REFERENCES users(user_id)
);
