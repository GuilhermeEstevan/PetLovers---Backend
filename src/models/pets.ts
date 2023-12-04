import mongoose, { Schema } from "mongoose";
import { PetsDocument } from "../interfaces/models";
import { Vaccines, HealthExams, Frequency } from "../Utils/cardList";

const PetSchema = new mongoose.Schema<PetsDocument>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, "Por favor, forneça o valor do campo Name"],
    },
    species: {
      type: String,
      minlength: 3,
      maxlength: 30,
      required: [true, "Por favor, forneça o valor do campo Species"],
    },
    breed: {
      type: String,
      minlength: 3,
      maxlength: 30,
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
        serviceType: {
          type: String,
          required: [true, "Por favor, forneça o valor do campo service"],
          enum: ["vacina", "exame", "banho", "tosa", "medicamento"],
        },
        service: {
          type: String,
          required: [
            true,
            "Por favor, forneça o valor do campo vaccineAndExams",
          ],
          enum: [
            ...Object.values(Vaccines),
            ...Object.values(HealthExams),
            "banho",
            "tosa",
          ],
        },
        description: {
          type: String,
          default: "",
          maxlength: 40,
        },
        date: {
          type: Date,
          required: [true, "Por favor, forneça o valor do campo Date"],
        },
        vaccineInfo: {
          vaccineType: {
            type: String,
            enum: Object.values(Vaccines),
          },
          doseNumber: {
            type: String,
            enum: ["primeira", "segunda", "terceira", "reforço anual"],
          },
          nextDueDate: {
            type: Date,
          },
        },
        medicationInfo: {
          medicationType: {
            type: String,
            enum: Object.values(Vaccines),
          },
          frequency: {
            type: String,
            enum: [...Frequency],
          },
          nextDueDate: {
            type: Date,
          },
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
