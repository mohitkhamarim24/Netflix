import express from 'express';
const app = express();

app.use("/api/v1/auth",authRoutes);
app.listen(5000, () => {
    console.log('Server started at http://localhost:5000');  // Changed to 'http'
});
