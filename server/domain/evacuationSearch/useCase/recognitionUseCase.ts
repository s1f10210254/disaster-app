import { OpenAI } from 'openai';
import { OPENAI_API_KEY } from 'service/envValues';

export const recognitionUseCase = {
  recognition: async (imageUrl: string): Promise<string> => {
    try {
      console.log('imageUrl:', imageUrl);
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        baseURL: 'https://api.openai.iniad.org/api/v1',
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                // text: '何のキャラクターがいる？ キャラクター名だけ答えて。',
                text: 'ココはどこ？',
              },
              {
                type: 'image_url',
                image_url: {
                  // url: 'https://www.atpress.ne.jp/releases/160623/img_160623_1.jpg',
                  url: imageUrl,
                },
              },
            ],
          },
        ],
      });
      const text = response.choices[0].message.content;
      console.log('text:', text);
      if (!text) throw new Error('No text recognized from the image');
      return text;
    } catch (error) {
      console.error({ error });
      throw new Error(`Error recognizing the image: ${error}`);
    }
  },
};
