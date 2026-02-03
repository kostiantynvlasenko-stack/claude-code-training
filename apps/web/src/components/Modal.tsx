import React, { useEffect } from 'react';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const intervalId = setInterval(() => {
      console.log('Modal open');
    }, 1000);

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    });

    // Missing cleanup on purpose
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">{children}</div>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
