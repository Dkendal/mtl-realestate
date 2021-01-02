/***
 * Script to download listings from realtor.ca. Dumps results into
 * ./data, numbers output based on the page number. Requests 200 records
 * per page. You may be throttled by bot mitigation, in which case you'll
 * receive a 403 - there's a broken exponential back off included.
 */

import fs from "fs";
import realtor from "realtorca";

const enum TransactionType {
  ForSaleOrRent = 1,
  ForSale = 2,
  ForRent = 3,
}

const enum PropertySearchType {
  NoPreference = 0,
  Residential = 1,
  Recreational = 2,
  CondoStrata = 3,
  Agriculture = 4,
  Parking = 5,
  VacantLand = 6,
  MultiFamily = 8,
}

const enum BuildingType {
  Any = 0,
  House = 1,
  Duplex = 2,
  Triplex = 3,
  ResidentialCommercialMix = 5,
  MobileHome = 6,
  SpecialPurpose = 12,
  Other = 14,
  RowTownhouse = 16,
  Apartment = 17,
  Fourplex = 19,
  GardenHome = 20,
  ManufacturedHomeMobile = 27,
  CommercialApartment = 28,
  ManufacturedHome = 29,
}

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

// set yrange [45.383957:45.55389433712455]
// set xrange [-73.803308:-73.48108512388674]
//https://www.openstreetmap.org/query?lat=45.383957&lon=-73.803308#map=15/45.55389433712455/-73.48108512388674
// -73.803308, 45.383957
//
const LatitudeMin = 45.383957;
const LatitudeMax = 45.55389433712455;
const LongitudeMin = -73.803308;
const LongitudeMax = -73.48108512388674;
const startPage = 1;
let totalPages = 2;

const options: realtorca.Options = {
  TransactionTypeId: TransactionType.ForSale,
  BuildingTypeId: BuildingType.Any,
  PropertySearchTypeId: PropertySearchType.NoPreference,
  CurrentPage: 1,
  LatitudeMin,
  LatitudeMax,
  LongitudeMin,
  LongitudeMax,
  PriceMin: 200_000,
  PriceMax: 1_000_000,
  RecordsPerPage: 200,
  // MaximumResults: 3000,
  BedRange: "1-0",
  BathRange: "1-0",
  StoreyRange: "1-0",
};

async function download() {
  // TODO check the response and change the max page number
  for (let page = startPage; page <= totalPages; page++) {
    let attempt = 1;
    let baseWaitTime = 200;
    const waitMs = () => 2 ** attempt++ + baseWaitTime;

    async function request(): Promise<void> {
      let result;

      try {
        console.log(`Request page ${page}: attempt ${attempt}`);
        result = await realtor.post({ ...options, CurrentPage: page });
      } catch (error) {
        if (error.statusCode === 403) {
          console.error(error.statusCode);
          await timer(waitMs());
          return await request();
        }

        throw error;
      }

        if (result.ErrorCode.Id !== 200) {
          console.error(result.ErrorCode);
          process.exit(1);
        }

        console.log(result.Paging);

        totalPages = result.Paging.TotalPages;

        const fileName = `./data/out.${page}.json`;
        const data = JSON.stringify(result, null, 2);

        console.log(`Writing ${fileName}`);

        fs.writeFileSync(fileName, data);
        console.log(`Wrote ${fileName}`);
        return
    }

    await request();
    console.log("Waiting, to be nice...");
    await timer(200);
  }
}

download();
