import React, { useEffect } from 'react';
import { X } from 'lucide-react';

function Modal({ isOpen, onClose, title, children }) {
  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 transition"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-4 pr-8">{title}</h2>
        
        {children}
      </div>
    </div>
  );
}

export default Modal;
