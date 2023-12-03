import { css } from '@emotion/react';

import { RecoilStates } from '../../StateInspector';

export type TreeProps = {
  treeData: any;
  recoilStates: RecoilStates;
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export function RecoilStateTooltip({
  recoilStates,
  isNodeComponent,
}: {
  recoilStates: RecoilStates;
  isNodeComponent: boolean;
}) {
  return (
    <>
      {recoilStates.map((recoilState, idx, totalRecoilStates) => {
        const isLastProperty: boolean = idx === totalRecoilStates.length - 1;

        return isNodeComponent ? (
          <ComponentNodeTooltip
            recoilState={recoilState}
            isLastProperty={isLastProperty}
            key={`${recoilState.key}-${recoilState.value}-${idx}`}
          />
        ) : (
          <div key={`${recoilState.key}-${recoilState.value}-${idx}`}>
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

const ComponentNodeTooltip = (props: {
  recoilState: RecoilStates[0];
  isLastProperty: boolean;
}) => {
  return (
    <div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          ${props.isLastProperty &&
          css`
            margin-bottom: 4px;
          `}
        `}
      >
        <span>
          Depends on : <strong> {props.recoilState.key}</strong>
        </span>
      </div>

      {!props.isLastProperty && (
        <hr
          css={css`
            width: 100%;
            margin: 0;
          `}
        />
      )}
    </div>
  );
};
