import express from 'express';
import {Room} from '../models';

const router = express.Router();

router.get("/", function (req, res) {
	Room.find({_id: "59b4264deb9ff8620928795f"}).exec()
			.then(room_list => res.status(200).json(room_list[0]).end())
			.catch(error => res.status(400).json(error).end());

});

router.get("/add_user", function (req, res) {
	Room.findById("59b4264deb9ff8620928795f").exec()
			.then(room => {
				if (room.occupants.filter(o => o.id === req.user._id).isEmpty()) {
					room.occupants.push({
						id  : req.user._id,
						name: req.user.name
					});
					return Room.update({_id: room._id}, room).exec();
				} else {
					return room;
				}
			})
			.then(savedRoom => res.status(200).json(savedRoom).end())
			.catch(error => res.status(400).json(error).end());
});

router.post("/say", function (req, res) {
	let {message} = req.body;
	Room.findByIdAndUpdate("59b4264deb9ff8620928795f",
			{$push: {conversation: {speaker: {id: req.user._id, name: req.user.username}, message}}},
			{safe: true, upsert: true, new: true})
			.exec()
			.then(savedRoom => res.status(200).json(savedRoom).end())
			.catch(error => res.status(400).json(error).end());
});

export default router;
