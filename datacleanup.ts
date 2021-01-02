import fs from "fs";
import path from "path";

const dir = "./data";

const dirs = fs.readdirSync(dir);

const result =
  dirs.flatMap((filename) => {
    const path_ = path.join(dir, filename);
    const raw = fs.readFileSync(path_).toString("utf-8");
    const listings = (JSON.parse(raw) as unknown) as realtorca.Listings;
    return listings.Results;
  })
  .map((listing) => {
    const size = listing.Building.SizeInterior?.trim().split(" ");

    if (!size) {
      return listing;
    }

    if (size?.length == 2 && size[1] == "m2") {
      listing.Building.SizeInterior = (parseInt(size[0]) * 10.7639).toString();
    } else if (size?.length == 2 && size[1] == "sqft") {
      listing.Building.SizeInterior = size[0];
    } else {
      console.error(`Unmatched case ${listing.Building.SizeInterior}`);
      process.exit(1);
    }

    return listing;
  });

console.log(JSON.stringify(result, null, 2));
