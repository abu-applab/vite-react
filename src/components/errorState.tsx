import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import failed from '../assets/images/failed.svg'

export const ErrorState = ({handleTryAgain}: {handleTryAgain: () => void}) => {

    const { t } = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 px-6 py-8">
            <img 
                src={failed}
                alt="Error" 
                className="w-[80px] h-[80px]" 
            />
            <div className="text-center">
                <h1 className="text-2xl font-semibold text-black mb-2">
                    {t('system_error_title')}
                </h1>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
                    {t('system_error_message')}
                </p>
            </div>
            <Button
                className="bg-[#862634] hover:bg-[#7A1F2B] text-white px-6 py-2 rounded-md text-sm leading-5 font-medium"
                onClick={handleTryAgain}
                type="button"
            >
                {t('try_again')}
            </Button>
        </div>
    );
}   

