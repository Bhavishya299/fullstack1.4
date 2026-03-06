const express = require("express");
const router = express.Router();

// In-memory seat storage
const seats = {};

// Browser-friendly booking
router.get("/book/:seatId", async(req, res) => {

    const seatId = req.params.seatId;

    // Check if seat already booked
    if (seats[seatId] === "booked") {
        return res.send(`
            <h2>❌ Seat ${seatId} already booked</h2>
        `);
    }

    // Simulate delay (like concurrent booking)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Book seat
    seats[seatId] = "booked";

    res.send(`
        <h2>✅ Seat ${seatId} booked successfully</h2>
    `);
});

module.exports = router;