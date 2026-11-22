import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = ({site: origin}) => {
  // Allow crawling so crawlers can read the demo page's noindex directive.
  const sitemap = !site.isDemo && origin ? 'Sitemap: ' + new URL('/sitemap.xml', origin).href + '\n' : '';
  return new Response('User-agent: *\nAllow: /\n' + sitemap, {headers: {'Content-Type': 'text/plain; charset=utf-8'}});
};
