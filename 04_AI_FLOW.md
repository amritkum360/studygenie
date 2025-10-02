# 🤖 StudyGenie AI - AI Flow (Step-by-Step)

## 🎯 Overview

**Input:** Student's doubt (text)  
**Output:** Multi-source answer with images, videos, flowchart  
**Time:** 5-10 seconds

---

## 📊 Complete AI Pipeline (Simple Flow)

```
Student types in BOTTOM INPUT: "What is photosynthesis?"
          ↓
[STEP 1] Question Processing
          ↓
[STEP 2] Semantic Search (Vector DB)
          ↓
[STEP 3] Web & YouTube Search (Parallel)
          ↓
[STEP 4] Generate Flowchart Structure (GPT-4)
          ↓
[STEP 5] Generate Step-by-Step Explanation
          ↓
[STEP 6] Format References (NCERT, Books, Videos, Links)
          ↓
[STEP 7] Response Assembly
          ↓
Display on CANVAS:
├─ Flowchart with boxes & arrows
├─ Color-coded sections
└─ References panel (columns/side)
```

---

## 🔍 STEP 1: Question Processing

### What Happens:
```javascript
Input: "What is photosynthesis?"

1. Detect language (English/Hindi)
2. Extract keywords: ["photosynthesis"]
3. Identify subject: Biology
4. Identify class: 10 (from user profile)
5. Generate embedding (1536 numbers)
```

### Code Example:
```javascript
async function processQuestion(question, userId) {
  // Get user's class and subject
  const user = await getUserProfile(userId);
  
  // Generate embedding using OpenAI
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: question
  });
  
  return {
    question: question,
    class: user.class,
    subject: detectSubject(question),
    embedding: embedding.data[0].embedding
  };
}
```

---

## 🔎 STEP 2: Semantic Search (Vector Database)

### What Happens:
```
Search in book_pages table using embeddings
    ↓
Find top 5 most similar pages from NCERT
Find top 3 most similar pages from reference books
    ↓
Rank by relevance score
```

### Code Example:
```javascript
async function searchBooks(embedding, class, subject) {
  // Search in Pinecone vector DB
  const results = await pinecone.query({
    vector: embedding,
    topK: 10,
    filter: {
      class: class,
      subject: subject
    }
  });
  
  // Get actual page data from database
  const pages = await Promise.all(
    results.matches.map(match => 
      getPageData(match.id)
    )
  );
  
  return {
    ncertPages: pages.filter(p => p.bookType === 'NCERT'),
    referencePages: pages.filter(p => p.bookType === 'Reference')
  };
}
```

**Result:**
```json
{
  "ncertPages": [
    {
      "bookName": "NCERT Biology Class 10",
      "pageNumber": 95,
      "lineStart": 12,
      "lineEnd": 18,
      "text": "Photosynthesis is...",
      "imageUrl": "s3://page-95.jpg",
      "relevanceScore": 0.95
    }
  ],
  "referencePages": [
    {
      "bookName": "S. Chand Biology",
      "pageNumber": 145,
      "text": "Detailed explanation...",
      "imageUrl": "s3://schand-145.jpg",
      "relevanceScore": 0.88
    }
  ]
}
```

---

## 🌐 STEP 3: Web & YouTube Search

### YouTube Search:
```javascript
async function searchYouTube(question) {
  const response = await youtube.search.list({
    part: 'snippet',
    q: question + ' explanation',
    maxResults: 3,
    type: 'video',
    relevanceLanguage: 'en'
  });
  
  return response.data.items.map(item => ({
    title: item.snippet.title,
    url: `https://youtube.com/watch?v=${item.id.videoId}`,
    thumbnail: item.snippet.thumbnails.medium.url,
    channel: item.snippet.channelTitle
  }));
}
```

### Web Search:
```javascript
async function searchWeb(question) {
  const response = await googleCustomSearch.search({
    q: question,
    cx: 'your-search-engine-id',
    num: 3,
    siteSearch: 'byjus.com OR toppr.com OR vedantu.com'
  });
  
  return response.items.map(item => ({
    title: item.title,
    url: item.link,
    snippet: item.snippet
  }));
}
```

---

## 🧠 STEP 4: Answer Generation (GPT-4)

### What Happens:
```
Take all search results
    ↓
