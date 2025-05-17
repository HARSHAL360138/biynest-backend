
require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require("./middleware/errorMiddleware");
const applicantRoutes = require("./routes/ApplicantRoutes");
const bodyParser = require("body-parser");



const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Connect to MongoDB
connectDB();

// Routes
app.use("/jobs", jobRoutes);
app.use('/api/items', itemRoutes);
app.use("/api/applicants", applicantRoutes);


// Error Middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));






