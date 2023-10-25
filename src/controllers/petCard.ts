import createPetCardService from "../services/Pet/createPetCard";
import deletePetCardService from "../services/Pet/deletePetCard";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import editPetCardService from "../services/Pet/editPetCard";

const createPetCard = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  console.log(req.body);

  const { petId } = req.params;
  const { userId } = res.locals;

  const response = await createPetCardService(req.body, petId, userId);

  return res.status(StatusCodes.OK).json({ msg: response });
};

const deletePetCard = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  const { petId, petCardId } = req.params;
  const { userId } = res.locals;

  const response = await deletePetCardService(petId, petCardId, userId);

  return res.status(StatusCodes.OK).json({ msg: response });
};

const editPetCard = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  const { userId } = res.locals;
  const { petId, petCardId } = req.params;

  const response = await editPetCardService(req.body, petId, petCardId, userId);

  return res.status(StatusCodes.OK).json({ msg: response });
};

export { createPetCard, deletePetCard, editPetCard };
