import dotenv from 'dotenv';
dotenv.config();

export const env = {
    get: <T>(key: string): T => {
        const value = process.env[key];
        if (!value) throw new Error(`Environment ${key} is not set`);

        return value as unknown as T;
    }
}