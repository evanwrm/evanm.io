import { StructureBuilder, StructureResolverContext } from "sanity/desk";
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
    const collections = S.documentTypeListItems().filter(
        listItem =>
            !singletonSchemaTypes.some(
                singletonCollection => singletonCollection.name === listItem.getId()
            )
    );

    console.log(singletons);

    return S.list()
        .title("Content")
        .items([...singletons, S.divider(), ...collections]);
};
