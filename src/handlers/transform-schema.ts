import { Schemas } from "@aws-sdk/client-schemas";
import { compile } from "json-schema-to-typescript";
import chalk from "chalk";
import { writeFileSyncRecursive } from "../utils";

export const transformSchema = async (
  registryName: string,
  schemaNames: string[],
  path = "./generated"
) => {
  const schemaClient = new Schemas({});
  const describePromise = schemaNames.map(async (schemaName) => {
    const rawSchema = await schemaClient.describeSchema({
      RegistryName: registryName,
      SchemaName: schemaName,
    });

    if (!rawSchema.Content) {
      console.log(
        chalk.red(`${schemaName} not exist or are not well formatted`)
      );
      return;
    }
    const schema = JSON.parse(rawSchema.Content);

    for (const property in schema.components.schemas.Event.properties) {
      if (schema.components.schemas.Event.properties[property].enum) {
        schema.components.schemas.Event.properties[property].tsEnumNames =
          schema.components.schemas.Event.properties[property].enum.map(
            (e: string) => `"${e}"`
          );
      }
    }

    const typescript = await compile(
      schema.components.schemas.Event,
      schemaName,
      {
        enableConstEnums: true,
        declareExternallyReferenced: true,
      }
    );
    await writeFileSyncRecursive(`${path}/${schemaName}.ts`, typescript, {});
  });

  const describeResult = await Promise.allSettled(describePromise);
  const resultErrors = describeResult.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected"
  );
  if (resultErrors.length > 0) {
    resultErrors.forEach((error) => {
      if (error.reason.name === "CredentialsProviderError") {
        console.log(
          chalk.red(`Error: AWS Credentials are not set in your env`)
        );
      } else {
        console.debug(error);
        console.log(chalk.red(`Error: ${JSON.stringify(error.reason)}`));
      }
      process.exit(1);
    });
  }
  return describeResult;
};
