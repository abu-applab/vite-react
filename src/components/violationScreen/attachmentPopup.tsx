import { Download, Eye, X } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useTranslation } from "react-i18next";
import pdfLogo from "../../assets/images/pdf-logo.svg"

const customData = [
  {
    fileName: "A Valid Commercial License.jpg",
    fileUrl: "https://ezccloud.sharepoint.com/sites/ENTRA_INSGRP_ManateqPortalSB/_layouts/15/download.aspx?UniqueId=b1dc828d-9da0-4897-9e77-16854e3c695b&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI5YmYyYzA4ZS1jY2Q3LTRhNmYtOGQ2MS1kZDYyMGJlMTUzMTUiLCJhcHBfZGlzcGxheW5hbWUiOiJNVFEtU2hhcmVwb2ludC1zdGciLCJhcHBpZCI6IjA3MTAzNTA2LWZiZjgtNGIwMi04MTM1LTMwMjA1MGNkY2YzZSIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9lemNjbG91ZC5zaGFyZXBvaW50LmNvbUA2OGEzMjQ4MS1mMDRmLTRiZTctODBlMi0yY2VlN2MxMzJhNDkiLCJleHAiOiIxNzYzOTA1NzU2In0.CkAKDGVudHJhX2NsYWltcxIwQ0p1RGpNa0dFQUFhRm5JeFlsbGFXSGx1U1VWcGRITTJhMnhpZWtsS1FVRXFBQT09CjIKCmFjdG9yYXBwaWQSJDAwMDAwMDAzLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMAoKCgRzbmlkEgI2NBILCPD5wuuXptU-EAUaDDQwLjEyNi41My4yNCosUmtlR3Zuck5wOEtIVU5WekllaTBEdVpidmtIV1VySHFvZngxVE9xSkdCTT0wmgE4AUIQodwu_HpQAOCFtARrl1qen0oQaGFzaGVkcHJvb2Z0b2tlbmokMDBhYjYzMTktYzBhYS0xN2U4LWQzMTMtNTkzZDM0NTI1MTI1cikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDRjMDMyMjgwYUBsaXZlLmNvbXoBMoIBEgmBJKNoT_DnSxGA4izufBMqSZIBB1VuaWZpZWSaAQZQb3J0YWyiARRzcGFkbWludXBAbWFuYXRlcS5xYaoBEDEwMDMyMDA0QzAzMjI4MEGyAUJhbGxzaXRlcy5mdWxsY29udHJvbCBhbGxzaXRlcy5yZWFkIGFsbHNpdGVzLndyaXRlIGFsbHByb2ZpbGVzLnJlYWTIAQE.2Oi1-rRrD4lj3OeBbYxQGuWr1TAsxZaK5CIPTdqwbio&ApiVersion=2.0",
    createdOn: "2025-11-23T10:28:46Z",
    modifiedOn: "2025-11-23T10:28:46Z",
    modifiedBy: "Unified Portal"
  },
  {
    fileName: "Owners IDs.jpg",
    fileUrl: "https://ezccloud.sharepoint.com/sites/ENTRA_INSGRP_ManateqPortalSB/_layouts/15/download.aspx?UniqueId=263629a6-7135-43a2-8d98-fe5f9ec91751&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI5YmYyYzA4ZS1jY2Q3LTRhNmYtOGQ2MS1kZDYyMGJlMTUzMTUiLCJhcHBfZGlzcGxheW5hbWUiOiJNVFEtU2hhcmVwb2ludC1zdGciLCJhcHBpZCI6IjA3MTAzNTA2LWZiZjgtNGIwMi04MTM1LTMwMjA1MGNkY2YzZSIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9lemNjbG91ZC5zaGFyZXBvaW50LmNvbUA2OGEzMjQ4MS1mMDRmLTRiZTctODBlMi0yY2VlN2MxMzJhNDkiLCJleHAiOiIxNzYzOTA1NzU3In0.CkAKDGVudHJhX2NsYWltcxIwQ0p1RGpNa0dFQUFhRm5JeFlsbGFXSGx1U1VWcGRITTJhMnhpZWtsS1FVRXFBQT09CjIKCmFjdG9yYXBwaWQSJDAwMDAwMDAzLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMAoKCgRzbmlkEgI2NBILCLbw7O-XptU-EAUaDDQwLjEyNi41My4yNCosbWRrbVUvbmxmeDk5MHNoMXA5dG5OOUdWUk9ISmFEajNFRUtHRjdrOUUrRT0wmgE4AUIQodwu_JawAOCFtAqtGtEpa0oQaGFzaGVkcHJvb2Z0b2tlbmokMDBhYjYzMTktYzBhYS0xN2U4LWQzMTMtNTkzZDM0NTI1MTI1cikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDRjMDMyMjgwYUBsaXZlLmNvbXoBMoIBEgmBJKNoT_DnSxGA4izufBMqSZIBB1VuaWZpZWSaAQZQb3J0YWyiARRzcGFkbWludXBAbWFuYXRlcS5xYaoBEDEwMDMyMDA0QzAzMjI4MEGyAUJhbGxzaXRlcy5mdWxsY29udHJvbCBhbGxzaXRlcy5yZWFkIGFsbHNpdGVzLndyaXRlIGFsbHByb2ZpbGVzLnJlYWTIAQE.2aE93mv04wE2XcG7YkLeeGU8ETY1DYSulEphoVwwUb4&ApiVersion=2.0",
    createdOn: "2025-11-23T10:28:43Z",
    modifiedOn: "2025-11-23T10:28:43Z",
    modifiedBy: "Unified Portal"
  },
  {
    fileName: "Photos of Materials & Equipment.pdf",
    fileUrl: "https://ezccloud.sharepoint.com/sites/ENTRA_INSGRP_ManateqPortalSB/_layouts/15/download.aspx?UniqueId=e2943095-9a2a-43cb-ac0d-fd5a683c1f0a&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI5YmYyYzA4ZS1jY2Q3LTRhNmYtOGQ2MS1kZDYyMGJlMTUzMTUiLCJhcHBfZGlzcGxheW5hbWUiOiJNVFEtU2hhcmVwb2ludC1zdGciLCJhcHBpZCI6IjA3MTAzNTA2LWZiZjgtNGIwMi04MTM1LTMwMjA1MGNkY2YzZSIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9lemNjbG91ZC5zaGFyZXBvaW50LmNvbUA2OGEzMjQ4MS1mMDRmLTRiZTctODBlMi0yY2VlN2MxMzJhNDkiLCJleHAiOiIxNzYzOTA1NzU3In0.CkAKDGVudHJhX2NsYWltcxIwQ0p1RGpNa0dFQUFhRm5JeFlsbGFXSGx1U1VWcGRITTJhMnhpZWtsS1FVRXFBQT09CjIKCmFjdG9yYXBwaWQSJDAwMDAwMDAzLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMAoKCgRzbmlkEgI2NBILCNSegvSXptU-EAUaDDQwLjEyNi41My4yNCosSGFBcnNBRWpneGRZbkVYYmhuNUtNa001VXlPS1ZKM1IxZHRLeXhqdmxBVT0wmgE4AUIQodwu_LLwAOCFtAG5m_5Jc0oQaGFzaGVkcHJvb2Z0b2tlbmokMDBhYjYzMTktYzBhYS0xN2U4LWQzMTMtNTkzZDM0NTI1MTI1cikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDRjMDMyMjgwYUBsaXZlLmNvbXoBMoIBEgmBJKNoT_DnSxGA4izufBMqSZIBB1VuaWZpZWSaAQZQb3J0YWyiARRzcGFkbWludXBAbWFuYXRlcS5xYaoBEDEwMDMyMDA0QzAzMjI4MEGyAUJhbGxzaXRlcy5mdWxsY29udHJvbCBhbGxzaXRlcy5yZWFkIGFsbHNpdGVzLndyaXRlIGFsbHByb2ZpbGVzLnJlYWTIAQE.SkU1gJMYq8t2W6ejvwG1an8wkRdSigkSb1KXi3kLm1E&ApiVersion=2.0",
    createdOn: "2025-11-23T10:28:54Z",
    modifiedOn: "2025-11-23T10:28:54Z",
    modifiedBy: "Unified Portal"
  },
  {
    fileName: "The Establishment Card.jpg",
    fileUrl: "https://ezccloud.sharepoint.com/sites/ENTRA_INSGRP_ManateqPortalSB/_layouts/15/download.aspx?UniqueId=3d606913-b0c0-4db2-b864-da4491ecf64a&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI5YmYyYzA4ZS1jY2Q3LTRhNmYtOGQ2MS1kZDYyMGJlMTUzMTUiLCJhcHBfZGlzcGxheW5hbWUiOiJNVFEtU2hhcmVwb2ludC1zdGciLCJhcHBpZCI6IjA3MTAzNTA2LWZiZjgtNGIwMi04MTM1LTMwMjA1MGNkY2YzZSIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9lemNjbG91ZC5zaGFyZXBvaW50LmNvbUA2OGEzMjQ4MS1mMDRmLTRiZTctODBlMi0yY2VlN2MxMzJhNDkiLCJleHAiOiIxNzYzOTA1NzU4In0.CkAKDGVudHJhX2NsYWltcxIwQ0p1RGpNa0dFQUFhRm5JeFlsbGFXSGx1U1VWcGRITTJhMnhpZWtsS1FVRXFBQT09CjIKCmFjdG9yYXBwaWQSJDAwMDAwMDAzLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMAoKCgRzbmlkEgI2NBILCPqBrPiXptU-EAUaDDQwLjEyNi41My4yNCosN0JYUTlvc1czTEJxUE5kNGhYWERzNHFTaTlZdisrSXUwNm5vS1RCWElFST0wmgE4AUIQodwu_M5gAOCFtAPqd-Zs2EoQaGFzaGVkcHJvb2Z0b2tlbmokMDBhYjYzMTktYzBhYS0xN2U4LWQzMTMtNTkzZDM0NTI1MTI1cikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDRjMDMyMjgwYUBsaXZlLmNvbXoBMoIBEgmBJKNoT_DnSxGA4izufBMqSZIBB1VuaWZpZWSaAQZQb3J0YWyiARRzcGFkbWludXBAbWFuYXRlcS5xYaoBEDEwMDMyMDA0QzAzMjI4MEGyAUJhbGxzaXRlcy5mdWxsY29udHJvbCBhbGxzaXRlcy5yZWFkIGFsbHNpdGVzLndyaXRlIGFsbHByb2ZpbGVzLnJlYWTIAQE.U4sBBQmx4Itg20yh3ZJPC2tsYxzQfNWLsBCq1HnkAek&ApiVersion=2.0",
    createdOn: "2025-11-23T10:28:51Z",
    modifiedOn: "2025-11-23T10:28:51Z",
    modifiedBy: "Unified Portal"
  },
  {
    fileName: "Valid Commercial Registration.pdf",
    fileUrl: "https://ezccloud.sharepoint.com/sites/ENTRA_INSGRP_ManateqPortalSB/_layouts/15/download.aspx?UniqueId=7de03074-baf5-4f6a-9a90-1e93ba1256dc&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI5YmYyYzA4ZS1jY2Q3LTRhNmYtOGQ2MS1kZDYyMGJlMTUzMTUiLCJhcHBfZGlzcGxheW5hbWUiOiJNVFEtU2hhcmVwb2ludC1zdGciLCJhcHBpZCI6IjA3MTAzNTA2LWZiZjgtNGIwMi04MTM1LTMwMjA1MGNkY2YzZSIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9lemNjbG91ZC5zaGFyZXBvaW50LmNvbUA2OGEzMjQ4MS1mMDRmLTRiZTctODBlMi0yY2VlN2MxMzJhNDkiLCJleHAiOiIxNzYzOTA1NzU4In0.CkAKDGVudHJhX2NsYWltcxIwQ0p1RGpNa0dFQUFhRm5JeFlsbGFXSGx1U1VWcGRITTJhMnhpZWtsS1FVRXFBQT09CjIKCmFjdG9yYXBwaWQSJDAwMDAwMDAzLTAwMDAtMDAwMC1jMDAwLTAwMDAwMDAwMDAwMAoKCgRzbmlkEgI2NBILCOTG1PyXptU-EAUaDDQwLjEyNi41My4yNCosNjd3UnJabXdxb1F0YWd5ZXl2T3FhbG5LREw3Sy9wTkhZWjVRVGVBbU9JRT0wmgE4AUIQodwu_OqgAOCFtA1XkboLS0oQaGFzaGVkcHJvb2Z0b2tlbmokMDBhYjYzMTktYzBhYS0xN2U4LWQzMTMtNTkzZDM0NTI1MTI1cikwaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDRjMDMyMjgwYUBsaXZlLmNvbXoBMoIBEgmBJKNoT_DnSxGA4izufBMqSZIBB1VuaWZpZWSaAQZQb3J0YWyiARRzcGFkbWludXBAbWFuYXRlcS5xYaoBEDEwMDMyMDA0QzAzMjI4MEGyAUJhbGxzaXRlcy5mdWxsY29udHJvbCBhbGxzaXRlcy5yZWFkIGFsbHNpdGVzLndyaXRlIGFsbHByb2ZpbGVzLnJlYWTIAQE.kLdLxB_nVwuMn-gsxooJpaCNeWQ09dmsGKv0Ly_9CPI&ApiVersion=2.0",
    createdOn: "2025-11-23T10:28:38Z",
    modifiedOn: "2025-11-23T10:28:38Z",
    modifiedBy: "Unified Portal"
  }
]

