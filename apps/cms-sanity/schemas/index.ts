import { collectionSchemaTypes } from "./collections";
import { singletonSchemaTypes } from "./singletons";

export const schemaTypes = [...collectionSchemaTypes, ...singletonSchemaTypes];
