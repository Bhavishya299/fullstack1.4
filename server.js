const express = require("express");
const bookingRoutes = require("./routes/booking");

const app = express();

app.use("/api", bookingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});