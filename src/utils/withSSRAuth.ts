import { Session } from 'next-auth'
import { nextApi } from './../services/nextApi';
import { AuthTokenError } from './../services/errors/AuthTokenError';
import { parseCookies, destroyCookie } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import decode from 'jwt-decode'
import validatePermissions from './validatePermissions';
import { GetSessionOptions } from 'next-auth/client';

type withSSRAuthOptions = {
  roles?: string[],
}

// manages the application for authenticated users
export function withSSRAuth(fn: GetServerSideProps, options?: withSSRAuthOptions) {

  return async (ctx: GetServerSidePropsContext):Promise<GetServerSidePropsResult<unknown>> => {

    const cookies = parseCookies(ctx)

    if(!cookies['@gobarber.token'] && !cookies['next-auth.session-token']) {
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