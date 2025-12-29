// components/Breadcrumb.tsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface BreadcrumbItem {
    label: string;
    path?: string;
    onClick?: () => void;
    isTranslated?: boolean;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    heading: string;
}

export default function Breadcrumb({ items, heading }: BreadcrumbProps) {
    const { t } = useTranslation();
    if (!items.length) return null;

    return (
        <div>
            <h2 className="font-semibold text-2xl">{t(heading)}</h2>
            <nav aria-label="Breadcrumb" className="mb-4">
                <ol className="flex flex-wrap items-center gap-1 text-base text-gray-600">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={index} className="flex items-center gap-1">
                                {!isLast && (item.path || item.onClick) ? (
                                    item.path ? (
                                        <Link
                                            to={item.path}
                                            className="hover:text-primary underline-offset-2 hover:underline text-base text-muted-foreground"
                                        >
                                            {item.isTranslated ? item.label : t(item.label)}
                                        </Link>
                                    ) : (
                                        <span
                                            onClick={item.onClick}
                                            className="hover:text-primary underline-offset-2 hover:underline text-base text-muted-foreground cursor-pointer"
                                        >
                                            {item.isTranslated ? item.label : t(item.label)}
                                        </span>
                                    )
                                ) : (
                                    <span
                                        className={isLast ? "font-medium  text-maroon-100 text-base" : ""}
                                    >
                                        {item.isTranslated ? item.label : t(item.label)}
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
        </div>
    );
}
