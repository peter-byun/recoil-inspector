import { ToastData } from '../../components/base/toast/Toast';
import { copyToClipboard } from './copy-to-clipboard';

export function useCopyToClipboardWithToast({
  setToast,
}: {
  setToast: (props: ToastData) => void;
}) {
  const handleCopy = (textToCopy: string) => {
    try {
      copyToClipboard(textToCopy);

      setToast({
        isToastOpen: true,
        message: 'Successfully copied data to the clipboard',
      });
    } catch (e) {
      setToast({
        isToastOpen: true,
        message: 'Failed to copy data to the clipboard',
      });
    }
  };

  return {
    handleCopy,
  };
}
