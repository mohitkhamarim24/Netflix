import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import axios from "axios";
import { SMALL_IMG_BASE_URL } from "../store/utils/constants";
const MovieSlider = ({category}) => {
const {contentType} = useContentStore();
const [content,setContent] = useState([])
const formattedContentName = category.replaceAll("_"," ")[0].toUpperCase() + category.replaceAll("_"," ").slice(1);
const formattedContentType = contentType ==="movie" ? "Movies" : "Tv Shows"


useEffect(()=>{

  const getContent = async() => {

    const res = await axios.get(`/api/v1/${contentType}/${category}`);
    setContent(res.data.content)
  }

  getContent()
},[contentType,category])
  return (<div className="text-white bg-black relative px-5 md:px-20" >
  <h2>{formattedContentName} {formattedContentType}</h2>
  <div className="flex space-x-4">
    {content.map((item)=>(
      <Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
        <div className="rounded-lg overflow-hidden">
          <img src={SMALL_IMG_BASE_URL +item.backdrop_path} alt="Movie image" 
           
          className='transition-transform duration-300 ease-in-out group-hover:scale-125'
          />

        </div>
      </Link>
    ))}
  </div>
  </div>
  )
}

export default MovieSlider