import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
    },
  
    courseDescription: {
      type: String,
      required:true
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Category",
      required: true,
    },
    coursePrice: {
      type: Number,
    },
    courseLevel: {
      type: String,
      enum: ["beginner", "Medium", "Advance"],
    },
    courseThumbnail: {
      type: String,
    },
    enrolledStudents: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    lecture: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lecture",
      },
    ],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Course = mongoose.model("Course", courseSchema);
