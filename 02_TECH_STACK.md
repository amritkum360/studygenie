# 🔧 StudyGenie AI - Tech Stack (Simple Explanation)

## 🎯 Technology Choices (Kya Aur Kyu)

---

## Frontend (User Interface)

### Next.js 14
**Kya hai:** React ka framework (website banane ke liye)  
**Kyu use karenge:** Fast, SEO-friendly, easy deployment  
**Alternative:** Create React App, Vite

### TypeScript
**Kya hai:** JavaScript with types (errors kam hoti hain)  
**Kyu use karenge:** Code safe rehta hai, bugs kam hote hain  
**Alternative:** Plain JavaScript

### Tailwind CSS
**Kya hai:** CSS framework (styling ke liye)  
**Kyu use karenge:** Fast styling, mobile responsive automatically  
**Alternative:** Bootstrap, Material UI

### Shadcn UI + Framer Motion
**Kya hai:** Ready-made components (buttons, cards, etc.) + animations  
**Kyu use karenge:** Beautiful UI quickly ban jata hai, smooth animations  
**Alternative:** Chakra UI, Ant Design

### React Flow / Canvas Libraries
**Kya hai:** Libraries for creating flowchart/canvas interfaces  
**Kyu use karenge:** Canvas-based UI with pan/zoom, flowchart rendering  
**Options:** React Flow, Konva.js, or custom CSS Grid  
**Alternative:** Plain CSS with animations

---

## Backend (Server)

### Next.js API Routes
**Kya hai:** Next.js mein hi backend bana sakte hain  
**Kyu use karenge:** Ek hi project mein frontend + backend  
**Alternative:** Express.js, FastAPI

### Supabase
**Kya hai:** Backend-as-a-Service (Database + Auth + Storage)  
**Kyu use karenge:** Setup fast, scaling easy, affordable  
**Alternative:** Firebase, AWS, Custom backend

---

## Database

### PostgreSQL (via Supabase)
**Kya hai:** Relational database (data store karta hai)  
**Kyu use karenge:** Powerful, scalable, vector search support  
**Alternative:** MySQL, MongoDB

### Redis
**Kya hai:** In-memory cache (fast data access)  
**Kyu use karenge:** Frequently asked doubts ko cache karenge  
**Alternative:** Memcached

---

## AI & Machine Learning

### OpenAI GPT-4
**Kya hai:** AI model for text generation  
**Kyu use karenge:** Best answer quality, understands Hindi too  
**Cost:** ~₹1.5 per 1000 tokens (1 doubt = ₹2-5)  
**Alternative:** Claude, Gemini, Open-source LLMs

### LangChain
**Kya hai:** Framework for building AI apps  
**Kyu use karenge:** RAG easily implement kar sakte hain  
**Alternative:** LlamaIndex, custom code

### Pinecone (Vector Database)
**Kya hai:** Semantic search database  
**Kyu use karenge:** Books mein relevant pages dhundne ke liye  
**Cost:** Free tier = 1 GB storage  
**Alternative:** Chroma, Weaviate, Qdrant

### Tesseract OCR
**Kya hai:** Image-to-text converter  
**Kyu use karenge:** Books se text extract karne ke liye  
**Alternative:** Google Cloud Vision, AWS Textract

---

## APIs & Services

### YouTube Data API
**Kya hai:** YouTube videos search karne ke liye  
**Cost:** Free (10,000 requests/day)  
**Alternative:** Web scraping (not recommended)

### Google Custom Search API
**Kya hai:** Google search results API  
**Cost:** Free (100 searches/day), then $5/1000 searches  
**Alternative:** Bing Search API

---

## File Storage

### AWS S3 / Cloudinary
**Kya hai:** Image/PDF storage  
**Kyu use karenge:** Book images, diagrams store karenge  
**Cost:** S3 = ₹150/GB/month, Cloudinary free tier available  
**Alternative:** Supabase Storage, Google Cloud Storage

---

## Deployment

### Vercel
**Kya hai:** Frontend hosting  
**Kyu use karenge:** Next.js ke liye best, free SSL, CDN  
**Cost:** Free for hobby projects  
**Alternative:** Netlify, Railway

### Railway
**Kya hai:** Backend hosting  
**Kyu use karenge:** Database + APIs host kar sakte hain  
**Cost:** $5/month se start  
**Alternative:** Render, AWS, DigitalOcean

---

## Development Tools

### VS Code
**Kya hai:** Code editor  
**Extensions:** Prettier, ESLint, Tailwind IntelliSense

### Git + GitHub
**Kya hai:** Version control  
**Kyu use karenge:** Code backup, collaboration

### Postman
**Kya hai:** API testing tool  
**Kyu use karenge:** Backend APIs test karenge

---

## 📦 Complete Package Summary

```yaml
Frontend:
  - Next.js 14 (React framework)
  - TypeScript (type safety)
  - Tailwind CSS (styling)
  - Shadcn UI (components)
  
Backend:
  - Next.js API routes (server)
  - Supabase (database + auth)
  - Redis (caching)
  
AI:
  - OpenAI GPT-4 (answer generation)
  - LangChain (RAG framework)
  - Pinecone (vector search)
  - Tesseract OCR (text extraction)
  
APIs:
  - YouTube Data API
  - Google Custom Search API
  
Storage:
  - AWS S3 or Cloudinary (images)
  
Deployment:
  - Vercel (frontend)
  - Railway (backend)
```

---

## 💰 Monthly Cost Estimate (MVP Phase)

| Service | Cost |
|---------|------|
| Vercel (Frontend) | Free |
| Railway (Backend) | ₹500 |
| Supabase (Database) | Free tier |
| Pinecone (Vector DB) | Free tier |
| OpenAI API (AI) | ₹5,000-15,000 |
| AWS S3 (Storage) | ₹500 |
| YouTube API | Free |
| Google Search API | ₹500 |
| **Total** | **₹6,500-16,500/month** |

**Note:** OpenAI cost depends on usage (number of doubts asked)

---

## 🚀 Learning Resources

### Next.js
- Official: nextjs.org/learn
- YouTube: "Next.js 14 Tutorial" by Traversy Media

### Supabase
- Official: supabase.com/docs
- YouTube: "Supabase Crash Course" by Fireship

### LangChain
- Official: python.langchain.com/docs
- YouTube: "LangChain Tutorial" by Sam Witteveen

### OpenAI
- Official: platform.openai.com/docs
- YouTube: "OpenAI API Tutorial" by Tech With Tim

---

## 🎯 Tech Stack Flow Diagram

```
User Browser
    ↓
Next.js Frontend (Vercel)
    ↓
Next.js API Routes (Vercel)
    ↓
┌─────────┬──────────┬────────────┐
│         │          │            │
Supabase  OpenAI    Pinecone   YouTube API
(Database) (AI)     (Search)    (Videos)
    ↓
AWS S3 (Images)
```

---

**Next Step:** Read `03_DATABASE.md` to understand data structure! 🗄️

