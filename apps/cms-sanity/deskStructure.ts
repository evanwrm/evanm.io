import { StructureBuilder, StructureResolverContext } from "sanity/desk";

export const deskStructure = (S: StructureBuilder, _context: StructureResolverContext) => {
    const singletonCollections = ["settings", "seo"];
    const singletons = singletonCollections.map(singletonCollection =>
        S.listItem()
            .title(singletonCollection)
            .child(S.document().schemaType(singletonCollection).documentId(singletonCollection))
    );
    const collections = S.documentTypeListItems().filter(
        listItem => !singletonCollections.includes(listItem.getId() ?? "")
    );

    return S.list()
        .title("Content")
        .items([...singletons, S.divider(), ...collections]);
};
