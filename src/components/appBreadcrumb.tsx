// components/Breadcrumb.tsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const { t } = useTranslation();
    if (!items.length) return null;

    return (
        <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-base text-gray-600">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center gap-1">
                            {item.path && !isLast ? (
                                <Link
                                    to={item.path}
                                    className="hover:text-primary underline-offset-2 hover:underline text-base text-muted-foreground"
                                >
                                    {t(item.label)}
                                </Link>
                            ) : (
                                <span
                                    className={isLast ? "font-medium  text-maroon-100 text-base" : ""}
                                >
                                    {t(item.label)}
                                </span>
                            )}

                            {!isLast && (
                                <span className="text-gray-400">{">"}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
