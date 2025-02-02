import mongoose from "mongoose";

const chapterSchmea=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    chapter_url:{
        type:String,
    },
    course_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    creator: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
},{
    timestamps:true
})
const Chapter=mongoose.model("Chapter",chapterSchmea);
export default Chapter