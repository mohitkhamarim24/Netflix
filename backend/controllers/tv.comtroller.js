import { fetchFromTMDB } from '../services/tmdb.service.js';

export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

        // Check if data is valid
        if (!randomMovie) {
            return res.status(404).json({ success: false, message: "No trending TV shows found." });
        }

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        console.error("Error fetching trending TV shows:", error.message, error.stack); 
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        
        // Check if trailers are available
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No trailers found for this TV show." });
        }

        res.json({ success: true, trailers: data.results });
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        console.error("Error fetching TV trailers:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        // Use lowercase "tv" in the URL
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        
        console.log("TMDB TV Details Response:", data); 

        // Check if details are available
        if (!data || Object.keys(data).length === 0) {
            return res.status(404).json({ success: false, message: "TV details not found." });
        }

        res.json({ success: true, content: data });
    } catch (error) {
        console.error("Error fetching TV details:", error.message);
        
        if (error.message.includes("404")) {
            return res.status(404).send(null);
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        
        // Check if similar shows are available
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No similar TV shows found." });
        }

        res.status(200).json({ success: true, similar: data.results });
    } catch (error) {
        console.error("Error fetching similar TV shows:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        
        // Check if category content is available
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: `No TV shows found for category: ${category}` });
        }

        res.status(200).json({ success: true, content: data.results });
    } catch (error) {
        console.error(`Error fetching TV shows by category (${category}):`, error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
