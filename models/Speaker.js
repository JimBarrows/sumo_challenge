import mongoose from 'mongoose';
const Schema = mongoose.Schema,
      Types  = mongoose.Schema.Types;


const Speaker = new Schema({
	name: Types.String,
	id  : Types.ObjectId
});

export default Speaker;