import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as jwt from "jsonwebtoken";
import crypto from "crypto";

const options = {
  providers: [
    CredentialsProvider({
      id: "flexie-auth",
      name: "Flexie Auth",
      type: "credentials",
      credentials: null,
      async authorize(credentials, req) {
        const hashedPassword = credentials?.password
          ? crypto.createHash("md5").update(credentials.password).digest("hex")
          : "";

        const token = jwt.sign(
          {
            iss: process.env.FX_AUTH_KEY,
          },
          process.env.FX_AUTH_SECRET,
          { algorithm: "HS256", expiresIn: "1h" }
        );

        try {
          const response = await fetch(process.env.FX_AUTH_URL, {
            headers: { token },
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: hashedPassword,
              key: credentials?.key,
            }),
          });

          if (response.ok) {
            return await response.json();
            // The not_found user case is handled in signIn callback below
          } else {
            return null;
          }
        } catch (e) {
          console.log("Error in authentication on Flexie Dynamic Endpoint", e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    jwt: true,
  },
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    secret: "Xp7kc06eEMX2c5m8ahrjB871HVDYD5CBvKVIK2XpPUr10Oaa6B",
    // signingKey: {
    //   kty: "oct",
    //   kid: "KyXlMIZsdi2JS7sR0Ljs1RZnBGpIFxsQnPCbKO5yQqk",
    //   alg: "HS512",
    //   k: "6Eugi6el3yUCKut3JGn0BDf8LRiZK9gr_4bfOpmfPH8",
    // },
  },
  cookies: {
    sessionToken: {
      name: `fx-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
    callbackUrl: {
      name: `fx-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
    csrfToken: {
      name: `fx-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
  callbacks: {
    async signIn({ user }) {
      if (!user || user?.not_found === true) {
        throw new Error("Email ose Fjalekalim i gabuar.");
      }

      return true;
    },
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      // enrich session with full user data
      return { ...session, user: token.data };
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Add full user data to the token, so we can pass to session
        token.data = user;
      }

      return token;
    },
  },
  secret: process.env.SECRET,
};

export default (req, res) => NextAuth(req, res, options);
