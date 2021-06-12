import { getSession } from 'next-auth/client'
import { withSSRAuth } from "../../utils/withSSRAuth"

interface ChoiceProps {
  userData: {
    data: {
      email: string;
      roles?: string[]
    }
  }
}

export default function Choice({userData}: ChoiceProps) {

  const roles = userData.data.roles

  //FINALIZAR A TELA DE CHOICE E FAZER O UPDATE NO DB

  return (
    <>
      <h1>Choice</h1>
      {
        roles &&
        <p>roles</p>
      }
    </>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {

  const session = await getSession(ctx) as any
  const userRoles: string[] = session.userData.data.roles
 
  if (userRoles) {
    return {
      redirect: {
        destination: `/dashboard/${userRoles[0]}`,
        permanent: false
      }
    }
  }

  return {
      props: {
        userData: session.userData
      }
    }
  }
)