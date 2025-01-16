import path from 'path';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';

export async function GET(req, { params }) {
    try {
        // دریافت پارامتر مسیر
        const { path: filePathArray } = params;

        // اعتبارسنجی پارامتر
        if (!filePathArray || !Array.isArray(filePathArray) || filePathArray.length < 2) {
            return new Response(JSON.stringify({ message: 'Invalid file path' }), { status: 400 });
        }

        // مسیر فایل
        const baseDir = path.join(process.cwd(), 'images');
        const filePath = path.join(baseDir, ...filePathArray);

        // بررسی وجود فایل
        await stat(filePath);

        // نوع MIME فایل
        const ext = path.extname(filePath).toLowerCase();
        const mimeType = {
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
        }[ext];

        if (!mimeType) {
            return new Response(JSON.stringify({ message: 'Unsupported file type' }), { status: 400 });
        }

        // بازگشت فایل به‌صورت جریان
        const stream = createReadStream(filePath);
        return new Response(stream, {
            headers: {
                'Content-Type': mimeType,
            },
        });
    } catch (err) {
        console.error('Error serving file:', err);
        return new Response(JSON.stringify({ message: 'File not found' }), { status: 404 });
    }
}