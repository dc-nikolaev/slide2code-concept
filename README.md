[[English](./README.md)] | [Русский](./README_RU.md)

# Slide2Image

🧪 **Experimental Project**

This project is an experiment to test the hypothesis of automatic image-to-HTML conversion using `gpt-4o-mini`.

## About

All project code is generated in [Cursor](https://cursor.sh/) using Composer (Claude). This is an experiment in creating an application with an AI assistant.

The project is published on GitHub to demonstrate the concept to the team and discuss its development possibilities.

### Features

- Image upload via drag & drop
- Image paste from clipboard (Ctrl+V)
- Image preview
- HTML generation with adaptive layout
- Operation history with information about:
  - Operation time
  - Token usage
  - Generation time
  - Request cost

### Technologies

- Node.js
- TypeScript
- Hono (web framework)
- Vercel AI SDK
- `gpt-4o-mini` model
- Tailwind CSS

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file based on `.env.example` and add your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
```

3. Start the project:
```bash
npm start
```

The application will be available at: http://localhost:3000

## Limitations

- Only JPG and PNG formats are supported
- OpenAI API key is required
- HTML generation works with one image at a time
- Operation history is stored in browser memory and resets on page refresh

## Usage Cost (as of Jan 26, 2025)

The project uses a model with the following rates:
- Input tokens: $0.15 per 1M tokens
- Output tokens: $0.60 per 1M tokens

The cost of each operation is displayed in the history. 
