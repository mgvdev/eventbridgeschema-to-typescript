import {transformSchema} from './../../src/handlers/transform-schema';
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-jest';
import {DescribeSchemaCommand, Schemas} from "@aws-sdk/client-schemas"
import * as utils from '../../src/utils';

/**
 * NOT WORK
 */
describe('[transformSchema]', () => {


    let mockSchemaClient = mockClient(Schemas);

    beforeEach(() => {
        mockSchemaClient.reset()
    })

    it('Should generate a typescript file for a existing schema', async () => {
        // Content.schema.components.schemas.Event.properties
        const writeFsMock = jest.spyOn(utils, 'writeFileSyncRecursive');
        writeFsMock.mockImplementation(() => null)

        mockSchemaClient.on(DescribeSchemaCommand)
        .resolves({
            Content: JSON.stringify({
                schema: {
                    components: {
                        schemas: {
                            Event: {
                                properties: {
                                    myProperty: {type: 'string'}
                                }
                            }
                        }
                    }
                }
            })
        })

        await transformSchema('myRegistry', ['mySchema']);

        expect(writeFsMock).toHaveBeenCalledTimes(1)
        expect(writeFsMock).toHaveBeenCalledWith('')
    })

})