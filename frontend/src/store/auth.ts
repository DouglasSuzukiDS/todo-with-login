import { User } from "@/types/user";
import { api } from "@/utils/api";
import { deleteCookie, setCookie } from "@/utils/cookie";
import { create } from "zustand";

type UserStore = {
   user: User | null
   setUser: (user: User | null) => void

   token: string | null
   setToken: (token: string | null) => void

   getUser: (token: string) => Promise<boolean>

   signUp: (name: string, email: string, password: string) => Promise<boolean>

   signIn: (email: string, password: string) => Promise<boolean>

   logout: (token: string) => Promise<boolean>
}

export const useAuth = create<UserStore>((set) => ({
   user: null,

   setUser: (user: User | null) => set({ user }),

   token: null,

   setToken: (token: string | null) => set({ token }),

   getUser: async (token: string) => {
      try {
         const user = await api.get('/user/token', { params: { token } })

         if (user.status === 200) {

            set({ user: user.data })

            return true
         }
         return false
      } catch (err) {
         return false
      }
   },

   signUp: async (name, email, password) => {
      try {
         const created = await api.post('/auth/signup', { name, email, password })

         if (created.status === 201) return true

         return false
      } catch (err) {
         return false
      }
   },

   signIn: async (email, password) => {
      try {
         const logged = await api.post('/auth/signin', { email, password })

         if (logged.status === 200) {
            set({ user: logged.data.user, token: logged.data.token })

            setCookie(logged.data.token)

            return true
         }

         return false
      } catch (err) {
         return false
      }
   },

   logout: async (token: string) => {
      try {
         const loggedOut = await api.post('/auth/logout', { data: { token } })

         if (loggedOut.status === 200) {

            set({ user: null, token: null })

            setCookie('')
            deleteCookie()

            return true
         }
         return false

      } catch (err) {
         return false
      }
   }
}))