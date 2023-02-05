#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { transformSchema } from "./handlers/transform-schema";

yargs(hideBin(process.argv))
  .command(
    "transform-schema",
    "transform an eventbridge schema to as typescript file",
    (yargs) => {
      return yargs
        .option("registry-name", {
          alias: "r",
          type: "string",
          description: "The name of the registry",
          requiresArg: true,
        })
        .option("schema-name", {
          alias: "n",
          array: true,
          type: "string",
          description: "The schema name to parse",
          requiresArg: true,
        })
        .option("path", {
          alias: "p",
          type: "string",
          describe: "The path to generate schema",
          default: "./generated",
          requiresArg: false,
        })
        .parse();
    },
    async (...args) => {
      await transformSchema(
        args[0].r as string,
        args[0].n as string[],
        args[0].p as string
      );
    }
  )
  .demandCommand(1)
  .strict()
  .showHelpOnFail(true)
  .parse();
