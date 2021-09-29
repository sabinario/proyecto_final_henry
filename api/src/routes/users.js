const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Users = require("../models/Users");

router.get("/", async function (req, res) {
  const { userName } = req.query;
  console.log(typeof userName);
  try {
    const listUsers = await Users.find();
    if (userName) {
      const filterByName = listUsers.filter((user) => {
        return user.username
          .toLocaleLowerCase()
          .includes(userName.toLocaleLowerCase());
      });
      filterByName.length
        ? res.status(200).send(filterByName)
        : res.status(404).send("No users with that name were found");
    } else {
      listUsers.length
        ? res.status(200).send(listUsers)
        : res.status(404).send("No users found");
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/", async function (req, res) {
  const { password, username, email, post } = req.body;

  if (password && username && email && post) {
    try {
      const user = await new Users({
        password,
        username,
        email,
        post,
      });
      await user.save();
      return res.status(200).send(user);
    } catch (err) {
      console.error(err);
    }
  }
  res.status(404).send("Incomplete required inputs");
});

module.exports = router;
