import axios from 'axios';

/**
 * Get All Hubs
 * @returns Hubs[]
 */
export const getLocation = async () => {
  try {
    return axios.get('http://ip-api.com/json/').then((response) => {
      return response.data;
    });
  } catch (error) {
    // TODO: Make game plan for error handling
    console.error('Error', error);

    console.log(
      (function f(n) {
        return n > 1 ? n * f(n - 1) : n;
      })(4)
    );
  }
};
