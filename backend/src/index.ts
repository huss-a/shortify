import express from "express";
import dotenv from "dotenv";
import apiRoutes from "./routes/apiRoutes";
import connectDB from "./util/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";
import asyncHandler from "express-async-handler";
import UrlRecord from "./models/urlModel";
import path from "path";

dotenv.config();

connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.get(
    "/:urlUid",
    asyncHandler(async (req, res, next) => {
        const { urlUid } = req.params;
        const urlRecord = await UrlRecord.findOne({ urlUid });
        if (urlRecord) {
            res.redirect(urlRecord.url);
        } else next();
    })
);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}..`));
