const express = require('express');
const cors = require("cors");
const rootRouter = require("./routes/index");
const app = express();
const PORT = process.env.PORT || 3005;
const dotenv =  require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());
console.log("Database URL:", process.env.DATABASE_URL, process.env.PORT);

app.use("/api/v1", rootRouter);

app.listen(PORT, ()=>console.log(`running on port:${PORT}`));