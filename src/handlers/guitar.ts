import { Request, Response } from "express";
import Guitar from "../models/Guitar.model";

export const getGuitars = async (req: Request, res: Response) => {
  try {
      const guitars = await Guitar.findAll({
          where: { deleted: false },
          order: [['price', 'DESC']]
      })
      res.json({ data: guitars })
  } catch (error) {
    console.log(error);
  }
};

export const getGuitarById = async (req: Request<{id: string}>, res: Response) => {
  try {
      const { id } = req.params
      const guitar = await Guitar.findOne({
          where: { id, deleted: false }
      })

      if (!guitar) {
        return res.status(404).json({ error: 'Guitarra no encontrada' })
      }

      res.json({ data: guitar })
  } catch (error) {
    console.log(error);
  }
};

export const createGuitar = async (req: Request, res: Response) => {
  try {
    const guitar = await Guitar.create(req.body);
    res.json({ data: guitar });
  } catch (error) {
    console.log(error);
  }
};

export const updateGuitar = async (req: Request<{id: string}>, res: Response) => {
  try {
      const { id } = req.params
      const guitar = await Guitar.findOne({ where: { id, deleted: false } })

      if (!guitar) {
        return res.status(404).json({ error: 'Guitarra no encontrada' })
      }

      await guitar.update(req.body)
      await guitar.save()
      res.json({ data: guitar })
  } catch (error) {
    console.log(error);
  }
};

export const updateAvailability = async (req: Request<{id: string}>, res: Response) => {
  try {
      const { id } = req.params
      const guitar = await Guitar.findOne({ where: { id, deleted: false } })

      if (!guitar) {
        return res.status(404).json({ error: 'Guitarra no encontrada' })
      }

      guitar.availability = !guitar.dataValues.availability
      await guitar.save()
      res.json({ data: guitar })
  } catch (error) {
    console.log(error);
  }
};

export const deleteGuitar = async (req: Request<{id: string}>, res: Response) => {
  try {
      const { id } = req.params
      const guitar = await Guitar.findOne({ where: { id, deleted: false } })

      if (!guitar) {
        return res.status(404).json({ error: 'Guitarra no encontrada' })
      }

      guitar.deleted = true
      await guitar.save()
      res.json({ data: 'Guitarra eliminada' })
  } catch (error) {
    console.log(error);
  }
};