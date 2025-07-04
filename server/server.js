const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedError } = require("./middleware/error");
const fileUpload = require("express-fileupload");

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Enable file uploads
app.use(fileUpload());

// Logger
app.use(logger("tiny"));

// CORS
const allowedOrigins = [
  // 'https://health-gainer-frontend.vercel.app',
  // 'https://health-gainer-frontend-5dltwckec-sky-info-groups-projects.vercel.app'
  "https://health-gainer-frontend.vercel.app",
  "https://health-gainer-frontend-nm0w488og-sky-info-groups-projects.vercel.app",
  "http://localhost:3000",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// You can also add cors() middleware
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsers
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());

// Static file serving
app.use("/api/v1/uploads", express.static("uploads"));

// Cookie parser
app.use(cookieParser());

// Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const varientsRoutes = require("./routes/variantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const addressRoutes = require("./routes/addressRoutes");
const contactRoutes = require("./routes/contactRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const healthGainerRoutes = require("./routes/healthGainerRoutes");
const headerSliderImagesRoutes = require("./routes/header-slider/imageAssetRoutes");
const benefitRoutes = require("./routes/benefit/benefitRoutes");

app.use("/api/v1/images", headerSliderImagesRoutes);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/variants", varientsRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/addresses", addressRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/healthgainer", healthGainerRoutes);

// admin apis
app.use("/api/v1/benefits", benefitRoutes);

// Error handling
app.use(generatedError);

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found ${req.url}`, 404));
});

// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening at port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

// /api/v1/images
