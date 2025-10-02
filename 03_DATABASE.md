# 🗄️ StudyGenie AI - Database Structure (Simple)

## 📊 Overview

**Total Tables:** 8  
**Database:** PostgreSQL (via Supabase)  
**Purpose:** Store users, doubts, answers, books, sources

---

## 🗂️ Tables Explanation (Simple Language)

### 1️⃣ **users** - Kaun hai student?

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,           -- Unique ID
  name VARCHAR(100),              -- Student ka naam
  email VARCHAR(100) UNIQUE,      -- Email (login ke liye)
  phone VARCHAR(15),              -- Phone number
  class INTEGER,                  -- Kis class mein hai (9, 10, 11, 12)
  board VARCHAR(20),              -- CBSE, ICSE, State
  created_at TIMESTAMP            -- Kab join kiya
);
```

**Example:**
```
id: 123-456-789
name: Rahul Sharma
email: rahul@gmail.com
phone: 9876543210
class: 10
board: CBSE
created_at: 2025-09-30
```

---

### 2️⃣ **subjects** - Kaunse subjects hain?

```sql
CREATE TABLE subjects (
  id UUID PRIMARY KEY,
  name VARCHAR(50),        -- Physics, Chemistry, Biology, Math
  class INTEGER,           -- Kis class ke liye
  board VARCHAR(20)        -- CBSE, ICSE
);
```

**Example:**
```
id: sub-001
name: Physics
class: 10
board: CBSE
```

---

### 3️⃣ **books** - Kaunsi books hain?

```sql
CREATE TABLE books (
  id UUID PRIMARY KEY,
  title VARCHAR(200),              -- Book ka naam
  type VARCHAR(20),                -- NCERT ya Reference
  class INTEGER,                   -- Kis class ki
  subject_id UUID,                 -- Kis subject ki
  publisher VARCHAR(100),          -- Kaun publish kiya
  pdf_url TEXT,                    -- PDF file kahan hai
  processed BOOLEAN                -- OCR hua ya nahi
);
```

**Example:**
```
id: book-001
title: NCERT Physics Class 10
type: NCERT
class: 10
subject_id: sub-001
publisher: NCERT
pdf_url: s3://books/ncert-physics-10.pdf
processed: true
```

---

### 4️⃣ **book_pages** - Books ke pages (OCR se extracted)

```sql
CREATE TABLE book_pages (
  id UUID PRIMARY KEY,
  book_id UUID,                    -- Kis book ka page
  page_number INTEGER,             -- Page number
  text_content TEXT,               -- Page pe kya likha hai
  image_url TEXT,                  -- Page ka screenshot
  chapter_name VARCHAR(200),       -- Chapter ka naam
  embeddings VECTOR(1536)          -- AI ke liye (semantic search)
);
```

**Example:**
```
id: page-001
book_id: book-001
page_number: 95
text_content: "Photosynthesis is the process..."
image_url: s3://images/book-001-page-95.jpg
chapter_name: Life Processes
embeddings: [0.123, 0.456, ...]   (AI vector)
```

---

### 5️⃣ **doubts** - Students ne kya pucha?

```sql
CREATE TABLE doubts (
  id UUID PRIMARY KEY,
  user_id UUID,                    -- Kisne pucha
  question TEXT,                   -- Kya pucha
  subject_id UUID,                 -- Kis subject mein
  class INTEGER,                   -- Kis class ka doubt
  created_at TIMESTAMP,            -- Kab pucha
  vector_embedding VECTOR(1536)    -- AI ke liye
);
```

**Example:**
```
id: doubt-001
user_id: 123-456-789
question: "What is photosynthesis?"
subject_id: sub-002 (Biology)
class: 10
created_at: 2025-09-30 10:30:00
vector_embedding: [0.789, 0.234, ...]
```

---

### 6️⃣ **responses** - AI ne kya answer diya?

```sql
CREATE TABLE responses (
  id UUID PRIMARY KEY,
  doubt_id UUID,                   -- Kis doubt ka answer
  board_answer TEXT,               -- Exam format answer
  board_answer_format JSONB,       -- Points format mein
  flowchart_url TEXT,              -- Flowchart ka image
  flowchart_code TEXT,             -- Mermaid code
  created_at TIMESTAMP
);
```

**Example:**
```
id: resp-001
doubt_id: doubt-001
board_answer: "Photosynthesis is..."
board_answer_format: {"points": ["Point 1", "Point 2"]}
flowchart_url: s3://flowcharts/resp-001.png
flowchart_code: "graph TD; A-->B"
created_at: 2025-09-30 10:30:15
```

---

### 7️⃣ **ncert_sources** - NCERT mein kahan se answer mila?

```sql
CREATE TABLE ncert_sources (
  id UUID PRIMARY KEY,
  response_id UUID,       -- Kis response ka source
  book_page_id UUID,      -- Kis page se
  page_number INTEGER,    -- Page number
  line_start INTEGER,     -- Kis line se start
  line_end INTEGER,       -- Kis line pe end
  excerpt TEXT,           -- Exact text
  image_url TEXT          -- Page ka image
);
```

**Example:**
```
id: ncert-001
response_id: resp-001
book_page_id: page-001
page_number: 95
line_start: 12
line_end: 18
excerpt: "Photosynthesis is the process by which..."
image_url: s3://images/ncert-page-95.jpg
```

---

### 8️⃣ **online_resources** - YouTube/Websites

```sql
CREATE TABLE online_resources (
  id UUID PRIMARY KEY,
  response_id UUID,        -- Kis response ke liye
  type VARCHAR(20),        -- youtube ya website
  title TEXT,              -- Video/Article title
  url TEXT,                -- Link
  thumbnail TEXT,          -- Preview image
  snippet TEXT,            -- Short description
  relevance_score FLOAT    -- Kitna relevant (0-100)
);
```

**Example:**
```
id: online-001
response_id: resp-001
type: youtube
title: "Photosynthesis Explained - Khan Academy"
url: youtube.com/watch?v=abc123
thumbnail: youtube.com/thumb/abc123.jpg
snippet: "In this video, we explain..."
relevance_score: 95.5
```

---

## 🔄 Database Flow (Simple Diagram)

```
Student asks doubt
    ↓
