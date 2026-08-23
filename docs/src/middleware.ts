import { NextRequest, NextResponse } from 'next/server';
import { getNegotiator, isMarkdownPreferred, rewritePath } from 'fumadocs-core/negotiation';
import { docsContentRoute, docsRoute } from '@/lib/shared';
import { i18n } from '@/lib/i18n';

const COOKIE_NAME = 'FD_LOCALE';
const cookieOptions = {
  path: '/',
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax' as const,
};

const { rewrite: rewriteDocs } = rewritePath(
  `${docsRoute}{/*path}`,
  `${docsContentRoute}{/*path}/content.md`,
);
const { rewrite: rewriteSuffix } = rewritePath(
  `${docsRoute}{/*path}.md`,
  `${docsContentRoute}{/*path}/content.md`,
);

function getCookieLocale(request: NextRequest): (typeof i18n.languages)[number] | undefined {
  const value = request.cookies.get(COOKIE_NAME)?.value;
  if (value && (i18n.languages as string[]).includes(value)) {
    return value as (typeof i18n.languages)[number];
  }
}

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const segments = url.pathname.split('/').filter(Boolean);
  const [first] = segments;
  const languages = i18n.languages as string[];

  let lang = i18n.defaultLanguage;
  let restPath = url.pathname;
  let explicit = false;

  // explicit locale prefix
  if (first && languages.includes(first)) {
    explicit = true;
    lang = first as (typeof i18n.languages)[number];
    restPath = '/' + segments.slice(1).join('/');
  } else {
    // no locale in URL: saved preference first, then Accept-Language
    let locale = i18n.defaultLanguage;
    const cookie = getCookieLocale(request);

    if (cookie) {
      locale = cookie;
    } else if (segments.length > 0) {
      const preferred = getNegotiator(request).languages([...i18n.languages]);
      locale = preferred[0] ?? i18n.defaultLanguage;
    }
    // root path without a saved preference lands on the default language

    const targetPath = url.pathname === '/' ? docsRoute : url.pathname;

    return NextResponse.redirect(new URL(`/${locale}${targetPath}${url.search}`, url));
  }

  const suffix = rewriteSuffix(restPath);
  let res: NextResponse;

  if (suffix) {
    res = NextResponse.rewrite(new URL(`/${lang}${suffix}`, url));
  } else {
    const docs = isMarkdownPreferred(request) ? rewriteDocs(restPath) : false;

    if (docs) {
      res = NextResponse.rewrite(new URL(`/${lang}${docs}`, url), {
        // this URL has two representations, selected by `Accept`
        headers: { Vary: 'Accept' },
      });
    } else {
      res = NextResponse.next();
    }
  }

  if (explicit) {
    res.cookies.set(COOKIE_NAME, lang, cookieOptions);
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|robots|sitemap|llms|og|.*\\.(?:png|jpg|jpeg|svg|ico|webp|gif|css|js|json|xml|woff2?|ttf|eot|txt|webmanifest|map)$).*)',
  ],
};
