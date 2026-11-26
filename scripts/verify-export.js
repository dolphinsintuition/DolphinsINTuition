#!/usr/bin/env node
/**
 * verify-export.js — assert that `next build` actually produced the directory
 * Cloudflare Pages publishes, and that it carries every page we expect.
 *
 * Why this exists. `next build` exits 0 whether or not it exports. On
 * 2026-08-03 a commit rewrote next.config.js to add the MDX settings and
 * dropped `output: 'export'` along with it. Every build after that compiled
 * cleanly and emitted .next/ and no out/ — so Cloudflare failed at its own
 * publish step ('Error: Output directory "out" not found') on main and on
 * every PR preview alike, for five weeks, while the repo looked healthy and
 * the live site quietly served a stale build.
 *
 * A green build is not evidence of a publishable site. This is.
 *
 * Run it after `npm run build`. Exit 0 = publishable, 1 = do not deploy.
 */
const fs = require('fs');
const path = require('path');

// Must match the Cloudflare Pages project's build_config.destination_dir,
// which lives in Cloudflare and not in this repo. Currently `out`.
const OUT = process.env.EXPORT_DIR || 'out';
const POSTS_DIR = path.join('src', 'blog', 'posts');

const problems = [];
const checked = [];

function has(...candidates) {
  return candidates.find((p) => fs.existsSync(p));
}

function expect(label, ...candidates) {
  const found = has(...candidates);
  if (found) checked.push('  ok      ' + found);
  else problems.push(label + ' (looked for: ' + candidates.join(', ') + ')');
}

if (!fs.existsSync(OUT) || !fs.statSync(OUT).isDirectory()) {
  console.error('verify-export: FAIL');
  console.error('');
  console.error('  ' + OUT + '/ does not exist after a build that exited 0.');
  console.error('');
  console.error('  That is what Cloudflare Pages publishes, so this build cannot');
  console.error('  deploy. The usual cause is a next.config.js that no longer sets');
  console.error("  output: 'export' — check that it still has all three of:");
  console.error("      output: 'export',");
  console.error('      images: { unoptimized: true },');
  console.error('      trailingSlash: true,');
  console.error('  and that a later edit did not replace the config object rather');
  console.error('  than extend it.');
  process.exit(1);
}

expect(OUT + '/index.html is missing — the homepage did not export', path.join(OUT, 'index.html'));

if (fs.existsSync(POSTS_DIR)) {
  expect(
    OUT + '/blog/ did not export',
    path.join(OUT, 'blog', 'index.html'),
    path.join(OUT, 'blog.html')
  );

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .filter((f) => {
      // Skip drafts: src/lib/blog.ts filters them out, so they are not
      // expected in the export and their absence is not a failure.
      const src = fs.readFileSync(path.join(POSTS_DIR, f), 'utf-8');
      const fm = src.startsWith('---') ? src.slice(3, src.indexOf('\n---', 3)) : '';
      return !/^\s*draft\s*:\s*true\s*$/m.test(fm);
    })
    .map((f) => f.replace(/\.mdx$/, ''));

  if (posts.length === 0) problems.push('no non-draft posts found in ' + POSTS_DIR);

  for (const slug of posts) {
    expect(
      'post "' + slug + '" did not export',
      path.join(OUT, 'blog', slug, 'index.html'),
      path.join(OUT, 'blog', slug + '.html')
    );
  }
}

if (problems.length) {
  console.error('verify-export: FAIL');
  console.error('');
  for (const p of problems) console.error('  MISSING ' + p);
  console.error('');
  console.error('  ' + OUT + '/ exists but is incomplete, so deploying it would');
  console.error('  publish a site with missing pages.');
  process.exit(1);
}

console.log('verify-export: PASS');
for (const line of checked) console.log(line);
