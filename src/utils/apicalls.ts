import axios, { AxiosInstance } from 'axios';

const kaleyraSMSAxios: AxiosInstance = axios.create();

kaleyraSMSAxios.interceptors.request.use(
  (config) => {
    config.maxBodyLength = Infinity;
    config.baseURL = `https://api.kaleyra.io/v1/${process.env.KALEYRA_SID}`;
    config.headers['api-key'] = process.env.KALEYRA_API_KEY;
    return config;
  },
  (error) => Promise.reject(error)
);

const bureauApiAxios: AxiosInstance = axios.create();

const bureauAuth =
  'Basic ' +
  Buffer.from(
    process.env.BUREAU_CLIENT_ID + ':' + process.env.BUREAU_CLIENT_SCERET
  ).toString('base64');

bureauApiAxios.interceptors.request.use(
  (config) => {
    config.maxBodyLength = Infinity;
    config.baseURL =
      process.env.NODE_ENV === 'development'
        ? process.env.BUREAU_TEST_END_POINT
        : process.env.BUREAU_LIVE_END_POINT;
    config.headers['Authorization'] = bureauAuth;
    return config;
  },
  (error) => Promise.reject(error)
);

const experianApiAxios: AxiosInstance = axios.create();

experianApiAxios.interceptors.request.use(
  (config) => {
    config.maxBodyLength = Infinity;
    config.baseURL = process.env.EXPERIAN_END_POINT;
    return config;
  },
  (error) => Promise.reject(error)
);

const setExperianAccessToken = async (): Promise<string> => {
  const data = {
    username: process.env.EXPERIAN_USERNAME,
    password: process.env.EXPERIAN_PASSWORD,
    client_id: process.env.EXPERIAN_CLIENT_ID,
    client_secret: process.env.EXPERIAN_CLIENT_SCERET
  };
  const response = await axios.post(
    `${process.env.EXPERIAN_END_POINT}/oauth2/v1/token`,
    data,
    {
      maxBodyLength: Infinity,
      headers: { Authorization: undefined }
    }
  );
  if (response.status === 200) {
    experianApiAxios.interceptors.request.use((config) => {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${response.data.access_token}`;
      }
      return config;
    });
    return response.data.access_token;
  } else {
    return '';
  }
};

const digiApiAxios: AxiosInstance = axios.create();

const digiAuth =
  'Basic ' +
  Buffer.from(
    process.env.DIGI_CLIENT_ID + ':' + process.env.DIGI_CLIENT_SCERET
  ).toString('base64');

digiApiAxios.interceptors.request.use(
  (config) => {
    config.maxBodyLength = Infinity;
    config.baseURL =
      process.env.NODE_ENV === 'development'
        ? process.env.DIGI_TEST_END_POINT
        : process.env.DIGI_LIVE_END_POINT;
    config.headers['Authorization'] = digiAuth;
    return config;
  },
  (error) => Promise.reject(error)
);

export default {
  digiApiAxios,
  kaleyraSMSAxios,
  bureauApiAxios,
  experianApiAxios,
  setExperianAccessToken
};
