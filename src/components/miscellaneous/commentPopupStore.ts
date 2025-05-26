import { create } from 'zustand'

interface CommentPopupState {
    isOpen: boolean
    isMobile: boolean
    openPopup: () => void
    closePopup: () => void
    setIsMobile: (mobile: boolean) => void
}

export const useCommentPopupStore = create<CommentPopupState>((set) => ({
    isOpen: false,
    isMobile: false,
    openPopup: () => set({ isOpen: true }),
    closePopup: () => set({ isOpen: false }),
    setIsMobile: (mobile: boolean) => set({ isMobile: mobile }),
}))