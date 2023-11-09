import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import createPetService from "../services/Pet/createPet";
import BadRequestError from "../errors/badRequest";
import { TGetAllPetsResponse, TPet } from "../interfaces/pets";
import getAllPetsService from "../services/Pet/getAllPets";

import editPetService from "../services/Pet/editPet";
import deletePetService from "../services/Pet/deletePet";
import getSinglePetService from "../services/Pet/getSinglePet";

const createPet = async (
  req: Request,
  res: Response
): Promise<Response<TPet>> => {
  // console.log(req.file);

  // const imageFile = req.file;
  // if (!imageFile) throw new BadRequestError("No file uploaded");

  const { userId } = res.locals;
  const pet = await createPetService(req.body, userId);
  console.log(pet);

  return res.status(StatusCodes.CREATED).json({ pet });
};

const getAllPets = async (
  req: Request,
  res: Response
): Promise<Response<TGetAllPetsResponse>> => {
  const { userId } = res.locals;
  const query = req.query;
  const response = await getAllPetsService(userId, query);

  return res.status(StatusCodes.OK).json(response);
};

const getSinglePet = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { petId } = req.params;

  const response = await getSinglePetService(petId, userId);

  return res.status(StatusCodes.OK).json(response);
};

const editPet = async (
  req: Request,
  res: Response
): Promise<Response<TPet>> => {
  const imageFile = req.file;
  const { petId } = req.params;
  const { userId } = res.locals;
  console.log(req.body);

  const response = await editPetService(req.body, petId, userId, imageFile);

  return res.status(StatusCodes.OK).json(response);
};

const deletePet = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  const { userId } = res.locals;
  const { petId } = req.params;
  console.log(req.params);

  const response = await deletePetService(petId, userId);

  return res.status(StatusCodes.OK).json({ msg: response });
};

export { createPet, getAllPets, editPet, deletePet, getSinglePet };
