const environment = "dev";
// const environment = "production";

let baseUrl;
if (environment === "production") {
  baseUrl = "https://ecotrack-dev.vercel.app";
} else {
  baseUrl = "http://192.168.100.23:5000";
}

export default baseUrl;
