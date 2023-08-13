const mongoose = require('mongoose')
const { Schema } = mongoose;

const PostSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  author:{type:mongoose.Schema.Types.ObjectId, ref:'blogUsers'},
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Map,
    of: Boolean,
  }
}, {
  timestamps: true,
});

module.exports  = mongoose.model('Post', PostSchema);

