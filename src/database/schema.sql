DROP TABLE IF EXISTS users;
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    name VARCHAR NOT NULL
);

DROP TABLE IF EXISTS stories;
CREATE TABLE stories (
    story_id INTEGER PRIMARY KEY AUTOINCREMENT,
    author INTEGER REFERENCES users NOT NULL,
    score INTEGER DEFAULT 0,
    title VARCHAR NOT NULL,
    content VARCHAR NOT NULL,
    channel INTEGER REFERENCES channels ON DELETE SET NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME
);

DROP TABLE IF EXISTS channels;
CREATE TABLE channels (
    channel_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR UNIQUE NOT NULL
);

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    content VARCHAR NOT NULL,
    author INTEGER  REFERENCES users NOT NULL,
    score INTEGER DEFAULT 0,
    story INTEGER REFERENCES stories,
    parent_comment INTEGER REFERENCES comments,
    CHECK(
            (story is NULL 
            OR parent_comment is NULL) 
        AND 
            NOT(story is NULL 
                AND parent_comment is NULL))
);

DROP TABLE IF EXISTS commentVotes;
CREATE TABLE commentVotes(
    user_id INTEGER REFERENCES users NOT NULL,
    comment_id INTEGER REFERENCES comments NOT NULL,
    rating INTEGER CHECK(rating = -1 OR rating = 1),
    PRIMARY KEY (user_id, comment_id)
);

DROP TABLE IF EXISTS storyVotes;
CREATE TABLE storyVotes(
    user_id INTEGER REFERENCES users NOT NULL,
    story_id INTEGER REFERENCES stories NOT NULL,
    rating INTEGER CHECK(rating = -1 OR rating = 1),
    PRIMARY KEY (user_id, story_id)
);

DROP TRIGGER IF EXISTS onlyLvl2Comments;
CREATE TRIGGER IF NOT EXISTS onlyLvl2Comments
BEFORE INSERT ON comments 
FOR EACH ROW WHEN 
                new.story is NULL 
                AND
                (SELECT story 
                FROM comments 
                WHERE comment_id = new.parent_comment) is NULL 
BEGIN
    SELECT RAISE(ABORT, 'The level of the comment is invalid');
END;

DROP TRIGGER IF EXISTS storyUpdateDate;
CREATE TRIGGER IF NOT EXISTS storyUpdateDate
AFTER UPDATE ON stories
FOR EACH ROW
BEGIN
    UPDATE stories
    SET updated_at = DATETIME('now')
    WHERE story_id = NEW.story_id;
END;

DROP TRIGGER IF EXISTS storyVotesInsert;
CREATE TRIGGER IF NOT EXISTS storyVotesInsert
AFTER INSERT ON storyVotes
FOR EACH ROW
BEGIN
    UPDATE stories
    SET score = score + NEW.rating
    WHERE story_id = NEW.story_id;
END;

DROP TRIGGER IF EXISTS storyVotesUpdate;
CREATE TRIGGER IF NOT EXISTS storyVotesUpdate
AFTER UPDATE ON storyVotes
FOR EACH ROW
BEGIN
    UPDATE stories
    SET score = score + NEW.rating
    WHERE story_id = NEW.story_id;
END;

DROP TRIGGER IF EXISTS storyVotesDelete;
CREATE TRIGGER IF NOT EXISTS storyVotesDelete
AFTER DELETE ON storyVotes
FOR EACH ROW
BEGIN
    UPDATE stories
    SET score = score - OLD.rating
    WHERE story_id = NEW.story_id;
END;

DROP TRIGGER IF EXISTS commentVotesInsert;
CREATE TRIGGER IF NOT EXISTS commentVotesInsert
AFTER INSERT ON commentVotes
FOR EACH ROW
BEGIN
    UPDATE comments
    SET score = score + NEW.rating
    WHERE comment_id = NEW.comment_id;
END;

DROP TRIGGER IF EXISTS commentVotesUpdate;
CREATE TRIGGER IF NOT EXISTS commentVotesUpdate
AFTER UPDATE ON commentVotes
FOR EACH ROW
BEGIN
    UPDATE comments
    SET score = score + NEW.rating
    WHERE comment_id = NEW.comment_id;
END;

DROP TRIGGER IF EXISTS commentVotesDelete;
CREATE TRIGGER IF NOT EXISTS commentVotesDelete
AFTER DELETE ON commentVotes
FOR EACH ROW
BEGIN
    UPDATE comments
    SET score = score - OLD.rating
    WHERE comment_id = NEW.comment_id;
END;

DROP TRIGGER IF EXISTS deleteChannelIfItHasNoStories;
CREATE TRIGGER IF NOT EXISTS deleteChannelIfItHasNoStories
AFTER DELETE ON stories
FOR EACH ROW
WHEN NOT EXISTS (SELECT * FROM stories WHERE channel_id = Old.channel_id)
BEGIN
    DELETE FROM channel WHERE channel_id = Old.channel;
END;