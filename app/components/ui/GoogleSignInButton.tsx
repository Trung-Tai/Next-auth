import { FC, ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import { signIn } from 'next-auth/react';

interface GoogleSignInButtonProps {
  children: ReactNode;
}
const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({ children }) => {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const loginWithGoogle = async () => {
    try {
      setIsloading(true)
      await signIn('google', {callbackUrl: '/'})
    }
    catch(err){
      setIsloading(false)
    }finally{
      setIsloading(false);
    }
  };

  return (
    <Button disabled={isLoading} onClick={loginWithGoogle} className='w-full' >
       {isLoading && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 mr-2 animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      )}
      {children}
    </Button>
  );
};

export default GoogleSignInButton;