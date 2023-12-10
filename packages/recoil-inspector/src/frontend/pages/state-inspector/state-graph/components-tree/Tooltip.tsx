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
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                ...(isLastProperty ? { marginBottom: '4px' } : {}),
              }}
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
                style={{
                  width: '100%',
                  margin: 0,
                }}
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
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          ...(props.isLastProperty ? { marginBottom: '4px' } : {}),
        }}
      >
        <span>
          Depends on : <strong> {props.recoilState.key}</strong>
        </span>
      </div>

      {!props.isLastProperty && <hr style={{ width: '100%', margin: '0' }} />}
    </div>
  );
};
