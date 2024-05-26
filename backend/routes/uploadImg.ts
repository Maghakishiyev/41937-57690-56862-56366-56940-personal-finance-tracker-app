import express from "express"
import multer from "multer"

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import config from "../configs"
import { authCheck } from "../middleware";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3Client = new S3Client({
    region: config.bucket_region,
    credentials: {
        accessKeyId: config.aws_access_key,
        secretAccessKey: config.aws_secret_key,
    }
});

router.post('/img', authCheck, upload.single('imageFile'), async (req, res) => {
    if (!req.file) { return res.status(400).send({ error: 'No file uploaded' }); }
    const file = req.file;

    const key = `${Date.now()}_${file.originalname}`;

    try {
        const command = new PutObjectCommand({
            Bucket: config.bucket_name,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        })

        await s3Client.send(command).then((res) => {
        });


        const link = `https://${config.bucket_name}.s3.${config.bucket_region}.amazonaws.com/${key}`;

        res.send({ url: link });
    } catch (error) {
        console.error('S3 upload error:', error);
        res.status(500).send({ error: 'Failed to upload file' });
    }

})

export default router

// https://lab-automatization.s3.us-east-1.amazonaws.com/1716098387138_193079860-thank-you-for-your-attention-text-wooden-blocks-and-plant.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEI3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCTFhLlx0139TsQtEtSJijpLj15o%2FHi411D%2FC1QYda8NAIgMFkzJh6I0swQtu4dD3EKnqqOxhoNzEiWh7KOLdjcoDwq7QII9f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxNjA3OTkzNDg4OTUiDDumZUKlyPcHyA2dVSrBAjjULGl%2FHP0FDqrEXE5S65AZrbLhbNhRakxAG%2FdqGoX%2FE7PhuqniGlw4rmVqBDaUa7zWAwarDkmGPMo0F5lUqL8rbY4WvwRf4q23jO9HEccHEpBxZ0h5tbKeRrpDvbrf1pI1cmrM4%2B2403ViKx7ejYnyfsojYc7JWCevyHESoBtBqPVS8xdDI%2BFglAvpAHokWEQR1ougCoaSlIylMmMlz3zflBhKVGJ8U9%2BixRxIMZdk%2FCxX2nkxxnRh5IbBvW1kxxtTnJWvXiVHDIwXBHtfU3tsd3tVlrzwC%2BNXYOTqjV123TNIS0f6usIUxwBibtVlz7M9Os4tzTBYF9qBoATNSzapovLr7vkigYgL1kdAirunhmBJZfpxoxbulxSOHOv1%2BTHdoDEdrL5oQDQSTa%2B5lnI1X39DADXZoL5XbflgBWaHBzCkmaSyBjqzAiJJH%2FSaWFyc5SEE2LnWPTXOo2ZaLGuSvxiyRPnN6Gn5qoycsKomhJLo78NZvp5Ij4mXut7eHfnhOMKtYHNKwNdhZ4ZqkmoU07q4Ggk68qqSzplWvH%2BeAueM25ZX%2BaNO1soO3tX1KddlZr5%2BO8Ev00%2FSeXbZ5l4F46Q%2F0ASo9CFpjT6zq0HzMTYHA4%2F%2FJYQT6TTY7x%2FwWx2kyQWlt37znddfupWo7%2FMzZWI4G%2FgvY9qoRx9vqwU6s%2F6stInrETqcSYMbAFTRfVnjuEgDWrL1%2F70OvtAIrYAvJMu3KEHtImPhylcp5AT44y1fZ%2FjMOtc37idmo22ewdGckStzA33ZfOZKhtTWGzj3z2pEIgJsedQ3qjKo4vneR6bELT%2FdcZTEpsim2lDKzuddrwyfDIyN%2BF%2FUgsw%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240519T060248Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIASK4DDLCPQDK4RPXT%2F20240519%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=651c9f142814596201491502a2a8d9109eb8477f344d69eb17d0f4eab7a578c4