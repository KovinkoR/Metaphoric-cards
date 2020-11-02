export const sessionUserChecker = (req, res, next) => {
  if (req.user) {
    res.redirect("/game");
  } else {
    next();
  }
};

export const sessionUserUnChecker = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
  } else {
    next();
  }
};

// export default { sessionUserChecker, sessionUserUnChecker };
