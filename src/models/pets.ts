import mongoose, { Schema, Types } from "mongoose";
import { PetsDocument } from "../interfaces/models";

enum Vaccines {
  POLIVALENT = "Vacina Polivalente",
  RABIES = "Vacina Antirrábica",
  GIARDIA = "Vacina contra Giárdia",
  LEISHMANIOSIS = "Vacina contra a Leishmaniose",
  CANINE_FLU = "Vacina contra a gripe canina",
  LEPTOSPIROSIS = "Vacina contra a Leptospirose",
  QUINTUPLE = "Vacina Quíntupla",
  TRIPLE = "Vacina Tríplice",
  FELINE_LEUKEMIA = "Vacina contra a Leucemia Felina",
  CHLAMYDIOSIS = "Vacina contra a Clamidiose",
}
enum HealthExams {
  BLOOD_TEST = "Exame de Sangue",
  URINE_ANALYSIS = "Análise de Urina",
  X_RAY = "Raio-X",
  ULTRASOUND = "Ultrassom",
  FECAL_EXAM = "Exame de Fezes",
  DENTAL_CHECKUP = "Check-up Dentário",
  HEARTWORM_TEST = "Teste de Dirofilariose",
  ALLERGY_TEST = "Teste de Alergia",
  SKIN_SCRAPING = "Raspagem de Pele",
  EYE_EXAM = "Exame Oftalmológico",
  BLOOD_PRESSURE_CHECK = "Verificação de Pressão Sanguínea",
  DERMATOLOGY_EXAM = "Exame Dermatológico",
  DOPPLER_TEST = "Teste Doppler",
  MRI_SCAN = "Ressonância Magnética",
  ELECTROCARDIOGRAM = "Eletrocardiograma",
  ENDOSCOPY = "Endoscopia",
  ARTHRITIS_CHECK = "Avaliação de Artrite",
  DIABETES_MONITORING = "Monitoramento de Diabetes",
  THYROID_FUNCTION_TEST = "Teste de Função da Tireoide",
  CANCER_SCREENING = "Rastreamento de Câncer",
}

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
        serviceType: {
          type: String,
          required: [true, "Por favor, forneça o valor do campo service"],
          enum: ["vacina", "exame", "banho", "tosa"],
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
