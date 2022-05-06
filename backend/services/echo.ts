/**
 * A simple echo function used to test API connectivity
 *
 * @param event The event provided by APIGateway, including supplied parameters and other metadata
 * @returns An object containing the message supplied by the end-user, or an error if not supplied
 */
const getHandler = async (event: any): Promise<any> => {
  const message = event?.pathParameters?.message || '';

  return message
    ? {
        statusCode: 200,
        body: JSON.stringify({ message }),
      }
    : {
        statusCode: 404,
        body: JSON.stringify({
          error: true,
          message: "You need to supply a 'message' parameter",
        }),
      };
};

export const get = getHandler;
