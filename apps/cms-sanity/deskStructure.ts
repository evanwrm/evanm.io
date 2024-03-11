import { StructureBuilder, StructureResolverContext } from "sanity/structure";
import { collectionSchemaTypes } from "./schemas/collections";
import { pageSchemaTypes } from "./schemas/pages";
import { singletonSchemaTypes } from "./schemas/singletons";

export const deskStructure = (S: StructureBuilder, _context: StructureResolverContext) => {
    const singletons = singletonSchemaTypes.map(singletonCollection =>
        S.listItem()
            .title(singletonCollection.title ?? "Untitled")
            .icon(singletonCollection.icon)
            .child(
                S.document()
                    .schemaType(singletonCollection.name)
                    .documentId(singletonCollection.name)
            )
    );
    const pages = pageSchemaTypes.map(pageCollection =>
        S.listItem()
            .title(pageCollection.title ?? "Untitled")
            .icon(pageCollection.icon)
            .child(S.document().schemaType(pageCollection.name).documentId(pageCollection.name))
    );
    const collections = S.documentTypeListItems().filter(listItem =>
        collectionSchemaTypes.some(
            singletonCollection => singletonCollection.name === listItem.getId()
        )
    );

    return S.list()
        .title("Content")
        .items([...pages, S.divider(), ...collections, S.divider(), ...singletons]);
};
