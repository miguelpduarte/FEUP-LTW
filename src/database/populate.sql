-- users
INSERT INTO users values(1, 'testuser', 'password123', 'Test User');
INSERT INTO users values(2, 'testuser2', 'password123', 'Test User 2');
INSERT INTO users values(3, '<script>alert(1)</script>', '<script>alert(1)</script>', 'Unsuccessful XSSer <script>alert(1)</script>');
INSERT INTO users values(4, '<img src="" onerror="alert(1)" />', '<img src="" onerror="alert(1)" />', 'Unsuccessful XSSer2 <img src="" onerror="alert(1)" />');

-- channels
INSERT INTO channels values(1, '1234chan');
INSERT INTO channels values(2, 'definitelynotreddit');

-- stories
INSERT INTO stories(story_id, author, title, content, channel) VALUES(1, 1, 'This is a very existing title', 'This is a very existing story, not a test at all', 1);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(2, 2, 'This is another very existing title', 'This is another story that does exist and is not a test at all', 2);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(3, 2, 'Marking story!',
'# Did you know that
## This is
*Something* cool __here__?
This now has a lot of content that goes on and on and on and on and on and on and on and on and on and on and on and on and on

Oh look! A penguin! ![penguin](https://cdn.pixabay.com/photo/2013/07/13/11/44/penguin-158551__340.png)',
2);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(4, 3, '<script>alert(1)</script>', '<script>alert(this); alert(1)</script>', 2);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(5, 4, '<img src="" onerror="alert(1)" />', '<img src="" onerror="alert(1)" />', 1);



-- comments
INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);INSERT INTO comments(comment_id, content, author, story, story) VALUES(NULL,
'This comments has *markdown*!
> This is some sort of a quote
And this is not!',
2, 3, NULL);

INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL, 'This is a sub-level _reply_ to the **parent** comment!', 1, NULL, 1);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL, 'This is a sub-level _reply_ to the **parent** comment!', 1, NULL, 1);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL, 'This is a sub-level _reply_ to the **parent** comment!', 1, NULL, 1);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL, 'This is a sub-level _reply_ to the **parent** comment!', 1, NULL, 1);

-- comment votes
INSERT INTO commentVotes VALUES(1, 1, 1);
INSERT INTO commentVotes VALUES(1, 2, -1);

-- story votes
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 1, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(2, 1, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 2, -1);