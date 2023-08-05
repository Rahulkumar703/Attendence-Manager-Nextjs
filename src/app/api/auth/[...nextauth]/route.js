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
                    return user;
                } else {
                    return null
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.branch = user.branch;
                token.level = user.level;
                token.varified = user.isVarified;
                token.semester = user.semester;
                token.roll = user.roll;
            }
            return token;
        },

        async session({ session, token }) {
            return { ...session, user: { ...token } }
        }
    },
    pages: {
        signIn: '/login',
    }
})

export { handler as GET, handler as POST }

