# 🏗️ StudyGenie AI - MVP Build Guide (Step-by-Step)

## 🎯 Goal: Launch MVP in 3 Months

**MVP = Minimum Viable Product**  
Only essential features, launch quickly, improve later

---

## 📅 3-Month Timeline

### Month 1: Foundation
- Week 1-2: Setup + Database + Auth
- Week 3-4: Basic UI + NCERT Processing

### Month 2: Core Features
- Week 5-6: AI Integration + Multi-column UI
- Week 7-8: Testing + Bug Fixes

### Month 3: Polish + Launch
- Week 9-10: Additional features + Payment
- Week 11-12: Beta testing + Marketing + Launch

---

## 🛠️ MONTH 1: Foundation

### Week 1-2: Project Setup

#### Day 1: Initialize Project
```bash
# Create Next.js project
npx create-next-app@latest studygenie --typescript --tailwind --app

cd studygenie

# Install dependencies
npm install @supabase/supabase-js
npm install openai
npm install @pinecone-database/pinecone
npm install lucide-react  # Icons
npm install react-markdown
```

#### Day 2-3: Setup Supabase
1. Go to supabase.com → Create project
2. Copy Project URL and API Key
3. Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
OPENAI_API_KEY=your-openai-key
PINECONE_API_KEY=your-pinecone-key
```

4. Run database migrations (copy from `03_DATABASE.md`)

#### Day 4-5: Authentication
Create `lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

Create auth pages:
- `/app/login/page.tsx` - Login page
- `/app/signup/page.tsx` - Signup page
- `/app/dashboard/page.tsx` - Main dashboard

#### Day 6-7: Canvas + Bottom Input UI
Create components:
```
components/
├── Navbar.tsx              (Minimal top nav - logo, user menu)
├── Sidebar.tsx             (Optional: history panel - left side)
├── Canvas.tsx              (Main canvas area - 80% screen)
├── BottomInput.tsx         (Input at bottom - like ChatGPT)
├── FlowchartAnswer.tsx     (Flowchart-style answer display)
└── ReferencePanel.tsx      (References in columns/flowchart)
```

**UI Layout:**
```
┌─────────────────────────────────────┐
│ Navbar (Minimal)                    │ 5%
├─────────────────────────────────────┤
│                                     │
│   CANVAS AREA                       │
│   (Flowchart answers here)          │ 75%
│                                     │
│   [References on side/bottom]       │
│                                     │
├─────────────────────────────────────┤
│ ┌─────────────────────────────┐   │
│ │ Input: "Apna doubt..."  [📎][🎤]│ 20%
│ └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

### Week 3-4: NCERT Processing

#### Day 8-10: OCR Setup
```bash
npm install tesseract.js
npm install pdf-parse
```

Create `scripts/process-books.ts`:
```typescript
import Tesseract from 'tesseract.js';
import fs from 'fs';
import pdf from 'pdf-parse';

async function processNCERT(pdfPath: string) {
  // 1. Extract pages from PDF
  const dataBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdf(dataBuffer);
  
  // 2. For each page, do OCR
  for (let i = 1; i <= pdfData.numpages; i++) {
    const { data: { text } } = await Tesseract.recognize(
      `page-${i}.png`,
      'eng'
    );
    
    // 3. Save to database
    await savePageToDatabase(i, text);
  }
}
```

#### Day 11-12: Generate Embeddings
```typescript
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  
  return response.data[0].embedding;
}

async function processBookPages() {
  // Get all book pages from database
  const pages = await getAllBookPages();
  
  for (const page of pages) {
    // Generate embedding
    const embedding = await generateEmbedding(page.text_content);
    
    // Store in Pinecone
    await pinecone.upsert([{
      id: page.id,
      values: embedding,
      metadata: {
        bookId: page.book_id,
        pageNumber: page.page_number,
        class: page.class
      }
    }]);
  }
}
```

#### Day 13-14: Manual Testing
- Process 1 NCERT book (Class 10 Physics)
- Verify all pages are in database
- Test embeddings in Pinecone

---

## 🧠 MONTH 2: Core AI Features

### Week 5-6: AI Integration

#### Day 15-17: Doubt Processing API
Create `/app/api/ask-doubt/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

export async function POST(request: Request) {
  const { question, userId, class: studentClass } = await request.json();
  
  // 1. Generate question embedding
  const questionEmbedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: question,
  });
  
  // 2. Search in Pinecone
  const searchResults = await pinecone.query({
    vector: questionEmbedding.data[0].embedding,
    topK: 5,
    filter: { class: studentClass }
  });
  
  // 3. Get page details from database
  const pages = await getPagesFromDB(searchResults.matches);
  
  // 4. Generate answer with GPT-4
  const answer = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a CBSE teacher..." },
      { role: "user", content: `Question: ${question}\n\nContext: ${pages[0].text}` }
    ]
  });
  
  // 5. Return response
  return NextResponse.json({
    boardAnswer: answer.choices[0].message.content,
    ncertSources: pages,
    timestamp: new Date()
  });
}
```

#### Day 18-20: YouTube & Web Search
Create `/lib/search.ts`:
```typescript
import { google } from 'googleapis';

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YOUTUBE_API_KEY
});

