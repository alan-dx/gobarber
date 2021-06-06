import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import decode from 'jwt-decode'

//manages the application for visiting users 
export function withSSRGuest(fn: GetServerSideProps) {
  console.log('sdad')
  
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {

    const cookies = parseCookies(ctx)

    if (cookies['@gobarber.token']) {

      const user = decode<{permissions: string[], roles: string[]}>(cookies['@gobarber.token'])

      return {
        redirect: {
          destination: `/dashboard/${user.roles[0]}`,
          permanent: false
        }
      }
    }

    return await fn(ctx)
  }
  
}