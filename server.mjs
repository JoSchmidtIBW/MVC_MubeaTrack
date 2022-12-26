import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
import app from './app';

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// eslint-disable-next-line no-use-before-define
dbConnect().catch((err) => console.log(err));


async function dbConnect() {
    mongoose.set('strictQuery', false);
    await mongoose.connect(DB);
    console.log('DB connection successful!');
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});
