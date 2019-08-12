const router = require('express').Router();
const friends = require('../../data/Friends');
const Friend = require('../../templates/Friend');

// Get all friends
router.get('/', (req, res) => res.json(friends));

// Create new friend
router.post('/', (req, res) => {
    const { name, photo, scores } = req.body;

    const newFriend = new Friend(name, photo, scores);

    friends.push(newFriend);

    res.json(friends);
});

module.exports = router;
