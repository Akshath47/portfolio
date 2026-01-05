# AI Chatbot Implementation Roadmap

This document provides a step-by-step guide to implement the AI chatbot feature.

---

## Quick Start (Minimum Viable Product - 1 Week)

### Day 1-2: Knowledge Base Creation
**Goal:** Have 10-15 markdown files ready

**Tasks:**
1. ✅ Create `/knowledge-base` directory
2. ✅ Create subdirectories: `/about`, `/experience`, `/projects`, `/skills`
3. ✅ Write 3-4 files about yourself (about, philosophy, background)
4. ✅ Write 3 experience files (one per job/internship)
5. ✅ Write 4 project files (your main projects)
6. ✅ Write 1-2 skills files (programming languages, AI/ML skills)
7. ✅ Write 1 contact file

**Deliverable:** 12-15 markdown files with detailed content

---

### Day 3-4: Simple Search Implementation
**Goal:** Get basic retrieval working without AI

**Tasks:**
1. ✅ Install dependencies: `npm install gray-matter fuse.js`
2. ✅ Create utility to parse markdown files
3. ✅ Create utility to search files by keywords
4. ✅ Test search with sample queries
5. ✅ Add new terminal command: `ask [question]`
6. ✅ Display search results in terminal

**Deliverable:** Working keyword search that returns relevant markdown content

---

### Day 5-6: AI Integration
**Goal:** Get AI-powered responses working

**Tasks:**
1. ✅ Choose AI provider (OpenAI recommended for simplicity)
2. ✅ Get API key from OpenAI
3. ✅ Add API key to `.env.local`
4. ✅ Create Next.js API route: `/api/chat`
5. ✅ Implement RAG pipeline:
   - Take user question
   - Search knowledge base
   - Send context + question to OpenAI
   - Return response
6. ✅ Test with sample questions
7. ✅ Handle errors gracefully

**Deliverable:** AI chatbot that answers questions about you

---

### Day 7: Polish & Testing
**Goal:** Make it production-ready

**Tasks:**
1. ✅ Add loading states in terminal
2. ✅ Improve response formatting
3. ✅ Add source citations
4. ✅ Test with 20+ sample questions
5. ✅ Fix any bugs or inaccuracies
6. ✅ Add rate limiting
7. ✅ Update terminal help command

**Deliverable:** Fully functional chatbot ready for deployment

---

## Detailed Implementation Steps

### Step 1: Create Knowledge Base Structure

```bash
# In your project root
mkdir -p knowledge-base/{about,experience,projects,skills,miscellaneous}
```

**File Creation Priority:**
1. `about/bio.md` - Your basic bio and background
2. `about/education.md` - University details
3. `experience/valuelabs-ai.md` - Most recent internship
4. `projects/deep-research-agent.md` - Your flagship project
5. `skills/programming-languages.md` - Languages you know
6. `miscellaneous/contact.md` - Contact information

**Continue with:**
7-15. Other experiences, projects, skills based on templates

---

### Step 2: Set Up Markdown Processing

**Create: `/lib/knowledge-base.ts`**

```typescript
// This file will handle:
// 1. Reading all markdown files from /knowledge-base
// 2. Parsing frontmatter and content
// 3. Creating a searchable index
// 4. Providing search functions

// Key functions:
// - loadKnowledgeBase()
// - searchByKeywords(query)
// - getFilesByCategory(category)
// - getFileByPriority()
```

**Dependencies needed:**
- `gray-matter` - Parse frontmatter
- `fuse.js` - Fuzzy search
- `fs` and `path` - File system operations

---

### Step 3: Add Search to Terminal

**Modify: `/components/interactive-terminal.tsx`**

Add new command:
```typescript
ask: (args: string) => {
  // 1. Take user question from args
  // 2. Search knowledge base
  // 3. Return relevant content (before AI integration)
  // 4. Later: Call AI API with context
}
```

---

### Step 4: Set Up OpenAI API

**Create: `/app/api/chat/route.ts`**

```typescript
// This API route will:
// 1. Receive user question from frontend
// 2. Search knowledge base for relevant content
// 3. Build context from search results
// 4. Call OpenAI API with system prompt + context + question
// 5. Stream response back to frontend
// 6. Handle errors and rate limiting

// Environment variable needed: OPENAI_API_KEY
```

