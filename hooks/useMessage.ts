import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Message from "@/models/message.model";

interface MessageStore {
  messages: (typeof Message)[];
  addMessage: (data: typeof Message) => void;
}

const useMessage = create(
  persist<MessageStore>(
    (set, get) => ({
      messages: [],

      addMessage: (data: any) => {
        set({ messages: [...get().messages, data] });
      },
    }),
    {
      name: "message-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMessage;
