import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || '');
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error al conectar a MongoDB: ${error.message}`);
        } else {
            console.error('Error al conectar a MongoDB: Error desconocido');
        }
        process.exit(1);
    }
};

export default connectDB;