'use client'
import React, {useCallback} from 'react'






const SongItem = () => {


  
  const divEleRef = useCallback(
    (divEle:HTMLDivElement) => {
      divEle.onmousemove=(e:MouseEvent)=>{
          const rect = divEle.getBoundingClientRect(),
          img = divEle.querySelector("img");
          if(img===null) return
          img.style.left = `${e.clientX - rect.left}px`;
          img.style.top = `${e.clientY - rect.top}px`;
      }
    },
    [],
  )



  
  

  return (
    <div className="songItem" ref={divEleRef} >
      <span className=' xl:text-[50px] lg:text-[40px] md:text-[30px]  text-[15px]'>Tình nào không như tình đàu - Trung Quân</span>
      <img  src="https://nld.mediacdn.vn/291774122806476800/2022/6/19/trung-quan-idol-16556052672881881396864.jpg" alt="image" />
    </div>
  )
}

export default SongItem
