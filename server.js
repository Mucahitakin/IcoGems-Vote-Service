require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 9999;
const API_KEY = process.env.API_KEY;
const REQUEST_COUNT = process.env.REQUEST_COUNT;
const TARGET=process.env.TARGET;

async function fetchVotePage() {
    const url = `https://api.scraperapi.com?api_key=${API_KEY}&url=https://icogems.com/coinvote/${TARGET}`;

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
            }
        });

        return { success: true, status: response.status, data: response.data };
    } catch (error) {
        return {
            success: false,
            message: error.message,
            status: error.response ? error.response.status : 500,
            data: error.response ? error.response.data : null
        };
    }
}

app.get("/vote", async (req, res) => {
    try {
        console.log(`${REQUEST_COUNT} requests are being sent...`);

        const results = await Promise.all(
            Array.from({ length: REQUEST_COUNT }, () => fetchVotePage())
        );

        const successCount = results.filter(r => r.success).length;
        const failCount = results.length - successCount;

        console.log(`Success: ${successCount}`);
        console.log(`Failed: ${failCount}`);

        res.json({
            success: true,
            message: `${REQUEST_COUNT} Sent request to ICOGEMS.COM.`,
            successCount,
            failCount,
            results
        });

    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error!",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});