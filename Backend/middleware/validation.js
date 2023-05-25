const mongoose = require("mongoose");
// const productModel = require("../models/productModel");
const CouponModel = require("../models/CouponModel");

//this validation will check the type of values--
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};
//this validBody checks the validation for the empty body
const isValidBody = function (requestBody) {
  return Object.keys(requestBody).length > 0;
};
//checks whether object id is valid or not
const isValidObjectId = (ObjectId) => {
  return mongoose.Types.ObjectId.isValid(ObjectId);
};

//check valid type of email--
const isValidEmail = function (value) {
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
    return false;
  }
  return true;
};

//checks valid type of number
const isValidNumber = function (value) {
  if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(value)) {
    return false;
  }
  return true;
};

//valid type of name
const isValidName = function (value) {
  if (!/^[A-Za-z ]+$/.test(value.trim())) {
    return false;
  }
  return true;
};

//
const isValidPassword = function (value) {
  if (!/^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(value)) {
    return false;
  }
  return true;
};

//
const isValidPinCode = function (value) {
  if (!/^\d{6}$/.test(value)) {
    return false;
  }
  return true;
};

//
const isValidPrice = function (value) {
  if (!/^\d+(,\d{3})*(\.\d{1,2})?$/.test(value)) {
    return false;
  }
  return true;
};

//
const isValidSize = function (value) {
  return ["S", "XS", "M", "X", "L", "XXL", "XL"].indexOf(value) !== -1;
};

// const validProduct = async function (req, res, next) {
//   try {
//     let body = JSON.parse(JSON.stringify(req.body));
//     if (Object.keys(body).length == 0) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
//     }

//     const {
//       title,
//       description,
//       price,
//       currencyId,
//       currencyFormat,
//       availableSizes,
//       installments,
//     } = body;

//     if (!title) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter title In Body !!!" });
//     }

//     if (!isValidName(title)) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Please mention valid title In Body !!!" });
//     }

//     const findTitle = await productModel.findOne({ title: title });
//     if (findTitle) {
//       return res.status(400).send({
//         status: false,
//         msg: "Title Is Already Exists, Plz Enter Another One !!!",
//       });
//     }

//     if (!description) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter description In Body !!!" });
//     }

//     if (!price) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter price In Body !!!" });
//     }
//     if (!isValidPrice(price)) {
//       return res.status(400).send({
//         status: false,
//         msg: "Plz Enter valid format price In Body !!!",
//       });
//     }

//     if (!currencyId) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter currencyId In Body !!!" });
//     }
//     if (currencyId != "INR") {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter currencyID in INR format !!!" });
//     }
//     if (!currencyFormat) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter currencyFormat In Body !!!" });
//     }

//     if (currencyFormat != "₹") {
//       return res.status(400).send({
//         status: false,
//         msg: "Plz Use Indian Currency Format(₹) In Body !!!",
//       });
//     }

//     if (!availableSizes) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter availableSizes In Body !!!" });
//     }

//     if (isNaN(installments) == true) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Plz Enter Number In installments !!!" });
//     }

//     let files = req.files;
//     if (!(files && files.length > 0)) {
//       return res
//         .status(400)
//         .send({ status: false, msg: "Enter File In Body !!!" });
//     }
//     next();
//   } catch (err) {
//     res.status(500).send({ status: false, msg: err.message });
//   }
// };

