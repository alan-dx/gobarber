import { AuthTokenError } from './../services/errors/AuthTokenError';
import { parseCookies, destroyCookie } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import decode from 'jwt-decode'
import validatePermissions from './validatePermissions';

type withSSRAuthOptions = {
  roles?: string[]
}

// manages the application for authenticated users
export function withSSRAuth(fn: GetServerSideProps, options?: withSSRAuthOptions) {
  console.log('xxx')

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

    if (options) {
      const { roles } = options
      const user = decode<{ roles: string[] }>(cookies['@gobarber.token'])

      const userHasPermission = validatePermissions({
        user,
        roles
      })

      if (!userHasPermission) {
        return {
          redirect: {
            destination: `${user.roles[0]}`,
            permanent: false
          }
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