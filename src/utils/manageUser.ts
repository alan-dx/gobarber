import { query as q } from 'faunadb'
import { fauna } from '../services/faunadb'
//Fazer as query do fauna aq
//Na função executada no callback do signIn (que sera escrita aq), adicionar as informações
//roles: ['barber'] ou ['client'] no retorno do useSession e getSession, vindos
//do faunaDB

//LEMBRAR Q DA PRA USAR O GETSESSION FORA DO WITHSSR, DENTRO DO COMPONENTE DA PÁGINA

type FaunaUser = {
  data?: {
    email: string;
    roles: string[]
  }
}

export async function getCreateUser(email: string): Promise<FaunaUser> {
  try {
    //O OBJETIVO AQUI É CRIAR APENAS O DOCUMENTO DO USUÁRIO NO FAUNA, A ADIÇÃO DA ROLE DEVE SER FEITA EM UMA FUNÇÃO SEPARADA
    //EM UMA TELA DE PRIMEIRA VEZ, ONDE USUÁRIO PODE OPTAR POR ESCOLHER ENTRE SER BARBER OU CLIENT. ESSE PROCESSO, OBVIAMENTE,
    //DEVE ACONTECER SOMENTE NO OAUTH

    const response = await fauna.query(
      q.If(
        q.Not(
          q.Exists(
            q.Match(
              q.Index("user_by_email"),
              q.Casefold(email)
            )
          )
        ),
        q.Create(
          q.Collection('users'),
          {data: { email }}
        ),
        q.Get(
          q.Match(
            q.Index('user_by_email'),
            q.Casefold(email)
          )
        )
      )
    )

    // console.log('success', response)

    return response
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

export async function getUserInfo(email: string): Promise<FaunaUser> {

  try {
    const response = await fauna.query(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(email)
        )
      )
    )
  
    return response    
  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }

}