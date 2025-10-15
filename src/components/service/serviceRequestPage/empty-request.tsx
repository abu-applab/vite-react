import { Button } from '@/components/ui/button'
import documentsLogo from '../../../assets/images/documents.svg'

export const EmptyRequest = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div>
        <img src={documentsLogo} alt='' />
      </div>
      <div className='my-10'>
        <h3 className=''>No Service Requests Yet</h3>
        <p className='text-2xl'>
          You haven’t submitted any service requests yet.
        </p>
      </div>
      <div className='flex flex-col gap-3'>
        <Button type='button' className=''>Submit New Service Reques</Button>
        <Button type='button' variant='ghost' className=''>Go Back</Button>
      </div>
    </div>
  )
}
