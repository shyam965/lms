import { query } from "express";
import Chapter from "../models/chapter.model.js";

import mongoose from "mongoose";
export const chapterCreate = async (req, res) => {
  try {
    const { Description, Title, course_id } = req.body;

    if (!Title || !Description || !course_id) {
      return res.status(400).json({
        message: "please fill all fields",
      });
    }
    const chapterData = {
      Title: Title,
      Description: Description,
      creator: req.id,
      course_id: course_id,
    };

    if (req.file) {
      chapterData.chapter_url = req.file.path;
    } else {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    const chapter = await Chapter.create(chapterData);
    return res.status(201).json({
      message: "Chapter created successfully",

      success: true,
      chapter,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const chapterGet = async (req, res) => {
  try {
  
    const { id } = req.params;
    

    const query = [
      {
        '$match': {
          'course_id': new mongoose.Types.ObjectId(id)
        }
      },
    ];

    const chapter = await Chapter.aggregate(query);
    console.log(chapter, "jjjjj");
    return res.status(200).json({
      message: "Chapter found successfully",
      success: true,
      chapter,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

