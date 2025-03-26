const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const userRoutes = require("./routes/User");
const PostRoutes = require("./routes/Post")
const searchRoutes = require("./routes/Search")
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require("express-fileupload");
const {cloudinaryConnect} = require("./config/cloudinary")

dotenv.config();
const PORT = process.env.PORT || 5000;

//database connectpr
database.connect();

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

cloudinaryConnect()

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/post", PostRoutes);
app.use("/api/v1/search", searchRoutes);

app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	}); 
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})