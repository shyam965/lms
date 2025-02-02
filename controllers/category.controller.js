import { Category } from "../models/category.model.js";

export const createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: "category is required" });
    }
    const newcategory = await Category.create({ categoryName });
    return res.status(201).json({
      message: "category created successfully",
      success: true,
      category: newcategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const getCategory = async (req, res) => {
  try {
    const query = [
      {
        $match: {},
      },
    ];
    // const categoryData=await Category.find()
    const categoryDate = await Category.aggregate(query);
    if (!categoryDate) {
      return res
        .status(404)
        .json({ message: "category not found", success: false });
    }
    return res.status(200).json({
      message: "categories fetched successfully",
      data: categoryDate,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categoryData = req.body;
    // const updatedCategory=await Category.findByIdAndUpdate(categoryId,categoryData,{new:true})

    const updateCategory = await Category.updateOne(
      { _id: categoryId },
      { $set: categoryData }
    );

    if (!updateCategory) {
      return res
        .status(404)
        .json({ message: "category not found", success: false });
    }
    return res.status(200).json({
      message: "category updated successfully",
      data: updateCategory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};


export const deleteCategory=async(req,res)=>{
    try {
        const categoryId=req.params.id;
        const deleteCategory=await Category.findByIdAndDelete(categoryId);
        if(!deleteCategory){
            return res.status(404).json({message:"category not found",success:false});
            }
            return res.status(200).json({
                message:"category deleted successfully",
                data:deleteCategory
                });

        
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            success: false,
            error: true,

        })
        
    }
}
