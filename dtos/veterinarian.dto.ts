export const medicDTO = (clinicId, medic, animals?) => ({
  medicId: medic.id,
  clinicId: clinicId,
  firstName: medic.firstName,
  lastName: medic.lastName,
  specializationId: medic.specializationId,
  estimatedPrice: medic.estimatedPrice,
  animals: animals.map((animal) => ({
    id: animal.id,
    name: animal.name,
  })),
});

export const getMedicsDTO = (medics) => {
  return medics.map((medic) => {
    return {
      medicId: medic.id,
      clinicId: medic.clinicId,
      firstName: medic.firstName,
      lastName: medic.lastName,
      specializationId: medic.specializationId,
      estimatedPrice: medic.estimatedPrice,
      animals: medic.animals.map((animal) => ({
        id: animal.id,
        name: animal.name,
      })),
    };
  });
};

export const getMedicDetailsDTO = (medic) => ({
  medicId: medic.id,
  clinicId: medic.clinicId,
  firstName: medic.firstName,
  lastName: medic.lastName,
  specializationId: medic.specializationId,
  estimatedPrice: medic.estimatedPrice,
  animals: medic.animals.map((animal) => ({
    id: animal.id,
    name: animal.name,
  })),
});

export const getRecommendedMedicsDTO = (medics) => {
  return medics.map((m) => {
    const medic = m.dataValues;
    const takenSlots = m.takenSlots;
    const clinic = m.clinic;

    return {
      medicId: medic.id,
      clinicId: medic.clinicId,
      firstName: medic.firstName,
      lastName: medic.lastName,
      specializationId: medic.specializationId,
      estimatedPrice: medic.estimatedPrice,
      animals: medic.animals.map((animal) => ({
        id: animal.id,
        name: animal.name,
      })),
      takenSlots,
      clinic: {
        id: clinic.id,
        phoneNumber: m.phoneNumber,
        address: clinic.address,
        name: clinic.name,
      },
    };
  });
};
