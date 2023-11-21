import BadRequestError from "../../errors/badRequest";
import PetModel from "../../models/pets";
import { v2 as cloudinary } from "cloudinary";

const deleteImageFromGalleryService = async (
  petId: string,
  imageId: string,
  userId: string
) => {
  const pet = await PetModel.findOne({
    createdBy: userId,
    _id: petId,
  });

  if (!pet) {
    throw new BadRequestError("Nenhum pet encontrado");
  }

  //   Deletar do cloudinary
  const imageToDelete = pet.gallery.find(
    (img) => img._id.toString() === imageId
  );

  if (!imageToDelete) {
    throw new BadRequestError(`Nenhuma imagem com id ${imageId} encontrada`);
  }

  const imageUrlParts = imageToDelete.image.split("/");
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

  // Deletar do MongoDB
  const updatedGallery = pet.gallery.filter(
    (img) => img._id.toString() !== imageId
  );

  pet.gallery = updatedGallery;
  pet.save();

  return "Imagem excluída com sucesso!";
};

export default deleteImageFromGalleryService;
