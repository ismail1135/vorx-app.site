"use strict";

var _express = _interopRequireDefault(require("express"));

var _resend = require("resend");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var app = (0, _express["default"])();
app.use(_express["default"].json());
var resend = new _resend.Resend(process.env.RESEND_API_KEY);
app.post("/subscribe", function _callee(req, res) {
  var email;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          email = req.body.email;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Abonelik başarılı",
            html: "<h1>Bültene hoş geldin 👋</h1>"
          }));

        case 4:
          res.json({
            message: "Abonelik başarılı"
          });
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          res.status(500).json({
            message: "Hata oluştu"
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
app.listen(3000, function () {
  console.log("Server çalışıyor");
});