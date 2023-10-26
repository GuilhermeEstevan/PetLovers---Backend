import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest";
import uploadImageToGalleryService from "../services/Pet/uploadImageToGallery";
import deleteImageFromGalleryService from "../services/Pet/deleteImageFromGallery";

const uploadImageToGallery = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  const imageFile = req.file;
  const { petId } = req.params;
  const { userId } = res.locals;
  if (!imageFile) throw new BadRequestError("No file uploaded");

  const response = await uploadImageToGalleryService(imageFile, petId, userId);

  return res.status(StatusCodes.OK).json({ msg: response });
};

const deleteImageFromGallery = async (req: Request, res: Response) => {
  const { userId } = res.locals;
  const { petId, imageId } = req.params;
  console.log(petId);

  const response = await deleteImageFromGalleryService(petId, imageId, userId);

  return res.status(StatusCodes.OK).json({ msg: response });
};

export { uploadImageToGallery, deleteImageFromGallery };
