export const normalizeError = (errorResponse) => {

  if (typeof errorResponse.data === 'string') {
    return { [errorResponse.statusText]: errorResponse.data };
  }
  return errorResponse.data;
};
