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
    tag?: string,
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
    cardClick?: boolean
}

function getStatusColor(status: string) {
    const statusLower = status.toLowerCase().trim();

    switch (statusLower) {
        case 'draft':
            return "bg-zinc-200 text-zinc-600 hover:bg-zinc-200"
        case "active":
        case "approved":
        case "pre-approved":
        case "approved - موافقة":
        case "closed+":
        case "closed-":
        case 'submitted':    
            return "bg-green-100 text-green-600 hover:bg-green-100"
        case "rejected":
        case "cancelled":
        case "terminated":
        case "inactive":
        case "overdue-30":
        case "overdue-60":
        case "overdue-60+":
        case "default notice 1":
        case "default notice 2":
        case "sent to legal":
        case "escalated to carr":
        case "escalated to ncr":
        case "rejected - مرفوض":
        case "cancelled - ملغى":
            return "bg-red-100 text-red-600 hover:bg-red-100"
        case "open+60":
        case "open+30":
        case 'in progress - قيد الإجراء':
        case 'pending work -في إنتظار السحب':
        case 'pending request fees - بإنتظار دفع رسوم الخدمة':
        case 'pending investor update - في انتظار تحديث المستثمر':
        case 'review in progress':
        case 'pending submit transfer':
        case 'on hold':
            return "bg-yellow-100 text-yellow-600 hover:bg-yellow-100"
        default:
            if (statusLower.includes('draft')) {
                return "bg-zinc-200 text-zinc-600 hover:bg-zinc-200"
            }
            if (statusLower.includes('pending')) {
                return "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
            }
            if (statusLower.includes('active') || statusLower.includes('approved')) {
                return "bg-green-100 text-green-600 hover:bg-green-100"
            }
            if (statusLower.includes('rejected') || statusLower.includes('cancelled') || statusLower.includes('terminated') ||
                statusLower.includes('inactive')) {
                return "bg-red-100 text-red-600 hover:bg-red-100"
            }
            return "bg-yellow-100 text-yellow-600 hover:bg-yellow-100"
    }
}

function getPointerColor(status: string) {
    const statusLower = status.toLowerCase().trim();

    switch (statusLower) {
        case 'draft':
            return "bg-zinc-600"
        case "active":
        case "approved":
        case "pre-approved":
        case "approved - موافقة":
        case "closed+":
        case "closed-":
        case 'submitted':    
            return "bg-green-600"
        case "rejected":
        case "cancelled":
        case "terminated":
        case "inactive":
        case "overdue-30":
        case "overdue-60":
        case "overdue-60+":
        case "default notice 1":
        case "default notice 2":
        case "sent to legal":
        case "escalated to carr":
        case "escalated to ncr":
        case "rejected - مرفوض":
        case "cancelled - ملغى":
            return "bg-red-600"
        case "open+60":
        case "open+30":
        case 'in progress - قيد الإجراء':
        case 'pending work -في إنتظار السحب':
        case 'pending request fees - بإنتظار دفع رسوم الخدمة':
        case 'pending investor update - في انتظار تحديث المستثمر':
        case 'review in progress':
        case 'pending submit transfer':
        case 'on hold':
            return "bg-yellow-600"
        default:
            // Fallback safety check with includes()
            if (statusLower.includes('draft')) {
                return "bg-zinc-600"
            }
            if (statusLower.includes('pending')) {
                return "bg-yellow-600"
            }
            if (statusLower.includes('active') || statusLower.includes('approved')) {
                return "bg-green-600"
            }
            if (statusLower.includes('rejected') || statusLower.includes('cancelled') || statusLower.includes('terminated') ||
                statusLower.includes('inactive')) {
                return "bg-red-600"
            }
            if (statusLower.includes('open') || statusLower.includes('progress') || statusLower.includes('قيد') ||
                statusLower.includes('إنتظار') || statusLower.includes('انتظار')) {
                return "bg-yellow-600"
            }
            return "bg-yellow-600"
    }
}

const convertDate = (value: string) => {
    // value = "26/11/2025 03:53 PM"
    const [datePart, timePart, modifier] = value.split(" ");

    const [day, month, year] = datePart.split("/").map(Number);

    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;

    const jsDate = new Date(year, month - 1, day, hours, minutes);

    return jsDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
};

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
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()} >
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
                        onClick={(e) => {
                            e.stopPropagation();
                            option.onClick?.(data)
                        }}
                    >
                        {Icon && <Icon className="h-4 w-4 text-maroon-100" />}
                        {t(option.label)}
                    </DropdownMenuItem>
                );
            })}
        </DropdownMenuContent>
    </DropdownMenu>
);



const ListOFCards = ({ cardsConfig, cardsData, isProducts = false, cardClick = false }: ListOfCardsProps) => {
    const { t } = useTranslation();

    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4 mt-8", {
            'md:grid-cols-1': isProducts
        })}>
            {cardsData?.map((data) => {
                const statusValue = getValue(data, cardsConfig.status);
                const titleValue = getValue(data, cardsConfig.title);
                let subTitleValue = getValue(data, cardsConfig.subTitle);
                subTitleValue = subTitleValue === 'Logistics' ? 'Logistics Park' : subTitleValue
                const tagValue = getValue(data, cardsConfig.tag);

                return (
                    <Card
                        key={getValue(data, cardsConfig.id)}
                        className={`relative ${(cardsConfig?.menuOptions?.[0]?.onClick && cardClick) ? 'cursor-pointer' : ''}`}
                        onClick={() => {
                            if (cardsConfig?.menuOptions?.[0]?.onClick) {
                                cardsConfig.menuOptions[0].onClick(data);
                            }
                        }}

                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 max-md:px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 border border-[#E4E4E7] rounded-[8px] bg-white flex items-center justify-center">
                                    <cardsConfig.icon className="w-5 h-5 text-black" />
                                </div>

                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-base font-medium text-gray-800 max-md:text-sm">{titleValue}</span>
                                            {tagValue && <span className="rounded-2xl text-zinc-500 border-gray-300 border p-1 w-10 h-6 flex items-center justify-center text-xs">{tagValue}</span>}
                                        </div>

                                        {cardsConfig.status && cardsConfig.showBelow && statusValue && (
                                            <StatusBadge status={statusValue} className="md:hidden" />
                                        )}
                                    </div>

                                    {cardsConfig.subTitle && (
                                        <div className="flex gap-2">
                                            <h3 className="font-medium text-sm text-gray-500 max-md:text-[13px]">{subTitleValue}</h3>

                                            {cardsConfig.status && !cardsConfig.showBelow && statusValue && (
                                                <StatusBadge status={statusValue} className="md:hidden" />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center">
                                {cardsConfig.status && statusValue && (
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

                                    if (field.key === "hsCodeName") {
                                        value = value ? value : 'Loading...'
                                    }

                                    if (field.key === "totalPlots" && !value) {
                                        value = 0;
                                    }

                                    if (
                                        field.key === "submissionDate" ||
                                        field.key === "submittedDate"
                                    ) {
                                        value = convertDate(value);
                                    }

                                    return (
                                        <div
                                            key={i}
                                            className="flex justify-between md:block md:mb-3"
                                        >
                                            <p className="text-gray-500 mb-1 text-sm">{t(field.label)}</p>
                                            <p className="font-medium text-gray-900 text-sm">{(value || value === 0) ? value : "N/A"}</p>
                                        </div>
                                    );
                                })}
                            </div>
                            {(cardsConfig.warning && statusValue !== 'Closed+' && statusValue !== 'Closed-') && (() => {
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
