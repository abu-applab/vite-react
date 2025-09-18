import { AlertCircle, ArrowDown, ChevronDownIcon, Download, Funnel, Plus, User } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordian";
import { useState } from "react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface ResponseItem {
    id: string;
    author: string;
    date: string;
    title: string;
    body: string;
}

interface FindingCardProps {
    code: string;
    tag: string;
    title: string;
    notifiedDate: string;
    dueDate: string;
    status: "Open" | "Closed" | "In Review" | "Completed";
    timeLeft?: string;
    responses?: ResponseItem[];
    docName?: string;
    docSize?: string;
}

const demoResponses: ResponseItem = {
    id: "r1",
    author: "Ahmed Rafi",
    date: "28/07/2025",
    title: "NOC CTO/Renew Request Assigned: 1013",
    body:
        "Dear, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

const item: FindingCardProps = {
    code: "#QH20257A – 25/07/2025",
    timeLeft: "2–6 days remaining",
    tag: "QHSE",
    title: "Fire exit blocked with buildings",
    notifiedDate: "26/07/2025",
    dueDate: "10/08/2025",
    status: "Open",
    responses: [demoResponses, demoResponses],
}

const completedFindings: Omit<FindingCardProps, "timeLeft"> = {
    code: "#QH20257A – 25/07/2025",
    tag: "QHSE",
    title: "Fire exit blocked with buildings",
    notifiedDate: "26/07/2025",
    dueDate: "10/08/2025",
    status: "Completed",
    docName: "Document 1",
    docSize: "120 KB",
    responses: [demoResponses, demoResponses]
}

const StatusPill = ({ status }: { status: FindingCardProps["status"] }) => {
    const cfg = {
        Open: { color: "bg-red-100 text-red-400", dot: "bg-red-400" },
        Closed: { color: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
        Completed: { color: "bg-green-100 text-green-700", dot: "bg-green-500" },
        "In Review": { color: "bg-amber-100 text-amber-800", dot: "bg-amber-500" },
    }[status];
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
            {status}
        </span>
    );
};

const MetaRow = ({ label, value }: { label: string; value: string }) => (
    <div className="grid w-full max-w-[240px] gap-1">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-medium tracking-tight">{value}</span>
    </div>
);

const FindingCard: React.FC<FindingCardProps> = ({
    code,
    timeLeft,
    tag,
    title,
    notifiedDate,
    dueDate,
    status,
    responses = [],
}) => {
    const [openValue, setOpenValue] = useState("");
    console.log(openValue)
    return (
        <Card className="w-full rounded-2xl border-muted bg-card shadow-sm">
            <CardHeader className="flex items-start justify-between gap-4 border-b border-gray-300">
                <div className="flex flex-wrap items-center gap-2 text-sm font-semibold">
                    <span className="tracking-tight">{code}</span>
                    {timeLeft && <Badge variant="secondary" className="gap-1 px-2 py-1 text-[11px] bg-red-50 text-red-500">
                        <AlertCircle className="h-3.5 w-3.5" /> {timeLeft}
                    </Badge>}
                    <Badge variant="outline" className="text-[11px] font-normal text-muted-foreground">{tag}</Badge>
                </div>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-2 text-sm font-normal">
                                <Download className="h-4 w-4" /> Download Report
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Download this finding as PDF</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </CardHeader>
            <CardContent>
                <div className="mt-3 text-sm">
                    <span className="text-muted-foreground">Finding – </span>
                    <span className="font-medium">{title}</span>
                </div>
                <div className="mt-4 flex flex-wrap items-start justify-start gap-25">
                    <MetaRow label="Notified Date" value={notifiedDate} />
                    <MetaRow label="Due Date" value={dueDate} />
                    <div className="grid gap-1">
                        <span className="text-xs text-muted-foreground">Status</span>
                        <StatusPill status={status} />
                    </div>
                </div>
                <div className="mt-4">
                    <Button variant="outline" className="gap-2 text-sm font-normal">
                        <Plus className="h-4 w-4" /> Add Response
                    </Button>
                </div>
                <div className="mt-2">
                    <Accordion value={openValue}
                        onValueChange={setOpenValue} type="single" collapsible>
                        <AccordionItem value="responses" className="border-none">
                            <AccordionTrigger downIcon={ArrowDown} className="justify-start gap-2 px-0 hover:no-underline">
                                <span className="text-sm text-[#83764F] underline underline-offset-3 decoration-[#83764F]">
                                    {!openValue ? "View Previous Responses" : "Close Previous responses"}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-0">
                                {responses.map((r, idx) => (
                                    <div key={r.id} className={"pb-4  my-6 border-b border-gray-300 " + (idx === responses.length - 1 ? "border-b-0 mb-0 pb-0" : "")} >
                                        <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                                            <span className="items-center justify-center rounded-sm p-2 border "><User className="h-5 w-5" /></span>
                                            <span className="font-medium text-foreground">{r.author}</span>
                                            <span className="text-muted-foreground">-</span>
                                            <span>{r.date}</span>
                                        </div>
                                        <div className="text-sm font-medium">{r.title}</div>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </CardContent>
        </Card >
    );
};

const ClosedFindingsToggle = ({ expanded, setExpanded }: { expanded: string; setExpanded: React.Dispatch<React.SetStateAction<string>> }) => {
    return (
        <div className="relative w-full">
            <Accordion value={expanded} onValueChange={setExpanded} type="single" collapsible className="flex justify-center relative z-10">
                <AccordionItem value="closed-findings" className="w-full">
                    <div className="w-full flex items-center flex-row justify-between gap-2 mb-4">
                        <div className="w-full border-b" />
                        <AccordionTrigger downIcon={ChevronDownIcon} className="bg-white border px-3 py-1 text-sm rounded-md flex items-center gap-1 hover:no-underline whitespace-nowrap">
                            Closed Findings
                        </AccordionTrigger>
                        <div className="w-full border-b" />
                    </div>
                    <AccordionContent className="px-0 space-y-5">
                        {[completedFindings, completedFindings].map((it, i) => (
                            <FindingCard key={i} {...it} />
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

export default function FindingsList() {
    const [hideClosed, setHideClosed] = useState(false)
    const [expanded, setExpanded] = useState("");

    return (
        <div className="mx-auto max-w-8xl space-y-5 ">
            <div className="flex  gap-2 justify-end">
                <Button variant="outline" className="flex items-center gap-2 text-sm font-normal">
                    <Funnel className="h-4 w-4" />
                    Status
                </Button>
                <div className="flex items-center gap-2">
                    <Label
                        htmlFor="hide-closed"
                        className="text-sm font-normal"
                    >
                        Hide Closed Findings
                    </Label>
                    <Switch
                        id="hide-closed"
                        checked={hideClosed}
                        onCheckedChange={setHideClosed}
                        className="data-[state=checked]:bg-red-800"
                    />
                </div>
            </div>
            {[item, item].map((it, i) => (
                <FindingCard key={i} {...it} />
            ))}
            <ClosedFindingsToggle expanded={expanded} setExpanded={setExpanded} />
        </div>
    );
}