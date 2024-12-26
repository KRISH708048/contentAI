const express = require("express");
const { PrismaClient } = require("@prisma/client");
const router = express.Router();
const db = new PrismaClient();

const saveAIOutput = async (formData, aiResponse, templatesSlug, words, createdBy, uid) => {
    try {
        const result = await db.aIOutput.create({
            data: {
                uid,
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

const saveIssue = async (formData, uid) => {
    try {
        const result = await db.IssuesForm.create({
            data: {
                uid,
                formData: JSON.stringify(formData),
                createdAt: new Date(),
            },
        });
        console.log("Saved AI Output:", result);
        return result;
    } catch (error) {
        console.error("Error saving your issue:", error);
        throw error;
    }
};

router.post("/save-ai-output", async (req, res) => {
    const { formData, aiResponse, templatesSlug, words, createdBy, uid } = req.body;

    if (!formData || !templatesSlug || !createdBy ||!uid) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const result = await saveAIOutput(formData, aiResponse, templatesSlug, words, createdBy, uid);
        res.status(201).json({ message: "AI Output saved successfully!", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to save AI Output.", details: error.message });
    }
});

router.post("/save-issue", async (req, res) => {
    const { uid, formData} = req.body;
    // console.log(formData);
    if (!formData || !uid) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const result = await saveIssue(formData, uid);
        res.status(201).json({ message: "Issue saved successfully!", result });
    } catch (error) {
        res.status(500).json({ error: "Failed to save Issue.", details: error.message });
    }
});

router.get('/history', async (req, res) => {
    const { userID } = req.query;
    // console.log(userID);
    if (!userID) {
        return res.status(400).json({ error: "User ID is required." });
    }

    try {

        const history = await db.aIOutput.findMany({where: { uid: userID }, orderBy: { createdAt: 'desc' } });

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
    const { userID } = req.query;
    if (!userID) {
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
                uid: userID,
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
