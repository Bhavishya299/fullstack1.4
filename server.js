const express = require("express");
const bookingRoutes = require("./routes/booking");

const app = express();

app.use(express.json());

app.use("/api", bookingRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});