import { useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';

import { Button } from '../button/Button';

export type ToastData = {
  isToastOpen: boolean;
  title?: string;
  message?: string;
};

type ToastProps = {
  containerId: string;
  toastData: ToastData;
  setIsToastOpen: (value: boolean) => void;
  hasCancel?: boolean;
};

export const Toast = (props: ToastProps) => {
  const closeTimerRef = useRef(0);

  useEffect(
    function closeToastAfterOpened() {
      if (props.toastData.isToastOpen) {
        closeTimerRef.current = window.setTimeout(() => {
          props.setIsToastOpen(false);
          closeTimerRef.current = 0;
        }, 1000);
      }

      return () => {
        closeTimerRef.current && clearTimeout(closeTimerRef.current);
      };
    },
    [props.toastData.isToastOpen]
  );

  const handleConfirmClick = () => {
    handleCloseClick();
  };

  const handleCloseClick = () => {
    props.setIsToastOpen(false);
  };

  const handleAlertClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  useEffect(function onWindowKeyUp() {
    const handleWindowKeyup = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      handleCloseClick();
    };

    window.addEventListener<'keyup'>('keyup', handleWindowKeyup);

    return () => {
      window.removeEventListener('keyup', handleWindowKeyup);
    };
  }, []);

  const Modal = (
    <dialog
      onClick={handleCloseClick}
      className="toast-dialog"
      style={{
        display: props.toastData.isToastOpen ? 'block' : 'none',
      }}
    >
      <div className="toast-container" onClick={handleAlertClick}>
        <h3>{props.toastData.title}</h3>

        <p>{props.toastData.message}</p>

        <div className="toast-button-group">
          {props.hasCancel ? (
            <Button onClick={handleCloseClick}>Cancel</Button>
          ) : null}
          <Button onClick={handleConfirmClick}>Confirm</Button>
        </div>
      </div>
    </dialog>
  );

  return ReactDOM.createPortal(
    Modal,
    document.getElementById(props.containerId) as HTMLLIElement
  );
};
