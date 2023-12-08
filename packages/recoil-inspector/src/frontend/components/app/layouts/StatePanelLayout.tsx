import { ReactNode } from 'react';

import { colors } from '../../../constants/styles/colors';
import { scrollbarCss } from '../../../constants/styles/scrollbar';

interface StatePanelLayout {
  children: ReactNode;
  containerCss?: React.CSSProperties;
}

export const StatePanelLayout = ({
  children,
  containerCss,
}: StatePanelLayout) => {
  const containerStyles = [
    {
      backgroundColor: colors.dark.surface1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      overflowX: 'auto',
      padding: '10px',
      borderRadius: '5px',
    },
    scrollbarCss, // Assuming scrollbarCss is another CSS object
    containerCss, // Assuming containerCss is another CSS object
  ];

  return (
    <section style={Object.assign({}, ...containerStyles)}>{children}</section>
  );
};
