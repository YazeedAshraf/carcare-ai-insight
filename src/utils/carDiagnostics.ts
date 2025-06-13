import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

interface DiagnosisResult {
  possibleProblem: string;
  suggestedAction: string;
  severity: "low" | "medium" | "high";
  confidence: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DiagnosisResult | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed, use POST" });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Invalid or missing 'prompt' in request body" });
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant specialized in diagnosing car problems. " +
            "Given a detailed description of car symptoms, respond only with a JSON object containing: " +
            "`possibleProblem` (string), `suggestedAction` (string), `severity` ('low', 'medium', or 'high'), and `confidence` (0-100 number).",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      max_tokens: 400,
    });

    const text = completion.data.choices[0].message?.content || "";

    let diagnosis: DiagnosisResult;
    try {
      diagnosis = JSON.parse(text);
    } catch {
      diagnosis = {
        possibleProblem: "Unable to interpret symptoms precisely",
        suggestedAction: "Please consult a professional mechanic with detailed symptoms.",
        severity: "medium",
        confidence: 50,
      };
    }

    return res.status(200).json(diagnosis);
  } catch (error: any) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    return res.status(500).json({ error: "OpenAI API error" });
  }
}
