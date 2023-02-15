import { collectionSchemaTypes } from "./collections";
import { pageSchemaTypes } from "./pages";
import { singletonSchemaTypes } from "./singletons";

export const schemaTypes = [...collectionSchemaTypes, ...pageSchemaTypes, ...singletonSchemaTypes];
