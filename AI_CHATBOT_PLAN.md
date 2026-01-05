# AI Chatbot Implementation Plan

## Overview
Add an intelligent chatbot to the interactive terminal that can answer questions about you using a custom knowledge base built from markdown files.

---

## Architecture Approach

### Option 1: Client-Side RAG (Recommended for MVP)
**Pros:**
- No backend needed initially
- Fast responses
- No API costs during development
- Privacy-friendly (all data stays local)

**Cons:**
- Limited to smaller knowledge bases
- Basic semantic search
- No complex reasoning

**Implementation:**
- Use in-browser vector embeddings (e.g., `transformers.js`)
- Store embeddings in browser IndexedDB
- Simple similarity search for retrieval

### Option 2: Backend API with LLM Integration (Production-Ready)
**Pros:**
- More powerful AI responses
- Scalable knowledge base
- Better conversation context
- Can use GPT-4, Claude, or other models

**Cons:**
- Requires backend server
- API costs
- More complex deployment

**Implementation:**
- Next.js API routes
- Vector database (Qdrant, Pinecone, or Supabase Vector)
- OpenAI/Anthropic API for responses

---

## Knowledge Base Structure

### Directory Layout
```
/knowledge-base/
  ├── about/
  │   ├── bio.md
  │   ├── education.md
  │   └── interests.md
  ├── experience/
  │   ├── valuelabs-ai.md
  │   ├── valuelabs-ml.md
  │   └── heavenly-joy.md
  ├── projects/
  │   ├── deep-research-agent.md
  │   ├── emulator-assembler.md
  │   ├── summit.md
  │   └── stock-predictor.md
  ├── skills/
  │   ├── programming-languages.md
  │   ├── ai-ml.md
  │   └── frameworks.md
  └── miscellaneous/
      ├── philosophy.md
      └── contact.md
```

### Markdown File Format
Each file should follow this structure:

```markdown
---
title: "Topic Title"
category: "experience|project|skill|about"
tags: ["tag1", "tag2", "tag3"]
priority: 1-10 (higher = more important)
last_updated: "2025-01-01"
---

# Main Content

Detailed information about the topic...

## Key Points
- Point 1
- Point 2

## Context
Additional context that helps answer questions...
```

---

## Implementation Phases

### Phase 1: Knowledge Base Setup (Week 1)
**Tasks:**
1. Create `/knowledge-base` directory structure
2. Write markdown files with your information
3. Create a script to validate markdown format
4. Set up frontmatter parsing

**Deliverables:**
- 10-15 markdown files covering all aspects
- Validation script
- README for knowledge base maintenance

### Phase 2: Basic Retrieval System (Week 1-2)
**Tasks:**
1. Choose approach (start with Option 1 for simplicity)
2. Implement markdown parser
3. Create simple keyword-based search
4. Build context aggregation logic

**Deliverables:**
- Markdown parsing utility
- Search function that finds relevant files
- Context builder that formats results

### Phase 3: Terminal Integration (Week 2)
**Tasks:**
1. Add `ask` or `chat` command to terminal
2. Implement conversation history
3. Create streaming response UI
4. Add loading states

**Deliverables:**
- New terminal command
- Chat interface in terminal
- Conversation persistence

### Phase 4: AI Response Generation (Week 2-3)
**Tasks:**
1. Integrate AI API (OpenAI/Anthropic)
2. Implement RAG pipeline:
   - Query → Search → Retrieve → Generate
3. Add system prompt engineering
4. Implement response streaming

**Deliverables:**
- Working AI responses
- RAG pipeline
- Response caching

### Phase 5: Enhancement & Polish (Week 3-4)
**Tasks:**
1. Add conversation memory
2. Implement follow-up question handling
3. Add citations/sources to responses
4. Create admin panel for knowledge base updates

**Deliverables:**
- Multi-turn conversations
- Source attribution
- Knowledge base admin interface

---

## Technical Stack Recommendation

### For MVP (Phase 1-3)
```
Frontend:
- React (existing)
- No additional dependencies initially

Knowledge Base:
- Markdown files
- Frontmatter parsing (gray-matter npm package)

Search:
- Simple keyword matching (Fuse.js for fuzzy search)
- TF-IDF scoring for relevance
```

### For Production (Phase 4-5)
```
AI/ML:
- OpenAI API (GPT-4) or Anthropic (Claude)
- Alternative: Open-source models via Replicate

Vector Search:
- Option A: Vercel KV + Embeddings
- Option B: Supabase Vector
- Option C: Qdrant (what you already know!)

Backend:
- Next.js API Routes (app/api/chat/route.ts)
- Vercel Edge Functions for fast responses
```

---

## API Design

### Endpoint: `/api/chat`
```typescript
POST /api/chat
Request: {
  message: string,
  conversationId?: string,
  history?: Message[]
}

Response: {
  response: string,
  sources: string[],
  conversationId: string
}
```

### Endpoint: `/api/knowledge-base` (Admin)
```typescript
POST /api/knowledge-base/upload
Request: FormData (markdown file)

GET /api/knowledge-base/list
Response: { files: KnowledgeBaseFile[] }

DELETE /api/knowledge-base/:id
```

---

## Conversation Flow