**Environment Setup:**
```bash
# .env.local
OPENAI_API_KEY=sk-...your-key-here...
```

---

### Step 5: Implement RAG Pipeline

**RAG Flow:**
```
User Question
    ↓
Search Knowledge Base (retrieve top 3-5 relevant files)
    ↓
Extract relevant sections from files
    ↓
Build context (combine retrieved content)
    ↓
Create prompt:
    - System message (who you are, how to respond)
    - Context (retrieved knowledge)
    - User question
    ↓
Send to OpenAI API
    ↓
Stream response back to user
    ↓
Display in terminal with sources
```

---

### Step 6: Create System Prompt

**Key components:**

1. **Identity:** "You are an AI assistant representing Akshath Yennam"

2. **Personality:** "Be professional, enthusiastic, and conversational"

3. **Response Style:**
   - Use first person ("I worked on..." not "He worked on...")
   - Be specific with examples
   - Keep responses 2-3 paragraphs
   - Include relevant details from context

4. **Limitations:**
   - Only answer based on provided context
   - If info not available, say so
   - Don't make up information

5. **Citation:**
   - Mention specific experiences or projects
   - Provide source files for verification

---

## Advanced Features (Week 2+)

### Conversation Memory
- Store conversation history in state
- Send previous messages for context
- Allow follow-up questions

### Source Citations
- Show which files were used
- Add "Sources: [file1.md, file2.md]" to responses
- Link to original content if needed

### Response Streaming
- Stream tokens as they arrive from OpenAI
- Show typing indicator
- Better user experience

### Admin Panel
- Upload new markdown files
- Edit existing files
- Re-index knowledge base
- View analytics

---

## File Structure After Implementation

```
portfolio/
├── knowledge-base/
│   ├── about/
│   │   ├── bio.md
│   │   └── education.md
│   ├── experience/
│   │   ├── valuelabs-ai.md
│   │   └── heavenly-joy.md
│   ├── projects/
│   │   ├── deep-research-agent.md
│   │   └── summit.md
│   └── skills/
│       └── programming-languages.md
├── lib/
│   ├── knowledge-base.ts        # KB utilities
│   ├── openai.ts               # OpenAI client
│   └── rag-pipeline.ts         # RAG logic
├── app/
│   └── api/
│       └── chat/
│           └── route.ts        # Chat API endpoint
├── components/
│   └── interactive-terminal.tsx # Updated with ask command
└── .env.local                   # API keys
```

---

## Testing Checklist

### Functional Testing
- [ ] Terminal `ask` command works
- [ ] Knowledge base search returns relevant files
- [ ] AI generates appropriate responses
- [ ] Responses are accurate to your profile
- [ ] Source citations are correct
- [ ] Error handling works (invalid questions, API errors)
- [ ] Rate limiting prevents abuse

### Content Testing
- [ ] Test 10 questions about background
- [ ] Test 10 questions about experience
- [ ] Test 10 questions about projects
- [ ] Test 10 questions about skills
- [ ] Test 5 questions about contact/availability
- [ ] Test 5 edge cases (unclear, irrelevant questions)

### Performance Testing
- [ ] Response time < 3 seconds
- [ ] No memory leaks during long sessions
- [ ] Terminal doesn't freeze during API calls
- [ ] Handles concurrent requests properly

---

## Common Issues & Solutions

### Issue 1: AI Responses Are Generic
**Solution:**
- Add more specific details to markdown files
- Improve system prompt with examples
- Increase context retrieval (retrieve more files)
- Add explicit instructions about using specific examples

### Issue 2: Wrong Information in Responses
**Solution:**
- Review and update markdown files
- Check search algorithm (is it finding right files?)
- Verify system prompt doesn't allow hallucinations
- Add "only use provided context" instruction

### Issue 3: Slow Response Times
**Solution:**
- Implement response streaming
- Cache common queries
- Optimize search algorithm
- Use faster GPT model (gpt-3.5-turbo)

### Issue 4: API Costs Too High
**Solution:**
- Implement caching for identical questions
- Use cheaper model for simple questions
- Add rate limiting per user
- Optimize token usage (shorter prompts)

