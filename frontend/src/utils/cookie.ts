'use server'
import { cookies } from "next/headers"

export const getAuthToken = async () => {
   const cookie = await cookies()

   const token = cookie.get('token')

   if (!token) return null

   return token
}

export const setAuthToken = async (token: string) => {
   const cookie = await cookies()

   cookie.set('token', token)
}

export const deleteAuthToken = async () => {
   const cookie = await cookies()

   cookie.delete('token')
}