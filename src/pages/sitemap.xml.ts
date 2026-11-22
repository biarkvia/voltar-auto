import type { APIRoute } from 'astro';
import { site } from '../data/site';

export const GET: APIRoute = ({site: origin}) => {
  // A demo sitemap intentionally has no URLs.
  const entry = origin && !site.isDemo ? '<url><loc>' + new URL('/', origin).origin + '/</loc></url>' : '';
  return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entry + '</urlset>', {
    headers: {'Content-Type': 'application/xml; charset=utf-8'}
  });
};