---

## Deployment Checklist

### Before Deploying
- [ ] All API keys in environment variables
- [ ] No sensitive information in knowledge base
- [ ] Rate limiting implemented
- [ ] Error handling complete
- [ ] All tests passing
- [ ] Knowledge base content reviewed and accurate

### Deployment Steps
1. Push code to GitHub
2. Deploy on Vercel (or your hosting provider)
3. Add environment variables in Vercel dashboard
4. Test in production environment
5. Monitor API usage and costs
6. Set up error tracking (optional: Sentry)

### Post-Deployment
- [ ] Test all features in production
- [ ] Monitor error logs
- [ ] Track API usage
- [ ] Collect user feedback
- [ ] Update knowledge base as needed

---

## Cost Management

### OpenAI API Costs (GPT-3.5-turbo)
```
Pricing:
- $0.0015 per 1K input tokens
- $0.002 per 1K output tokens

Average query:
- Input: ~500 tokens (context + question)
- Output: ~200 tokens (response)
- Cost per query: ~$0.001 (0.1 cents)

Monthly estimates:
- 100 queries/month: ~$0.10
- 1,000 queries/month: ~$1.00
- 10,000 queries/month: ~$10.00
```

### Cost Optimization Strategies
1. Cache responses for duplicate questions
2. Use streaming for better UX without extra cost
3. Implement smart search to reduce context size
4. Set usage limits per user
5. Consider cheaper alternatives for simple queries

---

## Maintenance Schedule

### Weekly
- Review chatbot usage analytics
- Check for any errors in logs
- Test with a few sample questions

### Monthly
- Update knowledge base with new experiences/projects
- Review and improve system prompts
- Check API costs and optimize if needed
- Update dependencies

### Quarterly
- Major knowledge base content review
- Performance optimization
- User feedback implementation
- Feature enhancements

---

## Success Metrics

Track these metrics to measure success:

### Engagement
- Number of questions asked per visitor
- Average conversation length
- Repeat users asking multiple questions

### Quality
- Response accuracy (manual spot checks)
- Questions that get good vs. poor responses
- User satisfaction (if feedback mechanism added)

### Technical
- Average response time
- API error rate
- Search result relevance
- Cache hit rate

---

## Next Steps After MVP

Once basic chatbot works, consider:

1. **Enhanced Features:**
   - Multi-turn conversations
   - Follow-up question handling
   - Context awareness across messages

2. **Content Expansion:**
   - Add more detailed project descriptions
   - Include code snippets and technical details
   - Add case studies and problem-solving examples

3. **User Experience:**
   - Better loading states
   - Animated responses
   - Voice input/output

4. **Analytics:**
   - Track popular questions
   - Identify knowledge gaps
   - Improve based on user patterns

5. **Integration:**
   - Connect to live resume
   - Link to project demos
   - Pull from GitHub for latest projects

---

## Resources & References

### Documentation
- OpenAI API: https://platform.openai.com/docs
- Next.js API Routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- Vercel Deployment: https://vercel.com/docs

### Libraries
- `gray-matter`: Frontmatter parsing
- `fuse.js`: Fuzzy search
- `openai`: Official OpenAI SDK
- `zod`: Input validation

### Similar Projects (for inspiration)
- Personal AI chatbots
- Portfolio Q&A systems
- RAG documentation bots

---

## Getting Help

If you get stuck:
1. Check OpenAI documentation for API issues
2. Review error logs carefully
3. Test each component independently
4. Start simple and add complexity gradually
5. Ask for help with specific error messages

---

## Final Thoughts

**Start Simple:**
- Don't over-engineer the first version
- Get something working end-to-end quickly
- Iterate based on real usage

**Quality Over Quantity:**
- 10 detailed, accurate markdown files > 50 generic ones
- Focus on common questions first
- Expand based on actual questions received

**Test Thoroughly:**
- Test with real questions you'd expect
- Check accuracy of responses
- Verify sources are cited correctly

**Monitor and Improve:**
- Watch API costs
- Track what questions get asked
- Continuously update knowledge base

Good luck! This will be a great addition to your portfolio. 🚀
