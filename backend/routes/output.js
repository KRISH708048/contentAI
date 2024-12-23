const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const db = new PrismaClient();

const saveAIOutput = async (formData, aiResponse, templatesSlug, words, createdBy) => {
    try {
        const result = await db.aIOutput.create({
            data: {
                formData: JSON.stringify(formData),
                aiResponse,
                templatesSlug,
                createdBy,
                words,
                createdAt: new Date(),
            },
        });
        // console.log("Saved AI Output:", result);
        return result;
    } catch (error) {
        console.error("Error saving AI Output:", error);
        throw error;
    }
};

router.post("/save-ai-output", async (req, res) => {
    const { formData, aiResponse, templatesSlug, words, createdBy } = req.body;

    if (!formData || !templatesSlug || !createdBy) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const result = await saveAIOutput(formData, aiResponse, templatesSlug, words, createdBy);
        res.status(201).json({ message: "AI Output saved successfully!", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to save AI Output.", details: error.message });
    }
});

router.get('/history', async (req, res) => {
    try {
        const history = await db.aIOutput.findMany({ orderBy: { createdAt: 'desc' } });

        if (history.length === 0) {
            return res.status(200).json({ message: "No history!" });
        }

        res.status(200).json({ message: "History retrieved successfully.", data: history });
    } catch (error) {
        console.error("Error retrieving history:", error);
        res.status(500).json({ error: "Failed to retrieve history.", details: error.message });
    }
});

router.get('/usage', async (req, res) => {
    const { user } = req.query;
    if (!user) {
        return res.status(400).json({ error: "Register first!" });
    }
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const totalWords = await db.aIOutput.aggregate({
            _sum: {
                words: true,
            },
            where: {
                createdBy: user,
                createdAt: {
                    gte: startOfDay,
                    lte: endOfDay,
                },
            },
        });
        console.log(totalWords._sum.words || 0);    
        res.status(200).json({
            message: "Usage retrieved successfully.",
            totalWords: totalWords._sum.words || 0,
        });
    } catch (error) {
        console.error("Error calculating usage:", error);
        res.status(500).json({
            error: "Failed to calculate usage.",
            details: error.message,
        });
    }
});

module.exports = router;
