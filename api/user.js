import Account from "../models/src/Account";
import config from "../config";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = express.Router();

router.get("/register", function (req, res) {
	Account.register(
			new Account({username: req.body.username}),
			req.body.password,
			function (err, user) {
				if (err) {
					console.log("Can't register user: ", err);
					res.status(400).json({error: err.message}).end();
				} else {
					var token = jwt.sign(user, config.jwt.secret);
					res.status(200).json({token: token});
				}
			});
});

router.post('/authenticate', passport.authenticate('local'), function (req, res) {
	var token = jwt.sign(req.user, config.jwt.secret);
	res.status(200).json({token: token});
});


export default router;
