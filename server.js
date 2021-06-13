const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const baseURL = 'https://api.twitter.com/2/'
const HEADER = { Authorization: `Bearer ${process.env.TWITTER_BEARER}`};

app.post('/getSingleUserInfo', (req, res) => {
    let username = req.body.userName;
    axios.get(`${baseURL}users/by/username/${username}?user.fields=description,entities,id,name,profile_image_url,protected,public_metrics,url,username,verified`, { headers: HEADER })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
})

app.post('/getMultipleUserInfo', (req, res) => {
    let list = req.body.userList;
    axios.get(`${baseURL}users/by?usernames=${[...list]}&user.fields=description,entities,id,name,profile_image_url,protected,public_metrics,url,username,verified,withheld`, { headers: HEADER })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.post('/getTweetsForUser', (req, res) => {
    let userid = req.body.userId;
    axios.get(`${baseURL}users/${userid}/tweets?tweet.fields=entities,created_at,attachments,referenced_tweets,author_id`, { headers: HEADER })
    .then((response) => res.send(response.data))
    .catch((err) => res.send(err));
});

app.listen(port, () => {
    console.log('Wrapper is up and running!');
});
