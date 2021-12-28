
export const dataMiddleware = (store) => (next) => (action) => {

  switch (action.type) {
    default:
      next(action);
  }
};
