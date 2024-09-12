import React from "react";

interface ContactButtonProps {
  isButtonLoading: boolean;
  loading: boolean;
  handleContactClick: () => void;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  isButtonLoading,
  loading,
  handleContactClick,
}) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={handleContactClick}
        className="mt-4 px-4 py-2 w-full bg-blue-600 text-white rounded hover:bg-blue-500 transition-all duration-300"
        disabled={loading}
      >
        Hubungi Kami
      </button>
    </div>
  );
};

export default ContactButton;
