module.exports = Object.freeze({
    // api response codes
    response_code: {
      /** Success Codes */
      SUCCESS: 200,
      EMPTY_REQ: 227,
      MAX_SUCCESS_CODE: 299,
  
      /** Other Codes*/
      RESOURCE_MOVED_PERMANENTLY: 301,
  
      /** Error Codes*/
      BAD_REQUEST: 400,
      UNAUTHORIZED: 401,
      JWT: 402,
      FORBIDDEN: 403,
      NOT_FOUND: 404,
      METHOD_NOT_ALLOWED: 405,
      DUPLICATE: 406,
      ALREADY_EXIST: 409,
      LOCKED: 423,
      UPGRADE_APP: 426,
      ROLE_BREACH: 451,
      INTERNAL_SERVER_ERROR: 500,
      SERVICE_UNAVAILABLE: 503
    },
    // basic numbers
    Numbers: {
      zero: 0,
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      twenty: 20,
      thirty: 30,
      hundred: 100
    }
  });
  