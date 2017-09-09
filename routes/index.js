import {loggedIn} from "../authentication";
import express from "express";

const router = express.Router();

/* GET home page. */
router.get('/', loggedIn, function (req, res, next) {
	res.render('index', {user: req.user});
});

module.exports = router;
