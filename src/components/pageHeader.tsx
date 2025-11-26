import { useApp } from "@/context/AppContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"


interface Header {
    title: string;
    homeLink: string;
    contentLinks: string[];
}

interface pageHeaderProps {
    header: Header
    selectedForm?: string
    customTitle?: string
}

const PageHeader = ({ header, selectedForm, customTitle = '' }: pageHeaderProps) => {
    const { t } = useTranslation();
    const { selectedCompany, isCreateNewForm, selectedInvestment } = useApp();
    let subTitle = selectedForm ? (`create_${selectedForm}`) :  header.contentLinks[1];
    subTitle = customTitle ? customTitle : subTitle;

    return (
        <div className="hidden md:block">
            <h1 className="text-2xl mb-1">{t(header.title)}</h1>
            <div className="mb-6 text-base text-muted-foreground">
                <Link to="/portal">{header.homeLink === 'companyName' ? (selectedCompany?.englishName ?? 'Home') : 'Home'}</Link>

                {!selectedInvestment?.application ?
                    <>
                        <span className="mx-2">›</span>
                        <span className="text-maroon-100">{isCreateNewForm ? t(subTitle) : t(header.contentLinks[0])}</span>
                    </>
                    :
                    <>
                        <span className="mx-2">›</span>
                        <Link to="/portal">{isCreateNewForm ? t(header.contentLinks[1]) : t(header.contentLinks[0])}</Link>
                        <span className="mx-2">›</span>
                        <span className="text-maroon-100">{t(selectedInvestment?.application)}</span>
                    </>
                }
            </div>
        </div>
    )
}

export default PageHeader