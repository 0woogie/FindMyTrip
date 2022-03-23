var express = require('express');
var router = express.Router();
const Data = require("../model/data");
const authRouter = require("./auth");
const itemRouter = require("./item");
const Item = require("../model/user");

/* GET home page. */
router.get('/', async function(req, res, next) {
  if (!req.userInfo) {
    res.render('index', {
      dataList: [],
      itemList: [],
    });
  }
  const username = req.userInfo.username;
  const itemList = await Item.find({ username: username });
  res.render('index', {
    dataList: [],
    itemList: itemList,
  });
});

router.post("/", async (req, res) => {
  const {Step1, Step2, Step3} = req.body;
  const datas = await Data.find({
    대분류: Step1,
    중분류: Step2,
    소분류: Step3,
  });
  const username = req.userInfo.username;
  const itemList = await Item.find({ username: username });
  res.render('index', {
    dataList: datas,
    itemList: itemList,
  });
});

router.use("/item", itemRouter);

router.use("/auth", authRouter);

module.exports = router;
