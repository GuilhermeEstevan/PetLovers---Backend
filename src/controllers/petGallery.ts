import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/badRequest";
import uploadImageToGalleryService from "../services/Pet/uploadImageToGallery";

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

export { uploadImageToGallery };
