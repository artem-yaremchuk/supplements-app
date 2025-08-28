import { j as e, L as s } from './index-D77W8Gnh.js';
const t = '/supplements-app/assets/hero-DTekuB46.jpg',
  l = () =>
    e.jsx('main', {
      children: e.jsxs('section', {
        className:
          'relative flex items-center justify-center bg-cover bg-center px-6 py-65 text-center text-white',
        style: { backgroundImage: `url(${t})` },
        children: [
          e.jsx('div', { className: 'absolute inset-0 bg-black/50' }),
          ' ',
          e.jsxs('div', {
            className: 'relative z-10 max-w-2xl space-y-6',
            children: [
              e.jsx('h1', {
                className: 'text-4xl font-bold sm:text-5xl',
                children: 'Discover evidence-based supplements',
              }),
              e.jsx('p', {
                className: 'text-lg text-slate-200',
                children: 'Search, compare and explore science-backed ingredients',
              }),
              e.jsx(s, {
                to: '/supplements',
                className:
                  'bg-link-bg inline-block rounded-md px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600',
                children: 'Browse Supplements',
              }),
            ],
          }),
        ],
      }),
    });
export { l as default };
