import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import 'dotenv/config';
import orderRouter from "./routes/orderRoutes.js";
import profileRouter from "./routes/profileRoute.js";

const app = express();
const port =process.env.PORT|| 4000;

// Configure CORS
const corsOptions = {
    origin: '*', // Replace '*' with the frontend's domain for production (e.g., 'https://your-frontend.com')
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept','token']
};

app.use(cors(corsOptions));  


app.use(express.json());

// db connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));  // For serving static files (like images)
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)
app.use("/api/profile",profileRouter);

app.get('/', (req, res) => {
    res.send("Hello from server");
});

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
