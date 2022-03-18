export const normalizeError = (errorResponse) => {
  if (typeof errorResponse.data === 'string') {
    return { status: 'error', message: errorResponse.data };
  }
  return errorResponse.data;
};
