import { Heart } from "lucide-react";
import movieApi from "../api/movieApi";
import { useEffect, useState } from "react";

function MoviePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const res = await movieApi.trending();
        console.log(res.data?.results);

        setMovies(res.data?.results || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-6 bg-linear-to-t from-[#000000] to-[#07071b]">
      <div className="text-4xl font-bold">Trending Now</div>
      <div className="flex flex-wrap gap-6">
        {movies.map((item) => (
          <div className="w-[calc((100%-6*2rem)/8)] min-w-50 rounded-md overflow-hidden shadow-2xl relative" key={item.id}>
            <img
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${item.backdrop_path}`}
              alt=""
              srcset=""
              className="w-full"
            />
            <div className="w-full bg-white/10 p-2 min-h-20">
                <h4 className="font-bold mb-0.5">{item.title}</h4>
                <p className="text-[12px] text-white/50">{item.release_date}</p>
            </div>
            <div className=" absolute top-2 left-2">
                <Heart className={`text-white/30 hover:text-white/80`} />
            </div>
            <div className="w-full h-[4px] bg-black/40 absolute bottom-20" >
                <div className={`w-[${(Math.round(item.vote_average)*10)}%] bg-green-400 h-full relative`}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MoviePage;


