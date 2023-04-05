import { css } from "@emotion/react";
import { colors } from "./colors";

const SCROLL_BAR_BORDER_RADIUS = "6px";

export const scrollbarCss = css`
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #929292;
    border-radius: ${SCROLL_BAR_BORDER_RADIUS};
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #a6a6a6;
  }

  ::-webkit-scrollbar-track {
    background-color: ${colors.dark.surface2};
    border-radius: ${SCROLL_BAR_BORDER_RADIUS};
  }
`;
