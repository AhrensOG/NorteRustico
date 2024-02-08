const connection = require("../index.js");
const Categories = require("./categories");
const Favourites = require("./favourites");
const Order = require("./order");
const OrderProducts = require("./orderProducts");
const Product = require("./product");
const ProductCategories = require("./productCategories");
const ProductImages = require("./productImages");
const ProductTags = require("./productTags");
const Qualifications = require("./qualifications");
const Tags = require("./tags");
const User = require("./user");

(async () => {
  try {
    User.hasMany(Order)
    Order.belongsTo(User)

    Product.hasMany(ProductImages);
    ProductImages.belongsTo(Product);

    Order.belongsToMany(Product, { through: OrderProducts });
    Product.belongsToMany(Order, { through: OrderProducts });

    User.belongsToMany(Product, { through: Qualifications });
    Product.belongsToMany(User, { through: Qualifications });

    User.belongsToMany(Product, { through: Favourites });
    Product.belongsToMany(User, { through: Favourites });
    
    Product.belongsToMany(Categories, { through: ProductCategories });
    Categories.belongsToMany(Product, { through: ProductCategories });

    Product.belongsToMany(Tags, { through: ProductTags });
    Tags.belongsToMany(Product, { through: ProductTags });

    await connection.sync({ force: true });
  } catch (error) {
    console.log(error);
  }
})();

module.exports = {
  User,
  Product,
  Order,
  Categories,
  Tags,
  ProductImages,
  ProductCategories,
  ProductTags,
  Favourites,
  Qualifications,
  OrderProducts
};
