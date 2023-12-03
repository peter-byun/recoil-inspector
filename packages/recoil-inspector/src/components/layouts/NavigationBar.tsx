import { css } from '@emotion/react';

export const NavigationBar = () => {
  return (
    <nav
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-face: 'Roboto';
        font-size: 15px;
      `}
    >
      <h1>State Inspector</h1>
    </nav>
  );
};
