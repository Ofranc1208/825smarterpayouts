# GPT Integration Module (Orchestra Pattern)

## 🎯 Overview

This directory contains the refactored GPT integration system following the **Orchestra Pattern**. Each module has a single, well-defined responsibility and can be tested, debugged, and maintained independently.

## 📁 Module Structure

```
gpt-integration/
├── ContextRetriever.ts      # Retrieves context from various sources
├── SystemPromptBuilder.ts   # Constructs comprehensive system prompts
├── ConversationFormatter.ts # Formats messages for GPT API
├── StreamingHandler.ts      # Manages streaming responses
├── IntentClassifier.ts      # Classifies user intent during forms
├── MessageGenerator.ts      # Generates unique message IDs
├── index.ts                 # Central export orchestrator
└── README.md               # This file
```

## 🔧 Module Responsibilities

### 1. **ContextRetriever.ts**
**Purpose:** Retrieves relevant context from various knowledge sources

**Key Functions:**
- `retrieveVectorContext(userQuery)` - Fetches vector-based context
- `generateContextHints(userQuery)` - Generates hints for all knowledge domains

**Returns:**
- `RetrievedContext` - Contains content and source information
- `ContextHints` - Hints for FAQ, About Us, Contact, etc.

**Example:**
```typescript
const context = await retrieveVectorContext("How do I contact you?");
// Returns: { content: "Contact info...", source: "contact_data" }

const hints = generateContextHints("Tell me about your process");
// Returns: { faq: "", process: "💡 PROCESS CONTEXT...", ... }
```

---

### 2. **SystemPromptBuilder.ts**
**Purpose:** Constructs the comprehensive system prompt with all knowledge

**Key Functions:**
- `buildSystemPrompt(config)` - Builds complete system prompt

**Accepts:**
- `SystemPromptConfig` - Contains retrieved context and hints

**Returns:**
- System prompt object with role and content

**Example:**
```typescript
const systemPrompt = buildSystemPrompt({
  retrievedContext: { content: "...", source: "company_data" },
  contextHints: { faq: "...", aboutUs: "...", ... }
});
```

---

### 3. **ConversationFormatter.ts**
**Purpose:** Formats conversation messages for GPT API

**Key Functions:**
- `formatConversationMessages(messages, userMessage)` - Formats to GPT format
- `hasFormFlow(messages)` - Checks if user is in form flow

**Returns:**
- Array of `FormattedMessage` objects with role and content

**Example:**
```typescript
const formatted = formatConversationMessages(visibleMessages, newMessage);
// Returns: [{ role: "user", content: "..." }, { role: "assistant", content: "..." }]

const inForm = hasFormFlow(visibleMessages);
// Returns: true/false
```

---

### 4. **StreamingHandler.ts**
**Purpose:** Handles streaming responses from GPT API

**Key Functions:**
- `makeStreamingAPICall(messages)` - Makes API call
- `processStreamingResponse(response, callbacks)` - Processes stream

**Accepts:**
- `StreamingCallbacks` - onStream and onComplete functions

**Returns:**
- Final parsed response text

**Example:**
```typescript
const response = await makeStreamingAPICall(gptMessages);
const finalText = await processStreamingResponse(response, {
  onStream: (partial) => console.log(partial),
  onComplete: (final) => console.log("Done:", final)
});
```

---

### 5. **IntentClassifier.ts**
**Purpose:** Classifies user intent during form flows

**Key Functions:**
- `classifyIntent(snapshot, userInput)` - Classifies intent

**Returns:**
- `IntentResult` - Contains intent type and value

**Intent Types:**
- `FORM_ANSWER` - User is answering a form question
- `ASK_QUESTION` - User is asking a general question
- `SPEAK_TO_AGENT` - User wants to speak to an agent
- `AMBIGUOUS` - Intent unclear

**Example:**
```typescript
const intent = await classifyIntent(formSnapshot, "I want to speak to someone");
// Returns: { intent: "SPEAK_TO_AGENT", value: "..." }
```

---

### 6. **MessageGenerator.ts**
**Purpose:** Generates unique message IDs

**Key Functions:**
- `generateUniqueId()` - Creates unique message ID
- `resetMessageCounter()` - Resets counter (for testing)

**Example:**
```typescript
const id = generateUniqueId();
// Returns: "msg-1730000000000-1"
```

---

## 🔄 Data Flow

```
User Message
    ↓
[ContextRetriever] → Retrieve context & hints
    ↓
[SystemPromptBuilder] → Build comprehensive prompt
    ↓
[ConversationFormatter] → Format conversation
    ↓
[StreamingHandler] → Make API call & stream response
    ↓
AI Response → User
```

## 🎨 Usage in Main Hook

The main `useGPTIntegration.ts` hook orchestrates all modules:

```typescript
// Step 1: Format conversation
const conversationMessages = formatConversationMessages(visibleMessages, userMessage);

// Step 2: Retrieve context
const retrievedContext = await retrieveVectorContext(userMessage.text);

// Step 3: Generate hints
const contextHints = generateContextHints(userMessage.text);

// Step 4: Build prompt
const systemPrompt = buildSystemPrompt({ retrievedContext, contextHints });

// Step 5: Make API call
const response = await makeStreamingAPICall([systemPrompt, ...conversationMessages]);

// Step 6: Process response
await processStreamingResponse(response, { onStream, onComplete });
```

## 🧪 Testing Strategy

Each module can be tested independently:

```typescript
// Test ContextRetriever
describe('ContextRetriever', () => {
  it('should retrieve contact context', async () => {
    const context = await retrieveVectorContext("How do I contact you?");
    expect(context.source).toBe('contact_data');
  });
});

// Test SystemPromptBuilder
describe('SystemPromptBuilder', () => {
  it('should build complete prompt', () => {
    const prompt = buildSystemPrompt({ contextHints: {...} });
    expect(prompt.role).toBe('system');
    expect(prompt.content).toContain('Mint');
  });
});
```

## 🐛 Debugging

Each module logs its operations:

- **ContextRetriever**: `🔍 Searching vector knowledge base...`
- **StreamingHandler**: Logs API errors and parsing issues
- **IntentClassifier**: Logs classification errors

Enable detailed logging:
```typescript
// In each module, add:
console.log('[ModuleName] Operation details...');
```

## 📊 Benefits of This Architecture

1. **Single Responsibility**: Each module does one thing well
2. **Easy Testing**: Test modules in isolation
3. **Easy Debugging**: Pinpoint issues to specific modules
4. **Maintainability**: Update one module without affecting others
5. **Scalability**: Add new modules without refactoring existing ones
6. **Type Safety**: Full TypeScript support with clear interfaces

## 🔮 Future Enhancements

Potential additions to this architecture:

1. **CacheManager.ts** - Cache responses for performance
2. **ErrorHandler.ts** - Centralized error handling
3. **MetricsCollector.ts** - Track performance metrics
4. **PromptOptimizer.ts** - A/B test different prompts
5. **VectorEmbeddings.ts** - True vector-based search

## 📝 Notes

- All modules are **backward compatible** with existing code
- The system **gracefully degrades** if vector context is unavailable
- All functions are **async-safe** and handle errors properly
- The architecture follows **TypeScript best practices**

---

**Last Updated:** 2025-01-26  
**Maintainer:** SmarterPayouts Development Team

