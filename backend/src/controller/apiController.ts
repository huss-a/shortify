import asyncHandler from "express-async-handler";
import UrlRecord from "../models/urlModel";
import { addProtocolToUrl } from "../util/formatUrl";
import ShortUniqueId from "short-unique-id";

export const shortenUrl = asyncHandler(async (req, res) => {
    const { url } = req.body;
    if (!url) {
        res.status(400);
        throw Error("Please provide a url in the body.");
    }
    const uid = new ShortUniqueId({ length: 9 });
    const serialized = addProtocolToUrl(url);
    const urlRegexp =
        /https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/;

    if (urlRegexp.test(serialized)) {
        const existingUrlRecord = await UrlRecord.findOne({ url: serialized });

        if (existingUrlRecord) {
            res.status(200).json(existingUrlRecord);
        } else {
            const url = await UrlRecord.create({
                url: serialized,
                urlUid: uid(),
            });
            res.status(201).json(url);
        }
    } else {
        // throw error
        res.status(400);
        throw Error("Invalid Url");
    }
});

export const getUrl = asyncHandler(async (req, res) => {
    const { id: urlUid } = req.params;

    const urlRecordDoesExist = await UrlRecord.findOne({ urlUid });

    if (!urlRecordDoesExist) {
        res.status(404);
        throw Error("URL not found");
    }

    res.status(200).json(urlRecordDoesExist);
});
