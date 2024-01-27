const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleschema = new Schema({
    username: String
});
const Article = mongoose.model('Article', articleschema);
module.exports=Article;