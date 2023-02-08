import { transformSchema } from "../../src/handlers/transform-schema";
import "aws-sdk-client-mock-jest";
import * as utils from "../../src/utils";

/**
 * NOT WORK
 */
const fakeDescribeCommand = jest.fn();
jest.mock("@aws-sdk/client-schemas", () => {
  class Schemas {
    describeSchema = fakeDescribeCommand;
  }

  return { Schemas };
});

// eslint-disable-next-line import/order, import/first
import { Schemas } from "@aws-sdk/client-schemas";

describe("[transformSchema]", () => {
  console.log(Schemas);

  jest.spyOn(process, "exit").mockReturnValue(null as never);

  beforeEach(() => {
    fakeDescribeCommand.mockReset();
  });

  it("Should generate a typescript file for a existing schema", async () => {
    // Content.schema.components.schemas.Event.properties
    jest.spyOn(process, "exit").mockReturnValue(null as never);
    const writeFsMock = jest.spyOn(utils, "writeFileSyncRecursive");
    writeFsMock.mockImplementation(() => null);

    fakeDescribeCommand.mockResolvedValue({
      Content: JSON.stringify({
        components: {
          schemas: {
            Event: {
              properties: {
                myProperty: { type: "string" },
              },
            },
          },
        },
      }),
    });
    await transformSchema("myRegistry", ["mySchema"]);
    expect(writeFsMock).toHaveBeenCalledTimes(1);
  });
});
