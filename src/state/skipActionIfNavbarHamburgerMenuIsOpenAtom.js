import { atom } from 'recoil';

export const skipActionIfNavbarHamburgerMenuIsOpenAtom = atom({
    key : 'hamburgerMenuInNavbarPreviouslyOpen',
    default: false,
});
