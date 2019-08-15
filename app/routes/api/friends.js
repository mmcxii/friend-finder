const router = require('express').Router();
const friends = require('../../data/Friends');
const Friend = require('../../templates/Friend');

let foundFriend;
let friendDif = 50;

// Get all friends
router.get('/', (req, res) => res.json(friends));

// Create new friend
router.post('/', (req, res) => {
    const { name, photo, scores } = req.body;

    const newFriend = new Friend(name, photo, scores);

    const foundFriend = findFriend(newFriend);

    friends.push(newFriend);

    res.json([newFriend, foundFriend, friendDif]);
});

module.exports = router;

function findFriend(user) {
    friends.forEach((friend) => {
        let currentDif = 0;

        for (let i = 0; i < user.scores.length; i++) {
            currentDif += Math.abs(parseInt(user.scores[i]) - parseInt(friend.scores[i]));
        }

        if (currentDif < friendDif) {
            friendDif = currentDif;
            foundFriend = friend;
        }
    });

    return foundFriend;
}
