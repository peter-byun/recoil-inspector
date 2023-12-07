import * as ToastBase from '@radix-ui/react-toast';
import * as React from 'react';

import { colors } from '../../styles/colors';

interface ToastProps {
  title: string;
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  toastVisibleDuration?: number;
}

const TOAST_VISIBLE_DURATION_DEFAULT = 3000;

export const Toast = ({
  title,
  description,
  open,
  setOpen,
  toastVisibleDuration = TOAST_VISIBLE_DURATION_DEFAULT,
}: ToastProps) => {
  const closeTimerRef = React.useRef(0);

  React.useEffect(() => {
    if (open) {
      closeTimerRef.current = window.setTimeout(() => {
        setOpen(false);
        closeTimerRef.current = 0;
      }, toastVisibleDuration);
    }

    return () => {
      closeTimerRef.current && clearTimeout(closeTimerRef.current);
    };
  }, [open]);

  return (
    <ToastBase.Provider swipeDirection="right">
      <ToastBase.Root
        className="ToastRoot"
        open={open}
        onOpenChange={setOpen}
        style={{ ...toastStyle, ...(open ? openAnimation : closedAnimation) }}
      >
        <ToastBase.Title
          className="ToastTitle"
          style={{
            gridArea: 'title',
            marginBottom: '5px',
            fontWeight: 500,
            color: 'slate12',
            fontSize: '15px',
          }}
        >
          {title}
        </ToastBase.Title>
        <ToastBase.Description
          asChild
          style={{
            gridArea: 'description',
            margin: '0',
            color: 'white',
            fontSize: '13px',
            lineHeight: '1.3',
          }}
        >
          {description}
        </ToastBase.Description>
        <ToastBase.Action
          className="ToastAction"
          asChild
          altText="Close the toast"
        >
          <button className="Button small green">Close</button>
        </ToastBase.Action>
      </ToastBase.Root>
      <ToastBase.Viewport
        className="ToastViewport"
        style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          display: 'flex',
          flexDirection: 'column',
          padding: toastCssConstant.viewportPadding,
          gap: '10px',
          width: '390px',
          maxWidth: '100vw',
          margin: '0',
          listStyle: 'none',
          zIndex: 2147483647,
          outline: 'none',
        }}
      />
    </ToastBase.Provider>
  );
};

const toastCssConstant = {
  viewportPadding: '25px',
  radixToastSwipeMoveX: '25px',
} as const;

const toastStyle = {
  backgroundColor: colors.dark.focus,
  borderRadius: '6px',
  boxShadow: `
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px`,
  padding: '15px',
  display: 'grid',
  gridTemplateAreas: `'title action' 'description action'`,
  gridTemplateColumns: 'auto max-content',
  columnGap: '15px',
  alignItems: 'center',
};

const openAnimation = {
  animation: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
};

const closedAnimation = {
  animation: 'slideOut 100ms ease-in',
};