interface Document {
  fileName: string,
  fileUrl: string,
}

interface AttachmentPopupProps {
  documents: Document[]
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
}

export const AttachmentPopup = ({ documents = customData, open, onOpenChange, title = "Violation Evidence" }: AttachmentPopupProps) => {
  const { t } = useTranslation();

  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-md max-h-[80vh] overflow-y-auto p-0 gap-0" showCloseButton={false}>
        <DialogHeader className="border-b px-5 py-3 flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium text-foreground text-left">
            {t(title)}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-black hover:bg-transparent cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="flex flex-col divide-y">
          {documents.map((document: any) => (
            <Card
              key={document.fileName}
              className="p-4 flex flex-row items-center justify-between"
            >
              <div className="flex flex-row gap-3 items-center">
                <div className="h-12 w-12 p-3">
                  <img src={pdfLogo} alt="pdf logo" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {document?.fileName}
                  </h4>
                  <p className="text-sm text-gray-600">Uploaded Document</p>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <Button
                  className="border-2 h-8 w-8 p-2 hover:bg-transparent cursor-pointer"
                  type="button"
                  variant="ghost"
                  onClick={() => window.open(document?.fileUrl)}
                >
                  <Eye className="h-4 w-4 text-[#82764f]" />
                </Button>

                <Button
                  asChild
                  className="border-2 h-8 w-8 p-2 hover:bg-transparent cursor-pointer"
                >
                  <a href={document?.fileUrl}>
                    <Download className="h-4 w-4 text-[#82764f]" />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </DialogContent>
    </Dialog>
  );
};


