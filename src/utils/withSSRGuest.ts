import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

//manages the application for visiting users 
export function withSSRGuest(fn: GetServerSideProps) {
  
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {

    const cookies = parseCookies(ctx)

    if (cookies['@gobarber.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }

    return await fn(ctx)
  }
  
}