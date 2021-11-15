import { getSession } from "next-auth/react";
import * as jwt from "jsonwebtoken";

export default async function handler(req, res) {
  // Allow only post methods otherwise return shit
  if (req.method !== "POST") {
    return res.status(400).send("POST only please!");
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(400).json([]);
  }

  // Get what token should we generate
  const reqBody = JSON.parse(req?.body || "{}");

  if (reqBody && reqBody.method) {
    const url = process.env[reqBody.method + "_URL"];
    const key = process.env[reqBody.method + "_KEY"];
    const secret = process.env[reqBody.method + "_SECRET"];
    const params = reqBody?.params || "";

    const token = jwt.sign(
      {
        iss: key,
      },
      secret,
      { algorithm: "HS256", expiresIn: "1d" }
    );

    // GET Data to pass to FX API
    const data = {
      ...reqBody?.data,
      headers: { ...reqBody?.data?.headers, token, key: session?.user?.key },
    };

    try {
      const fxResponse = await fetch(url + params, data);

      if (fxResponse.ok) {
        return res.status(200).json(await fxResponse.json());
      } else {
        return res.status(400).json(await fxResponse.json());
      }
    } catch (e) {
      console.log(e);
      return res.status(400).json({ ok: false });
    }
  }

  res.status(400);
}
