import { useState } from 'react';
import { ToastData } from './Toast';

export function useToast() {
  const [toast, setToast] = useState<ToastData>({
    isToastOpen: false,
    message: '',
  });

  function openToast(nextOpen: boolean) {
    setToast({
      ...toast,
      isToastOpen: nextOpen,
    });
  }

  return {
    toast,
    setToast,
    openToast,
  };
}
