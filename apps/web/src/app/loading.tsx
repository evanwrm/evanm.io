import ProgressBar from "@/components/ProgressBar";

const Loading = () => {
    return <ProgressBar options={{ showSpinner: false, trickleSpeed: 300 }} />;
};

export default Loading;