Create smart prompt for GPT-4
    ↓
GPT-4 generates board exam format answer
```

### Prompt Template:
```javascript
const systemPrompt = `
You are an expert CBSE teacher for Class ${class} ${subject}.

Context from NCERT (Page ${pageNumber}):
${ncertText}

Context from reference books:
${referenceText}

Generate a board exam answer in this format:
1. Definition (2 lines)
2. Main points (3-5 numbered points)
3. Example (if applicable)
4. Diagram description (if applicable)

Answer should be:
- In simple language
- For ${marks}-mark question
- Board exam pattern
`;

const userPrompt = `Question: ${question}`;
```

### Code Example:
```javascript
async function generateAnswer(question, context, marks = 5) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.3,  // Less creative, more factual
    max_tokens: 500
  });
  
  return completion.choices[0].message.content;
}
```

**Output:**
```
**Photosynthesis**

**Definition:**
Photosynthesis is the process by which green plants prepare their own food using carbon dioxide and water in the presence of sunlight and chlorophyll.

**Main Points:**
1. Takes place in chloroplasts of plant cells
2. Chlorophyll absorbs sunlight energy
3. Carbon dioxide is taken from air through stomata
4. Water is absorbed from soil through roots
5. Glucose (food) and oxygen are produced

**Chemical Equation:**
6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
```

---

## 🎨 STEP 5: Flowchart Structure Generation

### Method 1: Generate Structured Flowchart Data
```javascript
const flowchartPrompt = `
Convert this explanation into a structured flowchart format:

${explanation}

Return JSON with this structure:
{
  "definition": "Main definition in 2 lines",
  "steps": [
    {
      "title": "Step 1 title",
      "text": "Step explanation",
      "color": "blue/green/yellow/orange"
    }
  ],
  "formula": "If any formula/equation",
  "example": "If any example"
}

Requirements:
- Maximum 6-8 steps
- Simple language
- Board exam format
- Clear step-by-step flow
`;

async function generateFlowchartStructure(explanation) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "user", content: flowchartPrompt }
    ],
    response_format: { type: "json_object" }
  });
  
  const flowchartData = JSON.parse(response.choices[0].message.content);
  
  return flowchartData;
}
```

**Output Example:**
```json
{
  "definition": "Photosynthesis is the process by which green plants prepare their own food using carbon dioxide and water in the presence of sunlight and chlorophyll.",
  "steps": [
    {
      "title": "Sunlight Absorption",
      "text": "Chlorophyll in leaves absorbs sunlight energy",
      "color": "blue",
      "icon": "☀️"
    },
    {
      "title": "CO₂ Intake",
      "text": "Carbon dioxide enters through stomata in leaves",
      "color": "green",
      "icon": "🌬️"
    },
    {
      "title": "Water Absorption",
      "text": "Roots absorb water from soil",
      "color": "green",
      "icon": "💧"
    },
    {
      "title": "Chemical Reaction",
      "text": "CO₂ + H₂O react in chloroplasts using light energy",
      "color": "yellow",
      "icon": "⚡"
    },
    {
      "title": "Glucose Production",
      "text": "Glucose (food) is produced and stored",
      "color": "orange",
      "icon": "🍬"
    },
    {
      "title": "Oxygen Release",
      "text": "Oxygen is released as a byproduct through stomata",
      "color": "green",
      "icon": "🌿"
    }
  ],
  "formula": "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂",
  "example": "A plant kept in sunlight performs photosynthesis and grows, while a plant in darkness cannot produce food and becomes weak."
}
```

### Method 2: Visual Flowchart Rendering
Frontend will render this JSON as:
```
┌─────────────────────────────────┐
│ 📖 Definition                   │
│ Photosynthesis is...            │
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│ ☀️ Step 1: Sunlight Absorption  │
│ Chlorophyll absorbs...          │
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│ 🌬️ Step 2: CO₂ Intake           │
│ Carbon dioxide enters...         │
└─────────────────────────────────┘
          ↓
          ...
          ↓
