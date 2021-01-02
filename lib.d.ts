declare namespace realtorca {
  type quantity = "0" | "1" | "2" | "3" | "4" | "5";

  // "min-max" if min = max, it searches for the exact value. If it's 1-0, it means it's 1+. Maxes at 5
  type range = `${quantity}-${quantity}`;

  interface Options {
    PropertySearchTypeId: number;
    MaximumResults?: number;
    PriceMin: number; // Defaults to 0
    PriceMax: number;
    LongitudeMin: number; // bottom left longitude of the map view port
    LatitudeMin: number; // bottom left latitude of the map view port
    LongitudeMax: number; // top right longitude of the map view port
    LatitudeMax: number; // top right latitude of the map view port
    UnitRange?: range;
    RecordsPerPage?: number;
    CurrentPage?: number;
    Keywords?: string;
    // Defaults to 2
    TransactionTypeId: number;
    BuildingTypeId: number;

    StoreyRange: range;
    BedRange: range;
    BathRange: range;
  }

  export interface Listings {
    ErrorCode: ErrorCode;
    Paging: Paging;
    Results: Result[];
    Pins: Pin[];
    GroupingLevel: string;
  }

  export interface ErrorCode {
    Id: number;
    Description: string;
    Status: string;
    ProductName: string;
    Version: string;
  }

  export interface Paging {
    RecordsPerPage: number;
    CurrentPage: number;
    TotalRecords: number;
    MaxRecords: number;
    TotalPages: number;
    RecordsShowing: number;
    Pins: number;
  }

  export interface Pin {
    key: string;
    propertyId: string;
    count: number;
    longitude: string;
    latitude: string;
  }

  export interface Result {
    Id: string;
    MlsNumber: string;
    PublicRemarks: string;
    Building: Building;
    Individual: Individual[];
    Property: Property;
    Business: Business;
    Land: Land;
    AlternateURL?: AlternateURL;
    PostalCode: string;
    RelativeDetailsURL: string;
    StatusId: string;
    PhotoChangeDateUTC: string;
    Distance: string;
    RelativeURLEn: string;
    RelativeURLFr: string;
    PriceChangeDateUTC?: string;
    OpenHouseInsertDateUTC?: string;
    ListingTimeZone?: ListingTimeZone;
    ListingBoundary?: ListingBoundary;
    ListingGMT?: ListingGMT;
    HasNewImageUpdate?: boolean;
  }

  export interface AlternateURL {
    DetailsLink?: string;
    VideoLink?: string;
  }

  export interface Building {
    BathroomTotal: string;
    Bedrooms: string;
    StoriesTotal: string;
    Type: BuildingType;
    SizeExterior?: string;
    SizeInterior?: string;
    UnitTotal?: string;
  }

  export enum BuildingType {
    Apartment = "Apartment",
    Duplex = "Duplex",
    House = "House",
  }

  export interface Business {}

  export interface Individual {
    IndividualID: number;
    Name: string;
    Organization: Organization;
    Phones?: Phone[];
    Websites?: Website[];
    Emails: Email[];
    Photo: string;
    Position: Position;
    PermitFreetextEmail: boolean;
    FirstName: string;
    LastName: string;
    CorporationDisplayTypeId: string;
    PermitShowListingLink: boolean;
    RelativeDetailsURL: string;
    AgentPhotoLastUpdated: Date;
    PhotoHighRes: string;
    CorporationName?: string;
    CccMember?: boolean;
    CorporationType?: string;
  }

  export interface Email {
    ContactId: string;
  }

  export interface Organization {
    OrganizationID: number;
    Name: string;
    Logo?: string;
    Address: OrganizationAddress;
    Phones: Phone[];
    Emails: Email[];
    Websites?: Website[];
    OrganizationType: OrganizationType;
    Designation: Designation;
    HasEmail: boolean;
    PermitFreetextEmail: boolean;
    PermitShowListingLink: boolean;
    RelativeDetailsURL: string;
    PhotoLastupdate: string;
  }

  export interface OrganizationAddress {
    AddressText: string;
    DisseminationArea: null;
    PermitShowAddress: boolean;
  }

  export enum Designation {
    RealEstateAgency = "Real Estate Agency",
    RealEstateBroker = "Real Estate Broker",
    ResidentialRealEstateBroker = "Residential Real Estate Broker",
  }

  export enum OrganizationType {
    Firm = "Firm",
  }

  export interface Phone {
    PhoneType: PhoneType;
    PhoneNumber: string;
    AreaCode: string;
    PhoneTypeId: string;
  }

  export enum PhoneType {
    Fax = "Fax",
    Telephone = "Telephone",
  }

  export interface Website {
    Website: string;
    WebsiteTypeId: string;
  }

  export enum Position {
    CertifiedRealEstateBroker = "Certified Real Estate Broker",
    RealEstateBroker = "Real Estate Broker",
    ResidentialRealEstateBroker = "Residential Real Estate Broker",
  }

  export interface Land {
    SizeTotal?: string;
    SizeFrontage?: string;
  }

  export enum ListingBoundary {
    AmericaToronto = "America/Toronto",
  }

  export enum ListingGMT {
    The050000 = "-05:00:00",
  }

  export enum ListingTimeZone {
    EasternStandardTime = "Eastern Standard Time",
  }

  export interface Property {
    Price: string;
    Type: PropertyType;
    Address: PropertyAddress;
    Photo: Photo[];
    Parking?: Parking[];
    ParkingSpaceTotal?: string;
    TypeId: string;
    FarmType: FarmType;
    ZoningType?: ZoningType;
    AmmenitiesNearBy?: string;
    ConvertedPrice: string;
    ParkingType?: string;
    PriceUnformattedValue: string;
    OwnershipType?: OwnershipType;
    OwnershipTypeGroupIds?: number[];
    LeaseRent?: string;
    LeaseRentUnformattedValue?: string;
  }

  export interface PropertyAddress {
    AddressText: string;
    Longitude: string;
    Latitude: string;
    DisseminationArea: null;
    PermitShowAddress: boolean;
  }

  export enum FarmType {
    Carport = "Carport",
    DetachedGarage = "Detached Garage",
    Garage = "Garage",
    IntegratedGarage = "Integrated Garage",
    Other = "Other",
  }

  export enum OwnershipType {
    CondominiumStrata = "Condominium/Strata",
    UndividedCoOwnership = "Undivided Co-ownership",
  }

  export interface Parking {
    Name: FarmType;
  }

  export interface Photo {
    SequenceId: string;
    HighResPath: string;
    MedResPath: string;
    LowResPath: string;
    Description: string;
    LastUpdated: string;
  }

  export enum PropertyType {
    SingleFamily = "Single Family",
  }

  export enum ZoningType {
    Residential = "Residential",
    ResidentialCommercial = "Residential/Commercial",
  }
}

declare module "realtorca" {
  class Realtor {
    static post(options: realtorca.Options): Promise<realtorca.Listings>;
    static getPropertyDetails(options: any): any;
    static builUrl(options: realtorca.Options): any;
  }

  export = Realtor;
}
