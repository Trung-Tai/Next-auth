import SignInForm from '@/app/components/form/SignInForm';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = () => {

  return (

    <div className='w-full'>
      <SignInForm />
    </div>
  );
};

export default page;
