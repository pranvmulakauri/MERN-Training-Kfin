import { create } from "zustand";
import { persist } from "zustand/middleware";
export const sipStore = create(
  persist(
    (set) => ({
      funds: [
        { name: "ICICI Funds", sector: "Construction" },
        { name: "HDFC Funds", sector: "Healthcare" },
        { name: "IDFC Funds", sector: "Banking" },
      ],
      sipInititated: [],
      startSIP: (data) =>
        set((state) => ({
          sipInititated: [...state.sipInititated, data],
        })),
    }),
    {
      name: "sip-storage",
    },
  ),
);
