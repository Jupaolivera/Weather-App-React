import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Forecast from "./components/Forecast";
import { Loader, Input, Button } from "semantic-ui-react";
import useKeypress from "react-use-keypress";
import API_KEY from "./config.js";
import "./App.css";

const URL = `https://api.openweathermap.org/data/2.5/onecall`;

function App() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [sunrise, setSunrise] = useState(null);
    const [sunset, setSunset] = useState(null);
    const [icon, setIcon] = useState("");
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [timezone, setTimezone] = useState(null);
    const [clouds, setClouds] = useState(null);

    const [userClouds, setUserClouds] = useState(null);
    const [userDescription, setUserDescription] = useState("");
    const [currentCity, setCurrentCity] = useState("");
    const [userCityName, setUserCityName] = useState("");
    const [userTimezone, setUserTimezone] = useState("");
    const [userTemperature, setUserTemperature] = useState(null);
    const [userHumidity, setUserHumidity] = useState(null);
    const [userIcon, setUserIcon] = useState("");
    const [userForecast, setUserForecast] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
        axios
            .get(
                `${URL}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`
            )
            .then((results) => {
                setLoading(true);
                setTemperature(results.data.current.temp);
                setSunset(results.data.current.sunset);
                setSunrise(results.data.current.sunrise);
                setHumidity(results.data.current.humidity);
                setCity(results.data.timezone);
                setIcon(results.data.current.weather[0].icon);
                setForecast(results.data.daily);
                setDescription(results.data.current.weather[0].description);
                setTimezone(results.data.timezone);
                setClouds(results.data.current.clouds);
            });
    }, [latitude, longitude]);

    const handleClick = async () => {
        const answer = await axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${API_KEY}&units=metric`
            )
            .then((response) => {
                setUserCityName(response.data.name);
                setCurrentCity("");

                return response;
            })
            .catch((err) => {
                alert("city not found!");
                setCurrentCity("");
            });
        if (answer !== undefined) {
            const userAnswer = await axios
                .get(
                    `${URL}?lat=${answer.data.coord.lat}&lon=${answer.data.coord.lon}&exclude=hourly,minutely&appid=${API_KEY}&units=metric`
                )
                .then((response) => {
                    return response;
                });
            if (userAnswer !== undefined) {
                setUserCityName(answer.data.name);
                setUserTemperature(userAnswer.data.current.temp);
                setUserHumidity(userAnswer.data.current.humidity);
                setUserIcon(userAnswer.data.current.weather[0].icon);
                setUserForecast(userAnswer.data.daily);
                setUserDescription(
                    userAnswer.data.current.weather[0].description
                );
                setCurrentCity("");
                setUserTimezone(userAnswer.data.timezone);
                setUserClouds(userAnswer.data.current.clouds);
            }
        }
    };

    const forecastShower = () => {
        if (userForecast.length) {
            return <Forecast forecast={userForecast} timezone={userTimezone} />;
        } else if (forecast) {
            return <Forecast forecast={forecast} timezone={timezone} />;
        } else {
            return;
        }
    };

    const weatherCardShower = () => {
        if (userForecast.length) {
            return (
                <WeatherCard
                    temperature={userTemperature}
                    humidity={userHumidity}
                    city={userCityName}
                    icon={userIcon}
                    description={userDescription}
                    timezone={userTimezone}
                    clouds={userClouds}
                />
            );
        } else if (loading === true) {
            return (
                <WeatherCard
                    temperature={temperature}
                    humidity={humidity}
                    sunrise={sunrise}
                    sunset={sunset}
                    city={city}
                    icon={icon}
                    description={description}
                    timezone={timezone}
                    clouds={clouds}
                />
            );
        } else {
            return (
                <div>
                    <Loader active inline />
                    Loading, user must enable location to see local weather...
                </div>
            );
        }
    };

    useKeypress("Enter", () => {
        handleClick();
    });

    return (
        <div className="main">
            <Header />
            <div className="search-stuff">
                <Input
                    onChange={(e) => setCurrentCity(e.target.value)}
                    className="input-box"
                    placeholder="City name..."
                    value={currentCity}
                />
                <Button className="search-button" onClick={() => handleClick()}>
                    Search
                </Button>
            </div>
            <br />
            {weatherCardShower()}

            {forecastShower()}
        </div>
    );
}

export default App;
