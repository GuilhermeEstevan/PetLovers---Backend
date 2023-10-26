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
  allPets: TPet[] | null;
  totalPets: number;
  numOfPages: number;
};

export type TPetCardRequest = {
  procedure: string;
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
