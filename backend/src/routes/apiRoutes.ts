import express from "express";
import { getUrl, shortenUrl } from "../controller/apiController";

const router = express.Router();

router.post("/shorten", shortenUrl);

router.get("/:id", getUrl);

export default router;
