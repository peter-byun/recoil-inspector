import { atom } from 'recoil';

export const stepperState = atom<number>({
  key: 'stepper',
  default: 0,
});
