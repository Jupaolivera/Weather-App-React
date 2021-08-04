import React from "react";
import { Card, Feed } from "semantic-ui-react";
import Clock from "react-live-clock";

function WeatherCard({
    temperature,
    city,
    humidity,
    icon,
    description,
    timezone,
    clouds,
}) {
    if (city.includes("/")) {
        let temp = city.split("/");
        city = temp[temp.length - 1];
    }
    return (
        <Card className="weather-card-main">
            <Card.Content className="weather-card">
                <Card.Header className="weather-card-child">{city}</Card.Header>
                <Clock
                    className="clock"
                    format={"HH:mm:ss"}
                    ticking={true}
                    timezone={timezone}
                />
            </Card.Content>
            <Card.Content>
                <Feed>
                    <Feed.Event>
                        <Feed.Content>
                            <Card.Header className="main-temperature">
                                <b>
                                    Temperature:{" "}
                                    {Math.round(temperature * 10) / 10}℃
                                </b>
                            </Card.Header>
                            <div>
                                <Card.Meta className="weather-card-child">
                                    <div>
                                        <b> Humidity: {humidity} %</b>
                                    </div>
                                </Card.Meta>
                            </div>
                            <Card.Meta className="weather-card-child">
                                <div>
                                    <b> Clouds: {clouds} %</b>
                                </div>
                            </Card.Meta>
                            <div className="weather-card">
                                <div className="weather-card-child">
                                    <b>{description}</b>
                                    <img
                                        className="weather-icon"
                                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                                        alt=""
                                    ></img>
                                </div>
                            </div>
                        </Feed.Content>
                    </Feed.Event>
                </Feed>
            </Card.Content>
        </Card>
    );
}

export default WeatherCard;
