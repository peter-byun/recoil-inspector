import { css } from '@emotion/react';
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
        css={css`
          & {
            background-color: ${colors.dark.focus};
            border-radius: 6px;
            box-shadow:
              hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
              hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
            padding: 15px;
            display: grid;
            grid-template-areas: 'title action' 'description action';
            grid-template-columns: auto max-content;
            column-gap: 15px;
            align-items: center;
          }
          &[data-state='open'] {
            animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
          }
          &[data-state='closed'] {
            animation: slideOut 100ms ease-in;
          }
          &[data-swipe='move'] {
            transform: translateX(${toastCssConstant.radixToastSwipeMoveX});
          }
          &[data-swipe='cancel'] {
            transform: translateX(0);
            transition: transform 200ms ease-out;
          }
          &[data-swipe='end'] {
            animation: swipeOut 100ms ease-out;
          }

          @keyframes slideIn {
            from {
              transform: translateX(
                calc(100% + ${toastCssConstant.viewportPadding})
              );
            }
            to {
              transform: translateX(0);
            }
          }

          @keyframes slideOut {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }

          @keyframes swipeOut {
            from {
              transform: translateX(${toastCssConstant.radixToastSwipeMoveX});
            }
            to {
              transform: translateX(
                calc(100% + ${toastCssConstant.viewportPadding})
              );
            }
          }
        `}
      >
        <ToastBase.Title
          className="ToastTitle"
          css={css`
            grid-area: title;
            margin-bottom: 5px;
            font-weight: 500;
            color: slate12;
            font-size: 15px;
          `}
        >
          {title}
        </ToastBase.Title>
        <ToastBase.Description
          asChild
          css={css`
            grid-area: description;
            margin: 0;
            color: white;
            font-size: 13px;
            line-height: 1.3;
          `}
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
        css={css`
          position: fixed;
          bottom: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          padding: ${toastCssConstant.viewportPadding};
          gap: 10px;
          width: 390px;
          max-width: 100vw;
          margin: 0;
          list-style: none;
          z-index: 2147483647;
          outline: none;
        `}
      />
    </ToastBase.Provider>
  );
};

const toastCssConstant = {
  viewportPadding: '25px',
  radixToastSwipeMoveX: '25px',
} as const;
