const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose"); // Added mongoose import
const database = require("./config/database"); // Assuming this file exports a database connection function
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

// dotenv.config();
// const PORT = process.env.PORT || 4000;



console.log('MONGODB_URL:', process.env.MONGODB_URL);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process on database connection failure
});

// Middleware setup
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//     cors({
// 		origin:"http://localhost:3000",
// 		credentials:true,
// 	})
// );

// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "/tmp",
//     })
// );

// // Cloudinary connection setup
// cloudinaryConnect();

// Routes setup
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// app.use("/api/v1/StudyNotion/auth", userRoutes);
// app.use("/api/v1/StudyNotion/profile", profileRoutes);
// app.use("/api/v1/StudyNotion/course", courseRoutes);
// app.use("/api/v1/StudyNotion/payment", paymentRoutes);
// app.use("/api/v1/StudyNotion/reach", contactUsRoute);

// // Default route
// app.get("/", (req, res) => {
//     return res.json({
//         success: true,
//         message: 'Your server is up and running....'
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`App is running at ${PORT}`);
// });

dotenv.config();
const PORT = process.env.PORT || 4000;

//database connect
//database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
 cors({
  origin:"http://localhost:3000",
  credentials:true,
 })
)

app.use(
 fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp",
 })
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/StudyNotion/auth", userRoutes);
app.use("/api/v1/StudyNotion/profile", profileRoutes);
app.use("/api/v1/StudyNotion/course", courseRoutes);
app.use("/api/v1/StudyNotion/payment", paymentRoutes);
app.use("/api/v1/StudyNotion/reach", contactUsRoute);

//def route

app.get("/", (req, res) => {
 return res.json({
  success:true,
  message:'Your server is up and running....'
 });
});

app.listen(PORT, () => {
 console.log(`App is running at ${PORT}`)
})


