import { db } from '@/database'
import { seedData } from '@/database/seed-data'
import { Entry } from '@/models'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if ( process.env.NODE_ENV === 'production') {
    return res.status(401).json({ message:'No tiene acceso a este servicio'})
  }

  await db.connect()

  // interaccion con la base de datos
  await Entry.deleteMany(); // borra todo solo usar en develop

  await Entry.insertMany(seedData.entries)

  await db.disconnect()

  res.status(200).json({ message: 'Proceso realizado correctamente' })
}