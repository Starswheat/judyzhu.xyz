type DetailItem = {
  label: string;
  detail: string;
  emblem?: { image: string; width: number; height: number; viewBox: string; style: string };
};

export default function DetailList({ items, labelledBy }: { items: readonly DetailItem[]; labelledBy: string }) {
  return <ul className="rows detail-list" aria-labelledby={labelledBy}>
    {items.map(item => <li key={item.label} className={item.emblem ? 'has-emblem' : undefined}>
      <span className="detail-label">
        {item.emblem && <svg
          className={`organization-emblem organization-emblem--${item.emblem.style}`}
          viewBox={item.emblem.viewBox}
          aria-hidden="true"
          focusable="false"
        >
          <image href={item.emblem.image} width={item.emblem.width} height={item.emblem.height} />
        </svg>}
        <span>{item.label}</span>
      </span>
      <span className="detail-value">{item.detail}</span>
    </li>)}
  </ul>;
}
