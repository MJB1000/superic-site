import { Link } from "react-router-dom";

interface CategoryBadgeProps {
  title: string;
  slug: string;
  color?: string;
}

export default function CategoryBadge({ title, slug, color = "#10B981" }: CategoryBadgeProps) {
  return (
    <Link
      to={`/category/${slug}`}
      className="inline-block rounded font-mono text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 transition-opacity hover:opacity-80"
      style={{
        backgroundColor: `${color}1a`,
        color: color,
      }}
    >
      {title}
    </Link>
  );
}
