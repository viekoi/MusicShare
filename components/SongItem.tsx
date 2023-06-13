'use client'

import React, {useCallback} from 'react'
import useLoadImage from '@/hooks/useLoadImage'
import LikeButton from './LikeButton';

interface SongItemProps{
  id:string,
  userId:string,
  author:string,
  title: string;
  songPath: string;
  imagePath: string;
  active?:boolean
  onClick:(id:string)=>void
}





const SongItem:React.FC<SongItemProps> = ({id,userId,author,title,songPath,imagePath:path,onClick,active}) => {


  const imagePath = useLoadImage(path);
  
  const divEleRef = useCallback(
    (divEle:HTMLDivElement) => {

      if(divEle === null) return

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



  const handleClick: React.MouseEventHandler<HTMLDivElement> | undefined=()=>{
    if(onClick){
      return onClick(id)
    }
  }



  
  

  return (
    <div className={`songItem group ${active && 'active'}`} ref={divEleRef} onClick={handleClick}>
      <span className='lg:text-[40px] md:text-[30px] text-[15px]'>{`${title} - ${author} `}
      <LikeButton className=' hidden group-hover:block' songId={id}/>
      </span>
      {imagePath &&  <img  src={imagePath} alt="image" /> }
     
    </div>
  )
}

export default SongItem
