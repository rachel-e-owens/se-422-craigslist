/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createNote = /* GraphQL */ `
  mutation CreateNote(
    $input: CreateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    createNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateNote = /* GraphQL */ `
  mutation UpdateNote(
    $input: UpdateNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    updateNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteNote = /* GraphQL */ `
  mutation DeleteNote(
    $input: DeleteNoteInput!
    $condition: ModelNoteConditionInput
  ) {
    deleteNote(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const createForSale = /* GraphQL */ `
  mutation CreateForSale(
    $input: CreateForSaleInput!
    $condition: ModelForSaleConditionInput
  ) {
    createForSale(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateForSale = /* GraphQL */ `
  mutation UpdateForSale(
    $input: UpdateForSaleInput!
    $condition: ModelForSaleConditionInput
  ) {
    updateForSale(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteForSale = /* GraphQL */ `
  mutation DeleteForSale(
    $input: DeleteForSaleInput!
    $condition: ModelForSaleConditionInput
  ) {
    deleteForSale(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const createHousing = /* GraphQL */ `
  mutation CreateHousing(
    $input: CreateHousingInput!
    $condition: ModelHousingConditionInput
  ) {
    createHousing(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateHousing = /* GraphQL */ `
  mutation UpdateHousing(
    $input: UpdateHousingInput!
    $condition: ModelHousingConditionInput
  ) {
    updateHousing(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteHousing = /* GraphQL */ `
  mutation DeleteHousing(
    $input: DeleteHousingInput!
    $condition: ModelHousingConditionInput
  ) {
    deleteHousing(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const createServices = /* GraphQL */ `
  mutation CreateServices(
    $input: CreateServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    createServices(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateServices = /* GraphQL */ `
  mutation UpdateServices(
    $input: UpdateServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    updateServices(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteServices = /* GraphQL */ `
  mutation DeleteServices(
    $input: DeleteServicesInput!
    $condition: ModelServicesConditionInput
  ) {
    deleteServices(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const createJobs = /* GraphQL */ `
  mutation CreateJobs(
    $input: CreateJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    createJobs(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateJobs = /* GraphQL */ `
  mutation UpdateJobs(
    $input: UpdateJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    updateJobs(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteJobs = /* GraphQL */ `
  mutation DeleteJobs(
    $input: DeleteJobsInput!
    $condition: ModelJobsConditionInput
  ) {
    deleteJobs(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const createCommunity = /* GraphQL */ `
  mutation CreateCommunity(
    $input: CreateCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    createCommunity(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateCommunity = /* GraphQL */ `
  mutation UpdateCommunity(
    $input: UpdateCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    updateCommunity(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommunity = /* GraphQL */ `
  mutation DeleteCommunity(
    $input: DeleteCommunityInput!
    $condition: ModelCommunityConditionInput
  ) {
    deleteCommunity(input: $input, condition: $condition) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const createCarsTrucks = /* GraphQL */ `
  mutation CreateCarsTrucks(
    $input: CreateCarsTrucksInput!
    $condition: ModelCarsTrucksConditionInput
  ) {
    createCarsTrucks(input: $input, condition: $condition) {
      id
      build_year
      make_model
      color
      type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateCarsTrucks = /* GraphQL */ `
  mutation UpdateCarsTrucks(
    $input: UpdateCarsTrucksInput!
    $condition: ModelCarsTrucksConditionInput
  ) {
    updateCarsTrucks(input: $input, condition: $condition) {
      id
      build_year
      make_model
      color
      type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteCarsTrucks = /* GraphQL */ `
  mutation DeleteCarsTrucks(
    $input: DeleteCarsTrucksInput!
    $condition: ModelCarsTrucksConditionInput
  ) {
    deleteCarsTrucks(input: $input, condition: $condition) {
      id
      build_year
      make_model
      color
      type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createMotorcycles = /* GraphQL */ `
  mutation CreateMotorcycles(
    $input: CreateMotorcyclesInput!
    $condition: ModelMotorcyclesConditionInput
  ) {
    createMotorcycles(input: $input, condition: $condition) {
      id
      build_year
      make_model
      color
      type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateMotorcycles = /* GraphQL */ `
  mutation UpdateMotorcycles(
    $input: UpdateMotorcyclesInput!
    $condition: ModelMotorcyclesConditionInput
  ) {
    updateMotorcycles(input: $input, condition: $condition) {
      id
      build_year
      make_model
      color
      type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteMotorcycles = /* GraphQL */ `
  mutation DeleteMotorcycles(
    $input: DeleteMotorcyclesInput!
    $condition: ModelMotorcyclesConditionInput
  ) {
    deleteMotorcycles(input: $input, condition: $condition) {
      id
      build_year
      make_model
      color
      type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createBoats = /* GraphQL */ `
  mutation CreateBoats(
    $input: CreateBoatsInput!
    $condition: ModelBoatsConditionInput
  ) {
    createBoats(input: $input, condition: $condition) {
      id
      build_year
      make_manufacturer
      enginge_hours
      length
      model_name
      model_number
      propulsion_type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateBoats = /* GraphQL */ `
  mutation UpdateBoats(
    $input: UpdateBoatsInput!
    $condition: ModelBoatsConditionInput
  ) {
    updateBoats(input: $input, condition: $condition) {
      id
      build_year
      make_manufacturer
      enginge_hours
      length
      model_name
      model_number
      propulsion_type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteBoats = /* GraphQL */ `
  mutation DeleteBoats(
    $input: DeleteBoatsInput!
    $condition: ModelBoatsConditionInput
  ) {
    deleteBoats(input: $input, condition: $condition) {
      id
      build_year
      make_manufacturer
      enginge_hours
      length
      model_name
      model_number
      propulsion_type
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createBooks = /* GraphQL */ `
  mutation CreateBooks(
    $input: CreateBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    createBooks(input: $input, condition: $condition) {
      id
      year_written
      title
      author
      condition
      dimension_width
      dimension_height
      dimension_length
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateBooks = /* GraphQL */ `
  mutation UpdateBooks(
    $input: UpdateBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    updateBooks(input: $input, condition: $condition) {
      id
      year_written
      title
      author
      condition
      dimension_width
      dimension_height
      dimension_length
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteBooks = /* GraphQL */ `
  mutation DeleteBooks(
    $input: DeleteBooksInput!
    $condition: ModelBooksConditionInput
  ) {
    deleteBooks(input: $input, condition: $condition) {
      id
      year_written
      title
      author
      condition
      dimension_width
      dimension_height
      dimension_length
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createFurniture = /* GraphQL */ `
  mutation CreateFurniture(
    $input: CreateFurnitureInput!
    $condition: ModelFurnitureConditionInput
  ) {
    createFurniture(input: $input, condition: $condition) {
      id
      make_manufacturer
      name
      dimension_width
      dimension_height
      dimension_length
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateFurniture = /* GraphQL */ `
  mutation UpdateFurniture(
    $input: UpdateFurnitureInput!
    $condition: ModelFurnitureConditionInput
  ) {
    updateFurniture(input: $input, condition: $condition) {
      id
      make_manufacturer
      name
      dimension_width
      dimension_height
      dimension_length
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteFurniture = /* GraphQL */ `
  mutation DeleteFurniture(
    $input: DeleteFurnitureInput!
    $condition: ModelFurnitureConditionInput
  ) {
    deleteFurniture(input: $input, condition: $condition) {
      id
      make_manufacturer
      name
      dimension_width
      dimension_height
      dimension_length
      condition
      price
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createAptHousing = /* GraphQL */ `
  mutation CreateAptHousing(
    $input: CreateAptHousingInput!
    $condition: ModelAptHousingConditionInput
  ) {
    createAptHousing(input: $input, condition: $condition) {
      id
      housing_type
      Laundry
      Parking
      animals
      handicap_accessible
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      availability
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateAptHousing = /* GraphQL */ `
  mutation UpdateAptHousing(
    $input: UpdateAptHousingInput!
    $condition: ModelAptHousingConditionInput
  ) {
    updateAptHousing(input: $input, condition: $condition) {
      id
      housing_type
      Laundry
      Parking
      animals
      handicap_accessible
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      availability
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteAptHousing = /* GraphQL */ `
  mutation DeleteAptHousing(
    $input: DeleteAptHousingInput!
    $condition: ModelAptHousingConditionInput
  ) {
    deleteAptHousing(input: $input, condition: $condition) {
      id
      housing_type
      Laundry
      Parking
      animals
      handicap_accessible
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      availability
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createCommercial = /* GraphQL */ `
  mutation CreateCommercial(
    $input: CreateCommercialInput!
    $condition: ModelCommercialConditionInput
  ) {
    createCommercial(input: $input, condition: $condition) {
      id
      sqft
      handicap_accessible
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateCommercial = /* GraphQL */ `
  mutation UpdateCommercial(
    $input: UpdateCommercialInput!
    $condition: ModelCommercialConditionInput
  ) {
    updateCommercial(input: $input, condition: $condition) {
      id
      sqft
      handicap_accessible
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteCommercial = /* GraphQL */ `
  mutation DeleteCommercial(
    $input: DeleteCommercialInput!
    $condition: ModelCommercialConditionInput
  ) {
    deleteCommercial(input: $input, condition: $condition) {
      id
      sqft
      handicap_accessible
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createStorageParking = /* GraphQL */ `
  mutation CreateStorageParking(
    $input: CreateStorageParkingInput!
    $condition: ModelStorageParkingConditionInput
  ) {
    createStorageParking(input: $input, condition: $condition) {
      id
      type
      handicap_accessible
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateStorageParking = /* GraphQL */ `
  mutation UpdateStorageParking(
    $input: UpdateStorageParkingInput!
    $condition: ModelStorageParkingConditionInput
  ) {
    updateStorageParking(input: $input, condition: $condition) {
      id
      type
      handicap_accessible
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteStorageParking = /* GraphQL */ `
  mutation DeleteStorageParking(
    $input: DeleteStorageParkingInput!
    $condition: ModelStorageParkingConditionInput
  ) {
    deleteStorageParking(input: $input, condition: $condition) {
      id
      type
      handicap_accessible
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createSublet = /* GraphQL */ `
  mutation CreateSublet(
    $input: CreateSubletInput!
    $condition: ModelSubletConditionInput
  ) {
    createSublet(input: $input, condition: $condition) {
      id
      housing_type
      private_room
      private_bath
      laundry
      parking
      handicap_accessible
      animals
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      rent_period
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateSublet = /* GraphQL */ `
  mutation UpdateSublet(
    $input: UpdateSubletInput!
    $condition: ModelSubletConditionInput
  ) {
    updateSublet(input: $input, condition: $condition) {
      id
      housing_type
      private_room
      private_bath
      laundry
      parking
      handicap_accessible
      animals
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      rent_period
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteSublet = /* GraphQL */ `
  mutation DeleteSublet(
    $input: DeleteSubletInput!
    $condition: ModelSubletConditionInput
  ) {
    deleteSublet(input: $input, condition: $condition) {
      id
      housing_type
      private_room
      private_bath
      laundry
      parking
      handicap_accessible
      animals
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      rent_period
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createVacationRental = /* GraphQL */ `
  mutation CreateVacationRental(
    $input: CreateVacationRentalInput!
    $condition: ModelVacationRentalConditionInput
  ) {
    createVacationRental(input: $input, condition: $condition) {
      id
      housing_type
      laundry
      parking
      handicap_accessible
      animals
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      availability
      rent_period
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateVacationRental = /* GraphQL */ `
  mutation UpdateVacationRental(
    $input: UpdateVacationRentalInput!
    $condition: ModelVacationRentalConditionInput
  ) {
    updateVacationRental(input: $input, condition: $condition) {
      id
      housing_type
      laundry
      parking
      handicap_accessible
      animals
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      availability
      rent_period
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteVacationRental = /* GraphQL */ `
  mutation DeleteVacationRental(
    $input: DeleteVacationRentalInput!
    $condition: ModelVacationRentalConditionInput
  ) {
    deleteVacationRental(input: $input, condition: $condition) {
      id
      housing_type
      laundry
      parking
      handicap_accessible
      animals
      num_bedrooms
      num_bathrooms
      flooring
      sqft
      availability
      rent_period
      rent
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createAutomotive = /* GraphQL */ `
  mutation CreateAutomotive(
    $input: CreateAutomotiveInput!
    $condition: ModelAutomotiveConditionInput
  ) {
    createAutomotive(input: $input, condition: $condition) {
      id
      posting_title
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateAutomotive = /* GraphQL */ `
  mutation UpdateAutomotive(
    $input: UpdateAutomotiveInput!
    $condition: ModelAutomotiveConditionInput
  ) {
    updateAutomotive(input: $input, condition: $condition) {
      id
      posting_title
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteAutomotive = /* GraphQL */ `
  mutation DeleteAutomotive(
    $input: DeleteAutomotiveInput!
    $condition: ModelAutomotiveConditionInput
  ) {
    deleteAutomotive(input: $input, condition: $condition) {
      id
      posting_title
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createBeauty = /* GraphQL */ `
  mutation CreateBeauty(
    $input: CreateBeautyInput!
    $condition: ModelBeautyConditionInput
  ) {
    createBeauty(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateBeauty = /* GraphQL */ `
  mutation UpdateBeauty(
    $input: UpdateBeautyInput!
    $condition: ModelBeautyConditionInput
  ) {
    updateBeauty(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteBeauty = /* GraphQL */ `
  mutation DeleteBeauty(
    $input: DeleteBeautyInput!
    $condition: ModelBeautyConditionInput
  ) {
    deleteBeauty(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createLaborMoving = /* GraphQL */ `
  mutation CreateLaborMoving(
    $input: CreateLaborMovingInput!
    $condition: ModelLaborMovingConditionInput
  ) {
    createLaborMoving(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateLaborMoving = /* GraphQL */ `
  mutation UpdateLaborMoving(
    $input: UpdateLaborMovingInput!
    $condition: ModelLaborMovingConditionInput
  ) {
    updateLaborMoving(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteLaborMoving = /* GraphQL */ `
  mutation DeleteLaborMoving(
    $input: DeleteLaborMovingInput!
    $condition: ModelLaborMovingConditionInput
  ) {
    deleteLaborMoving(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createComputer = /* GraphQL */ `
  mutation CreateComputer(
    $input: CreateComputerInput!
    $condition: ModelComputerConditionInput
  ) {
    createComputer(input: $input, condition: $condition) {
      id
      posting_title
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateComputer = /* GraphQL */ `
  mutation UpdateComputer(
    $input: UpdateComputerInput!
    $condition: ModelComputerConditionInput
  ) {
    updateComputer(input: $input, condition: $condition) {
      id
      posting_title
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteComputer = /* GraphQL */ `
  mutation DeleteComputer(
    $input: DeleteComputerInput!
    $condition: ModelComputerConditionInput
  ) {
    deleteComputer(input: $input, condition: $condition) {
      id
      posting_title
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createHousehold = /* GraphQL */ `
  mutation CreateHousehold(
    $input: CreateHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    createHousehold(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateHousehold = /* GraphQL */ `
  mutation UpdateHousehold(
    $input: UpdateHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    updateHousehold(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteHousehold = /* GraphQL */ `
  mutation DeleteHousehold(
    $input: DeleteHouseholdInput!
    $condition: ModelHouseholdConditionInput
  ) {
    deleteHousehold(input: $input, condition: $condition) {
      id
      posting_title
      type
      location
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createFinance = /* GraphQL */ `
  mutation CreateFinance(
    $input: CreateFinanceInput!
    $condition: ModelFinanceConditionInput
  ) {
    createFinance(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateFinance = /* GraphQL */ `
  mutation UpdateFinance(
    $input: UpdateFinanceInput!
    $condition: ModelFinanceConditionInput
  ) {
    updateFinance(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteFinance = /* GraphQL */ `
  mutation DeleteFinance(
    $input: DeleteFinanceInput!
    $condition: ModelFinanceConditionInput
  ) {
    deleteFinance(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createSoftware = /* GraphQL */ `
  mutation CreateSoftware(
    $input: CreateSoftwareInput!
    $condition: ModelSoftwareConditionInput
  ) {
    createSoftware(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateSoftware = /* GraphQL */ `
  mutation UpdateSoftware(
    $input: UpdateSoftwareInput!
    $condition: ModelSoftwareConditionInput
  ) {
    updateSoftware(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteSoftware = /* GraphQL */ `
  mutation DeleteSoftware(
    $input: DeleteSoftwareInput!
    $condition: ModelSoftwareConditionInput
  ) {
    deleteSoftware(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createCustomerService = /* GraphQL */ `
  mutation CreateCustomerService(
    $input: CreateCustomerServiceInput!
    $condition: ModelCustomerServiceConditionInput
  ) {
    createCustomerService(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateCustomerService = /* GraphQL */ `
  mutation UpdateCustomerService(
    $input: UpdateCustomerServiceInput!
    $condition: ModelCustomerServiceConditionInput
  ) {
    updateCustomerService(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteCustomerService = /* GraphQL */ `
  mutation DeleteCustomerService(
    $input: DeleteCustomerServiceInput!
    $condition: ModelCustomerServiceConditionInput
  ) {
    deleteCustomerService(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createRealEstate = /* GraphQL */ `
  mutation CreateRealEstate(
    $input: CreateRealEstateInput!
    $condition: ModelRealEstateConditionInput
  ) {
    createRealEstate(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateRealEstate = /* GraphQL */ `
  mutation UpdateRealEstate(
    $input: UpdateRealEstateInput!
    $condition: ModelRealEstateConditionInput
  ) {
    updateRealEstate(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteRealEstate = /* GraphQL */ `
  mutation DeleteRealEstate(
    $input: DeleteRealEstateInput!
    $condition: ModelRealEstateConditionInput
  ) {
    deleteRealEstate(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createLegal = /* GraphQL */ `
  mutation CreateLegal(
    $input: CreateLegalInput!
    $condition: ModelLegalConditionInput
  ) {
    createLegal(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateLegal = /* GraphQL */ `
  mutation UpdateLegal(
    $input: UpdateLegalInput!
    $condition: ModelLegalConditionInput
  ) {
    updateLegal(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteLegal = /* GraphQL */ `
  mutation DeleteLegal(
    $input: DeleteLegalInput!
    $condition: ModelLegalConditionInput
  ) {
    deleteLegal(input: $input, condition: $condition) {
      id
      job_title
      job_seeker
      job_poster
      compensation
      job_type
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createPets = /* GraphQL */ `
  mutation CreatePets(
    $input: CreatePetsInput!
    $condition: ModelPetsConditionInput
  ) {
    createPets(input: $input, condition: $condition) {
      id
      posting_title
      animal_type
      animal_breed
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updatePets = /* GraphQL */ `
  mutation UpdatePets(
    $input: UpdatePetsInput!
    $condition: ModelPetsConditionInput
  ) {
    updatePets(input: $input, condition: $condition) {
      id
      posting_title
      animal_type
      animal_breed
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deletePets = /* GraphQL */ `
  mutation DeletePets(
    $input: DeletePetsInput!
    $condition: ModelPetsConditionInput
  ) {
    deletePets(input: $input, condition: $condition) {
      id
      posting_title
      animal_type
      animal_breed
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createChildcare = /* GraphQL */ `
  mutation CreateChildcare(
    $input: CreateChildcareInput!
    $condition: ModelChildcareConditionInput
  ) {
    createChildcare(input: $input, condition: $condition) {
      id
      posting_title
      private
      group
      available_hours
      age_range
      pay_rate
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateChildcare = /* GraphQL */ `
  mutation UpdateChildcare(
    $input: UpdateChildcareInput!
    $condition: ModelChildcareConditionInput
  ) {
    updateChildcare(input: $input, condition: $condition) {
      id
      posting_title
      private
      group
      available_hours
      age_range
      pay_rate
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteChildcare = /* GraphQL */ `
  mutation DeleteChildcare(
    $input: DeleteChildcareInput!
    $condition: ModelChildcareConditionInput
  ) {
    deleteChildcare(input: $input, condition: $condition) {
      id
      posting_title
      private
      group
      available_hours
      age_range
      pay_rate
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createVolunteers = /* GraphQL */ `
  mutation CreateVolunteers(
    $input: CreateVolunteersInput!
    $condition: ModelVolunteersConditionInput
  ) {
    createVolunteers(input: $input, condition: $condition) {
      id
      posting_title
      event_type
      date
      hours
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateVolunteers = /* GraphQL */ `
  mutation UpdateVolunteers(
    $input: UpdateVolunteersInput!
    $condition: ModelVolunteersConditionInput
  ) {
    updateVolunteers(input: $input, condition: $condition) {
      id
      posting_title
      event_type
      date
      hours
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteVolunteers = /* GraphQL */ `
  mutation DeleteVolunteers(
    $input: DeleteVolunteersInput!
    $condition: ModelVolunteersConditionInput
  ) {
    deleteVolunteers(input: $input, condition: $condition) {
      id
      posting_title
      event_type
      date
      hours
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createLostFound = /* GraphQL */ `
  mutation CreateLostFound(
    $input: CreateLostFoundInput!
    $condition: ModelLostFoundConditionInput
  ) {
    createLostFound(input: $input, condition: $condition) {
      id
      posting_title
      lost
      found
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateLostFound = /* GraphQL */ `
  mutation UpdateLostFound(
    $input: UpdateLostFoundInput!
    $condition: ModelLostFoundConditionInput
  ) {
    updateLostFound(input: $input, condition: $condition) {
      id
      posting_title
      lost
      found
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteLostFound = /* GraphQL */ `
  mutation DeleteLostFound(
    $input: DeleteLostFoundInput!
    $condition: ModelLostFoundConditionInput
  ) {
    deleteLostFound(input: $input, condition: $condition) {
      id
      posting_title
      lost
      found
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const createMusician = /* GraphQL */ `
  mutation CreateMusician(
    $input: CreateMusicianInput!
    $condition: ModelMusicianConditionInput
  ) {
    createMusician(input: $input, condition: $condition) {
      id
      posting_title
      type
      genre
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateMusician = /* GraphQL */ `
  mutation UpdateMusician(
    $input: UpdateMusicianInput!
    $condition: ModelMusicianConditionInput
  ) {
    updateMusician(input: $input, condition: $condition) {
      id
      posting_title
      type
      genre
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteMusician = /* GraphQL */ `
  mutation DeleteMusician(
    $input: DeleteMusicianInput!
    $condition: ModelMusicianConditionInput
  ) {
    deleteMusician(input: $input, condition: $condition) {
      id
      posting_title
      type
      genre
      city
      phone
      image
      createdAt
      updatedAt
    }
  }
`;
