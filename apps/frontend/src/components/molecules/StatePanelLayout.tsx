import { SerializedStyles, css } from '@emotion/react';
import { ReactNode } from 'react';

import { colors } from '../../styles/colors';
import { scrollbarCss } from '../../styles/scrollbar';

interface StatePanelLayout {
  children: ReactNode;
  containerCss?: SerializedStyles;
}

export const StatePanelLayout = ({
  children,
  containerCss,
}: StatePanelLayout) => {
  return (
    <section
      css={[
        css`
          background-color: ${colors.dark.surface2};
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          overflow-x: auto;
          padding: 10px;
          border-radius: 5px;

          ${scrollbarCss}
        `,
        containerCss,
      ]}
    >
      {children}
    </section>
  );
};
