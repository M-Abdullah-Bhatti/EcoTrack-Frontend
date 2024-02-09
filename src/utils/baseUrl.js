// const environment = "dev";
const environment = "production";

let baseUrl;
if (environment === "production") {
  baseUrl = "https://ecotrack-dev.vercel.app";
} else {
  baseUrl = "http://ipaddress:5000";
}

export default baseUrl;
