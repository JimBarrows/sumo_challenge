import express from 'express';
import {Room} from '../models';

const router = express.Router();

router.get("/", function (req, res) {
	Room.find({_id: "59b4264deb9ff8620928795f"}).exec()
			.then(room_list => res.status(200).json(room_list[0]).end())
			.catch(error => res.status(400).json(error).end());

});

router.get("/add_user", function (req, res) {
	Room.findByIdAndUpdate("59b4264deb9ff8620928795f",
			{$push: {occupants: {id: req.user._id, name: req.user.username}}},
			{safe: true, upsert: true, new: true})
			.exec()
			.then(savedRoom => res.status(200).json(savedRoom).end());

});

export default router;
