# eventbridgeschema-to-typescript

Little CLI tool to download and generate typescript interface from aws eventbridge schema.

## Why this project

I made this project cause the typescript generator for eventbridge schema of aws generate class and don't use the required field of schema to make properties optionnal.

## Usage/Examples

```bash
npm i @mgvdev/eventbridgeschema-to-typescript
```

In your package.json script you can add

```bash
ebs2ts --registry-name="my_registry" --schema-name="my_schema" --path="./src/generated"
```

## CLI Arguments

- registry-name (-r) : The name of your registry
- schema-name (-n) : The schemas name, you can pass multiple
- path (-p) : path of where you want generate the typescript interface (default `./src/generated`)

## Run Locally

Clone the project

```bash
  git clone https://github.com/mgvdev/eventbridgeschema-to-typescript
```

Go to the project directory

```bash
  cd eventbridgeschema-to-typescript
```

Install dependencies

```bash
  npm install
```

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Feedback

If you have any feedback, please open an issues on this repo

## Todo

- Finish unit test
- Add error handling when AWS Credentials are not set
