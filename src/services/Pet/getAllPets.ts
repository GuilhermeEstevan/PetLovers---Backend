import { Types } from "mongoose";
import { IQueryParams, TGetAllPetsResponse } from "../../interfaces/pets";
import PetModel from "../../models/pets";

type TQueryObject = {
  createdBy: Types.ObjectId;
};

const getAllPetsService = async (
  userId: string,
  query: IQueryParams
): Promise<TGetAllPetsResponse | null> => {
  const queryObject: TQueryObject = {
    createdBy: new Types.ObjectId(userId),
  };

  let result = PetModel.find(queryObject);

  // PAGINATION
  const page = Number(query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  result.skip(skip).limit(limit);

  const pets = await result;
  const totalPets = await PetModel.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalPets / limit);

  return { pets, totalPets, numOfPages };
};

export default getAllPetsService;
