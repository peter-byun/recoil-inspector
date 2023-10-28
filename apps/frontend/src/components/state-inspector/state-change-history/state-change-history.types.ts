import { StateChange } from '../../../types/state';

export interface StateChangeForDisplay extends StateChange {
  pressed: boolean;
}
