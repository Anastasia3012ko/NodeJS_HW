import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    name: {type: String, required: true},
    articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Article',
            required: true
        }
    ]
});

const Tag = mongoose.model('Tag', TagSchema);

export default Tag;