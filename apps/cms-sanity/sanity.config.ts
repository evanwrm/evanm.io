import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { cloudinaryAssetSourcePlugin, cloudinaryImageSource } from "sanity-plugin-cloudinary";
import { markdownSchema } from "sanity-plugin-markdown";
import { deskTool } from "sanity/desk";
import { deskStructure } from "./deskStructure";
import { schemaTypes } from "./schemas";

export default defineConfig({
    name: "default",
    title: "Portfolio",
    projectId: "l22vat26",
    dataset: "production",
    basePath: "/",
    plugins: [
        deskTool({ structure: deskStructure }),
        visionTool(),
        cloudinaryAssetSourcePlugin(),
        markdownSchema()
    ],
    schema: {
        types: schemaTypes
    },
    form: {
        image: {
            assetSources: (previousAssetSources, context) => {
                if (context.currentUser?.roles.some(role => role.name === "cloudinaryAccess"))
                    return [...previousAssetSources, cloudinaryImageSource];

                if (context.currentUser?.roles.some(role => role.name === "onlyCloudinaryAccess"))
                    return [cloudinaryImageSource];

                return previousAssetSources;
            }
        }
    }
});
