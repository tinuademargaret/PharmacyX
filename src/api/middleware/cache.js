const flatCache = require("flat-cache");

let cacheMiddleware = (req, res, next) => {
  let key = "__express__" + req.originalUrl || req.url;
  const cache = flatCache.load("cache", path.resolve("./cache"));
  let cacheContent = cache.getKey(key);

  if (cacheContent) {
    res.send(cacheContent);
  } else {
    res.sendResponse = res.send;
    res.send = body => {
      cache.setKey(key, body);
      cache.save();
      res.sendResponse(body);
    };
    next();
  }
};

module.exports = cacheMiddleware;