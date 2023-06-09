"use client";

import * as RadixSlider from '@radix-ui/react-slider';


interface ProgessSlideProps {
  value: number;
  onChange: (value: number) => void;
  duration:number | undefined
}

const ProgessSlider: React.FC<ProgessSlideProps > = ({ 
  value = 1, 
  onChange,
  duration
}) => {

  

  

  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

 
  return ( 
    <RadixSlider.Root
      className="
        relative 
        flex 
        items-center 
        select-none 
        touch-none 
        w-full 
      "
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      max={duration}
      step={1}
      aria-label="Volume"
    >
      <RadixSlider.Track 
        className="
          bg-neutral-600 
          relative 
          grow 
          rounded-full 
          h-[5px]
          cursor-pointer
        "
      >
        <RadixSlider.Range 
          className="
            absolute 
            bg-white 
            rounded-full 
            h-full
          " 
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}
 
export default ProgessSlider;