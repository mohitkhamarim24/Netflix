import axios from "axios";
import { ENV_VARS } from "../config/envVars.js";
export const fetchFromTMDB = async (url) => {
  try {
      console.log("Fetching from TMDB URL:", url); // Log the URL
      console.log("Using API Key:", ENV_VARS.TMDB_API_KEY); // Log the API key
      
      const options = {
          headers: {
              accept: 'application/json',
              Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY // Ensure there is a space after "Bearer"
          }
      };

      const response = await axios.get(url, options);

      if (response.status !== 200) {
          throw new Error('Failed to fetch data from TMDB: ' + response.statusText);
      }

      return response.data;
  } catch (error) {
      console.error("Error in fetchFromTMDB:", error.message, error.stack); // Log the detailed error
      throw error;
  }
};
