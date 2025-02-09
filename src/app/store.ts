import {create} from 'zustand'

type loginState  = {
    isLoggedin: boolean,
    toggleLogin: () => void
}

export const useLoginStore = create<loginState>((set) => ({
    isLoggedin: false,
    toggleLogin: () => set((state) => ({ isLoggedin: !state.isLoggedin })),
}))