export async function searchYouTube(query: string) {
  const response = await youtube.search.list({
    part: ['snippet'],
    q: query + ' explanation',
    maxResults: 3,
    type: ['video']
  });
  
  return response.data.items?.map(item => ({
    title: item.snippet?.title,
    videoId: item.id?.videoId,
    thumbnail: item.snippet?.thumbnails?.medium?.url,
    url: `https://youtube.com/watch?v=${item.id?.videoId}`
  }));
}
```

#### Day 21-22: Flowchart Structure Generation
```typescript
async function generateFlowchartStructure(explanation: string, question: string) {
  const prompt = `
Convert this explanation into a visual flowchart structure.

Question: ${question}
Explanation: ${explanation}

Return JSON with this structure:
{
  "definition": "Main definition (2 lines max)",
  "steps": [
    {
      "title": "Step name",
      "text": "Step explanation",
      "color": "blue/green/yellow/orange",
      "icon": "emoji icon"
    }
  ],
  "formula": "Any formula/equation if applicable",
  "example": "Real-world example if applicable"
}

Make it visual and easy to understand. Use 4-8 steps maximum.
`;
  
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" }
  });
  
  const flowchartData = JSON.parse(response.choices[0].message.content);
  
  return flowchartData;
}
```

---

### Week 7-8: Multi-Column UI

#### Day 23-25: Canvas + Flowchart Display
Create `components/Canvas.tsx`:
```typescript
export default function Canvas({ response }) {
  return (
    <div className="h-full overflow-auto p-8">
      {/* Main Flowchart Answer */}
      <div className="flowchart-container">
        <FlowchartAnswer data={response.flowchart} />
      </div>
      
      {/* References Panel (Side or Bottom) */}
      <div className="references-panel mt-8">
        <ReferencePanel sources={response.sources} />
      </div>
    </div>
  );
}
```

Create `components/FlowchartAnswer.tsx`:
```typescript
export default function FlowchartAnswer({ data }) {
  return (
    <div className="flowchart space-y-6">
      {/* Definition Box */}
      <div className="flow-box bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
        <h3 className="font-bold text-blue-800">📖 Definition</h3>
        <p>{data.definition}</p>
      </div>
      
      {/* Arrow */}
      <div className="flow-arrow">↓</div>
      
      {/* Process Steps */}
      {data.steps.map((step, idx) => (
        <div key={idx}>
          <div className="flow-box bg-green-50 border-2 border-green-300 rounded-lg p-4">
            <h4 className="font-semibold text-green-800">Step {idx + 1}</h4>
            <p>{step.text}</p>
            {step.image && <img src={step.image} className="mt-2 rounded" />}
          </div>
          {idx < data.steps.length - 1 && <div className="flow-arrow">↓</div>}
        </div>
      ))}
      
      {/* Formula/Equation */}
      {data.formula && (
        <>
          <div className="flow-arrow">↓</div>
          <div className="flow-box bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800">🔢 Formula</h3>
            <p className="text-lg font-mono">{data.formula}</p>
          </div>
        </>
      )}
    </div>
  );
}
```

Create `components/ReferencePanel.tsx`:
```typescript
export default function ReferencePanel({ sources }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* NCERT Column */}
      <div className="reference-card border rounded-lg p-4 hover:shadow-lg">
        <h3 className="font-bold mb-2">📘 NCERT</h3>
        <div className="space-y-2">
          <p className="text-sm">Page {sources.ncert.pageNumber}</p>
          <p className="text-xs text-gray-600">Lines {sources.ncert.lineStart}-{sources.ncert.lineEnd}</p>
          <img 
            src={sources.ncert.imageUrl} 
            className="rounded cursor-pointer hover:scale-105 transition"
            alt="NCERT Page" 
          />
        </div>
      </div>
      
      {/* Reference Books */}
      <div className="reference-card border rounded-lg p-4 hover:shadow-lg">
        <h3 className="font-bold mb-2">📕 Reference</h3>
        {sources.referenceBooks.map(book => (
          <div key={book.id} className="space-y-2">
            <p className="font-semibold text-sm">{book.bookName}</p>
            <p className="text-xs">Page {book.pageNumber}</p>
            <img src={book.imageUrl} className="rounded cursor-pointer" />
          </div>
        ))}
      </div>
      
      {/* YouTube */}
      <div className="reference-card border rounded-lg p-4 hover:shadow-lg">
        <h3 className="font-bold mb-2">🎥 YouTube</h3>
        {sources.youtube.map(video => (
          <a 
            href={video.url} 
            target="_blank" 
            key={video.videoId}
            className="block mb-3 hover:opacity-80"
          >
            <img src={video.thumbnail} className="rounded" />
            <p className="text-xs mt-1 line-clamp-2">{video.title}</p>
          </a>
        ))}
      </div>
      
      {/* Websites */}
      <div className="reference-card border rounded-lg p-4 hover:shadow-lg">
        <h3 className="font-bold mb-2">🔗 Websites</h3>
        {sources.websites.map(site => (
          <a 
            href={site.url} 
            target="_blank" 
            key={site.url}
            className="block mb-3 text-blue-600 hover:underline"
          >
            <p className="text-sm font-medium">{site.title}</p>
            <p className="text-xs text-gray-600">{site.snippet}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
```

Create `components/BottomInput.tsx`:
```typescript
export default function BottomInput({ onSubmit }) {
  const [input, setInput] = useState('');
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="max-w-4xl mx-auto flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Apna doubt yahan poocho... 📝"
          className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
          onKeyPress={(e) => e.key === 'Enter' && onSubmit(input)}
        />
        <button className="px-4 py-3 bg-blue-600 text-white rounded-lg">
          📎
        </button>
        <button className="px-4 py-3 bg-green-600 text-white rounded-lg">
          🎤
        </button>
        <button 
          onClick={() => onSubmit(input)}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold"
        >
          Ask →
        </button>
      </div>
    </div>
  );
}
```

#### Day 26-28: Testing & Bug Fixes
- Test with 20 different doubts
- Fix UI issues
- Optimize loading times
- Add loading states

---

## 🚀 MONTH 3: Polish + Launch

### Week 9-10: Additional Features

#### Day 29-31: Save Doubts Feature
```typescript
// API route: /app/api/save-doubt/route.ts
export async function POST(request: Request) {
  const { userId, doubtId } = await request.json();
  
  await supabase
    .from('user_activity')
    .insert({ user_id: userId, doubt_id: doubtId, saved: true });
  
  return NextResponse.json({ success: true });
}
```

#### Day 32-34: Payment Integration (Razorpay)
```bash
npm install razorpay
```

Create `/app/api/create-order/route.ts`:
```typescript
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(request: Request) {
  const { amount, userId } = await request.json();
  
  const order = await razorpay.orders.create({
    amount: amount * 100, // Convert to paise
    currency: 'INR',
    receipt: `receipt_${userId}_${Date.now()}`
  });
  
  return NextResponse.json(order);
}
```

#### Day 35-37: Analytics Dashboard
- Total doubts asked
- Most asked topics
- Daily usage graph
- User retention metrics

---

### Week 11-12: Beta Testing + Launch

#### Day 38-42: Beta Testing
1. Recruit 50 students (friends, social media)
2. Give them free Pro access
3. Collect feedback via Google Form
4. Fix critical bugs
5. Improve based on feedback

#### Day 43-45: Marketing Preparation
1. Create landing page
2. Write blog post about the launch
3. Prepare social media posts
4. Record demo video
5. Create Instagram reels

#### Day 46-48: Launch! 🚀
1. Deploy to Vercel
2. Post on social media
3. Share in student groups
4. Launch on Product Hunt
5. Send email to beta users

---

## 📊 MVP Feature Checklist

**Before Launch, Must Have:**
- [ ] User signup/login
- [ ] Ask doubt (text input)
- [ ] Multi-column answer display
- [ ] NCERT source citation (page + line)
- [ ] YouTube video suggestions
- [ ] Board exam format answer
- [ ] Basic flowchart
- [ ] Save doubts
- [ ] Payment integration (Razorpay)
- [ ] Responsive mobile design
- [ ] At least 5 NCERT books processed

---

## 💰 Budget for MVP

| Item | Cost |
|------|------|
| Domain (.com) | ₹800/year |
| Vercel hosting | Free |
| Supabase | Free tier |
| Pinecone | Free tier |
| OpenAI API | ₹10,000 (initial) |
| YouTube API | Free |
| Razorpay | 2% per transaction |
| **Total Initial** | **₹10,800** |

---

## 🎯 Post-Launch (Week 13-16)

### Week 13: Monitor & Fix
- Fix bugs reported by users
- Monitor server performance
- Track conversion rates

### Week 14: Iteration
- Add most-requested features
- Improve AI accuracy
- Optimize costs

### Week 15-16: Growth
- Marketing campaigns
- Influencer partnerships
- School partnerships

---

**Next Step:** Read `07_BUSINESS.md` for business strategy! 💼

