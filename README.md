# eventbridgeschema-to-typescript

A small command-line tool for downloading and generating TypeScript interfaces from AWS EventBridge schemas.

## Purpose

This project was created to address the limitations of the AWS EventBridge schema TypeScript generator, which generates classes instead of interfaces and does not make use of the required fields in the schema to mark properties as optional.

## Usage

Install the package as a dev dependency

```bash
npm i @mgvdev/eventbridgeschema-to-typescript --save-dev
```

Add the following script to your package.json:

```bash
ebs2ts --registry-name="my_registry" --schema-name="my_schema" --path="./src/generated"
```

## CLI Arguments

- registry-name (-r): the name of your registry
- schema-name (-n): the name of the schema(s), multiple names can be passed
- path (-p): the path to generate the TypeScript interface (default is ./src/generated)

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

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) license.

## Feedback

Please feel free to provide feedback by opening an issue on the repository.

## Todo

- Complete unit testing

## Changelogs

### [1.1.0] 2023-02-05

- Add aws credentials errors handling
- Throw an error when the command name are wrong
- Change chalk version

### [1.1.1] 2023-02-05

- Add process exit code for invalid credentials error

### [1.1.2] 2023-02-06

- Stringify errors

### [1.1.3] 2023-02-06

- Process exist code for any error reason
