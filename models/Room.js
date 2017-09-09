import mongoose from 'mongoose';
import Message from './Message';

import Speaker from './Speaker';

const Schema = mongoose.Schema,
      Types  = mongoose.Schema.Types;

const Room = new Schema({
	name        : Types.String,
	occupants   : [Speaker],
	conversation: [Message]
});

export default mongoose.model('Room', Room);