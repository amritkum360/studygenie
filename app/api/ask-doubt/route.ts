import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question || question.trim().length === 0) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Generate structured flowchart response using GPT-3.5-turbo
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert CBSE teacher for Class 9-12 students. Generate a structured flowchart-style answer for student doubts.

IMPORTANT: Return ONLY valid JSON. No extra text before or after.

Return your response in this EXACT JSON format:
{
  "question": "the student's question",
  "flowchart": {
    "definition": "Clear definition in 2-3 sentences",
    "steps": [
      {
        "title": "Step name",
        "text": "Detailed explanation of this step",
        "color": "blue/green/yellow/orange",
        "icon": "relevant emoji"
      }
    ],
    "formula": "Chemical formula or equation if applicable, otherwise null",
    "example": "Real-world example if applicable, otherwise null"
  },
  "references": {
    "ncert": [
      {
        "bookName": "NCERT Subject Class X",
        "pageNumber": 95,
        "lineRange": "12-18",
        "excerpt": "Relevant excerpt from NCERT"
      }
    ],
    "books": [
      {
        "bookName": "Reference book name",
        "pageNumber": 145,
        "excerpt": "Relevant excerpt"
      }
    ],
    "youtube": [
      {
        "title": "Video title",
        "url": "https://youtube.com/watch?v=...",
        "channel": "Channel name",
        "duration": "12:45"
      }
    ],
    "websites": [
      {
        "title": "Article title",
        "url": "https://example.com",
        "snippet": "Article description",
        "domain": "example.com"
      }
    ]
  }
}

Guidelines:
- Use 4-8 steps maximum
- Color code: blue (definition/intro), green (process), yellow (formula), orange (conclusion/example)
- Use relevant emojis for icons
- Keep language simple and student-friendly
- Include both Hindi and English technical terms where helpful
- Make it visually organized and easy to understand`,
        },
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0].message.content || "{}";
    
    // Extract JSON from response (in case there's extra text)
    let parsedResponse;
    try {
      // Try to find JSON in the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        parsedResponse = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      // Return a fallback response
      parsedResponse = {
        question: question,
        flowchart: {
          definition: "Unable to generate response. Please try again.",
          steps: [],
          formula: null,
          example: null
        },
        references: {
          ncert: [],
          books: [],
          youtube: [],
          websites: []
        }
      };
    }

    return NextResponse.json(parsedResponse);
  } catch (error: any) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate answer",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

