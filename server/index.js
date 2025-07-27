const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config(); // aapn env file la process chya object madhye aanto
const PORT = process.env.PORT || 4000;

//database connect
database.connect();

//middlewares
app.use(express.json());    // Ha middleware basically use kela jato==> Ha req chya body madhun data fetch karto ani tyala parse krto json chya object madhye
app.use(cookieParser());  // aapn authentication kiva authorization sathi json web token ch use krto ani tayt kahi gosthi cookie kiva header madhe astat HTTP chya request chya ani te fetch krun pasrse karnyach kam ha middleware krto
app.use(express.urlencoded({extended:true}));  // use to parse url encodedBodies
app.use(
	cors({
		origin:"http://localhost:3000",   // we will see at frontend time
		credentials:true,
	})
)

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",        //temp files chi concept
	})
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

//def route

app.get("/", (req, res) => {        // dummy route defien kela
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.listen(PORT, () => {       // he server la start krt for that wehave to gve PORT input 
	console.log(`App is running at ${PORT}`)
})

