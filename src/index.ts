import { config } from 'dotenv';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { logger } from 'hono/logger';
import { serveStatic } from '@hono/node-server/serve-static';
import { generateHtmlFromImage } from './services/ai';

config();
if (!process.env.OPENAI_API_KEY) {
    console.error('Error: OPENAI_API_KEY is not set in environment variables');
    process.exit(1);
}

const app = new Hono();

app.use('*', logger());

app.use('/*', serveStatic({ root: './public' }));

app.post('/api/vision', async (context) => {
    try {
        const formData = await context.req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return context.json({ error: 'No file provided' }, 400);
        }

        if (!file.type.startsWith('image/')) {
            return context.json({ error: 'Invalid file type. Only images are allowed' }, 400);
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await generateHtmlFromImage(buffer);

        return context.json({
            html: result.html,
            usage: result.usage,
            message: 'Successfully processed image'
        });
    } catch (error) {
        console.error('Error processing image:', error);
        return context.json(
            {
                error: 'Failed to process image',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            500
        );
    }
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port
});
