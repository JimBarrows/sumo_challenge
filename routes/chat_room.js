import express from "express";

const router = express.Router();

router.get("/", function (req, res) {
	res.status(200).json({
		id: 1,
		name: "Default Chat Room",
		occupants: [
			{
				id: 1,
				name: "bobby"
			}, {
				id: 2,
				name: "christine"
			}
		],
		conversation: [
			{
				id: 1,
				speaker: {
					id: 1,
					name: "bob"
				},
				message: "Hi"
			}, {
				id: 2,
				speaker: {
					id: 2,
					name: "christine"
				},
				// message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
				message: "hi"
			}
		]
	}).end();
});

export default router;