//Coupon Validation
const validCoupon = async function (req, res, next) {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
    }

    const { couponCode, discountType, discount, description } = body;
    if (!couponCode) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Coupon Code In Body !!!" });
    }

    if (!description || !discountType || !discount) {
      let error = [];
      if (!description) {
        error.push("Description");
      }
      if (!discountType) {
        error.push("DiscountType");
      }
      if (!discount) {
        error.push("Discount");
      }
      return res.status(400).send({
        status: false,
        message: `Please Enter ${error.join(", ")} to continue`,
      });
    }
    const findCoupon = await CouponModel.findOne({ couponCode: couponCode });
    if (findCoupon) {
      return res.status(400).send({
        status: false,
        msg: "Coupon Is Already Exist, Please Enter Another Coupon Code !!!",
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Order Validation
const validOrder = async function (req, res, next) {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
    }
    const { price, quantity, deliveryAdd, product, cartItem } = body;
    if (!price || !quantity || !product || !cartItem || !deliveryAdd) {
      let error = [];

      if (!price) {
        error.push("price");
      }
      if (!quantity) {
        error.push("quantity");
      }
      if (!product) {
        error.push("product Id");
      }
      if (!cartItem) {
        error.push("cartItem Id");
      }
      if (!deliveryAdd) {
        error.push("deliveryAdd Id");
      }

      return res.status(400).send({
        status: false,
        message: `Please Enter ${error.join(", ")} to continue`,
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// Contact Us Validation
const validContactUs = async function (req, res, next) {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
    }
    const { address, email, contNo, GoogleLink } = body;
    if (!address || !email || !GoogleLink || !contNo) {
      let error = [];

      if (!address) {
        error.push("address");
      }
      if (!email) {
        error.push("email");
      }
      if (!GoogleLink) {
        error.push("GoogleLink ");
      }
      if (!contNo) {
        error.push("Contact Number");
      }

      return res.status(400).send({
        status: false,
        message: `Please Enter ${error.join(", ")} to continue`,
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Shipping Address Validation
const validShipping = async function (req, res, next) {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
    }
    const {
      addType,
      ContName,
      ContactNo,
      Street1,
      Street2,
      pinCode,
      city,
      state,
      country,
      product_id,
    } = body;
    if (
      !addType ||
      !ContName ||
      !ContactNo ||
      !Street1 ||
      !Street2 ||
      !pinCode ||
      !city ||
      !state ||
      !country ||
      !product_id
    ) {
      let error = [];

      if (!addType) {
        error.push("addType");
      }
      if (!ContName) {
        error.push("ContName");
      }
      if (!ContactNo) {
        error.push("ContactNo ");
      }
      if (!Street1) {
        error.push("Street1");
      }
      if (!Street2) {
        error.push("Street2");
      }
      if (!pinCode) {
        error.push("pinCode");
      }
      if (!city) {
        error.push("city");
      }
      if (!state) {
        error.push("state");
      }
      if (!country) {
        error.push("country");
      }
      if (!product_id) {
        error.push("product_id");
      }

      return res.status(400).send({
        status: false,
        message: `Please Enter ${error.join(", ")} to continue`,
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Product Validation
const validProduct = async function (req, res, next) {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
    }
    const {
      category,
      Brand,
      name,
      description,
      attributeType,
      price,

      Stock,
    } = body;
    if (
      !category ||
      !Brand ||
      !name ||
      !description ||
      !attributeType ||
      !price ||
      !Stock
    ) {
      let error = [];

      if (!category) {
        error.push("category Id");
      }
      if (!Brand) {
        error.push("Brand Id");
      }
      if (!name) {
        error.push("Product Name  ");
      }
      if (!description) {
        error.push("Description");
      }
      if (!attributeType) {
        error.push("attributeType");
      }
      if (!price) {
        error.push("price");
      }

      if (!Stock) {
        error.push("Stock");
      }

      return res.status(400).send({
        status: false,
        message: `Please Enter ${error.join(", ")} to continue`,
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//user Validation
const validUser = async function (req, res, next) {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
    }
    const { fname, lname, email, mobile, password } = body;
    if (!fname || !lname || !email || !mobile || !password) {
      let error = [];

      if (!fname) {
        error.push("fname");
      }
      if (!lname) {
        error.push("lname");
      }
      if (!email) {
        error.push("email");
      }
      if (!mobile) {
        error.push("mobile");
      }
      if (!password) {
        error.push("password");
      }
      return res.status(400).send({
        status: false,
        message: `Please Enter ${error.join(", ")} to continue`,
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Product Review Validation
const validReview = async function (req, res, next) {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
    }
    const { product, comment, rating } = body;
    if (!product || !comment || !rating) {
      let error = [];

      if (!product) {
        error.push("product Id");
      }
      if (!comment) {
        error.push("comment");
      }
      if (!rating) {
        error.push("Product rating");
      }

      return res.status(400).send({
        status: false,
        message: `Please Enter ${error.join(", ")} to continue`,
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

//Product Review Validation
const validReviewUpdate = async function (req, res, next) {
  try {
    let body = JSON.parse(JSON.stringify(req.body));
    if (Object.keys(body).length == 0) {
      return res
        .status(400)
        .send({ status: false, msg: "Plz Enter Data Inside Body !!!" });
    }
    const { rating } = body;
    if (!rating) {
      let error = [];

      if (!rating) {
        error.push("Product rating");
      }

      return res.status(400).send({
        status: false,
        message: `Please Enter ${error.join(", ")} to continue`,
      });
    }
    next();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = {
  isValid,
  isValidBody,
  isValidObjectId,
  isValidEmail,
  isValidNumber,
  isValidName,
  isValidPassword,
  isValidPinCode,
  isValidPrice,
  isValidSize,

  validUser,
  validReview,
  validReviewUpdate,
  validOrder,
  validProduct,
  validContactUs,
  validShipping,
  validCoupon,
};
