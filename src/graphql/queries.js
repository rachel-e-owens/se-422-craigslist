/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getNote = /* GraphQL */ `
  query GetNote($id: ID!) {
    getNote(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listNotes = /* GraphQL */ `
  query ListNotes(
    $filter: ModelNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getForSale = /* GraphQL */ `
  query GetForSale($id: ID!) {
    getForSale(id: $id) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const listForSales = /* GraphQL */ `
  query ListForSales(
    $filter: ModelForSaleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForSales(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHousing = /* GraphQL */ `
  query GetHousing($id: ID!) {
    getHousing(id: $id) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const listHousings = /* GraphQL */ `
  query ListHousings(
    $filter: ModelHousingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHousings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getServices = /* GraphQL */ `
  query GetServices($id: ID!) {
    getServices(id: $id) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const listServicess = /* GraphQL */ `
  query ListServicess(
    $filter: ModelServicesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listServicess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getJobs = /* GraphQL */ `
  query GetJobs($id: ID!) {
    getJobs(id: $id) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const listJobss = /* GraphQL */ `
  query ListJobss(
    $filter: ModelJobsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJobss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCommunity = /* GraphQL */ `
  query GetCommunity($id: ID!) {
    getCommunity(id: $id) {
      id
      type
      createdAt
      updatedAt
    }
  }
`;
export const listCommunitys = /* GraphQL */ `
  query ListCommunitys(
    $filter: ModelCommunityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommunitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCarsTrucks = /* GraphQL */ `
  query GetCarsTrucks($id: ID!) {
    getCarsTrucks(id: $id) {
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
export const listCarsTruckss = /* GraphQL */ `
  query ListCarsTruckss(
    $filter: ModelCarsTrucksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCarsTruckss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMotorcycles = /* GraphQL */ `
  query GetMotorcycles($id: ID!) {
    getMotorcycles(id: $id) {
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
export const listMotorcycless = /* GraphQL */ `
  query ListMotorcycless(
    $filter: ModelMotorcyclesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMotorcycless(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBoats = /* GraphQL */ `
  query GetBoats($id: ID!) {
    getBoats(id: $id) {
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
export const listBoatss = /* GraphQL */ `
  query ListBoatss(
    $filter: ModelBoatsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBoatss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBooks = /* GraphQL */ `
  query GetBooks($id: ID!) {
    getBooks(id: $id) {
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
export const listBookss = /* GraphQL */ `
  query ListBookss(
    $filter: ModelBooksFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFurniture = /* GraphQL */ `
  query GetFurniture($id: ID!) {
    getFurniture(id: $id) {
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
export const listFurnitures = /* GraphQL */ `
  query ListFurnitures(
    $filter: ModelFurnitureFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFurnitures(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAptHousing = /* GraphQL */ `
  query GetAptHousing($id: ID!) {
    getAptHousing(id: $id) {
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
export const listAptHousings = /* GraphQL */ `
  query ListAptHousings(
    $filter: ModelAptHousingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAptHousings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCommercial = /* GraphQL */ `
  query GetCommercial($id: ID!) {
    getCommercial(id: $id) {
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
export const listCommercials = /* GraphQL */ `
  query ListCommercials(
    $filter: ModelCommercialFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCommercials(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getStorageParking = /* GraphQL */ `
  query GetStorageParking($id: ID!) {
    getStorageParking(id: $id) {
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
export const listStorageParkings = /* GraphQL */ `
  query ListStorageParkings(
    $filter: ModelStorageParkingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStorageParkings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSublet = /* GraphQL */ `
  query GetSublet($id: ID!) {
    getSublet(id: $id) {
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
export const listSublets = /* GraphQL */ `
  query ListSublets(
    $filter: ModelSubletFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSublets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getVacationRental = /* GraphQL */ `
  query GetVacationRental($id: ID!) {
    getVacationRental(id: $id) {
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
export const listVacationRentals = /* GraphQL */ `
  query ListVacationRentals(
    $filter: ModelVacationRentalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVacationRentals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getAutomotive = /* GraphQL */ `
  query GetAutomotive($id: ID!) {
    getAutomotive(id: $id) {
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
export const listAutomotives = /* GraphQL */ `
  query ListAutomotives(
    $filter: ModelAutomotiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAutomotives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        posting_title
        location
        city
        phone
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBeauty = /* GraphQL */ `
  query GetBeauty($id: ID!) {
    getBeauty(id: $id) {
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
export const listBeautys = /* GraphQL */ `
  query ListBeautys(
    $filter: ModelBeautyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBeautys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLaborMoving = /* GraphQL */ `
  query GetLaborMoving($id: ID!) {
    getLaborMoving(id: $id) {
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
export const listLaborMovings = /* GraphQL */ `
  query ListLaborMovings(
    $filter: ModelLaborMovingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLaborMovings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getComputer = /* GraphQL */ `
  query GetComputer($id: ID!) {
    getComputer(id: $id) {
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
export const listComputers = /* GraphQL */ `
  query ListComputers(
    $filter: ModelComputerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComputers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        posting_title
        location
        city
        phone
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getHousehold = /* GraphQL */ `
  query GetHousehold($id: ID!) {
    getHousehold(id: $id) {
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
export const listHouseholds = /* GraphQL */ `
  query ListHouseholds(
    $filter: ModelHouseholdFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHouseholds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getFinance = /* GraphQL */ `
  query GetFinance($id: ID!) {
    getFinance(id: $id) {
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
export const listFinances = /* GraphQL */ `
  query ListFinances(
    $filter: ModelFinanceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFinances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getSoftware = /* GraphQL */ `
  query GetSoftware($id: ID!) {
    getSoftware(id: $id) {
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
export const listSoftwares = /* GraphQL */ `
  query ListSoftwares(
    $filter: ModelSoftwareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSoftwares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getCustomerService = /* GraphQL */ `
  query GetCustomerService($id: ID!) {
    getCustomerService(id: $id) {
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
export const listCustomerServices = /* GraphQL */ `
  query ListCustomerServices(
    $filter: ModelCustomerServiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomerServices(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getRealEstate = /* GraphQL */ `
  query GetRealEstate($id: ID!) {
    getRealEstate(id: $id) {
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
export const listRealEstates = /* GraphQL */ `
  query ListRealEstates(
    $filter: ModelRealEstateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRealEstates(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLegal = /* GraphQL */ `
  query GetLegal($id: ID!) {
    getLegal(id: $id) {
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
export const listLegals = /* GraphQL */ `
  query ListLegals(
    $filter: ModelLegalFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLegals(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getPets = /* GraphQL */ `
  query GetPets($id: ID!) {
    getPets(id: $id) {
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
export const listPetss = /* GraphQL */ `
  query ListPetss(
    $filter: ModelPetsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPetss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getChildcare = /* GraphQL */ `
  query GetChildcare($id: ID!) {
    getChildcare(id: $id) {
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
export const listChildcares = /* GraphQL */ `
  query ListChildcares(
    $filter: ModelChildcareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChildcares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getVolunteers = /* GraphQL */ `
  query GetVolunteers($id: ID!) {
    getVolunteers(id: $id) {
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
export const listVolunteerss = /* GraphQL */ `
  query ListVolunteerss(
    $filter: ModelVolunteersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVolunteerss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getLostFound = /* GraphQL */ `
  query GetLostFound($id: ID!) {
    getLostFound(id: $id) {
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
export const listLostFounds = /* GraphQL */ `
  query ListLostFounds(
    $filter: ModelLostFoundFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLostFounds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMusician = /* GraphQL */ `
  query GetMusician($id: ID!) {
    getMusician(id: $id) {
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
export const listMusicians = /* GraphQL */ `
  query ListMusicians(
    $filter: ModelMusicianFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMusicians(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
