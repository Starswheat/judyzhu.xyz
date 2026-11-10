type DetailItem = {
  label: string;
  detail: string;
  date?: string;
};

export default function DetailList({ items, labelledBy }: { items: readonly DetailItem[]; labelledBy: string }) {
  const hasDates = items.some(item => item.date);
  return <ul className={`rows ${hasDates ? 'experience-list' : 'detail-list'}`} aria-labelledby={labelledBy}>
    {items.map(item => <li key={item.label} className={hasDates ? 'exp-row' : undefined}>
      <span className={hasDates ? 'exp-co' : 'detail-label'}>{item.label}</span>
      <span className={hasDates ? 'exp-role' : 'detail-value'}>{item.detail}</span>
      {item.date && <span className="exp-year">{item.date}</span>}
    </li>)}
  </ul>;
}
