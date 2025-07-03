import { Configuration, OpenAIApi } from 'openai';

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

export default async function handler(req, res) {
  const { headlines } = req.body;

  const prompt = `Analyze the following stock market headlines and provide a sentiment impact (Positive, Neutral, or Negative) with short reasoning and confidence score (1-10):\n${headlines.map((h, i) => \`\${i + 1}. \${h}\`).join('\n')}`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    res.status(200).json({ result: completion.data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'OpenAI error' });
  }
}
