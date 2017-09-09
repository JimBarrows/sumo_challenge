import mongoose from 'mongoose';

import Speaker from './Speaker';

const Schema = mongoose.Schema,
      Types  = mongoose.Schema.Types;

const Message = new Schema({
	speaker: [Speaker],
	message: Types.String,
});

export default Message;