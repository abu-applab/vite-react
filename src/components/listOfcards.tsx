import { CircleAlert, MoreVertical } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn, parseCustomDate } from "@/lib/utils"
import type { ElementType } from "react"
import { useTranslation } from "react-i18next"

interface CardConfig {
    icon: ElementType,
    id: string,
    title: string,
    subTitle?: string,
    label?: string,
    status?: string,
    showBelow?: boolean,
    fields: {
        label: string
        key: string
    }[],
    menuOptions?: {
        label: string
        icon?: ElementType
        onClick?: (data: any) => void
    }[]
    warning?: string
}

interface ListOfCardsProps {
    cardsConfig: CardConfig
    cardsData: any[]
    showAlerts?: boolean
    isProducts?: boolean
}

function getStatusColor(status: string) {
    switch (status.toLowerCase().trim()) {
        case 'draft':
            return "bg-zinc-200 text-zinc-600 hover:bg-zinc-200"
        case 'review in progress':
        case 'pending submit transfer':
        case 'on hold':
        case 'submitted':
        case 'in progress - قيد الإجراء':
        case 'pending work -في إنتظار السحب':
        case 'pending request fees - بإنتظار دفع رسوم الخدمة':
            return "bg-orange-100 text-orange-600 hover:bg-orange-200"
        case "active":
        case "approved":
        case "approved - موافقة":
            return "bg-green-100 text-green-600 hover:bg-green-100"
        case "rejected":
        case "cancelled":
        case "terminated":
        case "inactive":
        case "rejected - مرفوض":
            return "bg-red-100 text-red-600 hover:bg-red-100"
        default:
            return "bg-orange-100 text-orange-600 hover:bg-orange-100"
    }
}

function getPointerColor(status: string) {
    switch (status.toLowerCase()) {
        case 'draft': //Draft
            return "bg-zinc-600"
        case 'review in progress':
        case 'pending submit transfer':
        case 'on hold':
        case 'submitted':
        case 'in progress - قيد الإجراء':
        case 'pending work -في إنتظار السحب':
        case 'pending request fees - بإنتظار دفع رسوم الخدمة':
            return "bg-orange-600"
        case "active":
        case "approved":
        case "approved - موافقة":
            return "bg-green-600"
        case "rejected":
        case "cancelled":
        case "terminated":
        case "inactive":
        case "rejected - مرفوض":
            return "bg-red-600"
        default:
            return "bg-orange-600"
    }
}

const getValue = (obj: any, key?: string) => {
    if (!key) return "";
    return obj?.[key] ?? "";
};

const StatusBadge = ({ status, className = "" }: { status: string, className?: string }) => (
    <div className={cn(
        getStatusColor(status),
        "border-0 text-xs flex items-center justify-center rounded-2xl px-2 py-1 h-fit",
        className
    )}>
        <span className={`size-1.5 ${getPointerColor(status)} rounded-full mr-1`} />
        <span className="text-xs font-medium">{status}</span>
    </div>
);

const ActionsMenu = ({ options, data, t }: { options: any[], data: any, t: any }) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
            {options.map((option, idx) => {
                const Icon = option.icon;
                return (
                    <DropdownMenuItem
                        key={idx}
                        className="flex items-center gap-2"
                        onClick={() => option.onClick?.(data)}
                    >
                        {Icon && <Icon className="h-4 w-4 text-maroon-100" />}
                        {t(option.label)}
                    </DropdownMenuItem>
                );
            })}
        </DropdownMenuContent>
    </DropdownMenu>
);



const ListOFCards = ({ cardsConfig, cardsData, isProducts = false }: ListOfCardsProps) => {
    const { t } = useTranslation();

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 mt-8", {
            'md:grid-cols-1': isProducts
        })}>
            {cardsData?.map((data) => {
                const statusValue = getValue(data, cardsConfig.status);
                const titleValue = getValue(data, cardsConfig.title);
                const subTitleValue = getValue(data, cardsConfig.subTitle);

                return (
                    <Card key={getValue(data, cardsConfig.id)} className="relative">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 max-md:px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 border border-[#E4E4E7] rounded-[8px] bg-white flex items-center justify-center">
                                    <cardsConfig.icon className="w-5 h-5 text-black" />
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center">
                                            <span className="text-base font-medium text-gray-800 max-md:text-sm">{titleValue}</span>
                                        </div>

                                        {cardsConfig.status && cardsConfig.showBelow && (
                                            <StatusBadge status={statusValue} className="md:hidden" />
                                        )}
                                    </div>

                                    {cardsConfig.subTitle && (
                                        <div className="flex gap-2">
                                            <h3 className="font-medium text-sm text-gray-500 max-md:text-[13px]">{subTitleValue}</h3>

                                            {cardsConfig.status && !cardsConfig.showBelow && (
                                                <StatusBadge status={statusValue} className="md:hidden" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center">
                                {cardsConfig.status && (
                                    <StatusBadge status={statusValue} className="hidden md:flex" />
                                )}

                                {!!cardsConfig.menuOptions?.length && (
                                    <ActionsMenu options={cardsConfig.menuOptions} data={data} t={t} />
                                )}
                            </div>
                        </CardHeader>

                        <CardContent className="pt-0 max-md:px-4">
                            <div className="-mx-6 border-t border-gray-200"></div>

                            <div className={cn(
                                "pt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm",
                                { "md:grid-cols-3": isProducts }
                            )}>
                                {cardsConfig.fields.map((field, i) => {
                                    let value = getValue(data, field.key);

                                    if (field.key === "mainConatact") {
                                        value = data?.mainConatact?.name;
                                    }

                                    if (field.key === "totalPlots" && !value) {
                                        value = 0;
                                    }

                                    if (
                                        field.key === "submissionDate" ||
                                        field.key === "submittedDate"
                                    ) {
                                        value = new Date(value).toLocaleDateString("en-US");
                                    }

                                    return (
                                        <div
                                            key={i}
                                            className="flex justify-between md:block md:mb-3"
                                        >
                                            <p className="text-gray-500 mb-1 text-sm">{t(field.label)}</p>
                                            <p className="font-medium text-gray-900 text-sm">{value ?? "N/A"}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            {cardsConfig.warning && (() => {
                                let value = getValue(data, cardsConfig.warning);
                                if (!value) return null;
                                value = parseCustomDate(value);

                                const today = new Date();
                                const targetDate = new Date(value);
                                const diffTime = targetDate.getTime() - today.getTime();
                                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                                let text = "";
                                let textColor = "text-green-600";
                                let textBackground = 'bg-green-50';

                                if (diffDays > 30) {
                                    text = `${diffDays} days remaining`;
                                } else if (diffDays < 30 && diffDays >= 0) {
                                    text = `${diffDays} days remaining`;
                                    textColor = "text-yellow-600";
                                    textBackground = 'bg-yellow-50';
                                } else {
                                    text = `${Math.abs(diffDays)} days overdue`;
                                    textColor = "text-red-600";
                                    textBackground = 'bg-red-50';
                                }

                                return (
                                    <div className={`mt-3 text-sm font-medium w-full h-8 flex items-center justify-center gap-2 rounded-md bg-green ${textColor} ${textBackground}`}>
                                        <CircleAlert className="w-4 h-4" />
                                        <span className={`text-sm font-normal`}>{text}</span>
                                    </div>
                                );
                            })()}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
};


export default ListOFCards;
