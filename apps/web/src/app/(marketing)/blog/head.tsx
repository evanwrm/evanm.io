import DefaultHead from "@/app/RootHead";
import PageSeo from "@/components/analytics/PageSeo";

const Head = () => {
    return (
        <>
            <DefaultHead />
            {/* @ts-expect-error Server Component */}
            <PageSeo title="Blog" />
        </>
    );
};

export default Head;