1. Save in "doubts" table
    ↓
2. AI searches in "book_pages" (using embeddings)
    ↓
3. AI generates answer → Save in "responses" table
    ↓
4. Save NCERT source → "ncert_sources" table
    ↓
5. Save YouTube links → "online_resources" table
    ↓
6. Return everything to student
```

---

## 📝 Example: Complete Database Flow

**Student asks:** "What is photosynthesis?"

### Step 1: Create doubt entry
```sql
INSERT INTO doubts (id, user_id, question, subject_id, class)
VALUES ('doubt-001', 'user-123', 'What is photosynthesis?', 'bio-10', 10);
```

### Step 2: AI searches book_pages
```sql
SELECT * FROM book_pages
WHERE embeddings <-> '...' < 0.5  -- Vector similarity search
LIMIT 5;
```

### Step 3: AI generates answer & saves
```sql
INSERT INTO responses (id, doubt_id, board_answer, flowchart_url)
VALUES ('resp-001', 'doubt-001', 'Photosynthesis is...', 's3://flow.png');
```

### Step 4: Save NCERT source
```sql
INSERT INTO ncert_sources (response_id, page_number, line_start, line_end)
VALUES ('resp-001', 95, 12, 18);
```

### Step 5: Save YouTube videos
```sql
INSERT INTO online_resources (response_id, type, title, url)
VALUES ('resp-001', 'youtube', 'Khan Academy Video', 'youtube.com/...');
```

---

## 🎯 Database Size Estimates (MVP Phase)

| Table | Estimated Rows | Storage |
|-------|---------------|---------|
| users | 10,000 | 5 MB |
| subjects | 100 | < 1 MB |
| books | 50 | < 1 MB |
| book_pages | 50,000 | 500 MB (text) + 5 GB (images) |
| doubts | 100,000 | 50 MB |
| responses | 100,000 | 200 MB |
| ncert_sources | 200,000 | 100 MB |
| online_resources | 500,000 | 250 MB |
| **Total** | | **~6 GB** |

---

## 🔐 Database Security

### Row Level Security (RLS)
```sql
-- Users can only see their own doubts
CREATE POLICY user_doubts ON doubts
FOR SELECT USING (auth.uid() = user_id);

-- Everyone can read book_pages
CREATE POLICY public_books ON book_pages
FOR SELECT USING (true);
```

---

## 🚀 Database Setup Commands

### 1. Create Tables (Run in Supabase SQL Editor)
```sql
-- Copy paste all CREATE TABLE commands
```

### 2. Enable Vector Extension
```sql
CREATE EXTENSION vector;
```

### 3. Create Indexes (for fast search)
```sql
CREATE INDEX idx_doubts_user ON doubts(user_id);
CREATE INDEX idx_doubts_class ON doubts(class);
CREATE INDEX idx_book_pages_embeddings ON book_pages 
  USING ivfflat (embeddings vector_cosine_ops);
```

---

**Next Step:** Read `04_AI_FLOW.md` to understand how AI works! 🤖

