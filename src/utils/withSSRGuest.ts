import { parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

//manages the application for visiting users 
export function withSSRGuest(fn: GetServerSideProps) {
  
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    
    const cookies = parseCookies(ctx)
    
    if (cookies['@gobarber.token'] || cookies['next-auth.session-token']) {

      return {
        redirect: {
          destination: `/dashboard/client`,//TENTAR OTIMIZAR ISSO CRIANDO A TELA DE DASHBOARD, COM UM LOADING, E VERIFICAR LÁ PRA QUAL TELA O USUÁRIO DEVE SER DIRECIONADO
          permanent: false
        }
      }
    }

    return await fn(ctx)
  }
  
}