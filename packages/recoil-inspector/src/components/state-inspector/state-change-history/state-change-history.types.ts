import { StateChange } from 'recoil-inspector/src/types/state';

export interface StateChangeForDisplay extends StateChange {
  pressed: boolean;
}
