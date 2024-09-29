import express from 'express';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';

import movieRoutes from './routes/movie.routes.js';
import authRoutes from './routes/auth.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';


import { ENV_VARS } from './config/envVars.js';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
const app = express();
const PORT = ENV_VARS.PORT;
app.use(express.json());
app.use(cookieParser());
app.all("/", (req, res) => {
    res.send("Welcome to the API");
});
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movies",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);
app.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT); 
    connectDB();
});


