import axios from "axios";

const CONTRACT = process.env.ANDREANI_CONTRACT;
const CLIENT = process.env.ANDREANI_CLIENT;
const BASE_URL = process.env.ANDREANI_BASE_URL;

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const weight = searchParams.get("weight");
    const volume = searchParams.get("volume");
    const postcode = searchParams.get("postcode");

    const info = [
      {
        kilos: weight,
        volumen: volume
      },
    ];

    const params = {
      cpDestino: postcode,
      contrato: CONTRACT,
      cliente: CLIENT,
      sucursalOrigen: "FMA",
      bultos: info,
    };

    function encodeParams(params, prefix) {
      var encodedParams = [];
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var paramKey = prefix ? prefix + "[" + key + "]" : key;
          var paramValue = params[key];
          if (typeof paramValue === "object") {
            encodedParams.push(encodeParams(paramValue, paramKey));
          } else {
            encodedParams.push(
              encodeURIComponent(paramKey) +
                "=" +
                encodeURIComponent(paramValue)
            );
          }
        }
      }
      return encodedParams.join("&");
    }

    var queryString = encodeParams(params);

    const baseURL = BASE_URL;
    const url = `${baseURL}?${queryString}`;

    const data = await axios.get(url);

    return Response.json(data.data);
  } catch (error) {
    return Response.json(error.message, { status: 500 });
  }
}
