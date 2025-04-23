import fs from 'fs';
import path from 'path';

import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { path: string[] } }
): Promise<NextResponse> {
  try {
    const imagePath = path.join(
      process.cwd(),
      'public',
      'images',
      ...params.path
    );

    if (!fs.existsSync(imagePath)) {
      return NextResponse.json({ message: 'Image not found' }, { status: 404 });
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const headers = new Headers();
    headers.set('Content-Type', 'image/jpeg');

    return new NextResponse(imageBuffer, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Error serving image:', error);
    return NextResponse.json(
      { message: 'Error serving image' },
      { status: 500 }
    );
  }
}
