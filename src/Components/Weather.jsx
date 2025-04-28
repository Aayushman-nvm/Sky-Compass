import React, { useEffect, useState } from 'react'
import Search from './Search'

function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const API = import.meta.env.VITE_API_KEY;

    async function fetchData(search) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API}&units=metric`);
            const data = await response.json();
            if (data) {
                setWeatherData(data);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            setError(error);
            setLoading(false);
        }
    }

    function handleSearch() {
        fetchData(search);
    }

    function getDate() {
        return new Date().toLocaleDateString('en-US', {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        });
    }

    useEffect(() => {
        fetchData("Bengaluru");
    }, []);

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
            <div className="w-full max-w-3xl">
                <Search
                    search={search}
                    setSearch={setSearch}
                    handleSearch={handleSearch}
                />
            </div>

            {loading ? (
                <div className="text-white text-3xl mt-12 animate-bounce">Loading Weather...</div>
            ) : weatherData ? (
                <div className="mt-12 w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col gap-10 text-white animate-slideIn">

                    {/* location and date in same spot together */}
                    <div className="text-center space-y-2">
                        <h1 className="text-5xl font-extrabold drop-shadow-md">
                            {weatherData?.name}, {weatherData?.sys?.country}
                        </h1>
                        <p className="text-lg font-light">{getDate()}</p>
                    </div>

                    {/* temperature indicator part */}
                    <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                        <div className="flex flex-col items-center">
                            <h2 className="text-6xl font-bold">{Math.round(weatherData?.main?.temp)}°C</h2>
                            <p className="capitalize text-xl mt-2">{weatherData?.weather?.[0]?.description}</p>
                            <p className="text-sm mt-1 text-gray-200">Feels like {Math.round(weatherData?.main?.feels_like)}°C</p>
                        </div>

                        {/* complete weather info card */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center bg-white/20 p-4 rounded-xl shadow-md">
                                <span className="font-semibold">Humidity:</span>
                                <span>{weatherData?.main?.humidity}%</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/20 p-4 rounded-xl shadow-md">
                                <span className="font-semibold">Wind Speed:</span>
                                <span>{weatherData?.wind?.speed} m/s</span>
                            </div>
                            {weatherData?.wind?.gust && (
                                <div className="flex justify-between items-center bg-white/20 p-4 rounded-xl shadow-md">
                                    <span className="font-semibold">Wind Gust:</span>
                                    <span>{weatherData?.wind?.gust} m/s</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-white text-xl mt-12 animate-pulse">Search for a city to view weather 🌎</div>
            )}
        </div>
    )
}

export default Weather
