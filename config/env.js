import { config } from 'dotenv';

// Load environment variables based on NODE_ENV
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// Export PORT
export const PORT = process.env.PORT || 3000;
export const {
    DB_URI,
    NODE_ENV,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    QSTASH_TOKEN,
    QSTASH_URL,
    SERVER_URL,
    EMAIL_PASSWORD,
    

}=process.env;

