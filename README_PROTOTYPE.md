# 🎨 StudyGenie Prototype

## Canvas-Based Visual Interface

Yeh ek working prototype hai jo StudyGenie ka core concept demonstrate karta hai.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
```
http://localhost:3000
```

---

## ✨ Features Implemented

### ✅ UI/UX
- **Canvas Area** - Main area for displaying flowchart answers
- **Bottom Input** - ChatGPT-style input at bottom
- **Minimal Navbar** - Clean top navigation
- **Responsive Design** - Works on desktop and mobile

### ✅ Flowchart Display
- **Definition Box** - Blue colored, with icon
- **Step-by-Step Boxes** - Color-coded (green, yellow, orange)
- **Animated Arrows** - Between each step
- **Formula Display** - Special box for formulas
- **Example Section** - Real-world examples

### ✅ References Panel
- **4 Column Layout** - NCERT, Books, YouTube, Websites
- **Hover Effects** - Interactive cards
- **Visual Hierarchy** - Clear organization
- **Clickable Links** - External resources

### ✅ Animations
- **Smooth Transitions** - Framer Motion
- **Loading State** - Spinner with message
- **Entry Animations** - Boxes appear one by one

---

## 📁 File Structure

```
studygenie-prototype/
├── app/
│   ├── page.tsx              # Main page (Canvas + Input)
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
│
├── components/
│   ├── Navbar.tsx            # Top navigation
│   ├── Canvas.tsx            # Main canvas area
│   ├── FlowchartAnswer.tsx   # Flowchart boxes
│   ├── ReferencePanel.tsx    # References display
│   └── BottomInput.tsx       # Bottom input bar
│
├── lib/
│   └── demoData.ts           # Demo response data
│
└── package.json              # Dependencies
```

---

## 🎨 Design System

### Colors
- **Blue** - Definition, NCERT
- **Green** - Process steps, Reference books
- **Yellow** - Formulas, Warning
- **Orange** - Examples
- **Purple** - Branding, Websites
- **Red** - YouTube

### Layout Proportions
- **Navbar**: 5%
- **Canvas**: 75%
- **Input**: 20%

---

## 🔄 Demo Flow

1. **Landing Page** → Welcome message with features
2. **Type Question** → "What is photosynthesis?"
3. **Loading State** → 2-second delay (simulates AI)
4. **Result Display** → Flowchart + References

---

## 🎯 Next Steps (For Full Product)

### Backend Integration
- [ ] Connect to OpenAI API
- [ ] Setup Supabase database
- [ ] Implement vector search (Pinecone)
- [ ] Add YouTube API integration
- [ ] Add Google Search API

### Features to Add
- [ ] User authentication
- [ ] Save history
- [ ] Real-time streaming
- [ ] Voice input
- [ ] Image upload
- [ ] PDF export
- [ ] Share functionality

### Improvements
- [ ] Better mobile responsiveness
- [ ] Dark mode
- [ ] Pan/Zoom canvas
- [ ] Collapsible reference cards
- [ ] Search functionality
- [ ] Multiple language support

---

## 💡 Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

---

## 📝 Demo Data

Demo data is in `lib/demoData.ts`. Yeh ek sample response hai jo real AI response jaise dikhta hai.

**Question:** "What is photosynthesis?"

**Response includes:**
- 6 steps with icons and colors
- Definition
- Formula
- Example
- NCERT reference
- Reference book
- 2 YouTube videos
- 2 websites

---

## 🎨 Customization

### Change Colors
Edit `components/FlowchartAnswer.tsx`:
```typescript
const colorMap = {
  blue: "bg-blue-50 border-blue-300",
  // Add your colors
};
```

### Modify Layout
Edit `app/page.tsx` for main layout proportions.

### Add More References
Edit `lib/demoData.ts` to add more demo data.

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Or use Vercel CLI
```bash
vercel --prod
```

---

## ❓ Questions?

Yeh ek prototype hai to showcase core concept. Real product mein:
- AI integration hogi
- Database hoga
- User accounts honge
- Real-time processing hogi

**This is just the beginning!** 🎉

---

## 📸 Screenshots

*(Add screenshots here after running)*

---

**Happy Coding!** 🚀

