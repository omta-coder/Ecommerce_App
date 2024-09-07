import Product from "../../models/product.js";




export const getFilteredProducts = async(req,res) => {
  try {
    const { category, price, brand } = req.query;
    const products = await Product.find({})
    res.status(200).json({
        success: true,
        data: products,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};
