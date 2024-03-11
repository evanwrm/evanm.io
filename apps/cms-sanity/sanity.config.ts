import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { cloudinaryAssetSourcePlugin, cloudinaryImageSource } from "sanity-plugin-cloudinary";
import { markdownSchema } from "sanity-plugin-markdown";
import { structureTool } from "sanity/structure";
import { MarkdownInput } from "./components/MarkdownInput";
import { deskStructure } from "./deskStructure";
import { schemaTypes } from "./schemas";

export default defineConfig({
    name: "default",
    title: "Portfolio",
    projectId: "l22vat26",
    dataset: "production",
    basePath: "/",
    plugins: [
        structureTool({ structure: deskStructure }),
        visionTool(),
        cloudinaryAssetSourcePlugin(),
        markdownSchema({ input: MarkdownInput })
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
