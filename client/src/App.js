import "./App.css";
import React from "react";
// import Taiwan from "@svg-maps/taiwan";
import World from "@svg-maps/world";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css";
import { fetchSummary } from "./fetchData";
function App() {
    const [place, setPlace] = React.useState();
    const [position, setPosition] = React.useState({});
    const [isShow, setShow] = React.useState(false);
    const [globalData, setGlobalData] = React.useState({});
    const [countryData, setCountryData] = React.useState([]);
    const [countryRecord, setCountryRecord] = React.useState("");

    React.useEffect(() => {
        fetchSummary().then((r) => {
            const rowData = JSON.parse(r);
            const gData = rowData.Global;
            setGlobalData(gData);
            setCountryData(rowData.Countries);
        });
    }, []);
    const getLocationID = (e) => {
        console.log(e.target.id);
        let d = countryData && countryData.filter((i) => i.CountryCode === e.target.id.toUpperCase());
        console.log(d);
        setCountryRecord(d[0]);
        //         Date: "2021-02-16T14:55:54.762Z"
        // ID: "c2d733a7-9e4b-48bb-b6c8-d2ce38761119"
        // NewConfirmed: 53883
        // NewDeaths: 989
        // NewRecovered: 0
        // Premium: {}
        // Slug: "united-states"
        // TotalConfirmed: 27694165
        // TotalDeaths: 486325

        setPlace(e.target.id);
        setShow(true);
    };
    const getScreenPosition = (e) => {
        //   console.log(e);
        //   console.log(e.screenX);
        const style = {
            left: e.screenX,
            top: e.screenY / 2,
        };
        setPosition(style);
        setShow(false);
    };
    const countryList = [
        "NewConfirmed",
        "NewDeaths",
        "NewRecovered",
        "TotalConfirmed",
        "TotalDeaths",
        "TotalRecovered",
    ];
    return (
        <div className="App">
            {globalData ? (
                <div className="global">
                    TotalConfirmed:{globalData.TotalConfirmed}, TotalDeaths: {globalData.TotalDeaths}, TotalRecovered:{" "}
                    {globalData.TotalRecovered}
                </div>
            ) : null}
            <SVGMap
                map={World}
                onLocationFocus={(e) => getLocationID(e)}
                onLocationMouseMove={(e) => getScreenPosition(e)}
            />

            {isShow ? (
                <div className="popup" style={position}>
                    {place.toUpperCase()}
                    <ul>
                        {countryList &&
                            countryRecord &&
                            countryList.map((txt) => {
                                return <li>{txt + ":" + countryRecord[txt]}</li>;
                            })}
                    </ul>
                </div>
            ) : null}
        </div>
    );
}

export default App;
