const express = require("express");
const router = express.Router();
const User = require("../../model/user");

router.post("/update", async (req, res) => {
    if(!req.userInfo) {
        res.status(400).send("user not login!!");
        return;
    }
    const username = req.userInfo.username;
    const itemList = JSON.parse(req.body.itemList);
    console.log(itemList);
    await User.deleteMany({ username: username });
    itemList.forEach(async e => {
        var user = new User({
            username : username,
            time : e.time,
            name : e.name,
        });
        await user.save();
    });
    res.redirect('/');
});

module.exports = router;