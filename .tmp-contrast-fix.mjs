import { readFileSync, writeFileSync } from 'node:fs';

const file = 'src/pages/oferta/system-obslugi-zapytan.astro';
let source = readFileSync(file, 'utf8');
for (const [before, after] of [
  ['class="eyebrow text-white/70"', 'class="eyebrow text-primary-content/90"'],
  ['class="mt-5 max-w-2xl text-lg font-light leading-relaxed text-white/80"', 'class="mt-5 max-w-2xl text-lg font-light leading-relaxed text-primary-content/90"'],
  ['class="btn border-0 bg-white text-primary hover:bg-base-100 rounded-full px-7"', 'class="btn border-0 bg-white text-[#075fce] hover:bg-[#e6f1ff] rounded-full px-7"'],
]) {
  if (!source.includes(before)) throw new Error(`Missing ${before}`);
  source = source.replace(before, after);
}
writeFileSync(file, source);
