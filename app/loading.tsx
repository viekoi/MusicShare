import { BounceLoader } from "react-spinners";

import Box from "@/components/Box";

const Loading = () => {
  return (
    <Box className="absolute w-fit h-fit top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 overflow-hidden">
      <BounceLoader color="#22c55e" size={40} />
    </Box>
  );
};

export default Loading;
