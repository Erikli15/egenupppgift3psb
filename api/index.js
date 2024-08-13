const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const fs = require("fs");
// const bodyParser = require("body-parser");
// const path = require("path");
// const {
//   createTableIfNotExists,
//   seedProducts,
//   findAll,
//   addProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../database/data.js");

const app = express();

// const stripe = require("stripe");

// const StripeKey = process.env.SK_TEST;
// const stripeconection = new stripe(StripeKey);

// app.use(express.static("public"));
// app.use(express.json());

const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// app.use(cors());

// dotenv.config();
// app.use(bodyParser.json());

// const calculateOrderAmount = (items) => {
//   if (items.length == 0) return 100 * 100;
//   const totalAmount = items.reduce((acc, product) => acc + product.price, 0);
//   return totalAmount * 100;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "sek",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// app.get("/", async (req, res) => {
//   let products = await findAll();
//   res.json(products);
// });

// app.get("/:id", async (req, res) => {
//   let products = await findAll();
//   if (!products) {
//     res.status(404).json({ message: "No products found" });
//     return;
//   }
//   const productId = parseInt(req.params.id);
//   const product = products.find(
//     (product) => product.id === parseInt(productId)
//   );
//   if (!product) {
//     res.status(404).json({ message: "Product not found" });
//   } else {
//     console.log(product.id);
//     res.json(product);
//   }
// });

// app.post("/", async (req, res) => {
//   const { productName, price, categoryName, description, imgUrl } = req.body;
//   console.log(req.body);
//   if (
//     !productName ||
//     isNaN(price) ||
//     !categoryName ||
//     description === undefined ||
//     imgUrl === undefined
//   ) {
//     res.status(400).json({
//       message: "All parameters are required",
//     });
//     return;
//   }
//   try {
//     console.log("Calling addProduct with:", [
//       productName,
//       price,
//       categoryName,
//       description,
//       imgUrl,
//     ]);

//     await addProduct(productName, price, categoryName, description, imgUrl);
//     const message = "Product added successfully!";
//     res.json({ message: message });
//   } catch (error) {
//     console.error(`Error adding product: ${error.message}`);
//     res.status(500).json({ message: "Error adding product" });
//   }
// });

// app.put("/:id", async (req, res) => {
//   const productId = req.params.id;
//   const updatedProductData = req.body;
//   const requiredProperties = [
//     "productName",
//     "price",
//     "categoryName",
//     "description",
//     "imgUrl",
//   ];

//   for (const property of requiredProperties) {
//     if (
//       !updatedProductData[property] &&
//       updatedProductData[property] !== null
//     ) {
//       res.status(400).json({ error: `Property '${property}' is required` });
//       return;
//     }
//   }

//   try {
//     await updateProduct(
//       productId,
//       updatedProductData.productName,
//       updatedProductData.price,
//       updatedProductData.categoryName,
//       updatedProductData.description,
//       updatedProductData.imgUrl
//     );
//     console.log(`Product ${productId} updated successfully`);
//     console.log(updatedProductData);
//     res.send(updatedProductData);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.delete("/:id", async (req, res) => {
//   const productId = req.params.id;
//   const result = await deleteProduct(productId);
//   console.log(`Deleted product ${productId}: ${JSON.stringify(result)}`);
//   res.sendStatus(204);
// });

app.listen(port, async () => {
  await createTableIfNotExists();
  await seedProducts();
  console.log(`appen lyssnar på port http://localhost:${port}`);
});

module.exports = app;
