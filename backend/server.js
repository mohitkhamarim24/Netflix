import express from 'express';
import movieRoutes from './routes/movie.routes.js';
import authRoutes from './routes/auth.route.js';
import { ENV_VARS } from './config/envVars.js';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
const app = express();
const PORT = ENV_VARS.PORT;
app.use(express.json());
app.all("/", (req, res) => {
    res.send("Welcome to the API");
});
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movies",movieRoutes);
app.listen(PORT, () => {
    console.log('Server started at http://localhost:' + PORT); 
    connectDB();
});


