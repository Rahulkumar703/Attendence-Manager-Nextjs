import connect from "@/db/config";
import User from "@/models/User";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({

    session: {
        strategy: "jwt"
    },

    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {

                const { roll } = credentials;

                connect();

                // Getting the User Details
                const user = await User.findOne({ roll }, { password: false })
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    }
})

export { handler as GET, handler as POST }

