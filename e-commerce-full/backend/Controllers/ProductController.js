const Product = require("../models/Product");
const { productValidation } = require("../validation");

exports.create = async (req, res,next) => {
    // res.send(req.body)
    // validate input parameters
    const { error } =productValidation(req.body);
    if (error) {
      res
        .status(402)
        .json({ error: error.details[0].message, status: "error" });
        // process.exit(1);
        // next(error)
        return;
    }
    const { name, category, price,brand, description,rating,reviews,img} = req.body;
    const newProduct = new Product({
        name, category, price,brand, description,rating,reviews,img
    }); 
    try {
      await  newProduct.save().then((product) => res.status(200).json(product))
            .catch((err) => next(err))
  } catch (error) {
    next(error);
  }
};
exports.index=async(req,res,next)=> {
    try {
      const products = await Product.find({})
      res.json(products)
    } catch (error) {
      next(error);
    }
}
exports.show=async(req,res,next)=> {
  try {
    // res.send(req.params);
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (error) {
    next(error);
  }
}