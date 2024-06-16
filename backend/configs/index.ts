import dotenv from 'dotenv';
dotenv.config();

interface Config {
    port: string;
    jwt_secret: string;
    mongo_uri: string;
    bucket_name: string;
    bucket_region: string;
    aws_access_key: string;
    aws_secret_key: string;
}

const config: Config = {
    port: `${process.env.PORT}`,
    jwt_secret: process.env.JWT_SECRET || '-|your@_@default@_@secret|-',
    mongo_uri: `${process.env.MONGO_URI}`,
    bucket_name: `${process.env.BUCKET_NAME}`,
    bucket_region: `${process.env.BUCKET_REGION}`,
    aws_access_key: `${process.env.AWS_ACCESS_KEY}`,
    aws_secret_key: `${process.env.AWS_SECRET_KEY}`,
};

export default config;