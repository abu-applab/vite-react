"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, User, Building2 } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { cn } from "@/lib/utils"
import pdfLogo from "../../assets/images/pdf-logo.svg"

interface Owner {
  id: string
  name: string
  qid?: string
  crNumber?: string
  type: "Individual" | "Company"
  sharePercentage: string
  email: string
  phone: string
  attachments: string[]
}

interface CollapsibleDetailsProps {
  ownerData: Owner
  isShowBorder: boolean
}


function CollapsibleDetails({ ownerData, isShowBorder }: CollapsibleDetailsProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }


  const isOpen = openItems.has(ownerData.id)

  return (
    <Collapsible key={ownerData.id} open={isOpen} onOpenChange={() => toggleItem(ownerData.id)}>
      <CollapsibleTrigger className="w-full">
        <div className={cn("flex items-center justify-between p-4 transition-colors", {"border-b" : isShowBorder},  { "border-none": isOpen })}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              {ownerData.type === "Individual" ? (
                <User className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Building2 className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <div className="text-left">
              <div className="font-medium text-foreground">{ownerData.name}</div>
              <div className="text-sm text-muted-foreground">
                {ownerData.qid ? `QID: ${ownerData.qid}` : `CR Number: ${ownerData.crNumber}`}
              </div>
            </div>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="px-4 pb-4 ml-11">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-border">
            {/* Owner Type & Share */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Owner Type</div>
                <div className="font-medium text-foreground">{ownerData.type}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Phone Number</div>
                <div className="font-medium text-foreground">{ownerData.phone}</div>
              </div>
            </div>

            {/* Share & Email */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Share (%)</div>
                <div className="font-medium text-foreground">{ownerData.sharePercentage}</div>
              </div>
              {/* Attachments */}
              <div className="mt-6">
                <div className="text-sm text-muted-foreground mb-3">Attachments</div>
                <div className="flex flex-wrap gap-2">
                  {ownerData.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-zinc-50 text-foreground rounded-md text-sm shadow"
                    >
                      <img src={pdfLogo} alt="pdf logo" className="w-5 h-5"/>
                      {attachment}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Email</div>
                <div className="font-medium text-foreground">{ownerData.email}</div>
              </div>
            </div>
          </div>

        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default CollapsibleDetails
