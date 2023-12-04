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

const Frequency = [
  "5 dias",
  "10 dias",
  "15 dias",
  "1 mês",
  "2 meses",
  "3 meses",
  "6 meses",
  "1 ano",
];

export { Vaccines, HealthExams, Frequency };
