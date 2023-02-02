import { Schemas } from "@aws-sdk/client-schemas";
import { compile } from "json-schema-to-typescript";
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
      console.log("Schema");
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
      { enableConstEnums: true, declareExternallyReferenced: true }
    );
    await writeFileSyncRecursive(`${path}/${schemaName}.ts`, typescript, {});
  });

  const describeResult = await Promise.allSettled(describePromise);
  return describeResult;
};
