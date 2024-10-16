import { ProgressBar } from "@/components/progress-bar";

const Loading = () => {
    return <ProgressBar options={{ showSpinner: false, trickleSpeed: 300 }} />;
};

export default Loading;
