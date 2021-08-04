import React from "react";
import { Card } from "semantic-ui-react";
import moment from "moment-timezone";
export default function Forecast({ forecast, timezone }) {
    return (
        <div className="card-container-main">
            <Card.Group itemsPerRow={4}>
                {forecast.map((data, index) => {
                    return (
                        <Card className="forecast-card" key={index}>
                            <Card.Content>
                                <Card.Header className="forecast-date">
                                    {timezone
                                        ? moment
                                              .unix(data.dt)
                                              .tz(timezone)
                                              .format("LL")
                                        : null}
                                </Card.Header>
                                <Card.Header className="forecast-header">
                                    Temperature:{" "}
                                    {Math.round(
                                        (data.temp.max + data.temp.min) / 2
                                    )}
                                    ℃
                                </Card.Header>
                                <Card.Meta className="forecast-header">
                                    {" "}
                                    Humidity: {data.humidity}%
                                </Card.Meta>
                                <Card.Description className="temp-desc">
                                    {data.weather[0].description}
                                    <img
                                        className="weather-icon"
                                        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                        alt=""
                                    ></img>
                                    <Card.Meta className="forecast-header">
                                        {" "}
                                        Max: {Math.round(data.temp.max)}℃
                                    </Card.Meta>
                                    <Card.Meta className="forecast-header">
                                        {" "}
                                        Min: {Math.round(data.temp.min)}℃
                                    </Card.Meta>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    );
                })}
            </Card.Group>
        </div>
    );
}
