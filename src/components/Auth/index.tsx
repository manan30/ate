import { UserCircleIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';

const AuthModal = React.lazy(() => import('./Modal'));

const Auth = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <button
        className='p-1 ml-auto text-orange-100 rounded-full focus:outline-none focus:ring-1 focus:ring-orange-200'
        onClick={() => {
          setShowAuthModal(true);
        }}
      >
        <UserCircleIcon className='w-6 h-6' />
      </button>
      {showAuthModal ? (
        <React.Suspense fallback={null}>
          <AuthModal
            show={showAuthModal}
            onClose={() => setShowAuthModal(false)}
          />
        </React.Suspense>
      ) : null}
    </>
  );
};

export default Auth;