┌─────────────────────────────────┐
│ 🔢 Formula                      │
│ 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂    │
└─────────────────────────────────┘
```

---

## 🔧 STEP 6: Response Assembly (Canvas-Ready Format)

### What Happens:
```
Combine everything for CANVAS display:
├─ Flowchart structure (JSON)
├─ References organized by type:
│   ├─ NCERT sources (with page images)
│   ├─ Reference books (with page images)
│   ├─ YouTube videos (thumbnails)
│   └─ Website links (previews)
└─ Metadata (timing, confidence score)

Format as Canvas-friendly JSON
Save to database
Return to frontend for rendering
```

### Code Example (Canvas Format):
```javascript
async function assembleCanvasResponse(doubtId, flowchartData, sources) {
  const response = {
    doubtId: doubtId,
    
    // Main flowchart for canvas
    flowchart: {
      definition: flowchartData.definition,
      steps: flowchartData.steps,
      formula: flowchartData.formula,
      example: flowchartData.example
    },
    
    // References panel data
    references: {
      ncert: sources.ncertPages.map(page => ({
        type: 'ncert',
        bookName: page.bookName,
        pageNumber: page.pageNumber,
        lineRange: `${page.lineStart}-${page.lineEnd}`,
        excerpt: page.text,
        imageUrl: page.imageUrl,
        thumbnailUrl: page.thumbnailUrl // Small preview
      })),
      
      books: sources.referencePages.map(page => ({
        type: 'reference',
        bookName: page.bookName,
        pageNumber: page.pageNumber,
        excerpt: page.text,
        imageUrl: page.imageUrl,
        thumbnailUrl: page.thumbnailUrl
      })),
      
      youtube: sources.youtubeVideos.map(video => ({
        type: 'youtube',
        title: video.title,
        url: video.url,
        thumbnail: video.thumbnail,
        channel: video.channel,
        duration: video.duration
      })),
      
      websites: sources.webResults.map(site => ({
        type: 'website',
        title: site.title,
        url: site.url,
        snippet: site.snippet,
        favicon: site.favicon,
        domain: site.domain
      }))
    },
    
    // Canvas metadata
    canvasSettings: {
      layout: 'vertical', // or 'horizontal'
      referencePosition: 'bottom', // or 'side'
      zoom: 1.0
    },
    
    timestamp: new Date(),
    confidence: 0.95
  };
  
  // Save to database
  await saveResponse(response);
  
  return response;
}
```

---

## 📊 Complete Flow with Timing

```
[0s] Student asks: "What is photosynthesis?"
    ↓
[0-1s] Process question + generate embedding
    ↓
[1-2s] Search vector database (Pinecone)
    ↓
[2-3s] Search YouTube + websites (parallel)
    ↓
[3-7s] Generate answer with GPT-4
    ↓
[7-9s] Generate flowchart
    ↓
[9-10s] Assemble response + save to DB
    ↓
[10s] Display to student ✅
```

---

## 💰 AI Cost Breakdown (Per Doubt)

| Service | Cost per Call |
|---------|---------------|
| Embedding (Step 1) | ₹0.001 |
| Pinecone Search (Step 2) | ₹0.01 |
| YouTube API (Step 3) | Free |
| GPT-4 Answer (Step 4) | ₹2-4 |
| GPT-4 Flowchart (Step 5) | ₹1-2 |
| **Total per doubt** | **₹3-6** |

**For 1000 doubts/day:**
- Cost = ₹3,000-6,000/day
- Monthly = ₹90,000-1,80,000

**Optimization strategies:**
- Cache popular doubts (50% cost reduction)
- Use GPT-3.5 for simple doubts
- Pre-generate flowcharts

---

## 🎯 AI Quality Improvements

### Caching Strategy
```javascript
// Check if similar doubt exists
const cachedResponse = await checkCache(embedding);
if (cachedResponse && cachedResponse.similarity > 0.95) {
  return cachedResponse;
}
```

### Human Review Loop
```javascript
// For new doubts, mark for review
if (response.confidence < 0.8) {
  await flagForHumanReview(response);
}
```

### Continuous Learning
```javascript
// When user rates answer
if (rating < 3) {
  await logForImprovement(doubt, response, rating);
}
```

---

**Next Step:** Read `05_FEATURES.md` to see all features! ✨

