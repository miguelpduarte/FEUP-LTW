CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    points INTEGER NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE stories (
    story_id INTEGER PRIMARY KEY AUTOINCREMENT,
    author INTEGER REFERENCES users NOT NULL,
    title VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    channel INTEGER REFERENCES channels NOT NULL
);

CREATE TABLE channels (
    channel_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR UNIQUE NOT NULL
);

CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    content VARCHAR NOT NULL,
    author INTEGER  REFERENCES users NOT NULL,
    story INTEGER REFERENCES stories,
    parent_comment INTEGER REFERENCES comments,
    CHECK(
            (story is NULL 
            OR parent_comment is NULL) 
        AND 
            NOT(story is NULL 
                AND parent_comment is NULL))
);

CREATE TABLE commentVotes(
    user_id INTEGER REFERENCES users NOT NULL,
    comment_id INTEGER REFERENCES comments NOT NULL,
    is_up INTEGER CHECK(is_up = 1 OR is_up = 0)
);

CREATE TABLE storyVotes(
    user_id INTEGER REFERENCES users NOT NULL,
    story_id INTEGER REFERENCES stories NOT NULL,
    is_up INTEGER CHECK(is_up = 1 OR is_up = 0)
);