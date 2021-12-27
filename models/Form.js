/* ==== Form Model ==== */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema(
    {
        vetName: { type: String },
        curLocation: { type: String },
        freqLocation: { type: String },
        ping: { type: String },
        behavior: { type: String },
        resName: { type: String },
        resContact: { type: String },
    },
    {
        timestamps: true,
    }
);


module.exports = mongoose.model("Form", formSchema);