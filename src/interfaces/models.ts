import { Types } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  lastName: string;
  phone: string;
  reset_token?: string | undefined;
  createJWT: () => string;
  comparePassword: (password: string) => boolean;
}

export interface PetsDocument extends Document {
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
  petCards: TPetCard[];
  gallery: TPetGallery[];
}

export type TPetCard = {
  _id: Types.ObjectId;
  serviceType: string;
  service: string;
  description: string;
  date: Date;
  vaccineInfo?: TVaccineInfo | undefined;
  medicationInfo?: TMedicationInfo | undefined;
};

export type TPetGallery = {
  _id: Types.ObjectId;
  image: string;
  updatedAt: Date;
};

export type TVaccineInfo = {
  vaccineType: string;
  doseNumber: string;
  nextDueDate: string | undefined;
};

export type TMedicationInfo = {
  medicationType: string;
  frequency: string;
  nextMedicationDate: string | undefined;
};
