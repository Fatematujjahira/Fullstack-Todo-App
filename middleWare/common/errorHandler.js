function notFoundHandler(req, res) {
  try {
    res.render("common/notFound", {
      title: `404 page not found !`,
      message: `404 not found !`,
    });
  } catch (error) {
    res.render(`common/error`, { title: `Error Occurred`, error });
  }
}

function errorHandler(error, req, res, next) {
  if (res.headerSent) {
    next(error);
  } else {
    res.render(`common/error`, { title: `Error Occurred`, error });
  }
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
