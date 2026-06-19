import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request){
    try {
        const {plan} = await req.json();

        const completion = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages:[
                {
                    role:"system",
                    content:
                        "You are an expert academic tutor. The user will give you a subject, topics, and an exam date. \n" +
                        "                    \n" +
                        "                    You MUST respond with a pure JSON object matching this exact structure. Do not include any other text or markdown:\n" +
                        "                    {\n" +
                        "                      \"title\": \"Catchy Plan Title\",\n" +
                        "                      \"days\": [\n" +
                        "                        {\n" +
                        "                          \"day\": \"Day 1\",\n" +
                        "                          \"focus\": \"Main topic\",\n" +
                        "                          \"tasks\": [\"Task 1\", \"Task 2\"]\n" +
                        "                        }\n" +
                        "                      ]\n" +
                        "                    }"
                },
                {
                    role:"user",
                    content: plan,
                },
            ],
        });
        const generatedPlan = JSON.parse(completion.choices[0].message.content || "{}");
        return Response.json({
            subplan:generatedPlan,
        });
    } catch(error){
     return Response.json({error: "Failed to generate plan"},
        {status: 500});
    }
}