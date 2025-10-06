import { Link } from "react-router-dom";

type Crumb = {
  label: string;
  to?: string;
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs sm:text-sm text-muted-foreground">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="flex items-center">
            {item.to ? (
              <Link to={item.to} className="story-link">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium">{item.label}</span>
            )}
            {idx < items.length - 1 && <span className="mx-2 text-muted-foreground/70">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}


