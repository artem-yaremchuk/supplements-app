import type { FC } from 'react';
import GoogleIcon from './GoogleIcon';

interface GoogleAuthButtonProps {
  label: string;
}

const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({ label }) => {
  const handleGoogleRedirect = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleRedirect}
      className="bg-ui-bg border-ui-border flex w-full items-center justify-center gap-[10px] rounded border px-3 py-[10px] min-h-10 shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99]"
    >
      <GoogleIcon />

      <span className="text-btn-text font-roboto text-[14px] font-medium">{label}</span>
    </button>
  );
};

export default GoogleAuthButton;
