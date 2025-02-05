import { query } from "express";
import { Course } from "../models/courses.model.js";
import mongoose from "mongoose";

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category_id, courseDescription, coursePrice } =
      req.body;
    if (!courseTitle || !category_id || !courseDescription || !coursePrice) {
      return res
        .status(400)
        .json({ message: "Please fill in all these fields" });
    }
    const courseData = {
      courseTitle,
      category_id,
      coursePrice,
      creator: req.id,
      courseDescription,
    };

    if (req.file) {
      courseData.courseThumbnail = req.file.path;
    }

    const course = await Course.create(courseData);
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    return res.status(500).json({
      messsage: error.messsage || error,
      success: true,
      error: false,
    });
  }
};

export const getCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;

    const query = [
      {
        $match: {
          creator: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          categoryName: "$category.categoryName",
          courseTitle: 1,
          courseDescription: 1,
          coursePrice: 1,
          category_id: 1,
          isPublished: 1,
          updatedAt: 1,
          createdAt: 1,
          enrolledStudents: 1,
          lecture: 1,
          creator: 1,
          courseThumbnail: 1,
        },
      },
    ];
    const courses = await Course.aggregate(query);

    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json({ message: "Courses found successfully", courses });
  } catch (error) {
    return res.status(500).json({
      messsage: error.messsage || error,
      success: false,
      error: true,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(userId);
    const userId = req.params.id;
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    return res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;

    const courseData = req.body;

    // const { courseTitle, category_id, courseDescription, coursePrice } = req.body;
    // console.log(courseTitle,category_id,courseDescription,coursePrice, "courseTitle");

    // if (!courseTitle || !category_id || !courseDescription || !coursePrice) {
    //   return res.status(400).json({ message: "Please fill in all these fields" });
    // }

    // const courseData = {
    //   courseTitle,
    //   category_id,
    //   coursePrice,
    //   creator: req.id,
    //   courseDescription,
    // };

    // if (req.file) {
    //   courseData.courseThumbnail = req.file.path;
    // }

    const updateCourse = await Course.updateOne(
      { _id: courseId },
      { $set: courseData }
    );

    return res.status(200).json({
      message: "Course updated successfully",
      updateCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};


// published course 

export const coursePublished = async (req, res) => {
  try {
    const courseId = req.params.id;

    const courseDatapublised = req.body;

    if (!courseId || !courseDatapublised) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    const courseExists = await Course.findById(courseId);
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updateCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $set: courseDatapublised },
      { new: true }
    );

    return res.status(200).json({
      message: "Course published successfully",
      updateCourse,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};


// learner coursers
export const getLearnerCourse=async(req,res)=>{
  try {
    const query=[
      {
        '$match': {
          'isPublished': true
        }
      }
    ]
    const course =await Course.aggregate(query)
    return res.status(200).json({
      message: "Course retrieved successfully",
      course
    })
  } catch (error) {
    return res.status(500).json({
      message:error.message || error,
      success:false,
      error:true
    })
  }
}