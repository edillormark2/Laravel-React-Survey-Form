import { Loader as RsuiteLoader } from "rsuite";
import 'rsuite/Loader/styles/index.css';

const Loader = () => {
    return (
        <div className="flex justify-center items-center w-full h-full absolute top-0 left-0 bg-transparent">
            <RsuiteLoader size="md" content="Loading..." />
        </div>
    );
};

export default Loader;
