import { Button } from '@/components/ui/button'
import documentsLogo from '../../../assets/images/documents.svg'
// import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface EmptyRequestProps {
  onNewRequest?: () => void
  hideButton?: boolean
  title?: string
  description?: string
  descriptionParams?: Record<string, string>
  buttonText?: string
}

export const EmptyRequest = ({ onNewRequest, hideButton = false, title = '', description = '', descriptionParams = {}, buttonText = '' }: EmptyRequestProps) => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  return (
    <div className={cn('w-full h-full flex flex-col items-center justify-center text-center', { 'mt-20': hideButton })}>
      <div className='w-[150px] h-[140px] mr-3'>
        <img src={documentsLogo} alt='' />
      </div>
      <div className='mt-4 my-10'>
        <h3 className='text-2xl font-semibold'>{t(title)}</h3>
        {!hideButton && <p className='text-sm leading-5 font-normal text-muted-foreground'>
          {t(description, descriptionParams)}
        </p>}
      </div>
      {!hideButton && (<div className='flex flex-col gap-3'>
        <Button
          type='button'
          className='py-2 px-4 bg-maroon-100 hover:bg-[#7A1F2B] h-10 text-sm font-medium text-primary-foreground cursor-pointer'
          onClick={() => onNewRequest!()}
        >
          {t(buttonText)}
        </Button>
        {/* <Button
          type='button'
          variant='ghost'
          className='border border-zinc-300 text-sm font-medium h-10 cursor-pointer'
          onClick={() => navigate('/portal')}
        >
          Go Back
        </Button> */}
      </div>)}
    </div>
  )
}
