import { useApp } from "@/context/AppContext";
import { Link } from "react-router-dom"


interface Header {
    title: string;
    homeLink: string;
    contentLinks: string[];
}

interface pageHeaderProps {
    header: Header
}

const PageHeader = ({ header }: pageHeaderProps) => {
    const { selectedCompany, isCreateNewForm, selectedInvestment } = useApp();

    return (
        <div className="hidden md:block">
            <h1 className="text-2xl mb-1">{header.title}</h1>
            <div className="mb-6 text-base text-muted-foreground">
                <Link to="/portal">{header.homeLink === 'companyName' ? selectedCompany?.englishName : 'Home'}</Link>

                {!selectedInvestment?.application ?
                    <>
                        <span className="mx-2">›</span>
                        <span className="text-maroon-100">{isCreateNewForm ? header.contentLinks[1] : header.contentLinks[0]}</span>
                    </>
                    :
                    <>
                        <span className="mx-2">›</span>
                        <Link to="/portal">{isCreateNewForm ? header.contentLinks[1] : header.contentLinks[0]}</Link>
                        <span className="mx-2">›</span>
                        <span className="text-maroon-100">{selectedInvestment?.application}</span>
                    </>
                }
            </div>
        </div>
    )
}

export default PageHeader