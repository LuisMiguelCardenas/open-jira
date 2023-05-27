import { db } from "@/database";
import { Entry } from "@/models";
import { IEntry } from "@/models/Entry";
import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = 
| { message: string}
| IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  // Para dar cuenta si el dato enviado es valido

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Id no es valido" });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);
    case "GET":
      return getEntry(res, req);
    case "DELETE":
      return deleteEntry(res, req);
    default:
      return res.status(400).json({ message: "Metodo no existe" });
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "Entry not found" });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true }
    );

    res.status(200).json(updatedEntry!)
    
  } catch (error) {
    console.log(error)
    await db.disconnect();
    res.status(400).json({message:'bad request'})
    
  }
};


const getEntry = async (res: NextApiResponse<Data>, req: NextApiRequest) => {
  const { id } = req.query;
  
  await db.connect();

  const entry = await Entry.findById(id);

  await db.disconnect();

  if (!entry) {
    return res.status(400).json({ message: "Entry not found" });
  }

  res.status(200).json(entry!);
};


const deleteEntry = async (res: NextApiResponse<Data>, req: NextApiRequest) => {
  const { id } = req.query;

  await db.connect();

  try {
    const deletedEntry = await Entry.findByIdAndDelete(id);

    if (!deletedEntry) {
      await db.disconnect();
      return res.status(400).json({ message: "Entry not found" });
    }

    await db.disconnect();
    res.status(200).json(deletedEntry);
  } catch (error) {
    console.error(error);
    await db.disconnect();
    res.status(400).json({ message: "Bad request" });
  }
};