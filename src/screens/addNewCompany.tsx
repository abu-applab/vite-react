import { AddCompanyFormHandler } from "@/components/addNewCompany/addCompanyFormHandler";
import Breadcrumb from "@/components/appBreadcrumb";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";



const AddNewCompany = () => {
    const navigate = useNavigate();

      const breadcrumbs = useMemo(() => {
        const items: { label: string; path?: string; onClick?: () => void }[] = [
          { label: "Home", path: "/portal" },
          {
            label: "add_new_company",
            onClick: () => {
                navigate("/portal");
            }
          },
        ];

        return items;
      }, []);


    return (
        <div className="">
            <Breadcrumb items={breadcrumbs} />
            <AddCompanyFormHandler />
        </div>
    )
}

export default AddNewCompany;