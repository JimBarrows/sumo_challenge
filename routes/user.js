import passport from "passport";
import Account from "../models/Account";
import express from "express";

const router = express.Router();

router.get("/register", function (req, res) {
	res.render("register", {user: {username: "", password: "", confirmPassword: ""}, message: req.flash("error")});
});

router.post("/register", function (req, res, next) {
	if (req.body.password === req.body.confirmPassword) {
		Account.register(new Account({username: req.body.username}), req.body.password, function (err) {
			if (err) {
				res.render("register", {
					user: {
						username: req.body.username,
						password: req.body.password,
						confirmPassword: req.body.confirmPassword
					}, message: err.message
				});
			} else {
				passport.authenticate("local")(req, res, function () {
					res.redirect("/");
				});
			}
		});
	} else {
		res.render("register", {
			user: {
				username: req.body.username,
				password: req.body.password,
				confirmPassword: req.body.confirmPassword
			}, message: "Passwords do not match"
		});
	}
});

router.get("/login", function (req, res) {
	var message = req.flash("error");
	var user    = req.user ? req.user : {username: "", password: ""};
	res.render("login", {user: user, message: message, login: true});
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/user/login",
	failureFlash: true,
	passReqToCallBack: true
}), function (req, res) {
	res.redirect("/");
});

router.get("/logout", function (req, res) {
	req.logout();
	res.redirect("/user/login");
});

export default router;
