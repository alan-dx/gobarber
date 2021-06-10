import { NextApiRequest, NextApiResponse } from "next";
import {getCreateUser, getUserInfo} from '../../utils/manageUser'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == 'POST') {

    const {email} = req.body

    console.log('email', email)

    const response = await getCreateUser(email)

    return res.status(200).json({user: response.data})

  } else if (req.method == 'GET') {
    const {email} = req.query

    console.log(email)

    const response = await getUserInfo(email as string)

    return res.status(200).json({user: response.data})

  } else {
    res.setHeader('Allow', 'POST/GET')
    res.status(405).json('Method not allowed')
  }
}