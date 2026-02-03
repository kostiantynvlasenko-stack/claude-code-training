import { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

// ISSUE #11: Memory leak - event listener not cleaned up on unmount
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    // Add event listener for escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    // ISSUE: No cleanup function returned!
    // Event listener remains attached after component unmounts
    // This causes memory leaks and unexpected behavior

    // FIX: Should return cleanup function:
    // return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    setVisible(isOpen);
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}
