
const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";

export const generateGeminiResponse = async (prompt) => {

    try {
        const response = await fetch(`${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            contents: [
                {
                parts: [
                    {
                    text: prompt,
                    },
                ],
                },
            ],
            }),
        });
        if (!response.ok) {
        const err = await response.text();
        console.error("Gemini API Error Response:", err);
        throw new Error(err);
    }

        // if response is ok
        const data = await response.json(); //response in text
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        // const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join(" ");

        // console.log("RAW DIAGRAM:", JSON.parse(text.replace(/```json/g, "").replace(/```/g, "").trim())?.diagram?.data);

        if (!text) {
            throw new Error("No text returned from Gemini");
        }

        const cleanText = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let parsed;
        try {
        parsed = JSON.parse(cleanText);
        } catch (err) {
        // fallback: wrap plain text in a JSON object
        parsed = { content: cleanText };
        }

        return parsed;

    } catch (error) {
        console.log("Gemini Fetch Error", error.message);
        throw new Error("Gemini API Fetch Failed");
    }
 
};
