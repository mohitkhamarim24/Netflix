import express from "express";
import { fetchFromTMDB } from "../services/tmdb.service";
import { searchMovie,searchPerson,searchTv } from "../controllers/search.controller";

const {query}  = req.params;
try {
    const response =  await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query= ${query} &include_adult=false&language=en-US&page=1`)
}catch (error) {
    
}

const router = express.Router();

router.get("/person/:query" , searchPerson);
router.get("/movie/:query" , searchMovie);
router.get("/movie/:query",searchTv);
export default router;