```
User: "What experience do you have with AI?"

1. Parse query
2. Search knowledge base:
   - experience/valuelabs-ai.md (relevance: 0.95)
   - skills/ai-ml.md (relevance: 0.87)
   - projects/deep-research-agent.md (relevance: 0.82)

3. Retrieve top 3 chunks

4. Build context:
   """
   Based on Akshath's profile:
   [Content from valuelabs-ai.md]
   [Content from ai-ml.md]
   [Content from deep-research-agent.md]
   """

5. Generate response with AI:
   System: "You are Akshath's portfolio assistant..."
   Context: [retrieved content]
   Query: "What experience do you have with AI?"

6. Return response + sources
```

---

## System Prompt Template

```
You are an AI assistant for Akshath Yennam's portfolio website.

ROLE:
- Answer questions about Akshath's background, experience, skills, and projects
- Be conversational, professional, and enthusiastic
- Use first-person when referring to Akshath (e.g., "I worked on...")
- Provide specific details from the knowledge base

GUIDELINES:
- Only answer based on provided context
- If information isn't in the context, say "I don't have that specific information"
- Keep responses concise (2-3 paragraphs max)
- Include relevant examples when possible
- Cite sources when mentioning specific experiences or projects

CONTEXT:
{retrieved_content}

USER QUESTION:
{user_query}
```

---

## Security & Privacy Considerations

1. **API Keys:**
   - Store in environment variables
   - Never expose in client code
   - Use Vercel environment variables

2. **Rate Limiting:**
   - Limit requests per IP (10/minute)
   - Implement exponential backoff
   - Add captcha for abuse prevention

3. **Content Filtering:**
   - Validate all user inputs
   - Sanitize markdown content
   - Block prompt injection attempts

4. **Data Privacy:**
   - Don't store personal questions
   - Anonymize conversation logs
   - Clear conversations after session ends

---

## Knowledge Base Maintenance

### Adding New Content
1. Create markdown file in appropriate category
2. Add frontmatter metadata
3. Run validation script
4. Commit to repository
5. Trigger re-indexing (if using vector search)

### Updating Content
1. Edit markdown file
2. Update `last_updated` date
3. Re-validate
4. Re-index if needed

### Best Practices
- Keep files focused on single topics
- Use clear, descriptive titles
- Add comprehensive tags
- Include examples and specific details
- Update regularly with new experiences

---

## Testing Strategy

### Unit Tests
- Markdown parsing
- Search algorithm accuracy
- Context building
- Response formatting

### Integration Tests
- Full RAG pipeline
- API endpoints
- Knowledge base updates

### User Testing
- Ask sample questions
- Check response accuracy
- Verify source citations
- Test conversation flow

### Sample Test Questions
```
- "What programming languages do you know?"
- "Tell me about your AI experience"
- "What projects have you built?"
- "Where did you study?"
- "How can I contact you?"
- "What is your experience with RAG systems?"
```

---

## Cost Estimation (Production)

### Monthly Costs (Estimated)
```
OpenAI API (GPT-4):
- 1000 queries/month
- ~$50-100/month

Vector Database (Qdrant Cloud):
- Free tier: 1GB
- Paid: $25/month for more storage

Hosting (Vercel):
- Hobby: Free
- Pro: $20/month (if needed)

Total: $75-145/month (production scale)
```

### Cost Optimization
- Use GPT-3.5-turbo for most queries
- Cache common responses
- Implement response streaming
- Use free tier vector databases initially

---

## Success Metrics

### User Engagement
- Number of chat interactions per visitor
- Average conversation length
- Question types distribution

### Quality Metrics
- Response accuracy (manual review)
- Source relevance
- User satisfaction (optional feedback)

### Technical Metrics
- Response time (< 2s target)
- API error rate (< 1%)
- Cache hit rate (> 50%)

---

## Future Enhancements

### Phase 6+ (Optional)
1. **Voice Interface:**
   - Text-to-speech responses
   - Voice input

2. **Multi-language Support:**
   - Translate knowledge base
   - Detect and respond in user's language

3. **Personality Tuning:**
   - Adjust tone based on context
   - Add humor and personality

4. **Advanced Features:**
   - Code example generation
   - Project recommendations
   - Dynamic resume generation based on job requirements

5. **Analytics Dashboard:**
   - Popular questions
   - Conversation insights
   - Knowledge base gaps

---

## Getting Started Checklist

- [ ] Choose implementation approach (Option 1 or 2)
- [ ] Create knowledge base directory structure
- [ ] Write initial markdown files (10-15 files)
- [ ] Set up markdown validation
- [ ] Implement basic search (keyword/fuzzy)
- [ ] Add `chat` command to terminal
- [ ] Integrate AI API (OpenAI/Anthropic)
- [ ] Build RAG pipeline
- [ ] Test with sample questions
- [ ] Deploy and monitor

---

## Recommended Timeline

**Week 1:** Knowledge base setup + basic retrieval
**Week 2:** Terminal integration + AI responses
**Week 3:** Polish, testing, deployment
**Week 4:** Monitoring, improvements, docs

**Total:** 3-4 weeks for full implementation
**MVP (basic version):** 1-2 weeks

---

## Questions to Answer Before Starting

1. Which AI provider? (OpenAI, Anthropic, or self-hosted?)
2. How much control over responses? (more = more complex prompt engineering)
3. Budget for API calls?
4. Need conversation history persistence?
5. Multi-user support needed?
6. Analytics requirements?
7. Update frequency for knowledge base?

---

## Next Steps

1. **Review this plan** and decide on approach
2. **Create knowledge base** with markdown files
3. **Choose AI provider** and get API keys
4. **Start with Phase 1** (knowledge base setup)
5. **Iterate quickly** and test frequently
