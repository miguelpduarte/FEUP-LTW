-- users: username, password
-- testuser, password123
INSERT INTO users(user_id, username, password, name) values(1, 'testuser', '$2y$10$7UAmhAXfqbt9aA/TFE3XHez3p/KU9jj1bmNTD2R2V7M0jCuqfCXbG', 'Test User');
-- testuser2, password123
INSERT INTO users(user_id, username, password, name) values(2, 'testuser2', '$2y$10$7UAmhAXfqbt9aA/TFE3XHez3p/KU9jj1bmNTD2R2V7M0jCuqfCXbG', 'Test User 2');
-- unable to login
INSERT INTO users(user_id, username, password, name) values(3, '<script>alert(1)</script>', '<script>alert(1)</script>', 'Unsuccessful XSSer <script>alert(1)</script>');
-- unable to login
INSERT INTO users(user_id, username, password, name) values(4, 'pentester123', '<img src="" onerror="alert(1)" />', 'Unsuccessful XSSer2    <img src="" onerror="alert(1)" />');
-- j0ker, password123
INSERT INTO users(user_id, username, password, name, bio) values(5, 'j0ker', '$2y$10$7UAmhAXfqbt9aA/TFE3XHez3p/KU9jj1bmNTD2R2V7M0jCuqfCXbG', 'The Real J0ker', 'Why so serious? Joke(r) around!

![joker](https://i.imgflip.com/1rr7rf.jpg)');
-- uncle_bob, password123
INSERT INTO users(user_id, username, password, name, bio) values(6, 'uncle_bob', '$2y$10$7UAmhAXfqbt9aA/TFE3XHez3p/KU9jj1bmNTD2R2V7M0jCuqfCXbG', 'Uncle Bob', 'Hi! I''m Bob!

![definitely_not_harold](https://static.independent.co.uk/s3fs-public/thumbnails/image/2017/07/11/11/harold-0.jpg)');
-- rogerMC, password123
INSERT INTO users(user_id, username, password, name, bio) values(7, 'rogerMC', '$2y$10$7UAmhAXfqbt9aA/TFE3XHez3p/KU9jj1bmNTD2R2V7M0jCuqfCXbG', 'Roger MC', 'I''m RogerMC!

![rogerMC photo](https://i.pinimg.com/474x/15/99/30/1599308c03b9349333d7f83789eeaaaa.jpg)

Check out my profile in Traveler: https://web.fe.up.pt/~up201606746/profile.php?id=5');
-- arestivo, ' OR '1'='1';--
INSERT INTO users(user_id, username, password, name, bio) values(8, 'arestivo', '$2y$10$6OogQTDwr0TakXfOXZZHPesd3wqwnz4auxCKcV3EDCmUKt/..p6RK', 'André Restivo', '![Profile pic](https://i.imgur.com/X7H1M4e.png)');

-- channels
INSERT INTO channels values(0, 'default', '#cc0055');
INSERT INTO channels values(1, '1234chan', '#bb00ff');
INSERT INTO channels values(2, 'definitelynotreddit', '#ff4500');
INSERT INTO channels values(3, 'programmerhumor', '#611E6C');
INSERT INTO channels values(4, 'jokes', '#0FFFCA');
INSERT INTO channels values(5, 'travels', '#4BCAB1');
-- #30A68F

-- stories
INSERT INTO stories(story_id, author, title, content, channel) VALUES(1, 1, 'This is a very existing title', 'This is a very existing story, not a test at all...', 1);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(2, 2, 'This is another very existing title', 'This is another story that does exist and is not a test at all...', 2);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(10, 2, 'Javascript', '![Javascript](https://i.redd.it/kqao5r0f5c421.jpg)', 3);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(5, 6, 'Today I saw an ad that said "radio for sale, $1, volume stuck on full."', 'I thought, "I can''t turn that down."', 4);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(6, 2, '<img src="" onerror="alert(1)" />', '<img src="" onerror="alert(1)" />', 0);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(7, 2, 'Good Question', '![Good Question](https://i.redd.it/5zfoljctoc421.png)', 3);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(8, 2, 'Classic', '![Classic](https://i.redd.it/vw5hzy3884t01.jpg)', 3);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(9, 2, 'Unit Testing', '![Unit Testing](https://i.redd.it/xbanlndqd9421.png)', 3);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(4, 3, '<script>alert(1)</script>', '<script>alert(this); alert(1)</script>', 2);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(3, 2, 'What''s your favorite type of candy?', 'I prefer M&Ms', 2);
INSERT INTO stories(story_id, author, title, content, channel) VALUES(11, 7, 'Check out this photo of my travel!', '[RogerMC travel photo](https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200)', 5);

-- comments

-- comment on Radio joke
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(1, 'Typical dad joke... *Sigh*', 5, 5, NULL);
-- subcomment on comment above
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(201, 'I''m not a dad! I''m an uncle!

![trollface](https://st.deviantart.net/news/april-fools-trollface/trollface-gear.png)', 6, NULL, 1);

-- comment on existing title story
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(2, 'Who would''ve guessed, this is a test!', 6, 1, NULL);
-- subcomment on comment above
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(202, 'Get fooled, old man!', 1, NULL, 2);

INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(222, 'Haha, a test comment!', 1, 1, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL, 'This is a sub-level _reply_ to the **parent** comment!', 1, NULL, 222);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL, 'This is another sub-level _reply_ to the **parent** comment!', 1, NULL, 222);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL, 'What? Another sub-level reply?', 1, NULL, 222);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL, 'Just passing through and leaving... A sub-level reply...', 1, NULL, 222);

-- comment on another very existing title story
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(3, 'What a ruse, this is also a test!', 6, 2, NULL);
-- subcomment on comment above
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(203, 'Fooled again, old man!', 2, NULL, 3);

-- comment on rogerMC meme
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(4, 'Go back to your own website!', 6, 11, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(204, 'Yeah! For once I agree with you old man!', 5, NULL, 4);

INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Look", 1, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"If you had", 3, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"One shot", 1, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Or one opportunity", 4, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"To seize everything you ever wanted", 1, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"In one moment", 2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Would you capture it", 2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Or just let it slip?", 2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Yo", 2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"His palms are sweaty, knees weak, arms are heavy", 2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"There's vomit on his sweater already, mom's spaghetti", 2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He's nervous, but on the surface he looks calm and ready", 2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"To drop bombs, but he keeps on forgettin'",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"What he wrote down, the whole crowd goes so loud",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He opens his mouth, but the words won't come out",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He's chokin', how, everybody's jokin' now",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"The clocks run out, times up, over, blaow!",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Snap back to reality, oh there goes gravity",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Oh, there goes Rabbit, he choked",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He's so mad, but he won't give up that easy? No",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He won't have it, he knows his whole back's to these ropes",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"It don't matter, he's dope, he knows that, but he's broke",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He's so stacked that he knows, when he goes back to his mobile home, that's when its",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Back to the lab again yo, this whole rhapsody",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He better go capture this moment and hope it don't pass him",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You better lose yourself in the music, the moment",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You own it, you better never let it go",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You only get one shot, do not miss your chance to blow",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"This opportunity comes once in a lifetime you better",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You better lose yourself in the music, the moment",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You own it, you better never let it go",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You only get one shot, do not miss your chance to blow",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"This opportunity comes once in a lifetime you better",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"The souls escaping, through this hole that its gaping",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"This world is mine for the taking",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Make me king, as we move toward a, new world order",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"A normal life is borin', but super stardom's close to post mortar",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"It only grows harder, only grows hotter",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He blows us all over these hoes is all on him",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Coast to coast shows, he's known as the globetrotter",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Lonely roads, God only knows, he's grown farther from home, he's no father",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He goes home and barely knows his own daughter",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"But hold your nose 'cause here goes the cold water",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"His hoes don't want him no mo, he's cold product",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"They moved on to the next schmo who flows, he nose dove and sold nada",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"So the soap opera is told and unfolds, I suppose it's old partna, but the beat goes on",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Da da dumb da dumb da da",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You better lose yourself in the music, the moment",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You own it, you better never let it go",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You only get one shot, do not miss your chance to blow",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"This opportunity comes once in a lifetime you better",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You better lose yourself in the music, the moment",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You own it, you better never let it go",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You only get one shot, do not miss your chance to blow",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"This opportunity comes once in a lifetime you better",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"No more games, I'm a change what you call rage",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Tear this motherfuckin' roof off like two dogs caged",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I was playin' in the beginnin', the mood all changed",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I been chewed up and spit out and booed off stage",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"But I kept rhymin' and stepwritin' the next cipher",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Best believe somebody's payin' the pied piper",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"All the pain inside amplified by the",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Fact that I can't get by with my nine to",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Five and I can't provide the right type of",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Life for my family 'cause man, these God damn food stamps don't buy diapers",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"And its no movie, there's no Mekhi Phifer",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"This is my life and these times are so hard",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"And it's getting even harder tryin' to feed and water my seed, plus",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"See dishonor caught up between bein' a father and a prima-donna",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Baby mama drama screamin' on and too much",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"For me to want to say in one spot, another jam or not",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Has gotten me to the point, I'm like a snail I've got",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"To formulate a plot fore I end up in jail or shot",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Success is my only motherfuckin' option, failures not",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Mom, I love you, but this trail has got to go, I cannot grow old in Salem's lot",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"So here I go is my shot",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Feet fail me not 'cause maybe the only opportunity that I got",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You better lose yourself in the music, the moment",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You own it, you better never let it go",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You only get one shot, do not miss your chance to blow",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"This opportunity comes once in a lifetime you better",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You better lose yourself in the music, the moment",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You own it, you better never let it go",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You only get one shot, do not miss your chance to blow",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"This opportunity comes once in a lifetime you better",2, 3, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"You can do anything you set your mind to, man",2, 3, NULL);

INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Is this the real life?",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Is this just fantasy?",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Caught in a landslide",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"No escape from reality",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Open your eyes",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Look up to the skies and see",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I'm just a poor boy",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I need no sympathy",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Because I'm easy come, easy go",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Little high, little low",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Anyway the wind blows",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Doesn't really matter to me",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"To me",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Mama, just killed a man",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Put a gun against his head",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Pulled my trigger, now he's dead",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Mama, life had just begun",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"But now I've gone and thrown it all away",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Mama!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Didn't mean to make you cry",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"If I'm not back again this time tomorrow",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Carry on, carry on",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"As if nothing really matters",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Too late, my time has come",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Sends shivers down my spine",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Body's aching all the time",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Goodbye everybody",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I've got to go",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Gotta leave you all behind",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"And face the truth",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Mama!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"(Anyway the wind blows)",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I don't wanna die",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I sometimes wish I'd never been born at all",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I see a little silhouetto of a man",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Scaramouche! Scaramouche!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Will you do the fandango?",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Thunderbolt and lightning",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Very, very frightening me!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Galileo! Galileo!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Galileo! Galileo!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Galileo, Figaro!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Magnifico!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"I'm just a poor boy and nobody loves me",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"He's just a poor boy from a poor family",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Spare him his life, from this monstrosity",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Easy come, easy go",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Will you let me go?",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Bismillah!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"No, we will not let you go!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"(Let him go!)",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Bismillah!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"We will not let you go!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"(Let him go!)",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Bismillah!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"We will not let you go!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"(Let me go!)",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Will not let you go!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"(Let me go!)",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Never, never let you go!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Never let me go!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"No, no, no, no, no, no, no!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Oh, mamma mia, mamma mia!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Mamma mia, let me go!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Beelzebub, has a devil put aside for me!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"For me!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"For me!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"So you think you can stone me and spit in my eye?",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"So you think you can love me and leave me to die?",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Oh, baby!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Can't do this to me, baby!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Just gotta get out",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Just gotta get right outta here!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Oh, yeah! Oh, yeah!",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Nothing really matters",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Anyone can see",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Nothing really matters",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Nothing really matters to me",2, 4, NULL);
INSERT INTO comments(comment_id, content, author, story, parent_comment) VALUES(NULL,"Anyway the wind blows",2, 4, NULL);

-- comment votes
-- INSERT INTO commentVotes VALUES(1, 1, 1);
-- INSERT INTO commentVotes VALUES(1, 2, -1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(1, 1, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(2, 1, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(3, 1, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(4, 1, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(5, 1, 1);
-- downvoting uncle bob
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(1, 201, -1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(2, 201, -1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(3, 201, -1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(4, 201, -1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(5, 201, -1);

-- upvoting uncle bob vs rogerMC
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(1, 4, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(2, 4, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(3, 4, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(4, 4, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(5, 4, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(6, 4, 1);
-- upvoting j0ker in rogerMC post
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(1, 204, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(2, 204, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(3, 204, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(4, 204, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(5, 204, 1);
INSERT INTO commentVotes(user_id, comment_id, rating) VALUES(6, 204, 1);

-- story votes
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 1, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(2, 1, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(6, 1, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 2, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 10, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(2, 10, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(3, 10, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(4, 10, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(5, 10, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 8, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(2, 8, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(3, 8, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(4, 8, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 7, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(2, 7, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(3, 7, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(4, 7, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 5, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(2, 6, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(3, 5, 1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(4, 6, -1);
-- rogerMC story
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(1, 11, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(2, 11, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(3, 11, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(4, 11, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(5, 11, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(6, 11, -1);
INSERT INTO storyVotes(user_id, story_id, rating) VALUES(7, 11, -1);