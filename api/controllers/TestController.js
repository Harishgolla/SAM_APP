module.exports = {  
  /**
   * Validate the authenticated state of the requester.
   *
   * @param {Object} req
   * @param {Object} res
   */
  postData: function (req, res) {
    var data = {
      method: 'post',
      query: req.query,
      body: req.body,
      headers: req.headers,
      cookie: req.cookies,
      route: req.route
    };
    //res.status(400);
    //res.view('400', {message: 'Sorry, you need to tell us the ID of the FOO you want!'});
    console.log("errpr")
    console.log(req.body);
    res.serverError("harish error");
  },
  putData: function (req, res) {
    var data = {
      method: 'put',
      query: req.query,
      body: req.body,
      headers: req.headers,
      cookie: req.cookies,
      route: req.route
    };
    console.log(req.body);
    res.ok(data);
  },
  getData: function (req, res) {
    var data = {
      method: 'get',
      query: req.query,
      body: req.body,
      headers: req.headers,
      cookie: req.cookies,
      route: req.route
    };

    res.ok(data);
  },
  deleteData: function (req, res) {
    var data = {
      method: 'delete',
      query: req.query,
      body: req.body,
      headers: req.headers,
      cookie: req.cookies,
      route: req.route
    };

    res.ok(data);
  }
}
