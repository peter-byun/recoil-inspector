import { css } from '@emotion/react';

import { RecoilStates } from '../../StateInspector';

const lightpurple = '#374469';
export const background = '#272b4d';

export type TreeProps = {
  treeData: any;
  recoilStates: RecoilStates;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export function RecoilStateTooltip({
  recoilStates,
}: {
  recoilStates: RecoilStates;
}) {
  return (
    <>
      {recoilStates.map((recoilState, idx, totalRecoilStates) => {
        const isLastProperty: boolean = idx === totalRecoilStates.length - 1;

        return (
          <div key={`${recoilState.key}-${recoilState.value}`}>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                ${isLastProperty &&
                css`
                  margin-bottom: 4px;
                `}
              `}
            >
              <span>
                {recoilState.key} : <strong> {recoilState.value}</strong>
              </span>
              <span>
                State Type : <strong> {recoilState.stateType}</strong>
              </span>
            </div>
            {!isLastProperty && (
              <hr
                css={css`
                  width: 100%;
                  margin: 0;
                `}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
