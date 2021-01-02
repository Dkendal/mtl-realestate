# Project overview

- ./download.ts :: Download script
- ./datacleanup.ts :: Preprocessing script
- ./data/ :: raw data output, paginated results
- ./data.json :: concatenated preprocessed json
- ./data.vd :: Visidata cmdlog to select relevant fields for a csv
- ./data.csv :: final output

# Setup

Install node modules and visidata

```
npm install
```

# Data collection

Run

```
npx ts-node ./download.ts
```

or

```
npx tsc
node ./download.js
```

The download script will download all results to the ./data folder as JSON.

# Data cleanup and concatenation

Reads all page files from ./data/, cleans fields and writes to stdout.

```
npx ts-node ./datacleanup.ts > data.json
```

# Selecting fields

Use whatever tool you want to select the relevant fields from the final JSON,

I've used visidata, you can recreate the results in data.csv by running

```
vd data.json --play data.vd --batch --output data.tsv
```
