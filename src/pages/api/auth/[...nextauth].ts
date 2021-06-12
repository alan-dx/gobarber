import { fauna } from '../../../services/faunadb'
import { query as q } from 'faunadb'

import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { getCreateUser, getUserInfo } from '../../../utils/manageUser'

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async session(session) {

      const userData = await getUserInfo(session.user.email)
      console.log('chamou o session')

      return {
        ...session,
        userData
      }
    },
    async signIn(user, account, profile) { 
      const {email} = user
      try {

        await getCreateUser(email)

        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async redirect() {
      return '/choice'
    }
  }
})