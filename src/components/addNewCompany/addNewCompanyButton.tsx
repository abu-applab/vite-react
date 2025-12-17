import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddCRNumberModal from "./addCRNumberModal";
import { parseApiError } from "@/lib/utils";
import Loader from "../loader";
import useNetworkRequest from "@/api/useNetworkRequest";
import { API_ENDPOINTS } from "@/api/apiEndpoints";

interface AddNewCompanyButtonProps {
    hideIcon?: boolean
}

const AddNewCompanyButton = ({hideIcon = false}: AddNewCompanyButtonProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [value, setValue] = useState('');
    const [apiMessage, setApiMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const networkRequest = useNetworkRequest();

    const handleCRNumber = async () => {
        if (!value.trim()) {
            setError('CR Number is required')
            return
        }
        const body = {
            CRNumber: value
        }
        try {
            setIsLoading(true);
            const response = await networkRequest(API_ENDPOINTS.getcompanybyCRno, {
                method: 'GET',
                body,
            });
            if (response?.success) {
                setApiMessage(response.message)
                setIsSuccess(true);
                setIsLoading(false);
                navigate('/portal/add-new-company', {
                    state: {
                        companyData: response?.data
                    }
                })
            }
        } catch (error) {
            setIsSuccess(false);
            setApiMessage(parseApiError(error));
            setIsLoading(false);
        }
    }

    const handleValueChange = (val: string) => {
        setValue(val)
        setError('')
        setApiMessage('')
    }

    return (
        <>
            <Button className="bg-maroon-100 hover:bg-maroon-100 hover:text-white max-md:w-full cursor-pointer"
                onClick={() => setModalOpen(true)}>
                {!hideIcon && <Plus className="h-4 w-4 mr-2" />}
                {t('add_new_company')}
            </Button>
            <AddCRNumberModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                handleCRNumber={handleCRNumber}
                handleCancel={() => {
                    setValue('')
                    setError('')
                    setApiMessage('')
                    setModalOpen(false)
                }}
                handleValueChange={handleValueChange}
                error={error}
                value={value}
                apiMessage={apiMessage}
                isSuccess={isSuccess}
            />
            {isLoading && <Loader />}
        </>
    )
}

export default AddNewCompanyButton