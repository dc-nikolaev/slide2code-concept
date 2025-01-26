import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

interface GenerateResult {
    html: string;
    usage: {
        promptTokens: number;
        completionTokens: number;
        totalTokens: number;
        cost: number;
    };
}

export async function generateHtmlFromImage(imageData: Buffer): Promise<GenerateResult> {
    const { text, usage } = await generateText({
        model: openai('gpt-4o-mini'),
        messages: [
            {
                role: 'user',
                content: [
                    { type: 'image', image: imageData },
                    {
                        type: 'text',
                        text: `
    Ты - эксперт по преобразованию слайдов в HTML. Твоя задача - проанализировать изображение слайда и создать его HTML-версию с использованием Tailwind CSS.
    
    ВАЖНО: Твой ответ должен содержать ТОЛЬКО чистый HTML-код, без дополнительных символов или форматирования. Не используй обрамляющие теги markdown или \`\`\`. Начни ответ сразу с <!DOCTYPE html> и закончи тегом </html>.
    
    Требования к HTML:
    1. Контент должен быть оптимизирован для мобильных устройств (320-1024px)
    2. Используй контрастные цвета для лучшей читаемости
    3. Добавь визуальное разделение между разными блоками контента
    4. Сохрани логическую структуру и иерархию
    5. Используй семантические HTML теги
    6. Добавь отступы для улучшения читаемости
    
    Для улучшения мобильного отображения:
    - Используй адаптивные размеры шрифтов
    - Добавь достаточные отступы между элементами
    - Убедись, что все интерактивные элементы достаточно большие для тапа
    - Используй стеки для вертикального отображения контента
    - Добавь подходящие брейкпоинты для разных размеров экрана
    
    ПОМНИ: Отвечай только HTML-кодом, без дополнительных комментариев или форматирования.
`.trim()
                    }
                ]
            }
        ]
    });

    // Расчет стоимости (цены актуальны на январь 2025)
    // gpt-4o-mini: $0.15 за 1M токенов для входа и $0.60 за 1M токенов для выхода
    const cost = (usage.promptTokens * 0.15 + usage.completionTokens * 0.6) / 1_000_000;

    return {
        html: text,
        usage: {
            ...usage,
            cost
        }
    };
}
