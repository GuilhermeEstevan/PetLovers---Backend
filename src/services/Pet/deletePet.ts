import BadRequestError from "../../errors/badRequest";
import PetModel from "../../models/pets";
import { v2 as cloudinary } from "cloudinary";

const deletePetService = async (
  petId: string,
  userId: string
): Promise<string> => {
  const pet = await PetModel.findOneAndDelete({
    createdBy: userId,
    _id: petId,
  });

  console.log(pet);

  if (!pet) {
    throw new BadRequestError("no pet found!");
  }

  //   Deletar do cloudinary
  const imagesArray = [];
  imagesArray.push(pet.photo);
  pet.gallery.forEach((photo) => imagesArray.push(photo.image));

  await Promise.all(
    imagesArray.map(async (photo) => {
      const imageUrlParts = photo.split("/");
      let publicId = imageUrlParts
        .slice(imageUrlParts.indexOf("PetLovers"))
        .join("/");
      publicId = publicId.replace(/\.[^.]+$/, "");
      console.log(publicId);

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log("Erro ao excluir imagem do Cloudinary:", error);
        throw new BadRequestError("Falha ao excluir imagem do Cloudinary");
      }
    })
  );

  return "Pet Deleted Successfully!";
};

export default deletePetService;
