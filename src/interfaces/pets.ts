import { Types } from "mongoose";
import { TPetCard, TPetGallery } from "./models";

export type TCreatePetRequest = {
  name: string;
  species: string;
  breed: string;
  gender: string;
  color: string;
  birthday: Date;
  photo: string;
};

export type TPet = {
  _id: string | Types.ObjectId;
  name: string;
  species: string;
  breed: string;
  gender: string;
  color: string;
  birthday: Date;
  photo: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  petCards: TPetCard[] | null;
  gallery: TPetGallery[] | null;
};

export interface IQueryParams {
  page?: string;
}

export type TGetAllPetsResponse = {
  pets: TPet[] | null;
  totalPets: number;
  numOfPages: number;
};

export type TPetCardRequest = {
  serviceType: string;
  service: string;
  description: string;
  date: Date;
};

export type TEditPetRequest = {
  name: string;
  species: string;
  breed: string;
  gender: string;
  color: string;
  birthday: Date;
  photo: string;
};

export type TAddGalleryPhotoRequest = {
  image: string;
};
