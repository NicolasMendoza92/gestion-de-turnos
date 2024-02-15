import { connectMongoDB } from "@/libs/mongodb";
import User from "@/models/User";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials) {
                const {email, password } = credentials;
               
                try {
                    await connectMongoDB();
                    const user = await User.findOne({email});

                    if(!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if(!passwordMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log('error', error)                   
                }
            },

        })
    ],
    session: {
        strategy: "jwt",
    }, 
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/admin",
    }, 
};


export default NextAuth(authOptions);