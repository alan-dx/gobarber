import { AuthTokenError } from './../services/errors/AuthTokenError';
import { parseCookies, destroyCookie } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

// manages the application for authenticated users
export function withSSRAuth(fn: GetServerSideProps) {

  return async (ctx: GetServerSidePropsContext):Promise<GetServerSidePropsResult<unknown>> => {
    
    const cookies = parseCookies(ctx)

    if(!cookies['@gobarber.token']) {//fazer dupla verificação qnd implementar o OAuth
      return {
        redirect: {
          destination: '/signin',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (error) {
      console.log(error)
      
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, '@gobarber.token')
        destroyCookie(ctx, '@gobarber.refreshToken')

        return {
          redirect: {
            destination: '/signin',
            permanent: false
          }
        }
      }
    }

  }
}