const express = require("express");
const router = express.Router();

// In-memory seat storage
const seats = {};

router.post("/book/:seatId", async(req, res) => {

    const seatId = req.params.seatId;

    // Check if seat already booked
    if (seats[seatId] === "booked") {
        return res.json({
            status: "failed",
            message: "Seat already booked"
        });
    }

    // Simulate booking delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Book the seat
    seats[seatId] = "booked";

    res.json({
        status: "success",
        seat: seatId
    });

});

module.exports = router;