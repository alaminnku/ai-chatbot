import fs from "fs";
import path from "path";
import { llm } from "@/config/llm";
import { loadQAChain } from "langchain/chains";
import { Document } from "langchain/document";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Create chain
    const chain = loadQAChain(llm, { type: "map_reduce" });

    // Get files
    const files = fs.readdirSync(path.join("data"));

    // Get content of every file
    const content = files.map((file) =>
      fs.readFileSync(path.join("data", file), "utf-8")
    );

    // Create input docs
    const docs = content.map((data) => new Document({ pageContent: data }));

    try {
      // Get response
      const response = await chain.call({
        input_documents: docs,
        question: req.body.question,
      });

      // Send response
      res.status(200).json(response);
    } catch (err) {
      console.log(err.response);
    }
  } else {
    // If the request isn't a POST request
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
