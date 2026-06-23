import { LucideUser } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

type WEATHER_TYPE = "sunny" | "cloudy";

const BACKGROUNDS: Record<WEATHER_TYPE, string> = {
  sunny: "https://images.pexels.com/photos/14482714/pexels-photo-14482714.jpeg",
  cloudy:
    "https://images.pexels.com/photos/12275401/pexels-photo-12275401.jpeg",
};
const API_KEY = import.meta.env.VITE_API_KEY;

export default function HomePage() {
  const navigation = useNavigate();
  const [backgroundMode, setBackgroundMode] = useState<WEATHER_TYPE>("sunny");
  const [error, setError] = useState<string>("");
  const [lat, setLat] = useState<number>(10.99);
  const [lon, setLon] = useState<number>(44.34);

  useEffect(() => {
    const weatherCloudy = setTimeout(() => {
      setBackgroundMode("cloudy");
    }, 5000);

    return () => clearTimeout(weatherCloudy);
  }, [backgroundMode]);

  useEffect(() => {
    const getWeather = async (lat: number, lon: number) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
        );
        if (!response.data.success) {
          console.error("no data was found: ", response.data);
          return;
        }
        console.log("Response from API: ", response.data);
        setLat(response.data);
        setLon(response.data);
      } catch (err: unknown) {
        console.error("error fetching weather data: ", err);
      }
    };
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    getWeather(lat, lon);
  }, [lat, lon]);

  const backgroundImage = BACKGROUNDS[backgroundMode];
  return (
    <div
      className="w-screen h-screen bg-no-repeat bg-cover flex flex-col justify-around items-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full uppercase flex flex-row items-center justify-around text-2xl font-bold">
        <p>weather app</p>
        <span>
          <LucideUser
            size={28}
            className="hover:cursor-pointer hover:text-gray-200"
            onClick={() => navigation("/auth")}
          />
        </span>
      </div>
      <div className="w-5/6 h-17/20 border border-white rounded-2xl"></div>
    </div>
  );
}
