'use server'
import { cookies } from "next/headers"

export const getCookie = async () => {
   const cookie = await cookies()

   const token = cookie.get('token')

   if (!token) return null

   return token
}

export const setCookie = async (token: string) => {
   const cookie = await cookies()

   cookie.set('token', token)
}

export const deleteCookie = async () => {
   const cookie = await cookies()

   cookie.delete('token')
}