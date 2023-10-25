import mongoose, { Schema, Types } from "mongoose";
import { PetsDocument } from "../interfaces/models";

const PetSchema = new mongoose.Schema<PetsDocument>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Por favor, forneça o valor do campo Name"],
    },
    species: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Por favor, forneça o valor do campo Species"],
    },
    breed: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Por favor, forneça o valor do campo Breed"],
    },
    gender: {
      type: String,
      required: [true, "Por favor, forneça o valor do campo Gender"],
      enum: ["macho", "fêmea"],
    },
    color: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Por favor, forneça o valor do campo Color"],
    },
    birthday: {
      type: Date,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Por favor, forneça o valor do campo User"],
    },
    petCards: [
      {
        procedure: {
          type: String,
          required: [true, "Por favor, forneça o valor do campo Procedure"],
          minlength: 2,
          maxlength: 20,
        },
        description: {
          type: String,
          required: [true, "Por favor, forneça o valor do campo Description"],
          minlength: 2,
          maxlength: 40,
        },
        date: {
          type: Date,
          required: [true, "Por favor, forneça o valor do campo Date"],
        },
      },
    ],
    gallery: [
      {
        image: {
          type: String,
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

const PetModel = mongoose.model("Pet", PetSchema);

export default PetModel;
