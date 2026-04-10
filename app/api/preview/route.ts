import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  
  if (!url) return new NextResponse('No URL provided', { status: 400 });

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!res.ok) {
      return new NextResponse(`Error fetching URL: ${res.statusText}`, { status: res.status });
    }

    let html = await res.text();

    // Replace relative paths with absolute
    const parsedUrl = new URL(url);
    const origin = parsedUrl.origin;

    // Use regex to carefully replace href, src, srcset attributes pointing to root
    html = html.replace(/href="\/([^"]*)"/g, `href="${origin}/$1"`);
    html = html.replace(/src="\/([^"]*)"/g, `src="${origin}/$1"`);
    html = html.replace(/srcset="\/([^"]*)"/g, `srcset="${origin}/$1"`);
    
    // Catch single quoted attributes as well
    html = html.replace(/href='\/([^']*)'/g, `href='${origin}/$1'`);
    html = html.replace(/src='\/([^']*)'/g, `src='${origin}/$1'`);

    // STRIP SCRIPTS TO PREVENT CLERK REDIRECT LOOP AND IFRAME INTERFERENCE
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      }
    });
  } catch (error) {
    return new NextResponse('Proxy error', { status: 500 });
  }
}
