import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

class AuthService {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    generateToken(userId: string, role: string): string {
        const payload = { id: userId, role: role };
        const secret = process.env.JWT_SECRET || 'your_jwt_secret';
        const options = { expiresIn: '1h' };
        return jwt.sign(payload, secret, options);
    }

    async registerUser(username: string, password: string, role: string) {
        const hashedPassword = await this.hashPassword(password);
        const newUser = new User({ username, password: hashedPassword, role });
        return await newUser.save();
    }

    async loginUser(username: string, password: string) {
        const user = await User.findOne({ username }) as IUser | null;
        if (user && await this.validatePassword(password, user.password)) {
            const token = this.generateToken((user._id as unknown as string), user.role as string); // Ensure _id is treated as a string
            return { token, user };
        }
        throw new Error('Invalid credentials');
    }
}

export default new AuthService();