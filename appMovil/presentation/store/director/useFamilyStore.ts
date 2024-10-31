import {create} from 'zustand';

export const useFamilyStore = create()((set,get) => ({
    family: [],
    addFamily: (familiar) => set((state) => ({
        family: [...state.family, familiar]
    })),

    clearFamily: () => {
        set({ family: [] });
    }
}));


