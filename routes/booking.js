const express = require("express");
const router = express.Router();
const redis = require("../services/redisClient");

router.post("/book/:seatId", async(req, res) => {

    const seatId = req.params.seatId;

    // check if seat already booked
    const seatStatus = await redis.get(`seat:${seatId}`);

    if (seatStatus === "booked") {
        return res.json({
            status: "failed",
            message: "Seat already booked"
        });
    }

    // lock seat
    const lock = await redis.set(`lock:${seatId}`, "locked", {
        NX: true,
        EX: 10
    });

    if (!lock) {
        return res.json({
            status: "failed",
            message: "Seat is being booked by another user"
        });
    }

    // simulate booking delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // mark seat booked
    await redis.set(`seat:${seatId}`, "booked");

    // remove lock
    await redis.del(`lock:${seatId}`);

    res.json({
        status: "success",
        seat: seatId
    });

});

module.exports = router;