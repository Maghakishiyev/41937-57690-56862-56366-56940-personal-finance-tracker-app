import express from "express";
import AWS from "aws-sdk";
import multer from "multer";
import fs from "fs";

import config from "../configs";

const router = express.Router();

AWS.config.update({
    accessKeyId: config.aws_access_key,
    secretAccessKey: config.aws_secret_key,
    region: config.bucket_region
});

const s3 = new AWS.S3();

const upload = multer({ dest: 'uploads/' });

const uploadFileToS3 = async (filePath: string, bucketName: string, key: string): Promise<string> => {
    const fileContent = fs.readFileSync(filePath);
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: fileContent
    };

    const link = await s3.upload(params).promise();
    return link.Location
};

router.post("/upload", upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const file_path = req.file?.path;
    const file_name = req.file?.originalname;
    const key = `uploads/${file_name}`;

    try {
        const file_url = await uploadFileToS3(file_path, config.bucket_name, key);
        fs.unlinkSync(file_path);
        res.status(200).send({ url: file_url });
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        res.status(500).send('Error uploading file.');
    }
})

export default router;




