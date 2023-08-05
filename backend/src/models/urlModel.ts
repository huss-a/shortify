import { Schema, model } from "mongoose";

const urlSchema = new Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    urlUid: {
        type: String,
        required: true,
        unique: true,
    },
});

const UrlRecord = model("UrlRecord", urlSchema);

export default UrlRecord;
