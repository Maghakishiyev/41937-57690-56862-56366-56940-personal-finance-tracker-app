import config from '.';

describe('Config Tests', () => {
    // Backup the current environment variables
    const originalEnv = process.env;

    beforeEach(() => {
        // Clear the environment variables before each test
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        // Restore the original environment variables after all tests
        process.env = originalEnv;
    });

    it('should use default values when environment variables are not set', () => {
        process.env.JWT_SECRET = '';

        expect(config.port).toBe('undefined');
        expect(config.jwt_secret).toBe('-|your@_@default@_@secret|-');
        expect(config.mongo_uri).toBe('undefined');
        expect(config.bucket_name).toBe('undefined');
        expect(config.bucket_region).toBe('undefined');
        expect(config.aws_access_key).toBe('undefined');
        expect(config.aws_secret_key).toBe('undefined');
    });

    it('should correctly set config from environment variables', () => {
        process.env.PORT = '3000';
        process.env.JWT_SECRET = 'secret123';
        process.env.MONGO_URI = 'mongodb://localhost:27017/test';
        process.env.BUCKET_NAME = 'mybucket';
        process.env.BUCKET_REGION = 'us-east-1';
        process.env.AWS_KEY = 'AKIAIOSFODNN7EXAMPLE';
        process.env.AWS_SECRET = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

        const config = require('.').default;

        expect(config.port).toBe('3000');
        expect(config.jwt_secret).toBe('secret123');
        expect(config.mongo_uri).toBe('mongodb://localhost:27017/test');
        expect(config.bucket_name).toBe('mybucket');
        expect(config.bucket_region).toBe('us-east-1');
        expect(config.aws_access_key).toBe('AKIAIOSFODNN7EXAMPLE');
        expect(config.aws_secret_key).toBe(
            'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
        );
    });
});
