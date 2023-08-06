import connect from "@/db/config";
import Department from "@/models/Department";
import Faculty from "@/models/Faculty";
import Student from "@/models/Student";
import User from "@/models/Student";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({

    session: {
        strategy: "jwt"
    },

    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {

                const { userId } = credentials;

                connect();
                let user = null;
                // If Logging In a Faculty
                if (userId && userId.toString().length < 4) {
                    // Getting the User Details
                    user = await Faculty.findOne({ userId }, { password: false })
                }
                else {
                    user = await Student.findOne({ userId }, { password: false })
                    const department = await Department.findById(user.department);
                    user = { ...user._doc, department };
                }

                // Fetching department by its ID
                let department = null;
                if (user)
                    department = await Department.findById(user.department);

                user = { ...user._doc, department };

                return user;
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.department = user.department;
                token.level = user.level;
                token.varified = user.isVarified;
                token.userId = user.userId;
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

