export const fetchSummary = () => {
    let url = "https://api.covid19api.com/summary";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    url = proxyUrl + url;
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    return fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            return result;
        })
        .catch((error) => console.log("error", error));
    //  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

    //  url = proxyUrl + url;
    //  return fetch(url, {
    //      method: "GET",
    //      headers: {
    //          "Content-Type": "application/json",
    //          Accept: "application/json",
    //      },
    //  })
    //      .then((res) => {
    //          res.json();
    //      })
    //      .then((response) => {
    //          return response;
    //      })
    //      .catch((err) => {
    //          console.log("fetch Error:", err);
    //      });
};
