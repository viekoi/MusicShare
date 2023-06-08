'use client'
import React,{useState,useEffect,useRef} from 'react';
import * as Progress from '@radix-ui/react-progress';


interface ProgressBarProps{
    duration:number
}

const ProgressBar:React.FC<ProgressBarProps> = ({duration}) => {
  const [progress, setProgress] = useState(0);
 

 
  


  return (
    <Progress.Root
      className="relative overflow-hidden bg-white rounded-full w-full h-[10px]"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: 'translateZ(0)',
      }}
      value={progress}
    >
      <Progress.Indicator
        className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
};

export default ProgressBar;