import { useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';

import { Button } from '../button/Button';

import './toast.css';

export type AlertData = {
  isAlertOpen: boolean;
  title?: string;
  message?: string;
};

type AlertProps = {
  containerId: string;
  alertData: AlertData;
  setIsAlertOpen: (value: boolean) => void;
};

export const Toast = (props: AlertProps) => {
  const closeTimerRef = useRef(0);

  useEffect(
    function closeToastAfterOpened() {
      if (props.alertData.isAlertOpen) {
        closeTimerRef.current = window.setTimeout(() => {
          props.setIsAlertOpen(false);
          closeTimerRef.current = 0;
        }, 1500);
      }

      return () => {
        closeTimerRef.current && clearTimeout(closeTimerRef.current);
      };
    },
    [props.alertData.isAlertOpen]
  );

  const handleConfirmClick = () => {
    handleCloseClick();
  };

  const handleCloseClick = () => {
    props.setIsAlertOpen(false);
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
        display: props.alertData.isAlertOpen ? 'block' : 'none',
      }}
    >
      <div className="toast-container" onClick={handleAlertClick}>
        <h3>{props.alertData.title}</h3>

        <p>{props.alertData.message}</p>

        <div className="toast-button-group">
          <Button onClick={handleConfirmClick}>Confirm</Button>
          <Button onClick={handleCloseClick}>Cancel</Button>
        </div>
      </div>
    </dialog>
  );

  return ReactDOM.createPortal(
    Modal,
    document.getElementById(props.containerId) as HTMLLIElement
  );
};
