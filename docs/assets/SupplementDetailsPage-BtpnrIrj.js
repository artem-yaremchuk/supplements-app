import { d as o, a as n, j as e } from './index-D77W8Gnh.js';
import { s as l } from './supplements-BLsW9kRw.js';
import { S as i } from './SupplementDetails-w-1958Ix.js';
const d = () => {
  const { id: r } = o(),
    s = n(),
    t = l.find((a) => a.id === r);
  return t
    ? e.jsx('main', {
        className: 'mx-auto max-w-full p-6',
        children: e.jsx(i, { item: t, onClose: () => s('/supplements') }),
      })
    : e.jsxs('div', {
        className: 'flex flex-col items-center justify-center gap-2 p-6',
        children: [
          e.jsx('p', { className: 'mb-2', children: 'Supplement not found.' }),
          e.jsx('button', {
            onClick: () => s('/supplements'),
            className:
              'border-btn-border text-btn-text bg-btn-bg dark:hover:bg-hover dark:hover:border-hover rounded border px-3 py-2 text-sm whitespace-nowrap transition-colors hover:bg-gray-100',
            children: 'Back to list',
          }),
        ],
      });
};
export { d as default };
