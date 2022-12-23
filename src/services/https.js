import axios from 'axios';
import {Buffer} from 'buffer';
import qs from 'qs';

import {decode, encode} from 'base-64';

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export const Get = (token, url, params) => {
  return new Promise(function (resolve, reject) {
    axios
      .get(url, {
        params: params,
        'Content-Type': 'application/x-www-form-urlencoded',
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const Post = (token, url, body, params) => {
  return new Promise(function (resolve, reject) {
    axios
      .post(url, body, {
        params: params,
        headers: {
          'Content-Type': 'application/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const PostToken = (url, clientId, clientSecrets) => {
  const data = {
    grant_type: 'client_credentials',
  };
  return new Promise(function (resolve, reject) {
    axios
      .post(url, qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' + Buffer.from(clientId + ':' + clientSecrets, 'base64'),
        },
        auth: {
          username: clientId,
          password: clientSecrets,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const Delete = (token, url, params) => {
  return new Promise(function (resolve, reject) {
    axios
      .delete(url, {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};

export const Put = (token, url, body, params) => {
  return new Promise(function (resolve, reject) {
    axios
      .put(url, body, {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        reject(error);
      });
  });
};
