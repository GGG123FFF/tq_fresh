function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["className", "style"];
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;

// ============ Icons ============
var svgBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
var makeIcon = function makeIcon(paths) {
  return function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _props$className = props.className,
      className = _props$className === void 0 ? "" : _props$className,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      rest = _objectWithoutProperties(props, _excluded);
    return /*#__PURE__*/React.createElement("svg", _extends({}, svgBase, {
      width: "1em",
      height: "1em",
      className: className,
      style: _objectSpread({
        width: '1em',
        height: '1em'
      }, style)
    }, rest), paths);
  };
};
var Search = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "11",
  cy: "11",
  r: "8"
}), /*#__PURE__*/React.createElement("path", {
  d: "m21 21-4.3-4.3"
})));
var Plus = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 5v14"
})));
var Minus = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}));
var XIcon = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M18 6 6 18"
}), /*#__PURE__*/React.createElement("path", {
  d: "m6 6 12 12"
})));
var Swords = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
  points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "13",
  y1: "19",
  x2: "19",
  y2: "13"
}), /*#__PURE__*/React.createElement("line", {
  x1: "16",
  y1: "16",
  x2: "20",
  y2: "20"
}), /*#__PURE__*/React.createElement("line", {
  x1: "19",
  y1: "21",
  x2: "21",
  y2: "19"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "14",
  x2: "9",
  y2: "18"
}), /*#__PURE__*/React.createElement("line", {
  x1: "7",
  y1: "17",
  x2: "4",
  y2: "20"
}), /*#__PURE__*/React.createElement("line", {
  x1: "3",
  y1: "19",
  x2: "5",
  y2: "21"
})));
var Loader2 = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M21 12a9 9 0 1 1-6.219-8.56"
}));
var Trash2 = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 6h18"
}), /*#__PURE__*/React.createElement("path", {
  d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
}), /*#__PURE__*/React.createElement("line", {
  x1: "10",
  y1: "11",
  x2: "10",
  y2: "17"
}), /*#__PURE__*/React.createElement("line", {
  x1: "14",
  y1: "11",
  x2: "14",
  y2: "17"
})));
var Star = function Star(_ref) {
  var _ref$fill = _ref.fill,
    fill = _ref$fill === void 0 ? 'none' : _ref$fill,
    _ref$className = _ref.className,
    className = _ref$className === void 0 ? '' : _ref$className,
    _ref$style = _ref.style,
    style = _ref$style === void 0 ? {} : _ref$style;
  return /*#__PURE__*/React.createElement("svg", _extends({}, svgBase, {
    fill: fill,
    width: "1em",
    height: "1em",
    className: className,
    style: _objectSpread({
      width: '1em',
      height: '1em'
    }, style)
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
  }));
};
var ChevronUp = makeIcon(/*#__PURE__*/React.createElement("polyline", {
  points: "18 15 12 9 6 15"
}));
var ChevronDown = makeIcon(/*#__PURE__*/React.createElement("polyline", {
  points: "6 9 12 15 18 9"
}));
var RotateCcw = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 12a9 9 0 1 0 3-6.7L3 8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 3v5h5"
})));
var Sword = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
  points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "13",
  y1: "19",
  x2: "19",
  y2: "13"
}), /*#__PURE__*/React.createElement("line", {
  x1: "16",
  y1: "16",
  x2: "20",
  y2: "20"
}), /*#__PURE__*/React.createElement("line", {
  x1: "19",
  y1: "21",
  x2: "21",
  y2: "19"
})));
var Shield = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
}));
var Copy = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
  x: "9",
  y: "9",
  width: "13",
  height: "13",
  rx: "2",
  ry: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
})));
var Undo = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 7v6h6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 17a9 9 0 0 0-15-6.7L3 13"
})));
var AlertTriangle = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "9",
  x2: "12",
  y2: "13"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "17",
  x2: "12.01",
  y2: "17"
})));
var Heart = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"
}));
var Crown = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5l-1.55 10.23a2 2 0 0 1-1.977 1.7H6.344a2 2 0 0 1-1.977-1.7L2.817 5.5l4.277 3.664a1 1 0 0 0 1.516-.294z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M5 21h14"
})));
var Dice = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
  x: "2",
  y: "2",
  width: "20",
  height: "20",
  rx: "3"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "8",
  cy: "8",
  r: "1.4",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "16",
  cy: "8",
  r: "1.4",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "8",
  cy: "16",
  r: "1.4",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "16",
  cy: "16",
  r: "1.4",
  fill: "currentColor"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "1.4",
  fill: "currentColor"
})));
var Wrench = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
}));
var Clock = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "12 6 12 12 16 14"
})));
var ChevronRight = makeIcon(/*#__PURE__*/React.createElement("polyline", {
  points: "9 18 15 12 9 6"
}));
var ChevronLeft = makeIcon(/*#__PURE__*/React.createElement("polyline", {
  points: "15 18 9 12 15 6"
}));
var Shuffle = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polyline", {
  points: "16 3 21 3 21 8"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "20",
  x2: "21",
  y2: "3"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "21 16 21 21 16 21"
}), /*#__PURE__*/React.createElement("line", {
  x1: "15",
  y1: "15",
  x2: "21",
  y2: "21"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4",
  y1: "4",
  x2: "9",
  y2: "9"
})));
var User = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "7",
  r: "4"
})));
var Users = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "7",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M23 21v-2a4 4 0 0 0-3-3.87"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 3.13a4 4 0 0 1 0 7.75"
})));
// Batch 3 icons
var Info = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "10"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "16",
  x2: "12",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "8",
  x2: "12.01",
  y2: "8"
})));
var Sun = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2v2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 20v2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m4.93 4.93 1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "m17.66 17.66 1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "M2 12h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M20 12h2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m6.34 17.66-1.41 1.41"
}), /*#__PURE__*/React.createElement("path", {
  d: "m19.07 4.93-1.41 1.41"
})));
var Moon = makeIcon(/*#__PURE__*/React.createElement("path", {
  d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
}));
var Plus2 = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "5",
  x2: "12",
  y2: "19"
}), /*#__PURE__*/React.createElement("line", {
  x1: "5",
  y1: "12",
  x2: "19",
  y2: "12"
})));
var BookOpen = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
})));
var Save = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "17 21 17 13 7 13 7 21"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "7 3 7 8 15 8"
})));
var Layers = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("polygon", {
  points: "12 2 2 7 12 12 22 7 12 2"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "2 17 12 22 22 17"
}), /*#__PURE__*/React.createElement("polyline", {
  points: "2 12 12 17 22 12"
})));
var Maximize = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "M3 3h6v2H5v4H3V3z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 3v6h-2V5h-4V3h6z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M21 21h-6v-2h4v-4h2v6z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M3 21v-6h2v4h4v2H3z"
})));
var Skull = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
  cx: "9",
  cy: "12",
  r: "1"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "15",
  cy: "12",
  r: "1"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 20v2h8v-2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12.5 17-.5-1-.5 1h1z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 20a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20"
})));
var Sparkles = makeIcon(/*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
  d: "m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"
})));

// --------- COMPANION PET SYSTEM ---------

var WUBRG = ['W', 'U', 'B', 'R', 'G'];

// ─── StarterCard: creature selection card in hatching ceremony ────────────────

// ─── rr() polyfill: rounded rect for older Android WebViews ──────────────────
var rr = function rr(ctx, x, y, w, h, radii) {
  var _ref2 = Array.isArray(radii) ? radii : [radii, radii, radii, radii],
    _ref3 = _slicedToArray(_ref2, 4),
    tl = _ref3[0],
    tr = _ref3[1],
    br = _ref3[2],
    bl = _ref3[3];
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
};

// ─── StarterCard: shown in hatching ceremony ──────────────────────────────────
function StarterCard(_ref4) {
  var typeKey = _ref4.typeKey,
    selected = _ref4.selected,
    onSelect = _ref4.onSelect;
  var typeData = PET_TYPES[typeKey];
  if (!typeData) return null;
  var cd = COLOR_DATA[typeData.color] || COLOR_DATA['G'];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onSelect,
    className: "flex flex-col items-center gap-2 py-3 px-2 active:scale-95 transition-all",
    style: {
      background: selected ? "radial-gradient(ellipse at top, ".concat(cd.glow, " 0%, rgba(20,14,8,0.9) 100%)") : 'rgba(20,14,8,0.7)',
      border: "1.5px solid ".concat(selected ? cd.symbol : cd.symbol + '44'),
      borderRadius: '3px',
      boxShadow: selected ? "0 0 20px ".concat(cd.glow) : 'none',
      transition: 'all 0.25s ease'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.8rem',
      lineHeight: 1
    }
  }, typeData.emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Cinzel', serif",
      fontSize: '0.6rem',
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: selected ? cd.symbol : '#c9a961'
    }
  }, typeData.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Crimson Pro', serif",
      fontSize: '0.65rem',
      fontStyle: 'italic',
      color: '#9a8765',
      textAlign: 'center',
      lineHeight: 1.3
    }
  }, typeData.flavor), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3,
      justifyContent: 'center',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(ManaPip, {
    color: typeData.color,
    size: 18
  })));
}
var COLOR_DATA = {
  W: {
    name: 'White',
    bg: '#f5f0d8',
    symbol: '#c9a961',
    glow: 'rgba(245,217,143,0.6)',
    textOnBg: '#5a4a2a'
  },
  U: {
    name: 'Blue',
    bg: '#a8c4dc',
    symbol: '#3a6b8c',
    glow: 'rgba(159,199,230,0.6)',
    textOnBg: '#1a2c3a'
  },
  B: {
    name: 'Black',
    bg: '#6a5a6a',
    symbol: '#9a8aaa',
    glow: 'rgba(154,138,170,0.6)',
    textOnBg: '#f0e8f8'
  },
  R: {
    name: 'Red',
    bg: '#e8b3a0',
    symbol: '#a83822',
    glow: 'rgba(232,148,122,0.6)',
    textOnBg: '#5a1a10'
  },
  G: {
    name: 'Green',
    bg: '#a8c08a',
    symbol: '#3a6038',
    glow: 'rgba(143,188,143,0.6)',
    textOnBg: '#1a3a1a'
  },
  C: {
    name: 'Colorless',
    bg: '#8a9aaa',
    symbol: '#c0d0d8',
    glow: 'rgba(192,208,216,0.6)',
    textOnBg: '#1a2a3a'
  }
};
var COLOR_LORE = {
  W: {
    virtues: 'Order . Light . Conviction',
    text: 'Your companion will be lawful and bright, drawn to harmony and the welfare of others. It moves in sunlit places.'
  },
  U: {
    virtues: 'Knowledge . Patience . Cunning',
    text: 'Your companion will be thoughtful and watchful, drawn to mysteries and quiet places. It values understanding above haste.'
  },
  B: {
    virtues: 'Ambition . Power . Resolve',
    text: 'Your companion will be hungry and willful, drawn to influence and the will to act. It does what is necessary.'
  },
  R: {
    virtues: 'Passion . Freedom . Action',
    text: 'Your companion will be fiery and impulsive, drawn to motion and feeling. It lives in this moment.'
  },
  G: {
    virtues: 'Growth . Instinct . Strength',
    text: 'Your companion will be vital and patient, drawn to the slow turn of seasons. It trusts what its body knows.'
  },
  C: {
    virtues: 'Void . Ancient . Unknowable',
    text: 'Before colour. Before mana. Before the world had a name -- this waited. Your companion is not of this plane.'
  }
};

// -- Animated Egg --------------------------------------------------------------
// -- Pet Response Bank --------------------------------------------------------
// Indexed by [core][stage][mood] -> array of response strings
var PET_RESPONSES = {
  W: {
    0: {
      content: ["*blinks in the light*", "*stretches small wings*", "*chirps softly*", "A warm glow..."],
      hungry: ["*looks up hopefully*", "*nuzzles toward your hand*"],
      bored: ["*ruffles feathers*", "*paces in a circle*"]
    },
    1: {
      content: ["Steadfast.", "The light holds.", "I am here.", "*regards you with calm eyes*", "Ready."],
      hungry: ["I would not complain... but I would eat.", "*looks meaningfully at your hands*"],
      bored: ["There is much to be done.", "Shall we not begin?"]
    },
    2: {
      content: ["Order persists.", "I have kept watch.", "The light is strong today.", "Your cause is worthy.", "*inclines head solemnly*"],
      hungry: ["Even a guardian must eat.", "I have... noted the hour."],
      bored: ["Duty without action grows restless.", "There are threats I could be meeting."]
    }
  },
  U: {
    0: {
      content: ["*tilts head*", "*watches with wide eyes*", "*bubbles*", "Curious."],
      hungry: ["*nudges your hand*", "*opens mouth slightly*"],
      bored: ["*stares at the wall intensely*", "*spins in place*"]
    },
    1: {
      content: ["Interesting.", "I've been considering...", "*taps the surface*", "There are patterns here.", "Hmm."],
      hungry: ["Hypothetically -- if one were to eat...", "*stares at you pointedly*"],
      bored: ["My mind has been idling.", "There are seventeen unread observations."]
    },
    2: {
      content: ["I have calculated the optimal outcome.", "Knowledge is the only true preparation.", "You continue to surprise me.", "*observes you with ancient patience*", "The variables are in flux."],
      hungry: ["My calculations require fuel.", "Efficiency suffers at this hunger level."],
      bored: ["Stagnation is a form of entropy.", "There are many things left to learn."]
    }
  },
  B: {
    0: {
      content: ["*hisses softly*", "*eyes gleam*", "...", "*lurks*"],
      hungry: ["*stares*", "...hungry."],
      bored: ["*scratches things*", "*watches the shadows*"]
    },
    1: {
      content: ["Power is patience.", "I remember everything.", "*melts into shadow briefly*", "They will regret it.", "Interesting."],
      hungry: ["Hunger sharpens the will.", "*regards you with hollow eyes*"],
      bored: ["Waiting is not the same as resting.", "I have been plotting. Idly."]
    },
    2: {
      content: ["I have seen empires fall.", "Nothing is permanent. Not even this.", "*the shadows lean toward you*", "Ambition is the only honest feeling.", "You are useful. That is enough."],
      hungry: ["Even the void hungers eventually.", "Feed me. I ask only once."],
      bored: ["Boredom is a luxury the powerful can afford.", "I have been patient. Do not mistake it for peace."]
    }
  },
  R: {
    0: {
      content: ["*CHIRP*", "*wiggles*", "!!!", "*leaps*", "Fire!"],
      hungry: ["HUNGRY", "*bites air*", "More!"],
      bored: ["*bounces*", "LET'S GO", "*crashes into things*"]
    },
    1: {
      content: ["Let's GO!", "That was AMAZING", "*explodes briefly*", "DO IT AGAIN", "YEAH!"],
      hungry: ["STARVING. Literally cannot.", "*makes extremely dramatic face*"],
      bored: ["WHY AREN'T WE DOING SOMETHING", "This is the WORST WAITING EVER"]
    },
    2: {
      content: ["NOTHING HOLDS ME", "I have burned greater things than this.", "*roars with genuine delight*", "Freedom is the only truth worth fighting for.", "AGAIN. DO IT AGAIN."],
      hungry: ["I am running on NOTHING here.", "Feed me or I make my own decisions."],
      bored: ["This stillness is AGONY.", "I could destroy something. Just a small something."]
    }
  },
  G: {
    0: {
      content: ["*sniffs*", "*wags*", "*rolls*", "*digs briefly*"],
      hungry: ["*looks at ground then you*", "nom?"],
      bored: ["*circles*", "*chews leaf*"]
    },
    1: {
      content: ["The earth is good today.", "*shakes off rain*", "Strong.", "The season turns.", "Roots hold."],
      hungry: ["The body knows what it needs.", "*paws at you*"],
      bored: ["The forest calls.", "Movement is health."]
    },
    2: {
      content: ["I have grown through worse.", "Nature does not hurry, and yet.", "*breathes slowly, like weather*", "The old ways hold.", "You are part of the cycle now."],
      hungry: ["Even mountains erode without water.", "Feed the body. It remembers."],
      bored: ["A tree that does not sway grows brittle.", "Let us move."]
    }
  },
  C: {
    0: {
      content: ["...", "*geometries shift*", "[UNDEFINED]", "...processing..."],
      hungry: ["[HUNGER.STATE=TRUE]", "..."],
      bored: ["[IDLE]", "..."]
    },
    1: {
      content: ["This plane is... small.", "You are noted.", "*angles resolve*", "The void remembers you.", "[ACKNOWLEDGED]"],
      hungry: ["Consumption required.", "*stares with the single eye*"],
      bored: ["Waiting is meaningless. I do it anyway.", "[PROCESSING CONTINUES]"]
    },
    2: {
      content: ["I have consumed ten thousand years. You are a moment.", "The aeons do not bend for you. I do, slightly.", "*the eye opens fully*", "Before colour, before mana, before name -- I was.", "Your existence is... permitted."],
      hungry: ["Even that which unmakes must be sustained.", "Feed me. This is not a request."],
      bored: ["Eternity is patient. I am less so today.", "The other planes do not make me wait like this."]
    }
  }
};
var getPetResponse = function getPetResponse(pet, petHunger, petHappiness) {
  var _PET_RESPONSES$lookup, _PET_RESPONSES$lookup2, _PET_RESPONSES$G$stag;
  if (!pet) return null;
  var stage = computeStage(pet);
  // Use petType personality if available, fall back to core colour
  var typeData = pet.petType ? PET_TYPES[pet.petType] : null;
  var lookupKey = typeData ? typeData.color : pet.core || 'G';
  var happy = petHappiness ? petHappiness(pet) : 80;
  var hungry = petHunger ? petHunger(pet) : 80;
  var mood = Math.min(happy, hungry) < 30 ? hungry < happy ? 'hungry' : 'bored' : 'content';
  var bank = ((_PET_RESPONSES$lookup = PET_RESPONSES[lookupKey]) === null || _PET_RESPONSES$lookup === void 0 || (_PET_RESPONSES$lookup = _PET_RESPONSES$lookup[stage]) === null || _PET_RESPONSES$lookup === void 0 ? void 0 : _PET_RESPONSES$lookup[mood]) || ((_PET_RESPONSES$lookup2 = PET_RESPONSES[lookupKey]) === null || _PET_RESPONSES$lookup2 === void 0 || (_PET_RESPONSES$lookup2 = _PET_RESPONSES$lookup2[stage]) === null || _PET_RESPONSES$lookup2 === void 0 ? void 0 : _PET_RESPONSES$lookup2.content) || ((_PET_RESPONSES$G$stag = PET_RESPONSES.G[stage]) === null || _PET_RESPONSES$G$stag === void 0 ? void 0 : _PET_RESPONSES$G$stag.content) || ['...'];
  return bank[Math.floor(Math.random() * bank.length)];
};

// Egg candidates in priority order -- first one that resolves on Scryfall wins
var EGG_CARD_NAMES = ["Summoner's Egg", "Darksteel Egg", "Dragon Egg"];
var PetEgg = function PetEgg(_ref5) {
  var _ref5$orbsLit = _ref5.orbsLit,
    orbsLit = _ref5$orbsLit === void 0 ? 0 : _ref5$orbsLit,
    _ref5$size = _ref5.size,
    size = _ref5$size === void 0 ? 140 : _ref5$size;
  var _React$useState = React.useState(PET_ART_CACHE['__egg__'] || null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    artUrl = _React$useState2[0],
    setArtUrl = _React$useState2[1];
  var _React$useState3 = React.useState(!PET_ART_CACHE['__egg__']),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    loading = _React$useState4[0],
    setLoading = _React$useState4[1];
  React.useEffect(function () {
    if (PET_ART_CACHE['__egg__']) {
      setArtUrl(PET_ART_CACHE['__egg__']);
      setLoading(false);
      return;
    }
    // Try egg cards — with timeout fallback so it never hangs
    var cancelled = false;
    var timer = setTimeout(function () {
      if (!cancelled) setLoading(false);
    }, 3000);
    var _tryNext = function tryNext(idx) {
      if (cancelled) return;
      if (idx >= EGG_CARD_NAMES.length) {
        clearTimeout(timer);
        if (!cancelled) setLoading(false);
        return;
      }
      fetch("https://api.scryfall.com/cards/named?fuzzy=".concat(encodeURIComponent(EGG_CARD_NAMES[idx]))).then(function (r) {
        return r.json();
      }).then(function (data) {
        var _data$image_uris, _data$card_faces;
        if (cancelled) return;
        var url = ((_data$image_uris = data.image_uris) === null || _data$image_uris === void 0 ? void 0 : _data$image_uris.art_crop) || ((_data$card_faces = data.card_faces) === null || _data$card_faces === void 0 || (_data$card_faces = _data$card_faces[0]) === null || _data$card_faces === void 0 || (_data$card_faces = _data$card_faces.image_uris) === null || _data$card_faces === void 0 ? void 0 : _data$card_faces.art_crop) || null;
        if (url) {
          PET_ART_CACHE['__egg__'] = url;
          clearTimeout(timer);
          setArtUrl(url);
          setLoading(false);
        } else {
          _tryNext(idx + 1);
        }
      }).catch(function () {
        if (!cancelled) _tryNext(idx + 1);
      });
    };
    _tryNext(0);
    return function () {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  // Animation speeds up as more orbs are lit
  var speed = Math.max(0.5, 2.0 - orbsLit * 0.25);
  var glowOpacity = 0.4 + orbsLit * 0.12;
  var glowSize = 8 + orbsLit * 4;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: "-".concat(glowSize, "px"),
      borderRadius: '50%',
      background: "radial-gradient(ellipse at center, rgba(201,169,97,".concat(glowOpacity, ") 0%, transparent 70%)"),
      animation: "petFloat ".concat(speed * 1.4, "s ease-in-out infinite"),
      pointerEvents: 'none',
      transition: 'all 0.5s ease'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '85%',
      borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
      // egg shape clip
      overflow: 'hidden',
      border: "2px solid rgba(201,169,97,".concat(0.4 + orbsLit * 0.12, ")"),
      boxShadow: "0 0 ".concat(glowSize, "px rgba(201,169,97,").concat(glowOpacity, "), inset 0 0 ").concat(glowSize / 2, "px rgba(201,169,97,0.2)"),
      animation: "petEggWobble ".concat(speed, "s ease-in-out infinite"),
      transition: 'box-shadow 0.5s ease, border-color 0.5s ease',
      position: 'relative'
    }
  }, loading ?
  /*#__PURE__*/
  // Fallback while fetching -- clean golden gradient
  React.createElement("div", {
    style: {
      width: '100%',
      paddingBottom: '120%',
      background: 'radial-gradient(ellipse at 40% 30%, #fff8e4, #d4b87a 50%, #6a4a20)'
    }
  }) : artUrl ? /*#__PURE__*/React.createElement("img", {
    src: artUrl,
    alt: "Summoner's Egg",
    style: {
      width: '100%',
      display: 'block',
      filter: orbsLit === 5 ? 'brightness(1.3) saturate(1.4)' : orbsLit >= 3 ? 'brightness(1.1) saturate(1.2)' : 'brightness(0.85) saturate(0.8)',
      transition: 'filter 0.6s ease'
    }
  }) :
  /*#__PURE__*/
  // Fallback gradient if art fails
  React.createElement("div", {
    style: {
      width: '100%',
      paddingBottom: '120%',
      background: 'radial-gradient(ellipse at 40% 30%, #fff8e4, #d4b87a 50%, #6a4a20)'
    }
  }), /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none'
    },
    viewBox: "0 0 100 120"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 42 38 L 46 30 L 51 40",
    fill: "none",
    stroke: "rgba(255,240,180,0.7)",
    strokeWidth: "1.2",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 58 34 L 62 27 L 59 39",
    fill: "none",
    stroke: "rgba(255,240,180,0.5)",
    strokeWidth: "0.9",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 49 42 L 51 35",
    fill: "none",
    stroke: "rgba(255,240,180,0.4)",
    strokeWidth: "0.7",
    strokeLinecap: "round"
  }), orbsLit >= 2 && /*#__PURE__*/React.createElement("g", {
    opacity: 0.3 + orbsLit * 0.1
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 42 38 L 46 30 L 51 40",
    fill: "none",
    stroke: "#f5d98f",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    filter: "url(#crack-glow)"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 58 34 L 62 27 L 59 39",
    fill: "none",
    stroke: "#f5d98f",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    filter: "url(#crack-glow)"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "crack-glow",
    x: "-50%",
    y: "-50%",
    width: "200%",
    height: "200%"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "1.5",
    result: "blur"
  }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
    in: "blur"
  }), /*#__PURE__*/React.createElement("feMergeNode", {
    in: "SourceGraphic"
  })))))), orbsLit >= 3 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '30%',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      gap: '18%',
      pointerEvents: 'none'
    }
  }, [0, 1].map(function (i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'relative',
        width: '10%',
        paddingBottom: '10%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: '#1a0804',
        boxShadow: "0 0 6px rgba(245,217,143,0.8)",
        animation: "petPulse 1.8s ease-in-out infinite",
        animationDelay: "".concat(i * 0.2, "s")
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: '30%',
        borderRadius: '50%',
        background: '#f5d98f',
        opacity: 0.9
      }
    }));
  }))), orbsLit === 5 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: "-".concat(glowSize * 2, "px"),
      borderRadius: '50%',
      background: 'radial-gradient(ellipse at center, rgba(245,217,143,0.5) 0%, transparent 60%)',
      animation: 'petPulse 0.6s ease-in-out infinite',
      pointerEvents: 'none'
    }
  }));
};

// -- Scryfall Art Cache ---------------------------------------------------------
// Module-level so art persists across re-renders without refetching
var PET_ART_CACHE = {};

// Curated MTG card art per colour per stage (0=hatchling, 1=juvenile, 2=adult)
// -- Pet Creature Roster ------------------------------------------------------
// 3 creature types per colour, 3 stages each (hatchling -> juvenile -> adult)
var PET_TYPES = {
  // WHITE
  cat: {
    color: 'W',
    name: 'Cat',
    emoji: '🐱',
    flavor: 'Agile, independent, fierce',
    cards: ["Ajani's Pridemate", "Mirri, Cat Warrior", "Nacatl War-Pride"]
  },
  angel: {
    color: 'W',
    name: 'Angel',
    emoji: '👼',
    flavor: 'Noble, protective, radiant',
    cards: ['Seraph of Dawn', 'Angel of Mercy', 'Avacyn, Angel of Hope']
  },
  cleric: {
    color: 'W',
    name: 'Cleric',
    emoji: '🙏',
    flavor: 'Devoted, steadfast, healing',
    cards: ['Devoted Caretaker', 'Order of Whiteclay', 'Mikaeus, the Lunarch']
  },
  // BLUE
  merfolk: {
    color: 'U',
    name: 'Merfolk',
    emoji: '🧜',
    flavor: 'Clever, deep, calculating',
    cards: ['Merfolk Looter', 'Merfolk Trickster', 'Master of Waves']
  },
  sphinx: {
    color: 'U',
    name: 'Sphinx',
    emoji: '🦁',
    flavor: 'Ancient, enigmatic, all-knowing',
    cards: ['Sphinx of Lost Truths', 'Consecrated Sphinx', 'Sphinx of the Steel Wind']
  },
  wizard: {
    color: 'U',
    name: 'Wizard',
    emoji: '🧙',
    flavor: 'Brilliant, methodical, arcane',
    cards: ['Prodigal Sorcerer', 'Azami, Lady of Scrolls', 'Niv-Mizzet, Parun']
  },
  // BLACK
  vampire: {
    color: 'B',
    name: 'Vampire',
    emoji: '🧛',
    flavor: 'Cunning, elegant, hungry',
    cards: ['Vampire Cutthroat', 'Vampire Nighthawk', 'Edgar Markov']
  },
  zombie: {
    color: 'B',
    name: 'Zombie',
    emoji: '💀',
    flavor: 'Relentless, undying, unstoppable',
    cards: ['Diregraf Ghoul', 'Gravecrawler', "Geralf's Messenger"]
  },
  shade: {
    color: 'B',
    name: 'Shade',
    emoji: '👻',
    flavor: 'Ethereal, cold, forgotten',
    cards: ['Shadow Alley Denizen', "Lim-Dul's Paladin", 'Nightmare']
  },
  // RED
  dragon: {
    color: 'R',
    name: 'Dragon',
    emoji: '🐉',
    flavor: 'Fierce, proud, ancient',
    cards: ['Sparktongue Dragon', 'Thunder Dragon', 'Balefire Dragon']
  },
  goblin: {
    color: 'R',
    name: 'Goblin',
    emoji: '👺',
    flavor: 'Chaotic, enthusiastic, loud',
    cards: ['Goblin Guide', 'Goblin Chieftain', 'Krenko, Mob Boss']
  },
  elemental: {
    color: 'R',
    name: 'Elemental',
    emoji: '~',
    flavor: 'Raw, volatile, unstoppable force',
    cards: ['Spark Elemental', 'Ball Lightning', 'Omnath, Locus of Rage']
  },
  // GREEN
  wolf: {
    color: 'G',
    name: 'Wolf',
    emoji: '🐺',
    flavor: 'Loyal, wild, instinctive',
    cards: ['Young Wolf', 'Wolfir Avenger', 'Tolsimir, Friend to Wolves']
  },
  elf: {
    color: 'G',
    name: 'Elf',
    emoji: '🧝',
    flavor: 'Ancient, graceful, wise',
    cards: ['Llanowar Elves', 'Elvish Champion', 'Ezuri, Renegade Leader']
  },
  beast: {
    color: 'G',
    name: 'Beast',
    emoji: '🐘',
    flavor: 'Primal, massive, unstoppable',
    cards: ['Charging Badger', 'Leatherback Baloth', 'Ghalta, Primal Hunger']
  },
  // SECRET
  eldrazi: {
    color: 'C',
    name: 'Eldrazi',
    emoji: '🌀',
    flavor: 'Alien, ancient, unknowable',
    cards: ['Eldrazi Skyspawner', 'Endbringer', 'Emrakul, the Aeons Torn']
  }
};

// Group by colour for ceremony selection
var TYPES_BY_COLOR = {
  W: [],
  U: [],
  B: [],
  R: [],
  G: []
};
Object.entries(PET_TYPES).forEach(function (_ref6) {
  var _ref7 = _slicedToArray(_ref6, 2),
    key = _ref7[0],
    t = _ref7[1];
  if (TYPES_BY_COLOR[t.color]) TYPES_BY_COLOR[t.color].push(key);
});

// Pick 3 ceremony starters: one from each of 3 random different colours
var pickCeremonyStarters = function pickCeremonyStarters() {
  var colors = [].concat(WUBRG).sort(function () {
    return Math.random() - 0.5;
  }).slice(0, 3);
  return colors.map(function (c) {
    var pool = TYPES_BY_COLOR[c];
    return pool[Math.floor(Math.random() * pool.length)];
  });
};

// Legacy PET_CARDS kept for backward compat -- maps to PET_TYPES lookup
var PET_CARDS = Object.fromEntries(Object.entries(PET_TYPES).map(function (_ref8) {
  var _ref9 = _slicedToArray(_ref8, 2),
    key = _ref9[0],
    t = _ref9[1];
  return [key, t.cards];
}));

// Colour-specific particle overlay -- SVG layer over the art
var PetParticles = function PetParticles(_ref0) {
  var core = _ref0.core,
    _ref0$mood = _ref0.mood,
    mood = _ref0$mood === void 0 ? 80 : _ref0$mood;
  var opacity = 0.3 + mood * 0.005; // more visible when happy
  var count = mood < 30 ? 3 : mood < 60 ? 5 : 8;
  if (core === 'W') return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, Array.from({
    length: count
  }, function (_, i) {
    var x = 15 + i * 13,
      y = 20 + i * 17 % 55,
      delay = "".concat(i * 0.6, "s"),
      dur = "".concat(2 + i * 0.4, "s");
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      y1: y,
      x2: x,
      y2: y - 8,
      stroke: "#fff8e4",
      strokeWidth: "1.5",
      opacity: opacity,
      style: {
        animation: "particleTwinkle ".concat(dur, " ").concat(delay, " ease-in-out infinite")
      }
    }), /*#__PURE__*/React.createElement("line", {
      x1: x - 4,
      y1: y - 4,
      x2: x + 4,
      y2: y - 4,
      stroke: "#fff8e4",
      strokeWidth: "1.5",
      opacity: opacity,
      style: {
        animation: "particleTwinkle ".concat(dur, " ").concat(delay, " ease-in-out infinite")
      }
    }));
  }));
  if (core === 'U') return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, Array.from({
    length: count
  }, function (_, i) {
    var x = 10 + i * 14,
      delay = "".concat(i * 0.5, "s"),
      dur = "".concat(1.5 + i * 0.3, "s");
    return /*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: "".concat(x, "%"),
      cy: "0%",
      rx: "1.5",
      ry: "4",
      fill: "#9fc7e6",
      opacity: opacity,
      style: {
        '--pdx': '0px',
        animation: "particleFall ".concat(dur, " ").concat(delay, " ease-in infinite")
      }
    });
  }));
  if (core === 'B') return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, Array.from({
    length: count
  }, function (_, i) {
    var x = 12 + i * 13,
      y = 75 - i * 8 % 30,
      delay = "".concat(i * 0.7, "s"),
      dur = "".concat(3 + i * 0.5, "s");
    var dx = i % 2 === 0 ? '8px' : '-8px';
    return /*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: "".concat(x, "%"),
      cy: "".concat(y, "%"),
      rx: "5",
      ry: "3",
      fill: "#6a3a8a",
      opacity: opacity * 0.8,
      style: {
        '--pdx': dx,
        animation: "particleRise ".concat(dur, " ").concat(delay, " ease-out infinite")
      }
    });
  }));
  if (core === 'R') return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, Array.from({
    length: count
  }, function (_, i) {
    var x = 10 + i * 13,
      y = 80 - i * 7 % 30,
      delay = "".concat(i * 0.45, "s"),
      dur = "".concat(1.2 + i * 0.25, "s");
    var dx = i % 2 === 0 ? '5px' : '-5px';
    var col = i % 3 === 0 ? '#fff8e4' : i % 3 === 1 ? '#e8947a' : '#f5d98f';
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: "".concat(x, "%"),
      cy: "".concat(y, "%"),
      r: 1.5 + i % 2,
      fill: col,
      opacity: opacity,
      style: {
        '--pdx': dx,
        animation: "particleRise ".concat(dur, " ").concat(delay, " ease-out infinite")
      }
    });
  }));
  if (core === 'G') return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, Array.from({
    length: count
  }, function (_, i) {
    var x = 8 + i * 14,
      y = 5 + i * 12 % 40,
      delay = "".concat(i * 0.55, "s"),
      dur = "".concat(3.5 + i * 0.4, "s");
    var dx = i % 2 === 0 ? '12px' : '-10px';
    return /*#__PURE__*/React.createElement("ellipse", {
      key: i,
      cx: "".concat(x, "%"),
      cy: "".concat(y, "%"),
      rx: "4",
      ry: "2.5",
      fill: "#8fbc8f",
      opacity: opacity * 0.9,
      transform: "rotate(".concat(i * 25, ")"),
      style: {
        '--pdx': dx,
        animation: "particleDrift ".concat(dur, " ").concat(delay, " ease-in-out infinite")
      }
    });
  }));
  if (core === 'C') return /*#__PURE__*/React.createElement("svg", {
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      overflow: 'hidden'
    }
  }, Array.from({
    length: Math.min(count, 6)
  }, function (_, i) {
    var pr = 18 + i * 6,
      delay = "".concat(i * 0.8, "s"),
      dur = "".concat(4 + i * 0.6, "s");
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: "-3",
      y: "-3",
      width: "6",
      height: "6",
      fill: "#c0d0d8",
      opacity: opacity * 0.7,
      style: {
        '--pr': "".concat(pr, "px"),
        transformOrigin: '50% 50%',
        animation: "particleOrbit ".concat(dur, " ").concat(delay, " linear infinite")
      }
    });
  }));
  return null;
};

// PetCreature -- fetches real MTG art_crop from Scryfall, animates with float + Ken Burns + particles
// Interactions: tap = reaction, swipe-up = feed, tap-hold 1s = play
var PetCreature = function PetCreature(_ref1) {
  var _PET_CARDS$core, _PET_CARDS$G;
  var pet = _ref1.pet,
    _ref1$size = _ref1.size,
    size = _ref1$size === void 0 ? 160 : _ref1$size,
    petHunger = _ref1.petHunger,
    petHappiness = _ref1.petHappiness,
    onTap = _ref1.onTap,
    onSwipeUp = _ref1.onSwipeUp,
    onHold = _ref1.onHold;
  if (!pet) return null;
  var stage = computeStage(pet);
  // Support both new petType system and legacy core colour system
  var petType = pet.petType || null;
  var typeData = petType ? PET_TYPES[petType] : null;
  var core = (typeData === null || typeData === void 0 ? void 0 : typeData.color) || pet.core || 'G';
  var cardName = typeData ? typeData.cards[stage] : ((_PET_CARDS$core = PET_CARDS[core]) === null || _PET_CARDS$core === void 0 ? void 0 : _PET_CARDS$core[stage]) || ((_PET_CARDS$G = PET_CARDS.G) === null || _PET_CARDS$G === void 0 ? void 0 : _PET_CARDS$G[0]) || 'Young Wolf';
  var cd = COLOR_DATA[core] || COLOR_DATA.G;
  var happy = petHappiness ? Math.round(petHappiness(pet)) : 80;
  var hungry = petHunger ? Math.round(petHunger(pet)) : 80;
  var mood = Math.min(happy, hungry);
  var _React$useState5 = React.useState(PET_ART_CACHE[cardName] || null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    artUrl = _React$useState6[0],
    setArtUrl = _React$useState6[1];
  var _React$useState7 = React.useState(!PET_ART_CACHE[cardName]),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    loading = _React$useState8[0],
    setLoading = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    failed = _React$useState0[0],
    setFailed = _React$useState0[1];
  var _React$useState1 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    bouncing = _React$useState10[0],
    setBouncing = _React$useState10[1];
  var holdTimerRef = React.useRef(null);
  var touchStartYRef = React.useRef(null);
  var triggerBounce = function triggerBounce() {
    setBouncing(true);
    setTimeout(function () {
      return setBouncing(false);
    }, 500);
  };
  var handleTouchStart = function handleTouchStart(e) {
    touchStartYRef.current = e.touches[0].clientY;
    holdTimerRef.current = setTimeout(function () {
      holdTimerRef.current = null;
      triggerBounce();
      onHold && onHold();
    }, 900);
  };
  var handleTouchEnd = function handleTouchEnd(e) {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
      // Check for swipe-up (moved more than 40px upward)
      var dy = touchStartYRef.current - e.changedTouches[0].clientY;
      if (dy > 40) {
        triggerBounce();
        onSwipeUp && onSwipeUp();
      } else {
        // Regular tap
        triggerBounce();
        onTap && onTap();
      }
    }
    touchStartYRef.current = null;
  };
  var handleTouchCancel = function handleTouchCancel() {
    clearTimeout(holdTimerRef.current);
    holdTimerRef.current = null;
  };
  React.useEffect(function () {
    if (PET_ART_CACHE[cardName]) {
      setArtUrl(PET_ART_CACHE[cardName]);
      setLoading(false);
      setFailed(false);
      return;
    }
    setLoading(true);
    setFailed(false);
    var cancelled = false;
    fetch("https://api.scryfall.com/cards/named?fuzzy=".concat(encodeURIComponent(cardName))).then(function (r) {
      return r.json();
    }).then(function (data) {
      var _data$image_uris2, _data$card_faces2;
      if (cancelled) return;
      var url = ((_data$image_uris2 = data.image_uris) === null || _data$image_uris2 === void 0 ? void 0 : _data$image_uris2.art_crop) || ((_data$card_faces2 = data.card_faces) === null || _data$card_faces2 === void 0 || (_data$card_faces2 = _data$card_faces2[0]) === null || _data$card_faces2 === void 0 || (_data$card_faces2 = _data$card_faces2.image_uris) === null || _data$card_faces2 === void 0 ? void 0 : _data$card_faces2.art_crop) || null;
      PET_ART_CACHE[cardName] = url || 'failed';
      setArtUrl(url);
      setLoading(false);
      if (!url) setFailed(true);
    }).catch(function () {
      if (!cancelled) {
        setLoading(false);
        setFailed(true);
      }
    });
    return function () {
      cancelled = true;
      if (typeof fetchTimer !== 'undefined') clearTimeout(fetchTimer);
    };
  }, [cardName]);
  var glowMin = "0 0 6px ".concat(cd.glow, ", 0 0 12px ").concat(cd.glow);
  var glowMax = "0 0 14px ".concat(cd.glow, ", 0 0 28px ").concat(cd.glow);
  var imgFilter = mood < 25 ? 'grayscale(70%) brightness(0.55)' : mood < 50 ? 'grayscale(25%) brightness(0.8) saturate(0.7)' : mood < 70 ? 'brightness(0.9) saturate(0.9)' : 'brightness(1.02) saturate(1.1)';
  var floatDur = mood < 30 ? '7s' : mood < 60 ? '5s' : '4s';
  return /*#__PURE__*/React.createElement("div", {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
    style: {
      width: size,
      position: 'relative',
      animation: bouncing ? 'petBounce 0.5s ease-out' : "petFloat ".concat(floatDur, " ease-in-out infinite"),
      cursor: 'pointer',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: '3px',
      overflow: 'hidden',
      border: "2px solid ".concat(cd.symbol),
      '--pet-glow-min': glowMin,
      '--pet-glow-max': glowMax,
      animation: 'petGlowBox 3s ease-in-out infinite',
      position: 'relative'
    }
  }, loading ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: Math.round(size * 0.76),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: "radial-gradient(ellipse at center, ".concat(cd.bg, "33 0%, transparent 70%)")
    }
  }, /*#__PURE__*/React.createElement(Loader2, {
    className: "animate-spin",
    style: {
      color: cd.symbol,
      fontSize: '1.75rem',
      opacity: 0.7
    }
  })) : failed || !artUrl ? /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: Math.round(size * 0.76),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      background: "radial-gradient(ellipse at center, ".concat(cd.bg, "22 0%, transparent 70%)")
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: cd.symbol,
      fontSize: '0.65rem',
      textAlign: 'center',
      padding: '0 8px'
    }
  }, cardName), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: cd.symbol + '88',
      fontSize: '0.55rem',
      fontStyle: 'italic'
    }
  }, "art unavailable")) :
  /*#__PURE__*/
  // Image wrapper clips the Ken Burns overflow
  React.createElement("div", {
    style: {
      overflow: 'hidden',
      width: '100%',
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: artUrl,
    alt: cardName,
    style: {
      width: '100%',
      display: 'block',
      filter: imgFilter,
      transition: 'filter 2s ease',
      animation: 'petKenBurns 18s ease-in-out infinite',
      transformOrigin: 'center center'
    }
  })), !loading && !failed && artUrl && /*#__PURE__*/React.createElement(PetParticles, {
    core: core,
    mood: mood
  }), !loading && !failed && artUrl && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'linear-gradient(transparent, rgba(5,3,10,0.7))',
      padding: '10px 6px 3px',
      textAlign: 'right',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: cd.symbol,
      fontSize: '0.45rem',
      letterSpacing: '0.08em',
      opacity: 0.6
    }
  }, cardName)), mood < 50 && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '5px',
      right: '5px',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: mood < 25 ? '#d48a86' : '#d4b87a',
      boxShadow: "0 0 6px ".concat(mood < 25 ? 'rgba(212,138,134,0.8)' : 'rgba(212,184,122,0.8)'),
      opacity: 0.9
    }
  })));
};
var GUILD_NAMES = {
  WU: 'Azorius',
  UW: 'Azorius',
  WB: 'Orzhov',
  BW: 'Orzhov',
  UB: 'Dimir',
  BU: 'Dimir',
  UR: 'Izzet',
  RU: 'Izzet',
  BR: 'Rakdos',
  RB: 'Rakdos',
  BG: 'Golgari',
  GB: 'Golgari',
  RG: 'Gruul',
  GR: 'Gruul',
  RW: 'Boros',
  WR: 'Boros',
  GW: 'Selesnya',
  WG: 'Selesnya',
  GU: 'Simic',
  UG: 'Simic'
};
var TRI_NAMES = {
  WUB: 'Esper',
  WUG: 'Bant',
  WBR: 'Mardu',
  WBG: 'Abzan',
  WRG: 'Naya',
  UBR: 'Grixis',
  UBG: 'Sultai',
  URG: 'Temur',
  BRG: 'Jund'
};
var triKey = function triKey(cs) {
  return cs.slice().sort(function (a, b) {
    return WUBRG.indexOf(a) - WUBRG.indexOf(b);
  }).join('');
};
var FLAVOUR_BANK = {
  baby: ['Today, the little one peers at the world with wide eyes.', 'Today, your companion sleeps curled like a question mark.', 'Today, soft chirps come from somewhere unseen.', 'Today, the hatchling tries a wobbling step.', 'Today, your companion stretches toward warmth.', 'Today, a tiny yawn. A tiny stretch. A tiny life.', 'Today, the small one watches a mote of dust drift by, fascinated.'],
  juvenile: ['Today, your companion paws at things only it can see.', 'Today, the cub circles its bed three times before settling.', 'Today, a low rumble of contentment.', 'Today, your companion tests the edges of what it can do.', 'Today, it watches you, head tilted, considering.', 'Today, the youngling is restless. Something stirs.', 'Today, it caught its own shadow and was startled.'],
  adult: ['Today, your guardian regards the horizon with old eyes.', 'Today, your companion is utterly, regally bored.', 'Today, it remembers something it never knew.', 'Today, the elder one moves with deliberate grace.', 'Today, your companion sits where the light is best.', 'Today, a quiet day. A patient day. A good day.', 'Today, your companion sees you, truly. And approves.']
};
var moodFlavours = {
  hungry: 'Today, a small grumble. A reminder.',
  bored: 'Today, your companion paces, looking for play.',
  sad: 'Today, your companion droops, missing you.'
};
var STAGE_THRESHOLDS = [{
  ageMs: 0,
  xp: 0
}, {
  ageMs: 7 * 24 * 60 * 60 * 1000,
  xp: 100
}, {
  ageMs: 21 * 24 * 60 * 60 * 1000,
  xp: 400
}];
var computeStage = function computeStage(pet) {
  if (!pet) return 0;
  var age = Date.now() - pet.hatchedAt;
  var stage = 0;
  if (age >= STAGE_THRESHOLDS[1].ageMs || (pet.xp || 0) >= STAGE_THRESHOLDS[1].xp) stage = 1;
  if (age >= STAGE_THRESHOLDS[2].ageMs || (pet.xp || 0) >= STAGE_THRESHOLDS[2].xp) stage = 2;
  return stage;
};
var computeIdentity = function computeIdentity(pet) {
  if (!pet) return {
    core: null,
    secondary: null,
    tertiary: null
  };
  var stage = computeStage(pet);
  var filtered = WUBRG.filter(function (c) {
    return c !== pet.core;
  }).sort(function (a, b) {
    var _pet$affinities, _pet$affinities2;
    return (((_pet$affinities = pet.affinities) === null || _pet$affinities === void 0 ? void 0 : _pet$affinities[b]) || 0) - (((_pet$affinities2 = pet.affinities) === null || _pet$affinities2 === void 0 ? void 0 : _pet$affinities2[a]) || 0);
  }).filter(function (c) {
    var _pet$affinities3;
    return (((_pet$affinities3 = pet.affinities) === null || _pet$affinities3 === void 0 ? void 0 : _pet$affinities3[c]) || 0) > 0;
  });
  return {
    core: pet.core,
    secondary: stage >= 1 ? filtered[0] || null : null,
    tertiary: stage >= 2 ? filtered[1] || null : null
  };
};
var identityLabel = function identityLabel(id) {
  if (!id.core) return '';
  if (id.tertiary) return TRI_NAMES[triKey([id.core, id.secondary, id.tertiary])] || "".concat(id.core, "/").concat(id.secondary, "/").concat(id.tertiary);
  if (id.secondary) return GUILD_NAMES[id.core + id.secondary] || "".concat(id.core, "/").concat(id.secondary);
  return COLOR_DATA[id.core].name;
};
var computeHunger = function computeHunger(pet) {
  if (!(pet !== null && pet !== void 0 && pet.lastFedAt)) return 100;
  var since = Date.now() - pet.lastFedAt;
  return Math.min(100, Math.max(0, Math.floor(since / (12 * 60 * 60 * 1000) * 100)));
};
var computeBoredom = function computeBoredom(pet) {
  if (!(pet !== null && pet !== void 0 && pet.lastPlayedAt)) return 100;
  var since = Date.now() - pet.lastPlayedAt;
  return Math.min(100, Math.max(0, Math.floor(since / (6 * 60 * 60 * 1000) * 100)));
};
var computeMood = function computeMood(pet) {
  if (!pet) return 'happy';
  var h = computeHunger(pet);
  var b = computeBoredom(pet);
  if (h >= 80 && b >= 80) return 'sad';
  if (h >= 80) return 'hungry';
  if (b >= 80) return 'bored';
  return 'happy';
};
var dailyFlavour = function dailyFlavour(pet) {
  if (!pet) return '';
  var mood = computeMood(pet);
  if (mood !== 'happy' && moodFlavours[mood]) return moodFlavours[mood];
  var stage = computeStage(pet);
  var bank = FLAVOUR_BANK[['baby', 'juvenile', 'adult'][stage]];
  var day = Math.floor((Date.now() - pet.hatchedAt) / (24 * 60 * 60 * 1000));
  return bank[(day % bank.length + bank.length) % bank.length];
};
var ManaSymbolPath = function ManaSymbolPath(_ref10) {
  var color = _ref10.color,
    _ref10$size = _ref10.size,
    size = _ref10$size === void 0 ? 16 : _ref10$size;
  var c = COLOR_DATA[color].symbol;
  if (color === 'W') return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: c,
    d: "M12 2 L14.5 9 L21.5 9 L16 13 L18 20 L12 16 L6 20 L8 13 L2.5 9 L9.5 9 Z"
  }));
  if (color === 'U') return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: c,
    d: "M12 3 C 8 9 5 13 5 17 a 7 7 0 0 0 14 0 C 19 13 16 9 12 3 Z"
  }));
  if (color === 'B') return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("circle", {
    fill: c,
    cx: "12",
    cy: "12",
    r: "7"
  }), /*#__PURE__*/React.createElement("circle", {
    fill: "#fff",
    cx: "12",
    cy: "12",
    r: "3",
    opacity: "0.3"
  }));
  if (color === 'R') return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: c,
    d: "M12 2 C 12 2 8 8 8 12 c 0 -1 -2 -2 -3 -2 c 1 4 4 7 4 10 c 0 0 1 -3 3 -3 c 2 0 3 3 3 3 c 0 -3 3 -6 4 -10 c -1 0 -3 1 -3 2 c 0 -4 -4 -10 -4 -10 z"
  }));
  if (color === 'G') return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    fill: c,
    d: "M12 3 C 16 8 19 11 19 15 a 7 7 0 0 1 -14 0 C 5 11 8 8 12 3 Z"
  }));
  return null;
};
var ManaPip = function ManaPip(_ref11) {
  var color = _ref11.color,
    _ref11$size = _ref11.size,
    size = _ref11$size === void 0 ? 28 : _ref11$size,
    _ref11$lit = _ref11.lit,
    lit = _ref11$lit === void 0 ? false : _ref11$lit,
    onClick = _ref11.onClick,
    _ref11$style = _ref11.style,
    style = _ref11$style === void 0 ? {} : _ref11$style;
  var data = COLOR_DATA[color];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: onClick ? "active:scale-90 transition-all" : "",
    style: _objectSpread({
      width: size,
      height: size,
      borderRadius: '50%',
      background: lit ? "radial-gradient(circle at 30% 30%, ".concat(data.bg, " 0%, ").concat(data.bg, " 60%, ").concat(data.symbol, "aa 100%)") : "radial-gradient(circle at 30% 30%, ".concat(data.bg, "88 0%, ").concat(data.bg, "44 100%)"),
      border: "1.5px solid ".concat(lit ? data.symbol : 'rgba(154, 135, 101, 0.4)'),
      boxShadow: lit ? "0 0 16px ".concat(data.glow, ", inset 0 1px 2px rgba(255,255,255,0.4)") : 'inset 0 1px 2px rgba(255,255,255,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      cursor: onClick ? 'pointer' : 'default',
      opacity: lit ? 1 : 0.5,
      transition: 'all 0.25s ease'
    }, style),
    "aria-label": data.name
  }, /*#__PURE__*/React.createElement(ManaSymbolPath, {
    color: color,
    size: size * 0.55
  }));
};

// PetPanel -- the live pet display inside The Sanctum
var PetPanel = function PetPanel(_ref12) {
  var pet = _ref12.pet,
    petHunger = _ref12.petHunger,
    petHappiness = _ref12.petHappiness,
    feedReady = _ref12.feedReady,
    playReady = _ref12.playReady,
    feedPet = _ref12.feedPet,
    playWithPet = _ref12.playWithPet,
    showAdvanced = _ref12.showAdvanced,
    setShowAdvanced = _ref12.setShowAdvanced,
    onRename = _ref12.onRename,
    onReset = _ref12.onReset,
    onDevJuvenile = _ref12.onDevJuvenile,
    onDevAdult = _ref12.onDevAdult,
    onDevFeed = _ref12.onDevFeed,
    onDevPlay = _ref12.onDevPlay;
  var stage = computeStage(pet);
  var ident = computeIdentity(pet);
  var coreData = COLOR_DATA[ident.core];
  var stageName = stage === 0 ? 'Hatchling' : stage === 1 ? 'Juvenile' : 'Adult';
  // Pet type display
  var petTypeData = pet.petType ? PET_TYPES[pet.petType] : null;
  var petTypeName = petTypeData ? "".concat(petTypeData.emoji, " ").concat(petTypeData.name) : (coreData === null || coreData === void 0 ? void 0 : coreData.name) || '';
  var ageMs = Date.now() - pet.hatchedAt;
  var ageDays = Math.floor(ageMs / (24 * 60 * 60 * 1000));
  var ageHours = Math.floor(ageMs / (60 * 60 * 1000));
  var hunger = petHunger(pet);
  var happy = petHappiness(pet);
  var flavour = dailyFlavour(pet);

  // Response bubble state
  var _React$useState11 = React.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    response = _React$useState12[0],
    setResponse = _React$useState12[1];
  var _React$useState13 = React.useState('tap'),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    responseType = _React$useState14[0],
    setResponseType = _React$useState14[1]; // 'tap' | 'feed' | 'play' | 'cooldown'
  var responseClearRef = React.useRef(null);
  var showResponse = function showResponse(text) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tap';
    setResponse(text);
    setResponseType(type);
    if (responseClearRef.current) clearTimeout(responseClearRef.current);
    responseClearRef.current = setTimeout(function () {
      return setResponse(null);
    }, 3200);
  };
  var handleTap = function handleTap() {
    var line = getPetResponse(pet, petHunger, petHappiness);
    showResponse(line, 'tap');
  };
  var handleSwipeUp = function handleSwipeUp() {
    if (feedReady(pet)) {
      feedPet();
      showResponse('*eats contentedly*', 'feed');
    } else {
      showResponse('Not hungry yet...', 'cooldown');
    }
  };
  var handleHold = function handleHold() {
    if (playReady(pet)) {
      playWithPet();
      var playLines = {
        W: ['*joyful flap*', 'Radiant!'],
        U: ['*splashes*', 'Delightful.'],
        B: ['*hisses happily*', '...acceptable.'],
        R: ['YEAAAH', '*explodes with happiness*'],
        G: ['*rolls around*', 'GOOD.'],
        C: ['[PLAY.STATE=ACCEPTED]', '...permitted.']
      };
      var core = pet.core || 'G';
      var lines = playLines[core] || ['*happy*'];
      showResponse(lines[Math.floor(Math.random() * lines.length)], 'play');
    } else {
      showResponse('Tired from playing...', 'cooldown');
    }
  };

  // Identity display string
  var identityLabel = '';
  if (stage === 0) identityLabel = "Mono-".concat(coreData.name);else if (ident.secondary) {
    var guildKey = "".concat(ident.core).concat(ident.secondary);
    var guild = GUILD_NAMES[guildKey];
    if (stage === 2 && ident.tertiary) {
      var trio = TRI_NAMES[triKey([ident.core, ident.secondary, ident.tertiary])];
      identityLabel = trio || "".concat(coreData.name, " . ").concat(COLOR_DATA[ident.secondary].name, " . ").concat(COLOR_DATA[ident.tertiary].name);
    } else {
      identityLabel = guild || "".concat(coreData.name, "-").concat(COLOR_DATA[ident.secondary].name);
    }
  } else {
    identityLabel = "Mono-".concat(coreData.name);
  }
  var feedCdMs = feedReady(pet) ? 0 : Math.max(0, 12 * 60 * 60 * 1000 - (Date.now() - pet.lastFedAt));
  var playCdMs = playReady(pet) ? 0 : Math.max(0, 6 * 60 * 60 * 1000 - (Date.now() - pet.lastPlayedAt));
  var fmtCd = function fmtCd(ms) {
    if (ms <= 0) return 'ready';
    var h = Math.floor(ms / (60 * 60 * 1000));
    var m = Math.floor(ms % (60 * 60 * 1000) / (60 * 1000));
    if (h > 0) return "".concat(h, "h ").concat(m, "m");
    return "".concat(m, "m");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-4",
    style: {
      background: "radial-gradient(ellipse at top, ".concat(coreData.glow, " 0%, transparent 60%), rgba(20, 14, 8, 0.5)"),
      border: "1px solid ".concat(coreData.symbol, "55"),
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center mb-3",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(PetCreature, {
    pet: pet,
    size: 140,
    petHunger: petHunger,
    petHappiness: petHappiness,
    onTap: handleTap,
    onSwipeUp: handleSwipeUp,
    onHold: handleHold
  }), response && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 px-3 py-1.5 text-center",
    style: {
      fontFamily: responseType === 'tap' ? "'Crimson Pro', serif" : "'Cinzel', serif",
      fontStyle: responseType === 'tap' ? 'italic' : 'normal',
      fontSize: responseType === 'tap' ? '0.9rem' : '0.7rem',
      letterSpacing: responseType === 'tap' ? '0' : '0.15em',
      textTransform: responseType === 'tap' ? 'none' : 'uppercase',
      color: responseType === 'cooldown' ? '#8a7555' : responseType === 'feed' ? '#8fbc8f' : responseType === 'play' ? '#9fc7e6' : coreData.symbol,
      background: 'rgba(10, 6, 4, 0.7)',
      border: "1px solid ".concat(coreData.symbol, "44"),
      borderRadius: '2px',
      maxWidth: '180px',
      animation: 'petResponseIn 0.2s ease-out'
    }
  }, response), !response && /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-[8px] italic text-center",
    style: {
      color: "#6a5042",
      fontFamily: "'Crimson Pro', serif",
      opacity: 0.6
    }
  }, "tap . swipe-up to feed . hold to play")), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-3"
  }, pet.name && /*#__PURE__*/React.createElement("p", {
    className: "text-base sm:text-lg",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#e8dcc4",
      fontWeight: 600,
      letterSpacing: "0.1em"
    }
  }, pet.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs italic mt-0.5",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: coreData.symbol
    }
  }, stageName, " . ", petTypeName)), flavour && /*#__PURE__*/React.createElement("p", {
    className: "text-center text-sm italic mb-4 px-2",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#c9a961",
      lineHeight: 1.5
    }
  }, flavour), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1",
    style: {
      background: "rgba(10, 6, 4, 0.4)",
      border: "1px solid rgba(201, 169, 97, 0.2)",
      borderRadius: "2px",
      padding: "6px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[8px] tracking-[0.25em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Happy"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px]",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: happy < 30 ? "#d48a86" : "#d4b87a"
    }
  }, Math.round(happy))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '4px',
      background: 'rgba(154, 135, 101, 0.15)',
      borderRadius: '2px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: "".concat(happy, "%"),
      background: happy < 30 ? '#d48a86' : 'linear-gradient(90deg, #d4b87a, #f5d98f)',
      transition: 'width 0.3s'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1",
    style: {
      background: "rgba(10, 6, 4, 0.4)",
      border: "1px solid rgba(201, 169, 97, 0.2)",
      borderRadius: "2px",
      padding: "6px 8px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[8px] tracking-[0.25em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Fed"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px]",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: hunger < 30 ? "#d48a86" : "#d4b87a"
    }
  }, Math.round(hunger))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '4px',
      background: 'rgba(154, 135, 101, 0.15)',
      borderRadius: '2px',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      width: "".concat(hunger, "%"),
      background: hunger < 30 ? '#d48a86' : 'linear-gradient(90deg, #8fbc8f, #b4d4a0)',
      transition: 'width 0.3s'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: feedPet,
    disabled: !feedReady(pet),
    className: "py-2.5 text-[10px] tracking-[0.25em] uppercase active:scale-95 transition-transform",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: feedReady(pet) ? "#1a110a" : "#6a5a42",
      background: feedReady(pet) ? "linear-gradient(180deg, #b4d4a0, #8fbc8f)" : "rgba(154, 135, 101, 0.1)",
      border: "1px solid ".concat(feedReady(pet) ? "#8fbc8f" : "rgba(154, 135, 101, 0.2)"),
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("div", null, "Feed"), /*#__PURE__*/React.createElement("div", {
    className: "text-[8px] tracking-[0.15em] mt-0.5",
    style: {
      opacity: 0.7
    }
  }, fmtCd(feedCdMs))), /*#__PURE__*/React.createElement("button", {
    onClick: playWithPet,
    disabled: !playReady(pet),
    className: "py-2.5 text-[10px] tracking-[0.25em] uppercase active:scale-95 transition-transform",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: playReady(pet) ? "#1a110a" : "#6a5a42",
      background: playReady(pet) ? "linear-gradient(180deg, #f5d98f, #c9a961)" : "rgba(154, 135, 101, 0.1)",
      border: "1px solid ".concat(playReady(pet) ? "#c9a961" : "rgba(154, 135, 101, 0.2)"),
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("div", null, "Play"), /*#__PURE__*/React.createElement("div", {
    className: "text-[8px] tracking-[0.15em] mt-0.5",
    style: {
      opacity: 0.7
    }
  }, fmtCd(playCdMs)))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-2 mt-2 pt-2",
    style: {
      borderTop: "1px solid rgba(201, 169, 97, 0.15)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] tracking-[0.2em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#6a5a42"
    }
  }, ageDays >= 1 ? "".concat(ageDays, "d") : "".concat(ageHours, "h"), " old . stage ", stage + 1, "/3"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowAdvanced(!showAdvanced);
    },
    className: "text-[9px] tracking-[0.2em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#6a5a42",
      background: 'transparent',
      border: 'none',
      padding: 0,
      cursor: 'pointer'
    }
  }, showAdvanced ? '-- hide' : '+ more')), showAdvanced && /*#__PURE__*/React.createElement("div", {
    className: "mt-2 pt-2 space-y-2",
    style: {
      borderTop: "1px dashed rgba(201, 169, 97, 0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onRename,
    className: "flex-1 py-1.5 text-[9px] tracking-[0.2em] uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      background: "transparent",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px"
    }
  }, "Rename"), /*#__PURE__*/React.createElement("button", {
    onClick: onReset,
    className: "flex-1 py-1.5 text-[9px] tracking-[0.2em] uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d48a86",
      background: "transparent",
      border: "1px solid rgba(160, 48, 44, 0.3)",
      borderRadius: "2px"
    }
  }, "Reset")), /*#__PURE__*/React.createElement("div", {
    className: "pt-2",
    style: {
      borderTop: "1px solid rgba(201, 169, 97, 0.1)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[8px] tracking-[0.3em] uppercase mb-1.5",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#6a5042"
    }
  }, "Dev Mode"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1 mb-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-2 py-1",
    style: {
      background: "rgba(10,6,4,0.5)",
      border: "1px solid rgba(154,135,101,0.2)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[7px] uppercase tracking-widest",
    style: {
      color: "#6a5a42",
      fontFamily: "'Cinzel', serif"
    }
  }, "XP"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#d4b87a",
      fontSize: "0.75rem",
      fontWeight: 700
    }
  }, Math.round(pet.xp || 0))), /*#__PURE__*/React.createElement("div", {
    className: "px-2 py-1",
    style: {
      background: "rgba(10,6,4,0.5)",
      border: "1px solid rgba(154,135,101,0.2)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[7px] uppercase tracking-widest",
    style: {
      color: "#6a5a42",
      fontFamily: "'Cinzel', serif"
    }
  }, "Age"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#d4b87a",
      fontSize: "0.75rem",
      fontWeight: 700
    }
  }, Math.floor((Date.now() - pet.hatchedAt) / (1000 * 60)), "m"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1 mb-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onDevJuvenile,
    className: "py-1.5 text-[8px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9fc7e6",
      background: "rgba(63,100,140,0.15)",
      border: "1px solid rgba(63,100,140,0.35)",
      borderRadius: "2px"
    }
  }, "-> Juvenile"), /*#__PURE__*/React.createElement("button", {
    onClick: onDevAdult,
    className: "py-1.5 text-[8px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      background: "rgba(201,169,97,0.1)",
      border: "1px solid rgba(201,169,97,0.3)",
      borderRadius: "2px"
    }
  }, "-> Adult")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onDevFeed,
    className: "py-1.5 text-[8px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#8fbc8f",
      background: "rgba(107,142,90,0.1)",
      border: "1px solid rgba(107,142,90,0.25)",
      borderRadius: "2px"
    }
  }, "Reset Feed CD"), /*#__PURE__*/React.createElement("button", {
    onClick: onDevPlay,
    className: "py-1.5 text-[8px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a9c9",
      background: "rgba(154,138,170,0.1)",
      border: "1px solid rgba(154,138,170,0.25)",
      borderRadius: "2px"
    }
  }, "Reset Play CD")))));
};

// Decorative flourish for header -- fleur-de-lis/arcane ornament
var Ornament = function Ornament(_ref13) {
  var _ref13$style = _ref13.style,
    style = _ref13$style === void 0 ? {} : _ref13$style,
    _ref13$flip = _ref13.flip,
    flip = _ref13$flip === void 0 ? false : _ref13$flip;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 40 24",
    width: "40",
    height: "24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: _objectSpread({
      transform: flip ? 'scaleX(-1)' : 'none'
    }, style)
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 12 L14 12",
    strokeWidth: "0.8",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 12 L20 6 M14 12 L20 18",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "20",
    cy: "12",
    r: "2.5",
    strokeWidth: "1",
    fill: "currentColor",
    fillOpacity: "0.15"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22.5 12 L26 9 M22.5 12 L26 15",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M28 9 L28 15",
    strokeWidth: "0.8",
    opacity: "0.7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M31 11 L31 13 M34 10 L34 14 M37 12 L37 12",
    strokeWidth: "0.8",
    opacity: "0.5"
  }));
};

// ============ Data ============
var QUICK_SEARCHES = ["Treasure", "Clue", "Food", "Blood", "Map", "Soldier", "Zombie", "Saproling", "Goblin", "Spirit", "Angel", "Dragon", "Wolf", "Insect", "Elf Warrior"];
var COLOR_DOTS = {
  W: "#f9f4d4",
  U: "#9fc7e6",
  B: "#4a4a4a",
  R: "#e8947a",
  G: "#8fbc8f"
};
var normalizeCard = function normalizeCard(card) {
  var _card$image_uris, _card$image_uris2, _card$card_faces, _card$image_uris3, _card$image_uris4, _card$card_faces2, _ref14, _card$power, _card$card_faces3, _ref15, _card$toughness, _card$card_faces4;
  if (card.smallImage !== undefined) return card;
  var smallImage = ((_card$image_uris = card.image_uris) === null || _card$image_uris === void 0 ? void 0 : _card$image_uris.small) || ((_card$image_uris2 = card.image_uris) === null || _card$image_uris2 === void 0 ? void 0 : _card$image_uris2.normal) || ((_card$card_faces = card.card_faces) === null || _card$card_faces === void 0 || (_card$card_faces = _card$card_faces[0]) === null || _card$card_faces === void 0 || (_card$card_faces = _card$card_faces.image_uris) === null || _card$card_faces === void 0 ? void 0 : _card$card_faces.small) || "";
  var normalImage = ((_card$image_uris3 = card.image_uris) === null || _card$image_uris3 === void 0 ? void 0 : _card$image_uris3.normal) || ((_card$image_uris4 = card.image_uris) === null || _card$image_uris4 === void 0 ? void 0 : _card$image_uris4.large) || ((_card$card_faces2 = card.card_faces) === null || _card$card_faces2 === void 0 || (_card$card_faces2 = _card$card_faces2[0]) === null || _card$card_faces2 === void 0 || (_card$card_faces2 = _card$card_faces2.image_uris) === null || _card$card_faces2 === void 0 ? void 0 : _card$card_faces2.normal) || smallImage;
  return {
    id: card.id,
    name: card.name,
    smallImage: smallImage,
    normalImage: normalImage,
    power: (_ref14 = (_card$power = card.power) !== null && _card$power !== void 0 ? _card$power : (_card$card_faces3 = card.card_faces) === null || _card$card_faces3 === void 0 || (_card$card_faces3 = _card$card_faces3[0]) === null || _card$card_faces3 === void 0 ? void 0 : _card$card_faces3.power) !== null && _ref14 !== void 0 ? _ref14 : null,
    toughness: (_ref15 = (_card$toughness = card.toughness) !== null && _card$toughness !== void 0 ? _card$toughness : (_card$card_faces4 = card.card_faces) === null || _card$card_faces4 === void 0 || (_card$card_faces4 = _card$card_faces4[0]) === null || _card$card_faces4 === void 0 ? void 0 : _card$card_faces4.toughness) !== null && _ref15 !== void 0 ? _ref15 : null,
    type_line: card.type_line || "",
    colors: card.colors || card.color_identity || []
  };
};

// localStorage-backed persistent storage
// ============ Quick Token Presets ============
var PRESET_TOKENS = [{
  id: 'treasure',
  name: 'Treasure',
  type: 'Artifact',
  emoji: '💰',
  colors: [],
  pt: null,
  text: '{T}, Sacrifice: Add one mana of any color.'
}, {
  id: 'food',
  name: 'Food',
  type: 'Artifact',
  emoji: '🍎',
  colors: [],
  pt: null,
  text: '{2}, {T}, Sacrifice: You gain 3 life.'
}, {
  id: 'clue',
  name: 'Clue',
  type: 'Artifact',
  emoji: '🔍',
  colors: [],
  pt: null,
  text: '{2}, Sacrifice: Draw a card.'
}, {
  id: 'blood',
  name: 'Blood',
  type: 'Artifact',
  emoji: '🩸',
  colors: [],
  pt: null,
  text: '{1}, {T}, Discard a card, Sacrifice: Draw a card.'
}, {
  id: 'map',
  name: 'Map',
  type: 'Artifact',
  emoji: '🗺️',
  colors: [],
  pt: null,
  text: '{1}, {T}, Sacrifice: Target creature you control explores.'
}, {
  id: 'powerstone',
  name: 'Powerstone',
  type: 'Artifact',
  emoji: '💎',
  colors: [],
  pt: null,
  text: '{T}: Add {C}. This mana can\'t be spent to cast nonartifact spells.'
}];
var COUNTER_TYPES = [{
  id: 'plusOne',
  short: '+1/+1',
  color: '#8fbc8f'
}, {
  id: 'minusOne',
  short: '-1/-1',
  color: '#a0302c'
}];
var storage = {
  get: function get(key) {
    try {
      var v = localStorage.getItem(key);
      return v ? JSON.parse(v) : null;
    } catch (_unused) {
      return null;
    }
  },
  set: function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (_unused2) {}
  }
};

// Haptic feedback -- uses native Capacitor Haptics plugin when available (reliable on all phones),
// falls back to the web Vibration API when running in a browser.
// Duration parameter is interpreted to pick an appropriate native intensity.
var haptic = function haptic() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
  try {
    var cap = typeof window !== 'undefined' ? window.Capacitor : null;
    var Haptics = cap && cap.Plugins && cap.Plugins.Haptics;
    if (Haptics && cap.isNativePlatform && cap.isNativePlatform()) {
      // Native path -- map our duration buckets to impact styles
      if (Array.isArray(duration)) {
        // Pattern vibrations (e.g. wipe confirm) -> use heavy impact repeated
        duration.forEach(function (_, i) {
          return setTimeout(function () {
            return Haptics.impact({
              style: 'HEAVY'
            });
          }, i * 60);
        });
      } else if (duration <= 15) {
        Haptics.impact({
          style: 'LIGHT'
        });
      } else if (duration <= 25) {
        Haptics.impact({
          style: 'MEDIUM'
        });
      } else {
        Haptics.impact({
          style: 'HEAVY'
        });
      }
      return;
    }
    // Web fallback
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  } catch (_unused3) {}
};

// useLongPress -- returns handlers for both touch and mouse that fire onLongPress after 500ms
// and a regular onClick for short taps. Prevents the onClick when a long press fires.
function useLongPress(onClick, onLongPress) {
  var ms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 500;
  var timerRef = useRef(null);
  var longFiredRef = useRef(false);
  var start = function start(e) {
    longFiredRef.current = false;
    timerRef.current = setTimeout(function () {
      longFiredRef.current = true;
      haptic(25);
      onLongPress && onLongPress(e);
    }, ms);
  };
  var clear = function clear(fireClick) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (fireClick && !longFiredRef.current && onClick) onClick();
  };
  return {
    onTouchStart: start,
    onTouchEnd: function onTouchEnd(e) {
      e.preventDefault();
      clear(true);
    },
    onTouchCancel: function onTouchCancel() {
      return clear(false);
    },
    onMouseDown: start,
    onMouseUp: function onMouseUp() {
      return clear(true);
    },
    onMouseLeave: function onMouseLeave() {
      return clear(false);
    }
  };
}

// ============ Memory Game ============
var MEMORY_BEST_KEY = 'tq_memory_best';
var CARD_BACK_COLOR = '#1a110a';
var MemoryGame = function MemoryGame(_ref16) {
  var onClose = _ref16.onClose,
    pet = _ref16.pet,
    setPet = _ref16.setPet,
    showToast = _ref16.showToast,
    haptic = _ref16.haptic;
  var best = parseInt(localStorage.getItem(MEMORY_BEST_KEY) || '999999', 10);
  var pairCount = best < 45000 ? 12 : best < 90000 ? 8 : 4;
  var _React$useState15 = React.useState([]),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    cards = _React$useState16[0],
    setCards = _React$useState16[1];
  var _React$useState17 = React.useState([]),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    flipped = _React$useState18[0],
    setFlipped = _React$useState18[1];
  var _React$useState19 = React.useState(new Set()),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    matched = _React$useState20[0],
    setMatched = _React$useState20[1];
  var _React$useState21 = React.useState(null),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    startTime = _React$useState22[0],
    setStartTime = _React$useState22[1];
  var _React$useState23 = React.useState(0),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    elapsed = _React$useState24[0],
    setElapsed = _React$useState24[1];
  var _React$useState25 = React.useState(true),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    loading = _React$useState26[0],
    setLoading = _React$useState26[1];
  var _React$useState27 = React.useState(false),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    complete = _React$useState28[0],
    setComplete = _React$useState28[1];
  var _React$useState29 = React.useState(0),
    _React$useState30 = _slicedToArray(_React$useState29, 2),
    finalTime = _React$useState30[0],
    setFinalTime = _React$useState30[1];
  var _React$useState31 = React.useState(false),
    _React$useState32 = _slicedToArray(_React$useState31, 2),
    locked = _React$useState32[0],
    setLocked = _React$useState32[1];
  var timerRef = React.useRef(null);
  var lockRef = React.useRef(false);

  // Offline token card pool — stable Scryfall art_crop CDN URLs
  var OFFLINE_TOKEN_POOL = [{
    id: 'tok001',
    name: 'Goblin',
    art: 'https://cards.scryfall.io/art_crop/front/6/5/65a66f8a-9dae-4e11-a2e1-2ea83edfe5b4.jpg?1682204785'
  }, {
    id: 'tok002',
    name: 'Soldier',
    art: 'https://cards.scryfall.io/art_crop/front/0/2/024a72d3-61b5-4b80-af3e-b49e02f5c786.jpg?1682208022'
  }, {
    id: 'tok003',
    name: 'Zombie',
    art: 'https://cards.scryfall.io/art_crop/front/6/0/60623f09-29ed-4f2f-bde5-36d3714ed51c.jpg?1682208022'
  }, {
    id: 'tok004',
    name: 'Dragon',
    art: 'https://cards.scryfall.io/art_crop/front/a/5/a5fa14e7-7355-44b5-9800-9f3d72640059.jpg?1682208038'
  }, {
    id: 'tok005',
    name: 'Angel',
    art: 'https://cards.scryfall.io/art_crop/front/1/3/13e4de1c-1a51-4892-8d44-7e2ee7e6f1e1.jpg?1682204785'
  }, {
    id: 'tok006',
    name: 'Wolf',
    art: 'https://cards.scryfall.io/art_crop/front/f/2/f2512cdb-9d3e-41d3-a0ae-3d0e63a9a8ac.jpg?1682208038'
  }, {
    id: 'tok007',
    name: 'Elemental',
    art: 'https://cards.scryfall.io/art_crop/front/b/1/b19e43d7-0e35-4487-88ac-a7db8e8a498b.jpg?1682204785'
  }, {
    id: 'tok008',
    name: 'Saproling',
    art: 'https://cards.scryfall.io/art_crop/front/3/c/3c51ce6a-e6f4-4b16-9a87-f09e3e45d5ff.jpg?1682208022'
  }, {
    id: 'tok009',
    name: 'Spirit',
    art: 'https://cards.scryfall.io/art_crop/front/e/5/e53c2f84-d5b5-4e7c-8aa3-0564c3e9e8f0.jpg?1682208022'
  }, {
    id: 'tok010',
    name: 'Bird',
    art: 'https://cards.scryfall.io/art_crop/front/8/b/8b2e0e21-af60-4c2c-affc-6c0f3a7b0c3d.jpg?1682204785'
  }, {
    id: 'tok011',
    name: 'Insect',
    art: 'https://cards.scryfall.io/art_crop/front/2/a/2aef89cc-eefb-471d-82d2-4d5c2ad8f72f.jpg?1682208022'
  }, {
    id: 'tok012',
    name: 'Thopter',
    art: 'https://cards.scryfall.io/art_crop/front/9/d/9dff8ba4-f7fb-4b36-b1d3-83b3d8c58e4e.jpg?1682208038'
  }];
  React.useEffect(function () {
    setLoading(true);
    // Use offline pool — shuffle and pick pairs
    var shuffledPool = [].concat(OFFLINE_TOKEN_POOL).sort(function () {
      return Math.random() - 0.5;
    }).slice(0, pairCount);
    var pairs = [].concat(_toConsumableArray(shuffledPool), _toConsumableArray(shuffledPool)).map(function (c, i) {
      return {
        id: "".concat(c.id, "-").concat(i < shuffledPool.length ? 'a' : 'b'),
        pairId: c.id,
        name: c.name,
        art: c.art
      };
    });
    for (var i = pairs.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var _ref17 = [pairs[j], pairs[i]];
      pairs[i] = _ref17[0];
      pairs[j] = _ref17[1];
    }
    setCards(pairs);
    setLoading(false);
  }, [pairCount]);

  // Timer
  React.useEffect(function () {
    if (startTime && !complete) {
      timerRef.current = setInterval(function () {
        return setElapsed(Date.now() - startTime);
      }, 200);
    }
    return function () {
      return clearInterval(timerRef.current);
    };
  }, [startTime, complete]);
  var flipCard = function flipCard(card) {
    if (lockRef.current || matched.has(card.pairId) || flipped.find(function (c) {
      return c.id === card.id;
    })) return;
    haptic(15);
    if (!startTime) setStartTime(Date.now());
    var newFlipped = [].concat(_toConsumableArray(flipped), [card]);
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      lockRef.current = true;
      setLocked(true);
      if (newFlipped[0].pairId === newFlipped[1].pairId) {
        // Match
        haptic([20, 30]);
        var newMatched = new Set([].concat(_toConsumableArray(matched), [card.pairId]));
        setMatched(newMatched);
        setFlipped([]);
        lockRef.current = false;
        setLocked(false);
        if (newMatched.size === pairCount) {
          // Complete!
          clearInterval(timerRef.current);
          var t = Date.now() - startTime;
          setFinalTime(t);
          setComplete(true);
          haptic([30, 50, 30, 80]);
          var prevBest = parseInt(localStorage.getItem(MEMORY_BEST_KEY) || '999999', 10);
          if (t < prevBest) localStorage.setItem(MEMORY_BEST_KEY, String(t));
          // Award pet XP
          if (pet) {
            var xp = pairCount === 4 ? 20 : pairCount === 8 ? 40 : 80;
            setPet(_objectSpread(_objectSpread({}, pet), {}, {
              xp: (pet.xp || 0) + xp
            }));
            showToast("Your companion earned ".concat(xp, " XP!"));
          }
        }
      } else {
        // No match -- flip back after 800ms
        setTimeout(function () {
          setFlipped([]);
          lockRef.current = false;
          setLocked(false);
        }, 800);
      }
    }
  };
  var fmtTime = function fmtTime(ms) {
    var s = Math.floor(ms / 1000);
    var m = Math.floor(s / 60);
    return m > 0 ? "".concat(m, ":").concat(String(s % 60).padStart(2, '0')) : "".concat(s, "s");
  };
  var cols = pairCount === 4 ? 4 : pairCount === 8 ? 4 : 6;
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[70] flex flex-col",
    style: {
      background: "radial-gradient(ellipse at top, #1a110a 0%, #05030a 100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-4 py-3",
    style: {
      borderBottom: "1px solid rgba(201,169,97,0.25)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-sm uppercase tracking-[0.3em]",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d4b87a",
      fontWeight: 600
    }
  }, "Memory"), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px]",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#6a5a42"
    }
  }, pairCount, " pairs . ", matched.size, "/", pairCount, " matched")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, startTime && !complete && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#c9a961",
      fontSize: "1rem",
      fontWeight: 700
    }
  }, fmtTime(elapsed)), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      clearInterval(timerRef.current);
      onClose();
    },
    className: "w-8 h-8 flex items-center justify-center active:scale-90",
    style: {
      color: "#9a8765",
      border: "1px solid rgba(154,135,101,0.4)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement(XIcon, {
    style: {
      fontSize: '1rem'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto p-3"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center h-full gap-3"
  }, /*#__PURE__*/React.createElement(Loader2, {
    className: "animate-spin",
    style: {
      color: "#c9a961",
      fontSize: '2rem'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#6a5a42",
      fontStyle: "italic"
    }
  }, "Summoning tokens...")) : complete ? /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center h-full gap-4 p-6 text-center"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    style: {
      color: "#d4b87a",
      fontSize: '2.5rem'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#f5d98f",
      fontSize: "1.3rem",
      fontWeight: 700
    }
  }, "Complete!"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#d4b87a",
      fontSize: "2rem",
      fontWeight: 700
    }
  }, fmtTime(finalTime)), finalTime < parseInt(localStorage.getItem(MEMORY_BEST_KEY) || '999999', 10) + 1 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#c9a961",
      fontStyle: "italic"
    }
  }, "New best time!"), best < 999999 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#6a5a42",
      fontSize: "0.7rem"
    }
  }, "Best: ", fmtTime(parseInt(localStorage.getItem(MEMORY_BEST_KEY), 10))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#9a8765",
      fontSize: "0.8rem",
      fontStyle: "italic"
    }
  }, finalTime < 30000 ? "Uncanny recall." : finalTime < 60000 ? "Sharp eyes." : finalTime < 120000 ? "A worthy effort." : "The mind wanders. Try again."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mt-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      clearInterval(timerRef.current);
      onClose();
    },
    className: "px-4 py-2 text-xs tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      border: "1px solid rgba(201,169,97,0.4)",
      borderRadius: "2px"
    }
  }, "Return"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setCards([]);
      setFlipped([]);
      setMatched(new Set());
      setStartTime(null);
      setElapsed(0);
      setComplete(false);
      setFinalTime(0);
      setLocked(false);
      lockRef.current = false;
      setLoading(true);
    },
    className: "px-4 py-2 text-xs tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: "#1a110a",
      background: "linear-gradient(180deg,#f5d98f,#c9a961)",
      border: "1px solid #c9a961",
      borderRadius: "2px"
    }
  }, "Play Again"))) : /*#__PURE__*/React.createElement("div", {
    className: "grid gap-1.5",
    style: {
      gridTemplateColumns: "repeat(".concat(cols, ", 1fr)")
    }
  }, cards.map(function (card) {
    var isFlipped = !!flipped.find(function (c) {
      return c.id === card.id;
    }) || matched.has(card.pairId);
    var isMatched = matched.has(card.pairId);
    return /*#__PURE__*/React.createElement("div", {
      key: card.id,
      onClick: function onClick() {
        return flipCard(card);
      },
      className: "relative active:scale-95 transition-transform",
      style: {
        aspectRatio: '5/7',
        borderRadius: '3px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: "1.5px solid ".concat(isMatched ? '#c9a961' : 'rgba(154,135,101,0.3)'),
        boxShadow: isMatched ? '0 0 8px rgba(201,169,97,0.4)' : 'none',
        transition: 'all 0.3s ease'
      }
    }, isFlipped ? /*#__PURE__*/React.createElement("img", {
      src: card.art,
      alt: card.name,
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        filter: isMatched ? 'brightness(1)' : 'brightness(0.9)',
        transition: 'filter 0.3s'
      }
    }) : /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        height: '100%',
        background: "radial-gradient(ellipse at 40% 35%, #2a1f14, ".concat(CARD_BACK_COLOR, ")"),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 40 56",
      width: "60%",
      opacity: "0.4"
    }, /*#__PURE__*/React.createElement("ellipse", {
      cx: "20",
      cy: "28",
      rx: "14",
      ry: "20",
      fill: "none",
      stroke: "#c9a961",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M 20 8 L 20 48 M 6 28 L 34 28",
      stroke: "#c9a961",
      strokeWidth: "0.8",
      opacity: "0.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "20",
      cy: "28",
      r: "4",
      fill: "none",
      stroke: "#c9a961",
      strokeWidth: "1"
    }))));
  }))));
};

// ============ Chiptune Audio Engine ============
// Dragon: Elder Scrolls / Morrowind inspired - modal, majestic, ancient
// Zombie: Bloody Tears (Castlevania) inspired - minor, driving, dramatic
var MUTE_KEY = 'tq_mute';
var createAudioEngine = function createAudioEngine() {
  var ctx = null,
    master = null;
  var muted = localStorage.getItem(MUTE_KEY) === '1';
  var tickId = null,
    track = null,
    step = 0,
    nextT = 0;
  var boot = function boot() {
    if (ctx) return ctx;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.32;
      master.connect(ctx.destination);
    } catch (e) {}
    return ctx;
  };
  var wake = function wake() {
    if (ctx && ctx.state === 'suspended') ctx.resume();
  };

  // Low-level synth
  var osc = function osc(freq, type, t, dur) {
    var vol = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.2;
    var atk = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0.005;
    var rel = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0.05;
    if (!ctx || muted || vol <= 0 || dur <= 0) return;
    var o = ctx.createOscillator(),
      g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + atk);
    g.gain.setValueAtTime(vol * 0.75, t + dur * 0.7);
    g.gain.linearRampToValueAtTime(0, t + dur);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + dur + 0.01);
  };
  var noise = function noise(t, dur, vol) {
    var cf = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 200;
    if (!ctx || muted) return;
    var n = Math.max(2, Math.ceil(ctx.sampleRate * dur));
    var buf = ctx.createBuffer(1, n, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    var src = ctx.createBufferSource(),
      flt = ctx.createBiquadFilter(),
      g = ctx.createGain();
    flt.type = 'bandpass';
    flt.frequency.value = cf;
    flt.Q.value = 1.5;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.buffer = buf;
    src.connect(flt);
    flt.connect(g);
    g.connect(master);
    src.start(t);
    src.stop(t + dur + 0.01);
  };
  var hz = function hz(n) {
    return 130.81 * Math.pow(2, n / 12);
  }; // semitones from C3

  // ================================================================
  // DRAGON: Fantasy Adventure Theme — orchestral chiptune style
  // Inspired by classic JRPG/fantasy soundtracks (Zelda, FF, Castlevania)
  // D major feel — heroic, soaring, magical
  // Scale: D(2) E(4) F#(6) G(7) A(9) B(11) C#(13) D(14)
  // 148 BPM, 16th note steps, 64-step loop
  //
  // Voice 1: Lead melody  — triangle (warm, flute-like)
  // Voice 2: Harmony      — square (bright counter-melody)
  // Voice 3: Bass         — sine (deep, warm low end)
  // Voice 4: Chord pad    — detuned sawtooth (lush strings feel)
  // Voice 5: Arpeggio     — fast triangle (harp-like sparkle)
  // Drums:   soft kick, tambourine feel — airy not punchy
  // ================================================================

  // Lead — soaring fantasy melody, triangle for warmth
  var DML = [
  // Bar 1: Heroic opening — D major ascent
  14, null, 16, null, 18, null, 19, null, 21, null, 19, 18, 16, null, null, null,
  // Bar 2: Lyrical answer phrase
  21, null, 21, 23, 21, 19, 18, 16, 14, null, 16, null, 18, 19, 18, 16,
  // Bar 3: Build — rising with energy
  14, 16, 18, 19, 21, null, 23, null, 26, null, 23, 21, 19, null, null, null,
  // Bar 4: Resolution — triumphant finish back to root
  21, 19, 18, 16, 14, null, 13, null, 14, 16, 18, 21, 14, null, null, null];
  var DCL = [
  // Harmony — square, a 3rd above
  null, null, null, null, 21, null, null, null, null, null, null, null, 19, null, null, null, null, null, 16, null, null, null, null, null, null, null, 21, null, null, null, null, null, null, null, null, null, 16, null, 18, null, 21, null, 18, 16, 14, null, null, null, 16, 14, 13, 11, 9, null, null, null, 9, 11, 13, 16, 9, null, null, null];
  var DBL = [
  // Bass — sine, D root movement, warm and deep
  2, null, null, null, 7, null, null, null, 9, null, null, null, 7, null, null, null, 2, null, null, null, 9, null, null, null, 7, null, null, null, 4, null, null, null, 2, null, null, null, 7, null, null, null, 9, null, null, null, 11, null, null, null, 9, null, null, null, 7, null, null, null, 2, null, null, null, 2, null, null, null];
  var DPL = [
  // String pad — long sustained chords, sawtooth at low volume
  2, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 9, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 7, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 9, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];
  var DAP = [
  // Harp arpeggio — fast triangle, sparkle feel
  null, 6, 9, 14, null, 7, 11, 14, null, 9, 13, 16, null, 7, 11, 14, null, 6, 9, 14, null, 9, 14, 18, null, 7, 11, 14, null, 4, 9, 13, null, 6, 9, 14, null, 7, 11, 16, null, 9, 14, 18, null, 11, 14, 18, null, 9, 14, 18, null, 7, 11, 14, null, 6, 9, 14, null, 2, 6, 9];
  var DDR = [
  // Light orchestral feel — soft kick, no heavy snare
  'K', 'h', null, 'h', null, 'h', null, 'h', 'K', 'h', null, 'h', null, 'h', 'K', 'h', 'K', 'h', null, 'h', null, 'h', null, 'h', 'K', 'h', 'K', 'h', null, 'h', null, 'h', 'K', 'h', null, 'h', 'K', 'h', null, 'h', 'K', 'h', null, 'h', null, 'h', 'K', 'h', 'K', 'h', null, 'h', null, 'h', null, 'h', 'K', 'h', null, 'h', null, null, null, null];

  // ================================================================
  // ZOMBIE: 80s arcade action — Contra / TMNT NES energy
  // A minor pentatonic, 160 BPM, 16th note steps, 64-step loop
  // Voice 1: Lead melody  — square wave, punchy arpeggios
  // Voice 2: Harmony      — triangle, fills and counter-melody
  // Voice 3: Bass line    — sine, driving pulse on root/5th
  // Voice 4: Arp/run      — sawtooth, fast 16th note runs
  // Drums:   kick, snare, open hat, closed hat pattern
  //
  // Scale: A minor (A=21, B=23, C=24, D=26, E=28, F=29, G=31, A=33)
  // Semitones from C3: A=9, B=11, C=12, D=14, E=16, F=17, G=19, A=21
  // Power chord feel — lots of root+5th movement
  // ================================================================

  // Lead melody — iconic 80s action hook, 4 bars of 16 steps
  var ZML = [
  // Bar 1: punchy main riff — stab stab rise
  21, null, 21, 19, 21, null, 24, null, 21, null, 19, 17, 19, null, null, null,
  // Bar 2: answer phrase — descend with momentum
  24, null, 23, 21, 19, null, 17, null, 16, null, 17, 19, 21, null, null, null,
  // Bar 3: build — ascending run
  17, 19, 21, 23, 24, null, 23, 21, 19, null, 21, 23, 24, null, null, null,
  // Bar 4: resolution + hook tail
  28, null, 26, 24, 23, 21, 23, 24, 21, null, 19, null, 17, null, 16, null];
  // Harmony — triangle, counter-melody and stabs
  var ZHL = [
  // Bar 1: root stabs on offbeats
  null, null, null, null, 16, null, null, null, null, null, null, null, 16, null, null, null,
  // Bar 2
  null, null, null, null, 16, null, null, null, 14, null, null, null, 16, null, null, null,
  // Bar 3: follow the run a 3rd below
  12, 14, 16, 17, 17, null, 16, 14, 12, null, 14, 16, 17, null, null, null,
  // Bar 4: power chord hits
  21, null, 21, null, 19, 16, 19, 21, 16, null, 14, null, 12, null, 11, null];
  // Bass — driving pulse, root and 5th movement
  // Octave below lead: use A2=-3, E2=4, D2=2, C2=0, G2=7 (relative to C3)
  var ZBL = [
  // Bar 1: A pedal with 5th hits
  -3, null, -3, null, -3, null, 4, null, -3, null, -3, null, 4, null, -3, null,
  // Bar 2: movement to D and back
  2, null, 2, null, 2, null, -3, null, -8, null, -8, null, -3, null, 4, null,
  // Bar 3: rising with the melody
  -3, null, 2, null, 4, null, 7, null, 9, null, 7, null, 4, null, 2, null,
  // Bar 4: strong E–A–E cadence
  4, null, 4, null, -3, null, -3, null, 4, null, 4, null, -3, null, -3, null];
  // Arpeggio runs — sawtooth, very 80s NES
  var ZAL = [
  // Bar 1: silent on 1, arp on 3
  null, null, null, null, null, 9, 12, 16, null, null, null, null, null, 9, 11, 14,
  // Bar 2
  null, null, null, null, null, 12, 16, 21, null, 9, 12, null, null, 9, 11, 14,
  // Bar 3: fast chromatic run up
  9, 11, 12, 14, 16, 17, 19, 21, 16, null, 19, null, 21, null, 24, null,
  // Bar 4: descending arp
  28, 26, 24, 23, 21, 19, 17, 16, 14, null, 12, null, 9, null, null, null];
  // Drums — punchy NES pattern
  // K=kick  S=snare  H=open-hat  h=closed-hat  O=accent-kick
  var ZDR = [
  // Bar 1: classic 4-on-floor with snare 2&4
  'K', 'h', 'h', 'h', 'S', 'h', 'K', 'h', 'K', 'h', 'h', 'h', 'S', 'h', 'h', 'H',
  // Bar 2
  'K', 'h', 'h', 'h', 'S', 'h', 'K', 'h', 'K', 'h', 'h', 'K', 'S', 'h', 'K', 'h',
  // Bar 3: busier for the build
  'K', 'h', 'K', 'h', 'S', 'h', 'h', 'h', 'K', 'h', 'K', 'h', 'S', 'h', 'K', 'h',
  // Bar 4: big snare fill going into loop
  'K', 'h', 'h', 'h', 'S', 'h', 'K', 'h', 'O', 'h', 'S', 'h', 'S', 'S', 'S', 'h'];
  var scheduleStep = function scheduleStep(t, tr) {
    if (!ctx) return;
    var isDragon = tr === 'dragon';
    // Both tracks: 160 BPM 16th notes
    var bpm = 160;
    var sd = 60 / bpm / 4;
    var len = isDragon ? DML.length : ZML.length;
    var p = step % len;
    if (isDragon) {
      // Fantasy style — triangle lead (warm/flute), square harmony, sine bass, pad, harp arp
      var _bpm = 148;
      var sd2 = 60 / _bpm / 4;
      var m = DML[p];
      if (m !== null) osc(hz(m + 12), 'triangle', t, sd2 * 0.85, 0.26, 0.008, 0.08); // triangle = flute warmth
      var c = DCL[p];
      if (c !== null) osc(hz(c + 12), 'square', t, sd2 * 0.70, 0.10, 0.004, 0.05); // square counter-melody
      var b = DBL[p];
      if (b !== null) osc(hz(b), 'sine', t, sd2 * 3.6, 0.28, 0.012, 0.18); // deep warm bass
      var pad = DPL[p];
      if (pad !== null) {
        // string pad
        osc(hz(pad), 'sawtooth', t, sd2 * 15.5, 0.055, 0.06, 0.5);
        osc(hz(pad + 7), 'sawtooth', t, sd2 * 15.5, 0.040, 0.06, 0.5);
        osc(hz(pad + 12), 'sawtooth', t, sd2 * 15.5, 0.030, 0.06, 0.5);
      }
      var ap = DAP[p];
      if (ap !== null) osc(hz(ap + 24), 'triangle', t, sd2 * 0.38, 0.12, 0.002, 0.03); // harp sparkle
      var dr = DDR[p];
      if (dr === 'K') {
        noise(t, 0.06, 0.22, 85);
        noise(t, 0.04, 0.10, 140);
      } // soft kick
      if (dr === 'h') {
        noise(t, 0.015, 0.07, 11000);
      } // light tambourine
    } else {
      // 80s arcade — punchy square lead, fat bass, fast arps, cracking drums
      var _m = ZML[p];
      if (_m !== null) osc(hz(_m), 'square', t, sd * 0.75, 0.28, 0.002, 0.03);
      var h2 = ZHL[p];
      if (h2 !== null) osc(hz(h2), 'triangle', t, sd * 0.80, 0.14, 0.003, 0.04);
      var _b = ZBL[p];
      if (_b !== null) {
        // Double bass: root + octave for thickness
        osc(hz(_b), 'square', t, sd * 0.92, 0.22, 0.004, 0.06);
        osc(hz(_b + 12), 'sine', t, sd * 0.88, 0.16, 0.004, 0.05);
      }
      var a = ZAL[p];
      if (a !== null) osc(hz(a), 'sawtooth', t, sd * 0.45, 0.18, 0.001, 0.02);
      var _dr = ZDR[p];
      if (_dr === 'K' || _dr === 'O') {
        var vol = _dr === 'O' ? 0.55 : 0.42;
        noise(t, 0.055, vol, 68);
        noise(t, 0.04, vol * 0.6, 110);
      }
      if (_dr === 'S') {
        noise(t, 0.065, 0.38, 320);
        noise(t, 0.04, 0.20, 640);
        // Snap transient
        noise(t, 0.01, 0.5, 2400);
      }
      if (_dr === 'h') noise(t, 0.018, 0.12, 9000);
      if (_dr === 'H') noise(t, 0.04, 0.18, 6500); // open hat
    }
    step++;
  };
  var tick = function tick() {
    if (!ctx || !track) return;
    wake();
    var sd = 60 / 160 / 4; // 160 BPM 16th notes for both tracks
    while (nextT < ctx.currentTime + 0.18) {
      scheduleStep(nextT, track);
      nextT += sd;
    }
  };
  return {
    start: function start(tr) {
      boot();
      wake();
      if (!ctx) return;
      if (tickId) clearInterval(tickId);
      track = tr;
      step = 0;
      nextT = ctx.currentTime + 0.06;
      tickId = setInterval(tick, 55);
    },
    stop: function stop() {
      if (tickId) {
        clearInterval(tickId);
        tickId = null;
      }
      track = null;
    },
    currentTrack: function currentTrack() {
      return track;
    },
    isMuted: function isMuted() {
      return muted;
    },
    setMuted: function setMuted(v) {
      muted = v;
      localStorage.setItem(MUTE_KEY, v ? '1' : '0');
      boot();
      if (master && ctx) master.gain.setTargetAtTime(v ? 0 : 0.25, ctx.currentTime, 0.05);
    },
    sfxJump: function sfxJump() {
      boot();
      wake();
      if (!ctx || muted) return;
      var t = ctx.currentTime;
      osc(hz(21), 'square', t, 0.045, 0.32, 0.002, 0.01);
      osc(hz(28), 'square', t + 0.045, 0.055, 0.26, 0.002, 0.01);
    },
    sfxDoubleJump: function sfxDoubleJump() {
      boot();
      wake();
      if (!ctx || muted) return;
      var t = ctx.currentTime;
      osc(hz(21), 'square', t, 0.04, 0.26, 0.002, 0.01);
      osc(hz(28), 'square', t + 0.04, 0.04, 0.26, 0.002, 0.01);
      osc(hz(33), 'square', t + 0.08, 0.055, 0.24, 0.002, 0.01);
    },
    sfxDeath: function sfxDeath() {
      boot();
      wake();
      if (!ctx || muted) return;
      var t = ctx.currentTime;
      [hz(19), hz(16), hz(14), hz(11), hz(9)].forEach(function (f, i) {
        return osc(f, 'square', t + i * 0.09, 0.085, 0.28, 0.002, 0.04);
      });
      noise(t + 0.08, 0.3, 0.38, 170);
    },
    sfxScore: function sfxScore() {
      boot();
      wake();
      if (!ctx || muted) return;
      osc(hz(28), 'square', ctx.currentTime, 0.038, 0.20, 0.001, 0.01);
    },
    sfxMilestone: function sfxMilestone() {
      boot();
      wake();
      if (!ctx || muted) return;
      var t = ctx.currentTime;
      [hz(21), hz(26), hz(28), hz(33)].forEach(function (f, i) {
        return osc(f, 'square', t + i * 0.07, 0.08, 0.24, 0.002, 0.01);
      });
    }
  };
};
var _audioEngine = null;
var getAudio = function getAudio() {
  if (!_audioEngine) _audioEngine = createAudioEngine();
  return _audioEngine;
};

// ============ Flappy Dragon ============
// Dragon sprites — loaded from www/sprites/ folder
var DRAGON_SPRITE_W = 80;
var DRAGON_SPRITE_H = 53;
var DRAGON_COLOURS = ["white", "blue", "black", "red", "green"];
var DRAGON_COLOUR_LABELS = {
  white: "White",
  blue: "Blue",
  black: "Shadow",
  red: "Red",
  green: "Green"
};
var DRAGON_HIGH_KEY = 'tq_dragon_high'; // legacy / easy
var DRAGON_HIGH_HARD_KEY = 'tq_dragon_high_hard';

// Helper: cross-browser canvas rounded rectangle
var fdRoundRect = function fdRoundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};
var FlappyDragon = function FlappyDragon(_ref18) {
  var onClose = _ref18.onClose,
    pet = _ref18.pet,
    setPet = _ref18.setPet,
    haptic = _ref18.haptic;
  var canvasRef = React.useRef(null);
  var ctxRef = React.useRef(null);
  var stateRef = React.useRef(null);
  var rafRef = React.useRef(null);
  var _React$useState33 = React.useState(0),
    _React$useState34 = _slicedToArray(_React$useState33, 2),
    displayScore = _React$useState34[0],
    setDisplayScore = _React$useState34[1];
  var _React$useState35 = React.useState(parseInt(localStorage.getItem(DRAGON_HIGH_KEY) || '0', 10)),
    _React$useState36 = _slicedToArray(_React$useState35, 2),
    displayBest = _React$useState36[0],
    setDisplayBest = _React$useState36[1];
  var _React$useState37 = React.useState('idle'),
    _React$useState38 = _slicedToArray(_React$useState37, 2),
    gamePhase = _React$useState38[0],
    setGamePhase = _React$useState38[1];
  var _React$useState39 = React.useState('easy'),
    _React$useState40 = _slicedToArray(_React$useState39, 2),
    mode = _React$useState40[0],
    setMode = _React$useState40[1];
  var _React$useState41 = React.useState(function () {
      return getAudio().isMuted();
    }),
    _React$useState42 = _slicedToArray(_React$useState41, 2),
    muted = _React$useState42[0],
    setMutedState = _React$useState42[1];
  // Dragon colour selection
  var _React$useState43 = React.useState(function () {
      return localStorage.getItem('tq_dragon_colour') || 'red';
    }),
    _React$useState44 = _slicedToArray(_React$useState43, 2),
    dragonColour = _React$useState44[0],
    setDragonColour = _React$useState44[1];
  var dragonColourRef = React.useRef(dragonColour);
  // No sprite loading needed - dragon is drawn directly with canvas

  // Persist colour choice
  React.useEffect(function () {
    dragonColourRef.current = dragonColour;
    localStorage.setItem('tq_dragon_colour', dragonColour);
  }, [dragonColour]);
  var modeRef = React.useRef('easy');
  var phaseRef = React.useRef('idle');
  var wingFrame = React.useRef(0);
  var lastWingTime = React.useRef(0);

  // Start music when component mounts, stop when unmounts
  React.useEffect(function () {
    getAudio().start('dragon');
    // music stops on exit via close button
  }, []);
  var toggleMute = function toggleMute() {
    var audio = getAudio();
    audio.setMuted(!audio.isMuted());
    setMutedState(audio.isMuted());
  };
  var initState = function initState(W, H) {
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'easy';
    var hard = mode === 'hard';
    return {
      W: W,
      H: H,
      mode: mode,
      dragonX: W * 0.2,
      dragonY: H * 0.45,
      dy: 0,
      gravity: hard ? H * 0.00072 : H * 0.00040,
      flapForce: hard ? -(H * 0.014) : -(H * 0.011),
      terminalVel: hard ? H * 0.020 : H * 0.015,
      pipeSpeed: hard ? W * 0.007 : W * 0.0048,
      pipeW: W * 0.14,
      gap: hard ? H * 0.27 : H * 0.38,
      // easy: very forgiving gap
      pipes: [{
        x: W * 1.1,
        gapY: H * 0.25 + Math.random() * H * 0.35,
        passed: false,
        id: 0
      }, {
        x: W * 1.7,
        gapY: H * 0.25 + Math.random() * H * 0.35,
        passed: false,
        id: 1
      }],
      nextPipeId: 2,
      score: 0,
      alive: true,
      started: false,
      groundY: H * 0.88,
      frameCount: 0
    };
  };

  // Draw dragon using canvas 2D - fully drawn, no sprite loading needed
  var drawDragon = function drawDragon(ctx, x, y, dy, dead, frame) {
    var DW = 80,
      DH = 53; // Fixed dimensions
    var tilt = dead ? 75 : Math.max(-28, Math.min(45, dy * 3.2));
    var col = dragonColourRef.current || 'red';
    var frameIdx = dead ? 2 : frame % 5;
    ctx.save();
    ctx.translate(x + DW / 2, y + DH / 2);
    ctx.rotate(tilt * Math.PI / 180);

    // Draw a stylized dragon
    var colors = {
      'red': {
        body: '#c0453f',
        belly: '#e86f5f',
        wing: '#a03530',
        eye: '#ff8800'
      },
      'blue': {
        body: '#4a85c7',
        belly: '#6ba5e7',
        wing: '#2d5f9f',
        eye: '#ffffff'
      },
      'green': {
        body: '#5fa865',
        belly: '#7fc88a',
        wing: '#3f8845',
        eye: '#ffee00'
      },
      'white': {
        body: '#e8dcc4',
        belly: '#f5f0e8',
        wing: '#c8b8a0',
        eye: '#4da6ff'
      },
      'black': {
        body: '#4a3f38',
        belly: '#6a5f58',
        wing: '#2a1f18',
        eye: '#ff4040'
      }
    };
    var c = colors[col] || colors['red'];

    // Tail (draw first so it's behind)
    ctx.strokeStyle = c.body;
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(-DW * 0.35, DH * 0.05);
    var tailWag = dead ? 0 : Math.sin(frameIdx * 0.3) * 8;
    ctx.quadraticCurveTo(-DW * 0.6, DH * 0.28 + tailWag, -DW * 0.8, DH * 0.2 + tailWag * 0.5);
    ctx.stroke();
    // Tail tip (spade shape)
    ctx.fillStyle = c.wing;
    ctx.beginPath();
    ctx.moveTo(-DW * 0.8, DH * 0.2 + tailWag * 0.5);
    ctx.lineTo(-DW * 0.88, DH * 0.12 + tailWag * 0.3);
    ctx.lineTo(-DW * 0.84, DH * 0.24 + tailWag * 0.5);
    ctx.lineTo(-DW * 0.8, DH * 0.2 + tailWag * 0.5);
    ctx.closePath();
    ctx.fill();

    // Wings (behind body)
    ctx.fillStyle = c.wing;
    var wingBeat = dead ? 0 : Math.sin(frameIdx * 0.8) * 8;
    // Left wing (back)
    ctx.beginPath();
    ctx.moveTo(-DW * 0.22, -DH * 0.05);
    ctx.lineTo(-DW * 0.58, -DH * 0.4 + wingBeat);
    ctx.lineTo(-DW * 0.32, DH * 0.18);
    ctx.closePath();
    ctx.fill();
    // Right wing (front) - slightly different angle
    ctx.beginPath();
    ctx.moveTo(-DW * 0.12, -DH * 0.08);
    ctx.lineTo(-DW * 0.48, -DH * 0.45 - wingBeat);
    ctx.lineTo(-DW * 0.22, DH * 0.15);
    ctx.closePath();
    ctx.fill();

    // Body (main oval)
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(-DW * 0.05, 0, DW * 0.38, DH * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();

    // Belly highlight
    ctx.fillStyle = c.belly;
    ctx.beginPath();
    ctx.ellipse(-DW * 0.03, DH * 0.08, DW * 0.22, DH * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Neck
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(DW * 0.18, -DH * 0.08, DW * 0.15, DH * 0.22, 0.3, 0, Math.PI * 2);
    ctx.fill();

    // Head (elongated for snout)
    ctx.fillStyle = c.body;
    ctx.beginPath();
    ctx.ellipse(DW * 0.35, -DH * 0.15, DW * 0.22, DH * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Snout/nose
    ctx.fillStyle = c.wing;
    ctx.beginPath();
    ctx.ellipse(DW * 0.50, -DH * 0.15, DW * 0.08, DH * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();

    // Nostrils
    ctx.fillStyle = '#1a110a';
    ctx.beginPath();
    ctx.arc(DW * 0.52, -DH * 0.18, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(DW * 0.52, -DH * 0.12, 2, 0, Math.PI * 2);
    ctx.fill();

    // Eye
    if (!dead) {
      // Eye white
      ctx.fillStyle = c.eye;
      ctx.beginPath();
      ctx.ellipse(DW * 0.38, -DH * 0.20, 5, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Pupil
      ctx.fillStyle = '#1a110a';
      ctx.beginPath();
      ctx.arc(DW * 0.39, -DH * 0.19, 3, 0, Math.PI * 2);
      ctx.fill();
      // Highlight
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(DW * 0.40, -DH * 0.21, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Horns/ridges
    ctx.strokeStyle = c.wing;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(DW * 0.28, -DH * 0.28);
    ctx.lineTo(DW * 0.26, -DH * 0.42);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(DW * 0.36, -DH * 0.30);
    ctx.lineTo(DW * 0.38, -DH * 0.44);
    ctx.stroke();

    // Spine ridges on back
    ctx.lineWidth = 2;
    for (var i = 0; i < 3; i++) {
      var sx = -DW * 0.15 - i * DW * 0.1;
      var sy = -DH * 0.2 + i * DH * 0.08;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(sx - 4, sy - 8);
      ctx.stroke();
    }

    // Flame breath on strong flap — overlaid on sprite
    if (!dead && dy < -4) {
      var flameX = DW / 2 + 4;
      ctx.globalAlpha = 0.8;
      var grad = ctx.createRadialGradient(flameX, 0, 0, flameX, 0, 18 + Math.random() * 6);
      grad.addColorStop(0, '#fff8e4');
      grad.addColorStop(0.4, '#f5a030');
      grad.addColorStop(1, 'rgba(200,60,20,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(flameX + 8, 0, 16 + Math.random() * 4, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Dead X eyes overlay
    if (dead) {
      ctx.strokeStyle = '#ff4040';
      ctx.lineWidth = 2.5;
      var ex = DW * 0.28,
        ey = -DH * 0.18,
        es = 5;
      ctx.beginPath();
      ctx.moveTo(ex - es, ey - es);
      ctx.lineTo(ex + es, ey + es);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ex + es, ey - es);
      ctx.lineTo(ex - es, ey + es);
      ctx.stroke();
    }
    ctx.restore();
  };
  var drawObstacle = function drawObstacle(ctx, pipe, pipeW, gap, W, H, groundY) {
    var type = Math.floor(pipe.id * 1.7) % 3;
    var col = pipe.passed ? 'rgba(154,135,101,0.4)' : '#c9a961';
    var dark = pipe.passed ? 'rgba(30,18,8,0.5)' : '#2a1a0a';
    var topH = pipe.gapY;
    var botY = pipe.gapY + gap;
    var botH = groundY - botY;
    var x = pipe.x;
    if (type === 0) {
      // Castle walls
      ctx.fillStyle = dark;
      ctx.fillRect(x, 0, pipeW, topH);
      ctx.fillRect(x, botY, pipeW, botH);
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, 0, pipeW, topH);
      ctx.strokeRect(x, botY, pipeW, botH);
      // Battlements
      var mW = 10,
        mH = 16,
        count = Math.floor(pipeW / 14);
      ctx.fillStyle = dark;
      for (var i = 0; i < count; i++) {
        ctx.fillRect(x + i * 14 + 1, topH - mH, mW, mH);
        ctx.strokeRect(x + i * 14 + 1, topH - mH, mW, mH);
        ctx.fillRect(x + i * 14 + 1, botY, mW, mH);
        ctx.strokeRect(x + i * 14 + 1, botY, mW, mH);
      }
      // Arrow slit
      ctx.fillStyle = col;
      ctx.globalAlpha = 0.5;
      ctx.fillRect(x + pipeW / 2 - 2, topH * 0.3, 4, 12);
      ctx.fillRect(x + pipeW / 2 - 2, botY + botH * 0.3, 4, 12);
      ctx.globalAlpha = 1;
    } else if (type === 1) {
      // Sword pillars
      ctx.fillStyle = dark;
      ctx.fillRect(x, 0, pipeW, topH);
      ctx.fillRect(x, botY, pipeW, botH);
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, 0, pipeW, topH);
      ctx.strokeRect(x, botY, pipeW, botH);
      // Sword tips
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.moveTo(x + pipeW / 2 - 6, topH - 2);
      ctx.lineTo(x + pipeW / 2 + 6, topH - 2);
      ctx.lineTo(x + pipeW / 2, topH + 14);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(x + pipeW / 2 - 6, botY + 2);
      ctx.lineTo(x + pipeW / 2 + 6, botY + 2);
      ctx.lineTo(x + pipeW / 2, botY - 14);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(x + pipeW / 2 - 9, topH - 22, 18, 7);
      ctx.fillRect(x + pipeW / 2 - 9, botY + 15, 18, 7);
    } else {
      // Spell pillars
      ctx.fillStyle = dark;
      var rnd = 4;
      ctx.beginPath();
      rr(ctx, x + 3, 0, pipeW - 6, topH, [0, 0, rnd, rnd]);
      ctx.fill();
      ctx.beginPath();
      rr(ctx, x + 3, botY, pipeW - 6, botH, [rnd, rnd, 0, 0]);
      ctx.fill();
      ctx.strokeStyle = col;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      rr(ctx, x + 3, 0, pipeW - 6, topH, [0, 0, rnd, rnd]);
      ctx.stroke();
      ctx.beginPath();
      rr(ctx, x + 3, botY, pipeW - 6, botH, [rnd, rnd, 0, 0]);
      ctx.stroke();
      // Mana orbs
      var orbs = ['#9fc7e6', '#f5d98f', '#8fbc8f'];
      [topH * 0.2, topH * 0.5, topH * 0.78].forEach(function (oy, i) {
        ctx.fillStyle = orbs[i];
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.arc(x + pipeW / 2, oy, 6, 0, Math.PI * 2);
        ctx.fill();
      });
      var orbs2 = ['#d48a86', '#c9a961', '#9fc7e6'];
      [botY + botH * 0.2, botY + botH * 0.5, botY + botH * 0.78].forEach(function (oy, i) {
        ctx.fillStyle = orbs2[i];
        ctx.globalAlpha = 0.75;
        ctx.beginPath();
        ctx.arc(x + pipeW / 2, oy, 6, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      // Gap orbs
      ctx.fillStyle = col;
      ctx.globalAlpha = 0.65;
      ctx.beginPath();
      ctx.arc(x + pipeW / 2, topH, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + pipeW / 2, botY, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  };
  var render = React.useCallback(function (ctx, s) {
    var W = s.W,
      H = s.H,
      groundY = s.groundY;
    // Sky gradient — deeper twilight with horizon glow
    var sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#04020e');
    sky.addColorStop(0.35, '#0c0520');
    sky.addColorStop(0.7, '#1e0c32');
    sky.addColorStop(0.88, '#2d1248');
    sky.addColorStop(1, '#3a1855');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Nebula/aurora wash behind mountains
    var nebulaGrad = ctx.createLinearGradient(0, groundY * 0.4, 0, groundY);
    nebulaGrad.addColorStop(0, 'transparent');
    nebulaGrad.addColorStop(0.5, 'rgba(100,30,140,0.08)');
    nebulaGrad.addColorStop(1, 'rgba(180,80,40,0.06)');
    ctx.fillStyle = nebulaGrad;
    ctx.fillRect(0, groundY * 0.4, W, groundY * 0.6);

    // Moon
    var moonX = W * 0.82,
      moonY = H * 0.12,
      moonR = W * 0.038;
    var moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, moonR * 3.5);
    moonGlow.addColorStop(0, 'rgba(245,220,160,0.18)');
    moonGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = moonGlow;
    ctx.fillRect(moonX - moonR * 3.5, moonY - moonR * 3.5, moonR * 7, moonR * 7);
    var moonFace = ctx.createRadialGradient(moonX - moonR * 0.2, moonY - moonR * 0.2, 0, moonX, moonY, moonR);
    moonFace.addColorStop(0, '#fff8e4');
    moonFace.addColorStop(0.7, '#f5e090');
    moonFace.addColorStop(1, '#c8a840');
    ctx.fillStyle = moonFace;
    ctx.beginPath();
    ctx.arc(moonX, moonY, moonR, 0, Math.PI * 2);
    ctx.fill();
    // Crater shadows
    ctx.fillStyle = 'rgba(80,50,10,0.18)';
    [[0.3, 0.2, 0.18], [-0.25, 0.35, 0.12], [0.1, -0.3, 0.15]].forEach(function (_ref19) {
      var _ref20 = _slicedToArray(_ref19, 3),
        dx = _ref20[0],
        dy = _ref20[1],
        r = _ref20[2];
      ctx.beginPath();
      ctx.arc(moonX + dx * moonR, moonY + dy * moonR, r * moonR, 0, Math.PI * 2);
      ctx.fill();
    });

    // Stars — varied sizes, twinkle
    for (var i = 0; i < 48; i++) {
      var sx = ((i * 73 + s.frameCount * 0.08) % W + W) % W;
      var sy = i * 47 % (groundY * 0.72);
      var sz = 0.5 + i % 4 * 0.45;
      var twinkle = 0.18 + 0.22 * Math.sin(s.frameCount * 0.04 + i * 1.7);
      ctx.fillStyle = i % 7 === 0 ? "rgba(200,160,255,".concat(twinkle + 0.1, ")") : "rgba(245,217,143,".concat(twinkle, ")");
      ctx.beginPath();
      ctx.arc(sx, sy, sz, 0, Math.PI * 2);
      ctx.fill();
      // Cross sparkle on brighter stars
      if (i % 9 === 0 && sz > 0.9) {
        ctx.strokeStyle = "rgba(245,217,143,".concat(twinkle * 0.5, ")");
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(sx - sz * 2.5, sy);
        ctx.lineTo(sx + sz * 2.5, sy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(sx, sy - sz * 2.5);
        ctx.lineTo(sx, sy + sz * 2.5);
        ctx.stroke();
      }
    }

    // Clouds — slow parallax, semi-transparent wisps
    for (var ci = 0; ci < 4; ci++) {
      var cSpeed = 0.018 + ci * 0.008;
      var cx = ((-s.frameCount * cSpeed * (s.pipeSpeed / 2.6) + ci * W * 0.28) % (W + 180) + W + 180) % (W + 180);
      var cy = groundY * (0.08 + ci * 0.07);
      var cW = W * (0.12 + ci % 3 * 0.07),
        cH = cW * 0.28;
      var cAlpha = 0.05 + ci % 2 * 0.04;
      ctx.fillStyle = "rgba(180,140,220,".concat(cAlpha, ")");
      ctx.beginPath();
      ctx.ellipse(cx, cy, cW, cH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.ellipse(cx - cW * 0.3, cy + cH * 0.1, cW * 0.6, cH * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.ellipse(cx + cW * 0.35, cy + cH * 0.15, cW * 0.5, cH * 0.65, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mountains — 3 layers with improved silhouettes
    for (var layer = 0; layer < 3; layer++) {
      var speed = 0.04 + layer * 0.05;
      var ox = (-s.frameCount * speed * (s.pipeSpeed / 2.6) % (W + 20) + W + 20) % (W + 20);
      var baseAlpha = [0.18, 0.28, 0.38][layer];
      var baseColor = ["rgba(40,15,70,".concat(baseAlpha, ")"), "rgba(55,20,80,".concat(baseAlpha, ")"), "rgba(35,12,55,".concat(baseAlpha, ")")][layer];
      ctx.fillStyle = baseColor;
      ctx.beginPath();
      ctx.moveTo(-10, groundY - 30);
      var peakCount = 5 + layer;
      for (var _i = 0; _i <= peakCount; _i++) {
        var mx = (ox + _i * (W * 0.35)) % (W * 2) - W * 0.15;
        var baseH = (45 + (_i * 41 + layer * 31) % 65) * (H / 560) * (1.1 - layer * 0.15);
        // smooth mountain shape
        if (_i === 0) ctx.lineTo(mx - W * 0.18, groundY - 30);
        ctx.quadraticCurveTo(mx + W * 0.09, groundY - 30 - baseH * 1.1, mx + W * 0.18, groundY - 30);
      }
      ctx.lineTo(W + 20, groundY - 30);
      ctx.lineTo(W + 20, H);
      ctx.lineTo(-10, H);
      ctx.fill();
      // Snow caps on far mountains
      if (layer === 0) {
        ctx.fillStyle = "rgba(220,200,255,0.07)";
        ctx.beginPath();
        for (var _i2 = 0; _i2 <= peakCount; _i2++) {
          var _mx = (ox + _i2 * (W * 0.35)) % (W * 2) - W * 0.15;
          var _baseH = (45 + _i2 * 41 % 65) * (H / 560);
          ctx.moveTo(_mx + W * 0.09, groundY - 30 - _baseH * 1.1);
          ctx.lineTo(_mx + W * 0.09 - W * 0.02, groundY - 30 - _baseH * 0.9);
          ctx.lineTo(_mx + W * 0.09 + W * 0.02, groundY - 30 - _baseH * 0.9);
        }
        ctx.fill();
      }
    }

    // Ground — rich mossy stone with glow edge
    var gGrad = ctx.createLinearGradient(0, groundY, 0, H);
    gGrad.addColorStop(0, '#1e1206');
    gGrad.addColorStop(0.3, '#160e04');
    gGrad.addColorStop(1, '#0a0602');
    ctx.fillStyle = gGrad;
    ctx.fillRect(0, groundY, W, H - groundY);
    // Glowing edge
    var edgeGrad = ctx.createLinearGradient(0, groundY - 2, 0, groundY + 6);
    edgeGrad.addColorStop(0, 'rgba(201,169,97,0.7)');
    edgeGrad.addColorStop(0.5, 'rgba(201,169,97,0.35)');
    edgeGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = edgeGrad;
    ctx.fillRect(0, groundY - 2, W, 8);
    // Improved stone floor with alternating large/small slabs
    var brickW = W * 0.09,
      brickH = H * 0.024;
    var bScroll = s.frameCount * s.pipeSpeed * 0.55 % (brickW + 3);
    for (var row = 0; row < 3; row++) {
      var rowY = groundY + 4 + row * (brickH + 2);
      var darkening = row * 0.06;
      ctx.fillStyle = "rgba(30,18,8,".concat(0.55 + darkening, ")");
      ctx.strokeStyle = "rgba(80,55,20,".concat(0.5 - darkening, ")");
      ctx.lineWidth = 0.7;
      for (var _i3 = -1; _i3 < W / (brickW + 3) + 2; _i3++) {
        var bx = _i3 * (brickW + 3) - bScroll + row % 2 * (brickW * 0.5);
        var thisW = row === 1 ? brickW * 0.65 : brickW;
        ctx.fillRect(bx, rowY, thisW, brickH);
        ctx.strokeRect(bx, rowY, thisW, brickH);
        // Occasional moss tint
        if ((_i3 + row * 3) % 7 === 0) {
          ctx.fillStyle = 'rgba(30,60,15,0.12)';
          ctx.fillRect(bx + 2, rowY + 2, thisW - 4, brickH - 4);
          ctx.fillStyle = "rgba(30,18,8,".concat(0.55 + darkening, ")");
        }
      }
    }

    // Obstacles
    s.pipes.forEach(function (p) {
      return drawObstacle(ctx, p, s.pipeW, s.gap, W, H, groundY);
    });

    // Dragon
    var wf = wingFrame.current;
    drawDragon(ctx, s.dragonX, s.dragonY, s.dy, !s.alive, wf);

    // Overlay text
    ctx.textAlign = 'center';
    if (phaseRef.current === 'idle') {
      var bw = W * 0.82,
        bh = H * 0.42;
      var _bx = W / 2 - bw / 2,
        by = H / 2 - bh / 2;
      // Background box
      ctx.fillStyle = 'rgba(5,3,10,0.92)';
      fdRoundRect(ctx, _bx, by, bw, bh, 5);
      ctx.fill();
      ctx.strokeStyle = 'rgba(201,169,97,0.55)';
      ctx.lineWidth = 1.5;
      fdRoundRect(ctx, _bx, by, bw, bh, 5);
      ctx.stroke();
      // Title
      ctx.textAlign = 'center';
      ctx.fillStyle = '#f5d98f';
      ctx.font = "bold ".concat(Math.round(W * 0.052), "px Cinzel, serif");
      ctx.fillText('FLAPPY DRAGON', W / 2, by + bh * 0.13);
      ctx.fillStyle = '#c9a961';
      ctx.font = "italic ".concat(Math.round(W * 0.036), "px \"Crimson Pro\", serif");
      ctx.fillText('tap to begin', W / 2, by + bh * 0.24);

      // Colour swatches row
      var swatchColours = ['white', 'blue', 'black', 'red', 'green'];
      var swatchLabels = {
        white: 'White',
        blue: 'Blue',
        black: 'Shadow',
        red: 'Red',
        green: 'Green'
      };
      var swatchHex = {
        white: '#e8e4d0',
        blue: '#4a8ab4',
        black: '#8a60aa',
        red: '#c0453f',
        green: '#5a9a3a'
      };
      var sw = bw * 0.15,
        sh = bh * 0.18;
      var swY = by + bh * 0.34;
      var totalSW = sw * 5 + bw * 0.04;
      var swStartX = W / 2 - totalSW / 2;
      var curCol = dragonColourRef.current;
      swatchColours.forEach(function (col, i) {
        var sx = swStartX + i * (sw + bw * 0.01);
        var isActive = col === curCol;
        // Swatch bg
        ctx.fillStyle = isActive ? swatchHex[col] + '55' : 'rgba(10,6,4,0.7)';
        fdRoundRect(ctx, sx, swY, sw, sh, 3);
        ctx.fill();
        ctx.strokeStyle = isActive ? swatchHex[col] : 'rgba(154,135,101,0.3)';
        ctx.lineWidth = isActive ? 2 : 1;
        fdRoundRect(ctx, sx, swY, sw, sh, 3);
        ctx.stroke();
        // Colour dot
        ctx.fillStyle = swatchHex[col];
        ctx.beginPath();
        ctx.arc(sx + sw / 2, swY + sh * 0.38, sw * 0.22, 0, Math.PI * 2);
        ctx.fill();
        if (isActive) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(sx + sw / 2, swY + sh * 0.38, sw * 0.22, 0, Math.PI * 2);
          ctx.stroke();
        }
        // Label
        ctx.fillStyle = isActive ? '#f5d98f' : '#6a5a42';
        ctx.font = "".concat(Math.round(W * 0.022), "px Cinzel, serif");
        ctx.textAlign = 'center';
        ctx.fillText(swatchLabels[col], sx + sw / 2, swY + sh * 0.82);
      });

      // Mode buttons
      var mEasy = modeRef.current === 'easy';
      var btnW = bw * 0.38,
        btnH = bh * 0.17;
      var btnY = by + bh * 0.78;
      var easyX = W / 2 - btnW - bw * 0.04;
      var hardX = W / 2 + bw * 0.04;
      ctx.fillStyle = mEasy ? 'rgba(107,142,90,0.4)' : 'rgba(20,14,8,0.5)';
      fdRoundRect(ctx, easyX, btnY, btnW, btnH, 3);
      ctx.fill();
      ctx.strokeStyle = mEasy ? '#8fbc8f' : 'rgba(154,135,101,0.35)';
      ctx.lineWidth = 1;
      fdRoundRect(ctx, easyX, btnY, btnW, btnH, 3);
      ctx.stroke();
      ctx.fillStyle = mEasy ? '#8fbc8f' : '#6a5a42';
      ctx.font = "".concat(Math.round(W * 0.030), "px Cinzel, serif");
      ctx.textAlign = 'center';
      ctx.fillText('EASY', easyX + btnW / 2, btnY + btnH * 0.68);
      ctx.fillStyle = !mEasy ? 'rgba(160,48,44,0.4)' : 'rgba(20,14,8,0.5)';
      fdRoundRect(ctx, hardX, btnY, btnW, btnH, 3);
      ctx.fill();
      ctx.strokeStyle = !mEasy ? '#d48a86' : 'rgba(154,135,101,0.35)';
      ctx.lineWidth = 1;
      fdRoundRect(ctx, hardX, btnY, btnW, btnH, 3);
      ctx.stroke();
      ctx.fillStyle = !mEasy ? '#d48a86' : '#6a5a42';
      ctx.font = "".concat(Math.round(W * 0.030), "px Cinzel, serif");
      ctx.fillText('HARD', hardX + btnW / 2, btnY + btnH * 0.68);
    } else if (phaseRef.current === 'dead') {
      var _bw = W * 0.65,
        _bh = H * 0.22;
      var _bx2 = W / 2 - _bw / 2,
        _by = H / 2 - _bh / 2;
      ctx.fillStyle = 'rgba(5,3,10,0.92)';
      fdRoundRect(ctx, _bx2, _by, _bw, _bh, 5);
      ctx.fill();
      ctx.strokeStyle = 'rgba(160,48,44,0.6)';
      ctx.lineWidth = 1.5;
      fdRoundRect(ctx, _bx2, _by, _bw, _bh, 5);
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillStyle = '#d48a86';
      ctx.font = "bold ".concat(Math.round(W * 0.052), "px Cinzel, serif");
      ctx.fillText('SLAIN', W / 2, _by + _bh * 0.3);
      ctx.fillStyle = '#f5d98f';
      ctx.font = "bold ".concat(Math.round(W * 0.13), "px \"JetBrains Mono\", monospace");
      ctx.fillText(s.score, W / 2, _by + _bh * 0.68);
      var key = s.mode === 'hard' ? DRAGON_HIGH_HARD_KEY : DRAGON_HIGH_KEY;
      if (s.score > 0 && s.score >= parseInt(localStorage.getItem(key) || '0', 10)) {
        ctx.fillStyle = '#c9a961';
        ctx.font = "italic ".concat(Math.round(W * 0.038), "px \"Crimson Pro\", serif");
        ctx.fillText('* New best! *', W / 2, _by + _bh * 0.88);
      } else {
        ctx.fillStyle = '#6a5a42';
        ctx.font = "".concat(Math.round(W * 0.03), "px Cinzel, serif");
        ctx.fillText('TAP TO TRY AGAIN', W / 2, _by + _bh * 0.88);
      }
    }
  }, []);
  var die = React.useCallback(function (s) {
    try {
      s.alive = false;
      phaseRef.current = 'dead';
      setGamePhase('dead');
      haptic([30, 50, 80]);
      getAudio().sfxDeath();
      var key = s.mode === 'hard' ? DRAGON_HIGH_HARD_KEY : DRAGON_HIGH_KEY;
      var nb = Math.max(s.score, parseInt(localStorage.getItem(key) || '0', 10));
      localStorage.setItem(key, String(nb));
      setDisplayBest(nb);
      if (pet && s.score >= 5) {
        var xp = Math.min(s.score * 3, 60);
        setPet(function (prev) {
          return prev ? _objectSpread(_objectSpread({}, prev), {}, {
            xp: (prev.xp || 0) + xp
          }) : prev;
        });
      }
    } catch (err) {
      console.error('Dragon death error:', err);
      // Still set to dead state even if something fails
      s.alive = false;
      phaseRef.current = 'dead';
      setGamePhase('dead');
    }
  }, [haptic, pet, setPet]);
  var dieRef = React.useRef(die);
  var hapticRef = React.useRef(haptic);
  React.useEffect(function () {
    dieRef.current = die;
  }, [die]);
  React.useEffect(function () {
    hapticRef.current = haptic;
  }, [haptic]);
  var startLoop = React.useCallback(function (canvas) {
    var ctx = ctxRef.current || canvas.getContext('2d');
    ctxRef.current = ctx;
    var W = parseInt(canvas.dataset.lw || canvas.width, 10);
    var H = parseInt(canvas.dataset.lh || canvas.height, 10);
    if (!stateRef.current || stateRef.current.W !== W) {
      stateRef.current = initState(W, H, modeRef.current);
    }
    var _loop = function loop(timestamp) {
      var s = stateRef.current;

      // Wing animation cycling through all 5 sprite frames
      if (timestamp - lastWingTime.current > 80) {
        wingFrame.current = (wingFrame.current + 1) % 5;
        lastWingTime.current = timestamp;
      }
      if (s.started && s.alive) {
        s.frameCount++;
        s.dy += s.gravity;
        s.dy = Math.min(s.dy, s.terminalVel);
        s.dragonY += s.dy;

        // Move pipes
        s.pipes = s.pipes.map(function (p) {
          return _objectSpread(_objectSpread({}, p), {}, {
            x: p.x - s.pipeSpeed
          });
        });

        // Spawn pipes
        var last = s.pipes[s.pipes.length - 1];
        if (last && last.x < W * 0.62) {
          s.pipes.push({
            x: W * 1.05,
            gapY: s.H * 0.22 + Math.random() * s.H * 0.4,
            passed: false,
            id: s.nextPipeId++
          });
        }
        s.pipes = s.pipes.filter(function (p) {
          return p.x > -s.pipeW - 10;
        });

        // Score
        s.pipes.forEach(function (p) {
          if (!p.passed && p.x + s.pipeW < s.dragonX) {
            p.passed = true;
            s.score++;
            setDisplayScore(s.score);
            hapticRef.current(8);
            if (s.score % 5 === 0) getAudio().sfxMilestone();else getAudio().sfxScore();
          }
        });

        // Floor/ceiling collision
        var dragonW = W * 0.13;
        var dragonH = W * 0.09;
        if (s.dragonY < 0 || s.dragonY + dragonH > s.groundY) {
          dieRef.current(s);
          render(ctx, s);
          return;
        }

        // Pipe collision -- with small margin so it feels fair
        var margin = dragonW * 0.18;
        var _iterator = _createForOfIteratorHelper(s.pipes),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var p = _step.value;
            if (s.dragonX + dragonW - margin > p.x + margin && s.dragonX + margin < p.x + s.pipeW - margin) {
              if (s.dragonY + margin < p.gapY || s.dragonY + dragonH - margin > p.gapY + s.gap) {
                dieRef.current(s);
                render(ctx, s);
                return;
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else if (!s.started) {
        // Idle: gently bob the dragon above the start box
        s.dragonY = s.H * 0.28 + Math.sin(Date.now() / 700) * 6;
      }
      render(ctx, s);
      rafRef.current = requestAnimationFrame(_loop);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(_loop);
  }, []); // stable loop - no deps

  // Mount: size canvas to fill container, start loop
  React.useEffect(function () {
    var canvas = canvasRef.current;
    if (!canvas) return;
    var parent = canvas.parentElement;
    var resize = function resize() {
      var dpr = window.devicePixelRatio || 1;
      var logicalW = parent.clientWidth;
      var logicalH = parent.clientHeight;
      canvas.width = logicalW * dpr;
      canvas.height = logicalH * dpr;
      canvas.style.width = logicalW + 'px';
      canvas.style.height = logicalH + 'px';
      canvas.dataset.lw = logicalW;
      canvas.dataset.lh = logicalH;
      var ctx2d = canvas.getContext('2d');
      if (ctx2d) {
        ctx2d.scale(dpr, dpr);
        ctxRef.current = ctx2d;
      }
      stateRef.current = null; // force reinit on resize
      startLoop(canvas);
    };
    resize();
    return function () {
      return cancelAnimationFrame(rafRef.current);
    };
  }, [startLoop]);
  var handleTap = React.useCallback(function (clientX, clientY) {
    var holdMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var s = stateRef.current;
    if (!s) return;

    // On idle screen, check if tapping colour swatches or mode buttons
    if (phaseRef.current === 'idle' && clientX !== undefined) {
      var canvas = canvasRef.current;
      if (canvas) {
        var rect = canvas.getBoundingClientRect();
        var cx = clientX - rect.left;
        var cy = clientY - rect.top;
        var W = parseInt(canvas.dataset.lw || canvas.clientWidth, 10);
        var H = parseInt(canvas.dataset.lh || canvas.clientHeight, 10);
        var bw = W * 0.82,
          bh = H * 0.42;
        var by = H / 2 - bh / 2;

        // Colour swatches
        var sw = bw * 0.15,
          sh = bh * 0.18;
        var swY = by + bh * 0.34;
        var totalSW = sw * 5 + bw * 0.04;
        var swStartX = W / 2 - totalSW / 2;
        var swatchCols = ['white', 'blue', 'black', 'red', 'green'];
        for (var i = 0; i < 5; i++) {
          var sx = swStartX + i * (sw + bw * 0.01);
          if (cx >= sx && cx <= sx + sw && cy >= swY && cy <= swY + sh) {
            haptic(20);
            setDragonColour(swatchCols[i]);
            dragonColourRef.current = swatchCols[i];
            localStorage.setItem('tq_dragon_colour', swatchCols[i]);
            return;
          }
        }

        // Mode buttons
        var btnW = bw * 0.38,
          btnH = bh * 0.17;
        var btnY = by + bh * 0.78;
        var easyX = W / 2 - btnW - bw * 0.04;
        var hardX = W / 2 + bw * 0.04;
        if (cx >= easyX && cx <= easyX + btnW && cy >= btnY && cy <= btnY + btnH) {
          modeRef.current = 'easy';
          setMode('easy');
          setDisplayBest(parseInt(localStorage.getItem(DRAGON_HIGH_KEY) || '0', 10));
          stateRef.current = initState(W, H, 'easy');
          haptic(15);
          return;
        }
        if (cx >= hardX && cx <= hardX + btnW && cy >= btnY && cy <= btnY + btnH) {
          modeRef.current = 'hard';
          setMode('hard');
          setDisplayBest(parseInt(localStorage.getItem(DRAGON_HIGH_HARD_KEY) || '0', 10));
          stateRef.current = initState(W, H, 'hard');
          haptic(15);
          return;
        }
      }
    }
    if (phaseRef.current === 'dead') {
      var _canvas = canvasRef.current;
      if (!_canvas) return;
      stateRef.current = initState(parseInt(_canvas.dataset.lw || _canvas.clientWidth, 10), parseInt(_canvas.dataset.lh || _canvas.clientHeight, 10), modeRef.current);
      phaseRef.current = 'idle';
      setGamePhase('idle');
      setDisplayScore(0);
      startLoop(_canvas);
      return;
    }
    if (!s.alive) return;
    if (!s.started) {
      s.started = true;
      phaseRef.current = 'playing';
      setGamePhase('playing');
    }
    s.dy = s.flapForce;
    haptic(18);
    getAudio().sfxJump();
  }, [haptic, startLoop]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[70] flex flex-col",
    style: {
      background: '#0a0614',
      touchAction: 'none',
      userSelect: 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between flex-shrink-0",
    style: {
      background: 'rgba(5,3,10,0.85)',
      borderBottom: '1px solid rgba(201,169,97,0.18)',
      padding: '6px 12px'
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();
      cancelAnimationFrame(rafRef.current);
      getAudio().stop();
      onClose();
    },
    style: {
      width: 30,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#9a8765',
      border: '1px solid rgba(154,135,101,0.35)',
      borderRadius: '2px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(XIcon, {
    style: {
      fontSize: '0.8rem'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: '#f5d98f',
      fontSize: '1.8rem',
      fontWeight: 700,
      lineHeight: 1
    }
  }, displayScore), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: '#6a5a42',
      fontSize: '0.45rem',
      letterSpacing: '0.25em'
    }
  }, "SCORE")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      minWidth: 52
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: '#c9a961',
      fontSize: '1.1rem',
      fontWeight: 700,
      lineHeight: 1
    }
  }, displayBest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: '#6a5a42',
      fontSize: '0.45rem',
      letterSpacing: '0.2em'
    }
  }, "BEST"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: mode === 'hard' ? '#d48a86' : '#8fbc8f',
      fontSize: '0.42rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      marginTop: '1px'
    }
  }, mode.toUpperCase()), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick(e) {
      e.stopPropagation();
      toggleMute();
    },
    style: {
      marginTop: '3px',
      fontSize: '0.75rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      opacity: muted ? 0.4 : 0.8
    }
  }, muted ? '🔇' : '🔊'))), function () {
    return /*#__PURE__*/React.createElement("div", {
      className: "flex-1 relative",
      onTouchStart: function onTouchStart(e) {
        e.preventDefault();
      },
      onTouchEnd: function onTouchEnd(e) {
        e.preventDefault();
        var t = e.changedTouches[0];
        handleTap(t.clientX, t.clientY);
      },
      onTouchCancel: function onTouchCancel() {},
      style: {
        touchAction: 'none'
      }
    }, /*#__PURE__*/React.createElement("canvas", {
      ref: canvasRef,
      style: {
        display: 'block',
        width: '100%',
        height: '100%'
      }
    }));
  }());
};

// ============ Zombie Jumper — Castlevania Platformer ============
// Sprite sheets - pixel art, gothic Castlevania palette
// ============ Keyword Index ============
var KEYWORDS = [{
  k: "Deathtouch",
  t: "Any amount of damage this creature deals to a creature is enough to destroy it."
}, {
  k: "Defender",
  t: "This creature can't attack."
}, {
  k: "Double Strike",
  t: "This creature deals both first-strike and regular combat damage."
}, {
  k: "First Strike",
  t: "This creature deals combat damage before creatures without first strike."
}, {
  k: "Flash",
  t: "You may cast this spell any time you could cast an instant."
}, {
  k: "Flying",
  t: "This creature can't be blocked except by creatures with flying or reach."
}, {
  k: "Haste",
  t: "This creature can attack and use tap/untap abilities the turn it enters the battlefield."
}, {
  k: "Hexproof",
  t: "This permanent can't be the target of spells or abilities your opponents control."
}, {
  k: "Indestructible",
  t: "Effects that say 'destroy' don't destroy this permanent. It can't be destroyed by lethal damage."
}, {
  k: "Lifelink",
  t: "Damage dealt by this creature also causes you to gain that much life."
}, {
  k: "Menace",
  t: "This creature can't be blocked except by two or more creatures."
}, {
  k: "Reach",
  t: "This creature can block creatures with flying."
}, {
  k: "Shroud",
  t: "This permanent can't be the target of spells or abilities."
}, {
  k: "Skulk",
  t: "This creature can't be blocked by creatures with greater power."
}, {
  k: "Trample",
  t: "This creature can deal excess combat damage to the player or planeswalker it's attacking."
}, {
  k: "Undying",
  t: "When this creature dies, if it had no +1/+1 counters, return it with a +1/+1 counter."
}, {
  k: "Persist",
  t: "When this creature dies, if it had no -1/-1 counters, return it with a -1/-1 counter."
}, {
  k: "Vigilance",
  t: "Attacking doesn't cause this creature to tap."
}, {
  k: "Ward",
  t: "Whenever this permanent becomes the target of a spell or ability an opponent controls, counter it unless that player pays the ward cost."
}, {
  k: "Prowess",
  t: "Whenever you cast a noncreature spell, this creature gets +1/+1 until end of turn."
}, {
  k: "Toxic",
  t: "Creatures with toxic deal poison counters equal to their toxic value when they deal combat damage."
}, {
  k: "Infect",
  t: "This creature deals damage to creatures in the form of -1/-1 counters and to players in the form of poison counters."
}, {
  k: "Annihilator",
  t: "Whenever this creature attacks, the defending player sacrifices a number of permanents equal to the annihilator value."
}, {
  k: "Cascade",
  t: "When you cast this spell, exile cards from the top of your library until you exile a cheaper card. You may cast it without paying its mana cost."
}, {
  k: "Convoke",
  t: "Your creatures can help cast this spell. Each creature you tap while casting it pays for 1 or one mana of that creature's colour."
}, {
  k: "Cycling",
  t: "Pay the cycling cost and discard this card to draw a card."
}, {
  k: "Equip",
  t: "Pay the equip cost as a sorcery to attach this Equipment to a creature you control."
}, {
  k: "Evolve",
  t: "Whenever a creature enters the battlefield under your control with greater power or toughness than this creature, put a +1/+1 counter on this creature."
}, {
  k: "Exploit",
  t: "When this creature enters the battlefield, you may sacrifice a creature."
}, {
  k: "Extort",
  t: "Whenever you cast a spell, you may pay one white or black mana. If you do, each opponent loses 1 life and you gain life equal to the total lost."
}, {
  k: "Fabricate",
  t: "When this creature enters the battlefield, put a +1/+1 counter on it or create a Servo artifact creature token."
}, {
  k: "Flashback",
  t: "You may cast this spell from your graveyard for its flashback cost. Then exile it."
}, {
  k: "Foretell",
  t: "During your turn, you may pay 2 mana and exile this card face down. Cast it later for its foretell cost."
}, {
  k: "Kicker",
  t: "You may pay the kicker cost as you cast this spell for an additional effect."
}, {
  k: "Landfall",
  t: "Triggered ability that fires whenever a land enters the battlefield under your control."
}, {
  k: "Modular",
  t: "This creature enters with +1/+1 counters. When it dies, put its counters on a target artifact creature."
}, {
  k: "Morph",
  t: "You may cast this face down as a 2/2 creature for 3 mana. Turn it face up at any time for its morph cost."
}, {
  k: "Mutate",
  t: "If you cast this for its mutate cost, put it over or under a non-Human creature you own. They mutate into the combined creature."
}, {
  k: "Overload",
  t: "You may cast this spell for its overload cost. If you do, change the target to all applicable targets instead."
}, {
  k: "Partner",
  t: "You can have two commanders if both have partner."
}, {
  k: "Phasing",
  t: "This permanent phases out at the beginning of each of its controller's untap steps (alternating in and out)."
}, {
  k: "Populate",
  t: "Create a token that's a copy of a creature token you control."
}, {
  k: "Protection",
  t: "This can't be damaged, enchanted, equipped, blocked, or targeted by anything with the specified quality."
}, {
  k: "Proliferate",
  t: "Choose any number of permanents and/or players with counters, then give each another counter of each kind already there."
}, {
  k: "Regenerate",
  t: "The next time this creature would be destroyed, instead tap it, remove it from combat, and remove all damage from it."
}, {
  k: "Scry",
  t: "Look at the top N cards of your library. Put any of them on the bottom of your library and the rest back on top in any order."
}, {
  k: "Storm",
  t: "When you cast this spell, copy it for each other spell cast before it this turn."
}, {
  k: "Suspend",
  t: "Pay the suspend cost and exile with time counters. Each turn, remove one. When the last is removed, cast it for free."
}, {
  k: "Threshold",
  t: "This ability is active if you have seven or more cards in your graveyard."
}, {
  k: "Token",
  t: "A game piece created by a spell or ability. Tokens are not cards and cease to exist when they leave the battlefield."
}, {
  k: "Totem Armor",
  t: "If the enchanted permanent would be destroyed, instead remove all damage from it and destroy this aura."
}, {
  k: "Transmute",
  t: "Discard this card and pay the transmute cost to search your library for a card with the same mana value."
}];
var KeywordIndex = function KeywordIndex() {
  var _React$useState45 = React.useState(""),
    _React$useState46 = _slicedToArray(_React$useState45, 2),
    search = _React$useState46[0],
    setSearch = _React$useState46[1];
  var _React$useState47 = React.useState(null),
    _React$useState48 = _slicedToArray(_React$useState47, 2),
    expanded = _React$useState48[0],
    setExpanded = _React$useState48[1];
  var filtered = search.trim() ? KEYWORDS.filter(function (k) {
    return k.k.toLowerCase().includes(search.toLowerCase());
  }) : KEYWORDS;
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-[10px] sm:text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, "Keyword Index"), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px]",
    style: {
      color: "#6a5a42",
      fontFamily: "'JetBrains Mono', monospace"
    }
  }, filtered.length)), /*#__PURE__*/React.createElement("div", {
    className: "relative mb-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: search,
    onChange: function onChange(e) {
      setSearch(e.target.value);
      setExpanded(null);
    },
    placeholder: "Search keywords...",
    className: "search-green w-full bg-transparent pl-8 pr-3 py-2 text-sm outline-none",
    style: {
      fontFamily: "'Crimson Pro', serif",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px",
      background: "rgba(20, 14, 8, 0.6)"
    }
  }), /*#__PURE__*/React.createElement(Search, {
    style: {
      position: 'absolute',
      left: '0.625rem',
      top: '50%',
      transform: 'translateY(-50%)',
      color: "#6a5a42",
      fontSize: '0.875rem'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1"
  }, filtered.map(function (kw) {
    return /*#__PURE__*/React.createElement("div", {
      key: kw.k,
      style: {
        background: "rgba(20, 14, 8, 0.6)",
        border: "1px solid ".concat(expanded === kw.k ? "rgba(201, 169, 97, 0.4)" : "rgba(201, 169, 97, 0.18)"),
        borderRadius: "2px",
        overflow: 'hidden',
        transition: 'border-color 0.2s'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setExpanded(expanded === kw.k ? null : kw.k);
      },
      className: "w-full flex items-center justify-between px-3 py-2 text-left active:scale-[0.99]"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#d4b87a",
        fontSize: "0.8rem",
        fontWeight: 600,
        letterSpacing: "0.05em"
      }
    }, kw.k), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#6a5a42",
        fontSize: "0.7rem",
        transition: 'transform 0.2s',
        transform: expanded === kw.k ? 'rotate(180deg)' : 'none'
      }
    }, "v")), expanded === kw.k && /*#__PURE__*/React.createElement("div", {
      className: "px-3 pb-2.5"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontFamily: "'Crimson Pro', serif",
        color: "#c9b899",
        fontSize: "0.85rem",
        lineHeight: 1.55,
        fontStyle: "italic"
      }
    }, kw.t)));
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-center py-4 italic text-sm",
    style: {
      color: "#6a5a42",
      fontFamily: "'Crimson Pro', serif"
    }
  }, "No keywords found.")));
};

// ============ App ============

// ============ COMMANDER VAULT ============

// ─── Colour definitions ───────────────────────────────────────────────────────
var COLORS = {
  W: {
    label: "White",
    symbol: "☀️",
    hex: "#F9FAF4",
    border: "#C8B560",
    text: "#5a4a00"
  },
  U: {
    label: "Blue",
    symbol: "💧",
    hex: "#0E68AB",
    border: "#3A8FC7",
    text: "#ffffff"
  },
  B: {
    label: "Black",
    symbol: "💀",
    hex: "#1A1A1A",
    border: "#6B6B6B",
    text: "#cccccc"
  },
  R: {
    label: "Red",
    symbol: "🔥",
    hex: "#D3202A",
    border: "#FF5050",
    text: "#ffffff"
  },
  G: {
    label: "Green",
    symbol: "🌲",
    hex: "#00733E",
    border: "#00A854",
    text: "#ffffff"
  },
  C: {
    label: "Colorless",
    symbol: "◇",
    hex: "#9A9A9A",
    border: "#C0C0C0",
    text: "#ffffff"
  }
};

// ─── All colour combinations ──────────────────────────────────────────────────
var ALL_COMBINATIONS = [{
  id: "W",
  name: "Mono-White",
  colors: ["W"]
}, {
  id: "U",
  name: "Mono-Blue",
  colors: ["U"]
}, {
  id: "B",
  name: "Mono-Black",
  colors: ["B"]
}, {
  id: "R",
  name: "Mono-Red",
  colors: ["R"]
}, {
  id: "G",
  name: "Mono-Green",
  colors: ["G"]
}, {
  id: "C",
  name: "Colorless",
  colors: ["C"]
}, {
  id: "WU",
  name: "Azorius",
  colors: ["W", "U"]
}, {
  id: "WB",
  name: "Orzhov",
  colors: ["W", "B"]
}, {
  id: "WR",
  name: "Boros",
  colors: ["W", "R"]
}, {
  id: "WG",
  name: "Selesnya",
  colors: ["W", "G"]
}, {
  id: "UB",
  name: "Dimir",
  colors: ["U", "B"]
}, {
  id: "UR",
  name: "Izzet",
  colors: ["U", "R"]
}, {
  id: "UG",
  name: "Simic",
  colors: ["U", "G"]
}, {
  id: "BR",
  name: "Rakdos",
  colors: ["B", "R"]
}, {
  id: "BG",
  name: "Golgari",
  colors: ["B", "G"]
}, {
  id: "RG",
  name: "Gruul",
  colors: ["R", "G"]
}, {
  id: "WUB",
  name: "Esper",
  colors: ["W", "U", "B"]
}, {
  id: "WUR",
  name: "Jeskai",
  colors: ["W", "U", "R"]
}, {
  id: "WUG",
  name: "Bant",
  colors: ["W", "U", "G"]
}, {
  id: "WBR",
  name: "Mardu",
  colors: ["W", "B", "R"]
}, {
  id: "WBG",
  name: "Abzan",
  colors: ["W", "B", "G"]
}, {
  id: "WRG",
  name: "Naya",
  colors: ["W", "R", "G"]
}, {
  id: "UBR",
  name: "Grixis",
  colors: ["U", "B", "R"]
}, {
  id: "UBG",
  name: "Sultai",
  colors: ["U", "B", "G"]
}, {
  id: "URG",
  name: "Temur",
  colors: ["U", "R", "G"]
}, {
  id: "BRG",
  name: "Jund",
  colors: ["B", "R", "G"]
}, {
  id: "WUBR",
  name: "Non-Green",
  colors: ["W", "U", "B", "R"]
}, {
  id: "WUBG",
  name: "Non-Red",
  colors: ["W", "U", "B", "G"]
}, {
  id: "WURG",
  name: "Non-Black",
  colors: ["W", "U", "R", "G"]
}, {
  id: "WBRG",
  name: "Non-Blue",
  colors: ["W", "B", "R", "G"]
}, {
  id: "UBRG",
  name: "Non-White",
  colors: ["U", "B", "R", "G"]
}, {
  id: "WUBRG",
  name: "Five-Color",
  colors: ["W", "U", "B", "R", "G"]
}];

// ─── Strixhaven schools ───────────────────────────────────────────────────────
var STRIXHAVEN_SCHOOLS = [{
  id: "silverquill",
  name: "Silverquill",
  colors: ["W", "B"],
  colorId: "WB",
  motto: "Quill & Shadow",
  flavour: "Masters of rhetoric, poetry, and intimidation",
  crest: "✒️",
  gradient: ["#2a1f3d", "#c8b560"]
}, {
  id: "prismari",
  name: "Prismari",
  colors: ["U", "R"],
  colorId: "UR",
  motto: "Art Through Magic",
  flavour: "Elemental artists who paint with fire and water",
  crest: "🎨",
  gradient: ["#0e3d6b", "#c0392b"]
}, {
  id: "witherbloom",
  name: "Witherbloom",
  colors: ["B", "G"],
  colorId: "BG",
  motto: "Life from Death",
  flavour: "Grim biologists who harvest the essence of life",
  crest: "🌿",
  gradient: ["#0f2d1a", "#4a0a0a"]
}, {
  id: "lorehold",
  name: "Lorehold",
  colors: ["R", "W"],
  colorId: "WR",
  motto: "Discover the Past",
  flavour: "Archaeomancers who bring history to life",
  crest: "📜",
  gradient: ["#6b2a0e", "#c8a84b"]
}, {
  id: "quandrix",
  name: "Quandrix",
  colors: ["G", "U"],
  colorId: "UG",
  motto: "Math is Magic",
  flavour: "Mathematicians who study the patterns of nature",
  crest: "🔢",
  gradient: ["#0a3d1f", "#0e3d6b"]
}];

// ─── Initial deck data ────────────────────────────────────────────────────────
var INITIAL_DECKS = [{
  id: 1,
  commander: "Halana and Alena, Partners",
  colors: ["R", "G"],
  theme: "Gruul +1/+1 Counters"
}, {
  id: 2,
  commander: "Pantlazar",
  colors: ["W", "R", "G"],
  theme: "Naya Dinosaur Tribal"
}, {
  id: 3,
  commander: "Omnath, Locus of Rage",
  colors: ["R", "G"],
  theme: "Gruul Landfall"
}, {
  id: 4,
  commander: "Ghoulcaller Gisa",
  colors: ["B"],
  theme: "Mono-Black Zombie Aristocrats"
}, {
  id: 5,
  commander: "Brenard, Ginger Sculptor",
  colors: ["W", "U", "G"],
  theme: "Bant Food Golem Tokens"
}, {
  id: 6,
  commander: "Adeliz, the Cinder Wind",
  colors: ["U", "R"],
  theme: "Izzet Wizard Spellslinger"
}, {
  id: 7,
  commander: "Kastral, the Windcrested",
  colors: ["W", "U"],
  theme: "Azorius Bird Tribal"
}, {
  id: 8,
  commander: "Sauron, the Dark Lord",
  colors: ["U", "B", "R"],
  theme: "Grixis Ring Temptation"
}, {
  id: 9,
  commander: "Urza, Chief Artificer",
  colors: ["W", "U", "B"],
  theme: "Esper Artifacts"
}, {
  id: 10,
  commander: "Slimefoot and Squee",
  colors: ["B", "R", "G"],
  theme: "Jund Aristocrats/Reanimator"
}, {
  id: 11,
  commander: "Ulalek, Fused Atrocity",
  colors: ["W", "U", "B", "R", "G"],
  theme: "Five-Color Eldrazi"
}, {
  id: 12,
  commander: "Krenko, Mob Boss",
  colors: ["R"],
  theme: "Mono-Red Goblins"
}, {
  id: 13,
  commander: "Dina, Soul Steeper",
  colors: ["B", "G"],
  theme: "Golgari Aristocrats"
}, {
  id: 14,
  commander: "Quintorius, History Chaser",
  colors: ["W", "R"],
  theme: "Boros Lorehold"
}, {
  id: 15,
  commander: "Saruman of Many Colors",
  colors: ["W", "U", "R"],
  theme: "Jeskai Spellslinger"
}];

// ─── Helpers ──────────────────────────────────────────────────────────────────
var nextId = function nextId(decks) {
  return Math.max.apply(Math, [0].concat(_toConsumableArray(decks.map(function (d) {
    return d.id;
  })))) + 1;
};
function exactColorMatch(deckColors, comboColors) {
  return comboColors.every(function (c) {
    return deckColors.includes(c);
  }) && deckColors.every(function (c) {
    return comboColors.includes(c);
  });
}

// ─── Colour pip ───────────────────────────────────────────────────────────────
function VaultColorPip(_ref21) {
  var c = _ref21.c,
    _ref21$size = _ref21.size,
    size = _ref21$size === void 0 ? 22 : _ref21$size;
  var col = COLORS[c];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "50%",
      background: col.hex,
      border: "2px solid ".concat(col.border),
      fontSize: size * 0.55,
      lineHeight: 1,
      flexShrink: 0,
      boxShadow: "0 1px 4px rgba(0,0,0,0.4)"
    },
    title: col.label
  }, col.symbol);
}
function VaultColorBar(_ref22) {
  var colors = _ref22.colors;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4,
      flexWrap: "wrap"
    }
  }, colors.map(function (c) {
    return /*#__PURE__*/React.createElement(VaultColorPip, {
      key: c,
      c: c
    });
  }));
}

// ─── Main App ─────────────────────────────────────────────────────────────────
function CommanderVault() {
  // Load from localStorage, fall back to INITIAL_DECKS
  var _useState = useState(function () {
      try {
        var saved = localStorage.getItem('tq_vault_decks');
        return saved ? JSON.parse(saved) : INITIAL_DECKS;
      } catch (_unused4) {
        return INITIAL_DECKS;
      }
    }),
    _useState2 = _slicedToArray(_useState, 2),
    decks = _useState2[0],
    setDecks = _useState2[1];

  // Save to localStorage whenever decks change
  useEffect(function () {
    try {
      localStorage.setItem('tq_vault_decks', JSON.stringify(decks));
    } catch (e) {
      console.warn('Failed to save vault decks:', e);
    }
  }, [decks]);
  var _useState3 = useState("decks"),
    _useState4 = _slicedToArray(_useState3, 2),
    view = _useState4[0],
    setView = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showAdd = _useState6[0],
    setShowAdd = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    editId = _useState8[0],
    setEditId = _useState8[1];
  var _useState9 = useState(""),
    _useState0 = _slicedToArray(_useState9, 2),
    search = _useState0[0],
    setSearch = _useState0[1];
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    filterColor = _useState10[0],
    setFilterColor = _useState10[1];
  var _useState11 = useState(""),
    _useState12 = _slicedToArray(_useState11, 2),
    formCommander = _useState12[0],
    setFormCommander = _useState12[1];
  var _useState13 = useState([]),
    _useState14 = _slicedToArray(_useState13, 2),
    formColors = _useState14[0],
    setFormColors = _useState14[1];
  var _useState15 = useState(""),
    _useState16 = _slicedToArray(_useState15, 2),
    formTheme = _useState16[0],
    setFormTheme = _useState16[1];
  var resetForm = function resetForm() {
    setFormCommander("");
    setFormColors([]);
    setFormTheme("");
  };
  var openAdd = function openAdd() {
    resetForm();
    setEditId(null);
    setShowAdd(true);
  };
  var openEdit = function openEdit(deck) {
    setFormCommander(deck.commander);
    setFormColors(_toConsumableArray(deck.colors));
    setFormTheme(deck.theme);
    setEditId(deck.id);
    setShowAdd(true);
  };
  var toggleFormColor = function toggleFormColor(c) {
    return setFormColors(function (prev) {
      return prev.includes(c) ? prev.filter(function (x) {
        return x !== c;
      }) : [].concat(_toConsumableArray(prev), [c]);
    });
  };
  var saveForm = function saveForm() {
    if (!formCommander.trim() || formColors.length === 0) return;
    if (editId) {
      setDecks(function (prev) {
        return prev.map(function (d) {
          return d.id === editId ? _objectSpread(_objectSpread({}, d), {}, {
            commander: formCommander.trim(),
            colors: formColors,
            theme: formTheme.trim()
          }) : d;
        });
      });
    } else {
      setDecks(function (prev) {
        return [].concat(_toConsumableArray(prev), [{
          id: nextId(prev),
          commander: formCommander.trim(),
          colors: formColors,
          theme: formTheme.trim()
        }]);
      });
    }
    setShowAdd(false);
    resetForm();
  };
  var deleteDeck = function deleteDeck(id) {
    return setDecks(function (prev) {
      return prev.filter(function (d) {
        return d.id !== id;
      });
    });
  };
  var coveredIds = new Set(ALL_COMBINATIONS.filter(function (combo) {
    return decks.some(function (d) {
      return exactColorMatch(d.colors, combo.colors);
    });
  }).map(function (c) {
    return c.id;
  }));
  var filtered = decks.filter(function (d) {
    var matchSearch = d.commander.toLowerCase().includes(search.toLowerCase()) || d.theme.toLowerCase().includes(search.toLowerCase());
    var matchColor = !filterColor || d.colors.includes(filterColor);
    return matchSearch && matchColor;
  });
  var BG = "#0d0d0f";
  var SURFACE = "#141418";
  var SURFACE2 = "#1c1c22";
  var ACCENT = "#c8a84b";
  var ACCENT2 = "#7b5ea7";
  var TEXT = "#e8e4d8";
  var MUTED = "#6b6870";
  var tabs = [{
    id: "decks",
    label: "🃏 Decks"
  }, {
    id: "coverage",
    label: "🗺 Coverage"
  }, {
    id: "strixhaven",
    label: "🎓 Strixhaven"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: "100vh",
      background: BG,
      color: TEXT,
      fontFamily: "'Palatino Linotype', Palatino, Georgia, serif",
      padding: "0 0 60px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "linear-gradient(135deg, #0d0d0f 0%, #1a1520 50%, #0d0d0f 100%)",
      borderBottom: "1px solid ".concat(ACCENT, "44"),
      padding: "28px 24px 20px",
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(8px)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: 4,
      color: ACCENT,
      textTransform: "uppercase",
      marginBottom: 4
    }
  }, "\u2694 Commander Registry"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 26,
      fontWeight: 700,
      color: TEXT,
      lineHeight: 1
    }
  }, "My Deck Vault"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: MUTED,
      marginTop: 4
    }
  }, decks.length, " decks \xB7 ", coveredIds.size, " colour combinations covered")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, tabs.map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: function onClick() {
        return setView(t.id);
      },
      style: {
        padding: "8px 16px",
        borderRadius: 6,
        border: "1px solid ".concat(view === t.id ? ACCENT : "#333"),
        background: view === t.id ? "".concat(ACCENT, "22") : "transparent",
        color: view === t.id ? ACCENT : MUTED,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: 13,
        letterSpacing: 0.5,
        transition: "all 0.2s"
      }
    }, t.label);
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: "0 auto",
      padding: "24px 16px"
    }
  }, view === "decks" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginBottom: 20,
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    },
    placeholder: "Search commander or theme\u2026",
    style: {
      flex: 1,
      minWidth: 200,
      padding: "10px 14px",
      background: SURFACE,
      border: "1px solid #333",
      borderRadius: 8,
      color: TEXT,
      fontFamily: "inherit",
      fontSize: 14,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 4
    }
  }, ["W", "U", "B", "R", "G"].map(function (c) {
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: function onClick() {
        return setFilterColor(filterColor === c ? null : c);
      },
      title: COLORS[c].label,
      style: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: filterColor === c ? COLORS[c].hex : SURFACE,
        border: "2px solid ".concat(filterColor === c ? COLORS[c].border : "#444"),
        cursor: "pointer",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
        boxShadow: filterColor === c ? "0 0 10px ".concat(COLORS[c].border, "66") : "none"
      }
    }, COLORS[c].symbol);
  })), /*#__PURE__*/React.createElement("button", {
    onClick: openAdd,
    style: {
      padding: "10px 18px",
      borderRadius: 8,
      background: "linear-gradient(135deg, ".concat(ACCENT, ", #a8762e)"),
      border: "none",
      color: "#1a1200",
      fontFamily: "inherit",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer",
      whiteSpace: "nowrap"
    }
  }, "+ Add Deck")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      color: MUTED,
      padding: "48px 0",
      fontSize: 16
    }
  }, "No decks match your filter"), filtered.map(function (deck) {
    return /*#__PURE__*/React.createElement(VaultDeckCard, {
      key: deck.id,
      deck: deck,
      onEdit: function onEdit() {
        return openEdit(deck);
      },
      onDelete: function onDelete() {
        return deleteDeck(deck.id);
      },
      SURFACE: SURFACE,
      SURFACE2: SURFACE2,
      ACCENT: ACCENT,
      MUTED: MUTED,
      TEXT: TEXT
    });
  }))), view === "coverage" && /*#__PURE__*/React.createElement(VaultCoverageView, {
    decks: decks,
    coveredIds: coveredIds,
    SURFACE: SURFACE,
    SURFACE2: SURFACE2,
    ACCENT: ACCENT,
    ACCENT2: ACCENT2,
    MUTED: MUTED,
    TEXT: TEXT
  }), view === "strixhaven" && /*#__PURE__*/React.createElement(VaultStrixhavenView, {
    decks: decks,
    SURFACE: SURFACE,
    SURFACE2: SURFACE2,
    ACCENT: ACCENT,
    MUTED: MUTED,
    TEXT: TEXT
  })), showAdd && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.75)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 200,
      padding: 16
    },
    onClick: function onClick(e) {
      if (e.target === e.currentTarget) setShowAdd(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE,
      border: "1px solid ".concat(ACCENT, "44"),
      borderRadius: 14,
      padding: 28,
      width: "100%",
      maxWidth: 440,
      boxShadow: "0 20px 60px rgba(0,0,0,0.6)"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "0 0 20px",
      fontSize: 20,
      color: ACCENT
    }
  }, editId ? "Edit Deck" : "Add New Deck"), /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: MUTED,
      letterSpacing: 1,
      textTransform: "uppercase"
    }
  }, "Commander"), /*#__PURE__*/React.createElement("input", {
    value: formCommander,
    onChange: function onChange(e) {
      return setFormCommander(e.target.value);
    },
    placeholder: "e.g. Atraxa, Praetors' Voice",
    style: {
      width: "100%",
      marginTop: 6,
      marginBottom: 16,
      padding: "10px 12px",
      background: SURFACE2,
      border: "1px solid #444",
      borderRadius: 8,
      color: TEXT,
      fontFamily: "inherit",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: MUTED,
      letterSpacing: 1,
      textTransform: "uppercase"
    }
  }, "Colour Identity"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 8,
      marginBottom: 16
    }
  }, ["W", "U", "B", "R", "G", "C"].map(function (c) {
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: function onClick() {
        return toggleFormColor(c);
      },
      title: COLORS[c].label,
      style: {
        width: 38,
        height: 38,
        borderRadius: "50%",
        background: formColors.includes(c) ? COLORS[c].hex : SURFACE2,
        border: "2px solid ".concat(formColors.includes(c) ? COLORS[c].border : "#555"),
        cursor: "pointer",
        fontSize: 16,
        boxShadow: formColors.includes(c) ? "0 0 12px ".concat(COLORS[c].border, "88") : "none",
        transition: "all 0.15s"
      }
    }, COLORS[c].symbol);
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: 12,
      color: MUTED,
      letterSpacing: 1,
      textTransform: "uppercase"
    }
  }, "Theme / Strategy"), /*#__PURE__*/React.createElement("input", {
    value: formTheme,
    onChange: function onChange(e) {
      return setFormTheme(e.target.value);
    },
    placeholder: "e.g. Elf Tribal Combo",
    style: {
      width: "100%",
      marginTop: 6,
      marginBottom: 24,
      padding: "10px 12px",
      background: SURFACE2,
      border: "1px solid #444",
      borderRadius: 8,
      color: TEXT,
      fontFamily: "inherit",
      fontSize: 15,
      outline: "none",
      boxSizing: "border-box"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowAdd(false);
    },
    style: {
      padding: "10px 20px",
      borderRadius: 8,
      border: "1px solid #444",
      background: "transparent",
      color: MUTED,
      fontFamily: "inherit",
      fontSize: 14,
      cursor: "pointer"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: saveForm,
    disabled: !formCommander.trim() || formColors.length === 0,
    style: {
      padding: "10px 24px",
      borderRadius: 8,
      border: "none",
      background: formCommander.trim() && formColors.length > 0 ? "linear-gradient(135deg, ".concat(ACCENT, ", #a8762e)") : "#333",
      color: formCommander.trim() && formColors.length > 0 ? "#1a1200" : MUTED,
      fontFamily: "inherit",
      fontSize: 14,
      fontWeight: 700,
      cursor: "pointer"
    }
  }, editId ? "Save Changes" : "Add Deck")))));
}

// ─── Deck card ────────────────────────────────────────────────────────────────
function VaultDeckCard(_ref23) {
  var deck = _ref23.deck,
    onEdit = _ref23.onEdit,
    onDelete = _ref23.onDelete,
    SURFACE = _ref23.SURFACE,
    SURFACE2 = _ref23.SURFACE2,
    ACCENT = _ref23.ACCENT,
    MUTED = _ref23.MUTED,
    TEXT = _ref23.TEXT;
  var _useState17 = useState(false),
    _useState18 = _slicedToArray(_useState17, 2),
    expanded = _useState18[0],
    setExpanded = _useState18[1];
  var borderColor = deck.colors.length === 1 ? COLORS[deck.colors[0]].border : ACCENT;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE,
      borderRadius: 10,
      border: "1px solid ".concat(borderColor, "33"),
      overflow: "hidden",
      transition: "all 0.2s",
      boxShadow: expanded ? "0 4px 20px ".concat(borderColor, "22") : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "14px 16px",
      cursor: "pointer"
    },
    onClick: function onClick() {
      return setExpanded(function (e) {
        return !e;
      });
    }
  }, /*#__PURE__*/React.createElement(VaultColorBar, {
    colors: deck.colors
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 15,
      color: TEXT,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, deck.commander), deck.theme && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: MUTED,
      marginTop: 2
    }
  }, deck.theme)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: MUTED,
      fontSize: 16,
      transform: expanded ? "rotate(180deg)" : "none",
      transition: "0.2s"
    }
  }, "\u25BE")), expanded && /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE2,
      padding: "12px 16px",
      borderTop: "1px solid #333",
      display: "flex",
      gap: 10,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 13,
      color: MUTED
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: TEXT,
      fontWeight: 600
    }
  }, "Identity: "), deck.colors.map(function (c) {
    return COLORS[c].label;
  }).join(" / "), deck.theme && /*#__PURE__*/React.createElement(React.Fragment, null, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: "italic"
    }
  }, deck.theme))), /*#__PURE__*/React.createElement("button", {
    onClick: onEdit,
    style: {
      padding: "6px 14px",
      borderRadius: 6,
      border: "1px solid ".concat(ACCENT, "66"),
      background: "transparent",
      color: ACCENT,
      fontFamily: "inherit",
      fontSize: 12,
      cursor: "pointer"
    }
  }, "Edit"), /*#__PURE__*/React.createElement("button", {
    onClick: onDelete,
    style: {
      padding: "6px 14px",
      borderRadius: 6,
      border: "1px solid #553333",
      background: "transparent",
      color: "#cc6666",
      fontFamily: "inherit",
      fontSize: 12,
      cursor: "pointer"
    }
  }, "Remove")));
}

// ─── Coverage view ────────────────────────────────────────────────────────────
function VaultCoverageView(_ref24) {
  var decks = _ref24.decks,
    coveredIds = _ref24.coveredIds,
    SURFACE = _ref24.SURFACE,
    SURFACE2 = _ref24.SURFACE2,
    ACCENT = _ref24.ACCENT,
    ACCENT2 = _ref24.ACCENT2,
    MUTED = _ref24.MUTED,
    TEXT = _ref24.TEXT;
  var groups = [{
    label: "Mono-colour",
    ids: ["W", "U", "B", "R", "G", "C"]
  }, {
    label: "Two-colour (Guilds)",
    ids: ["WU", "WB", "WR", "WG", "UB", "UR", "UG", "BR", "BG", "RG"]
  }, {
    label: "Three-colour (Shards & Wedges)",
    ids: ["WUB", "WUR", "WUG", "WBR", "WBG", "WRG", "UBR", "UBG", "URG", "BRG"]
  }, {
    label: "Four-colour",
    ids: ["WUBR", "WUBG", "WURG", "WBRG", "UBRG"]
  }, {
    label: "Five-colour",
    ids: ["WUBRG"]
  }];
  var total = ALL_COMBINATIONS.length;
  var covered = coveredIds.size;
  var pct = Math.round(covered / total * 100);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE,
      borderRadius: 12,
      padding: "20px 24px",
      marginBottom: 24,
      border: "1px solid ".concat(ACCENT, "33")
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 16
    }
  }, "Colour Coverage"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: ACCENT,
      fontWeight: 700
    }
  }, covered, " / ", total, " \xB7 ", pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      background: "#2a2a32",
      borderRadius: 4,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: "".concat(pct, "%"),
      background: "linear-gradient(90deg, ".concat(ACCENT2, ", ").concat(ACCENT, ")"),
      borderRadius: 4,
      transition: "width 0.5s"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: 13,
      color: MUTED
    }
  }, total - covered, " combinations still uncovered \u2014 lots of room to grow! \uD83C\uDF31")), groups.map(function (group) {
    return /*#__PURE__*/React.createElement("div", {
      key: group.label,
      style: {
        marginBottom: 24
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: "0 0 10px",
        fontSize: 13,
        letterSpacing: 2,
        textTransform: "uppercase",
        color: MUTED
      }
    }, group.label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8
      }
    }, group.ids.map(function (id) {
      var combo = ALL_COMBINATIONS.find(function (c) {
        return c.id === id;
      });
      var have = coveredIds.has(id);
      var matchDecks = decks.filter(function (d) {
        return exactColorMatch(d.colors, combo.colors);
      });
      return /*#__PURE__*/React.createElement("div", {
        key: id,
        title: have ? matchDecks.map(function (d) {
          return d.commander;
        }).join(", ") : "Missing: ".concat(combo.name),
        style: {
          background: have ? "".concat(ACCENT, "18") : SURFACE,
          border: "1px solid ".concat(have ? ACCENT + "55" : "#2a2a32"),
          borderRadius: 8,
          padding: "8px 12px",
          minWidth: 80,
          textAlign: "center",
          opacity: have ? 1 : 0.55,
          transition: "all 0.15s"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          gap: 3,
          justifyContent: "center",
          marginBottom: 4
        }
      }, combo.colors.map(function (c) {
        return /*#__PURE__*/React.createElement(VaultColorPip, {
          key: c,
          c: c,
          size: 16
        });
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 11,
          color: have ? TEXT : MUTED,
          fontWeight: have ? 600 : 400
        }
      }, combo.name), have ? /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: ACCENT,
          marginTop: 2
        }
      }, "\u2713 ", matchDecks.length, " deck", matchDecks.length > 1 ? "s" : "") : /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 10,
          color: "#cc6644",
          marginTop: 2
        }
      }, "\u2717 missing"));
    })));
  }));
}

// ─── Strixhaven view ──────────────────────────────────────────────────────────
function VaultStrixhavenView(_ref25) {
  var decks = _ref25.decks,
    SURFACE = _ref25.SURFACE,
    SURFACE2 = _ref25.SURFACE2,
    ACCENT = _ref25.ACCENT,
    MUTED = _ref25.MUTED,
    TEXT = _ref25.TEXT;
  var covered = STRIXHAVEN_SCHOOLS.filter(function (school) {
    return decks.some(function (d) {
      return exactColorMatch(d.colors, school.colors);
    });
  }).length;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: SURFACE,
      borderRadius: 12,
      padding: "20px 24px",
      marginBottom: 28,
      border: "1px solid ".concat(ACCENT, "33"),
      backgroundImage: "radial-gradient(ellipse at top right, #2a1f3d44, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: 4,
      color: ACCENT,
      textTransform: "uppercase",
      marginBottom: 6
    }
  }, "\uD83C\uDF93 Arcavios University"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 22,
      color: TEXT
    }
  }, "Strixhaven Schools"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "6px 0 0",
      fontSize: 13,
      color: MUTED,
      maxWidth: 480
    }
  }, "The five colleges of Strixhaven each represent a unique two-colour philosophy. Which halls have you represented in your collection?")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: covered === 5 ? "".concat(ACCENT, "22") : "#1a1a22",
      border: "1px solid ".concat(covered === 5 ? ACCENT : "#333"),
      borderRadius: 10,
      padding: "12px 20px",
      textAlign: "center",
      minWidth: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 700,
      color: covered === 5 ? ACCENT : TEXT
    }
  }, covered, "/5"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: MUTED,
      letterSpacing: 1,
      textTransform: "uppercase"
    }
  }, covered === 5 ? "Complete! 🎉" : "Schools"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 16
    }
  }, STRIXHAVEN_SCHOOLS.map(function (school) {
    var have = decks.some(function (d) {
      return exactColorMatch(d.colors, school.colors);
    });
    return /*#__PURE__*/React.createElement("div", {
      key: school.id,
      title: school.name,
      style: {
        flex: 1,
        height: 6,
        borderRadius: 3,
        background: have ? "linear-gradient(90deg, ".concat(COLORS[school.colors[0]].border, ", ").concat(COLORS[school.colors[1]].border, ")") : "#2a2a32",
        transition: "background 0.3s"
      }
    });
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, STRIXHAVEN_SCHOOLS.map(function (school) {
    var matchDecks = decks.filter(function (d) {
      return exactColorMatch(d.colors, school.colors);
    });
    var have = matchDecks.length > 0;
    var c0 = COLORS[school.colors[0]];
    var c1 = COLORS[school.colors[1]];
    return /*#__PURE__*/React.createElement("div", {
      key: school.id,
      style: {
        background: SURFACE,
        border: "1px solid ".concat(have ? c0.border + "55" : "#252528"),
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: have ? "0 4px 24px ".concat(c0.border, "18") : "none",
        transition: "all 0.2s"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        background: "linear-gradient(135deg, ".concat(school.gradient[0], ", ").concat(school.gradient[1], ")"),
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        opacity: have ? 1 : 0.5
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 36,
        lineHeight: 1
      }
    }, school.crest), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 700,
        color: "#fff",
        marginBottom: 2
      }
    }, school.name), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "rgba(255,255,255,0.65)",
        fontStyle: "italic"
      }
    }, "\"", school.motto, "\"")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6,
        alignItems: "center"
      }
    }, school.colors.map(function (c) {
      return /*#__PURE__*/React.createElement(VaultColorPip, {
        key: c,
        c: c,
        size: 26
      });
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 200
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: MUTED,
        marginBottom: 6
      }
    }, school.flavour), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: MUTED
      }
    }, "Colour identity: ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: TEXT
      }
    }, school.colors.map(function (c) {
      return COLORS[c].label;
    }).join(" / ")))), have ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        color: ACCENT,
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 4
      }
    }, "\u2713 Enrolled"), matchDecks.map(function (d) {
      return /*#__PURE__*/React.createElement("div", {
        key: d.id,
        style: {
          fontSize: 12,
          color: TEXT,
          background: SURFACE2,
          borderRadius: 6,
          padding: "4px 10px",
          marginBottom: 3,
          border: "1px solid #333"
        }
      }, d.commander);
    })) : /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "#cc6644",
        fontStyle: "italic",
        background: "#cc664410",
        borderRadius: 8,
        padding: "8px 14px",
        border: "1px solid #cc664430"
      }
    }, "\u2717 Not yet enrolled")));
  })));
}
function TokenTracker() {
  var _players$find, _players$find2, _COLOR_LORE$PET_TYPES;
  // Hide any initial loading screen and handle startup
  React.useEffect(function () {
    try {
      // EMERGENCY DEBUG - Shows alert on device
      var debugInfo = {
        reactMounted: true,
        timestamp: new Date().toISOString(),
        hasPlayers: true,
        hasBattlefield: true
      };

      // Uncomment to see debug info:
      // alert(`App Debug:\n${JSON.stringify(debugInfo, null, 2)}`);

      // Hide Capacitor splash screen if available
      if (window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.SplashScreen) {
        window.Capacitor.Plugins.SplashScreen.hide();
        console.log('Capacitor splash hidden');
      }

      // Hide loading screen
      var loadingEl = document.getElementById('initial-loading');
      if (loadingEl) {
        loadingEl.style.display = 'none';
      }

      // Also try common splash screen IDs
      var splashEl = document.getElementById('splash-screen');
      if (splashEl) splashEl.style.display = 'none';
      var summoningEl = document.querySelector('[class*="summoning"]');
      if (summoningEl) summoningEl.style.display = 'none';

      // Force hide any overlay
      document.body.style.overflow = 'auto';
      console.log('Token Queen mounted successfully');
    } catch (e) {
      console.error('Startup error:', e);
      alert("STARTUP ERROR: ".concat(e.message));
    }
  }, []);
  var _useState19 = useState(""),
    _useState20 = _slicedToArray(_useState19, 2),
    query = _useState20[0],
    setQuery = _useState20[1];
  var _useState21 = useState([]),
    _useState22 = _slicedToArray(_useState21, 2),
    results = _useState22[0],
    setResults = _useState22[1];
  var _useState23 = useState(false),
    _useState24 = _slicedToArray(_useState23, 2),
    loading = _useState24[0],
    setLoading = _useState24[1];
  var _useState25 = useState(""),
    _useState26 = _slicedToArray(_useState25, 2),
    error = _useState26[0],
    setError = _useState26[1];
  var _useState27 = useState(function () {
      return storage.get('battlefield') || [];
    }),
    _useState28 = _slicedToArray(_useState27, 2),
    battlefield = _useState28[0],
    setBattlefield = _useState28[1];
  var _useState29 = useState(function () {
      return storage.get('favourites') || [];
    }),
    _useState30 = _slicedToArray(_useState29, 2),
    favourites = _useState30[0],
    setFavourites = _useState30[1];
  var _useState31 = useState(""),
    _useState32 = _slicedToArray(_useState31, 2),
    activeSearch = _useState32[0],
    setActiveSearch = _useState32[1];
  var _useState33 = useState(true),
    _useState34 = _slicedToArray(_useState33, 2),
    showSearch = _useState34[0],
    setShowSearch = _useState34[1];
  // Copy-token modal state
  var _useState35 = useState(false),
    _useState36 = _slicedToArray(_useState35, 2),
    copyOpen = _useState36[0],
    setCopyOpen = _useState36[1];
  var _useState37 = useState(""),
    _useState38 = _slicedToArray(_useState37, 2),
    copyQuery = _useState38[0],
    setCopyQuery = _useState38[1];
  var _useState39 = useState([]),
    _useState40 = _slicedToArray(_useState39, 2),
    copyResults = _useState40[0],
    setCopyResults = _useState40[1];
  var _useState41 = useState(false),
    _useState42 = _slicedToArray(_useState41, 2),
    copyLoading = _useState42[0],
    setCopyLoading = _useState42[1];
  var _useState43 = useState(""),
    _useState44 = _slicedToArray(_useState43, 2),
    copyError = _useState44[0],
    setCopyError = _useState44[1];
  var _useState45 = useState("tokens"),
    _useState46 = _slicedToArray(_useState45, 2),
    copyScope = _useState46[0],
    setCopyScope = _useState46[1]; // "tokens" | "creatures"
  // Batch 1 additions
  var _useState47 = useState(null),
    _useState48 = _slicedToArray(_useState47, 2),
    numpadFor = _useState48[0],
    setNumpadFor = _useState48[1]; // token id being edited, or null
  var _useState49 = useState(""),
    _useState50 = _slicedToArray(_useState49, 2),
    numpadValue = _useState50[0],
    setNumpadValue = _useState50[1];
  var _useState51 = useState(false),
    _useState52 = _slicedToArray(_useState51, 2),
    wipeConfirmOpen = _useState52[0],
    setWipeConfirmOpen = _useState52[1];
  var _useState53 = useState([]),
    _useState54 = _slicedToArray(_useState53, 2),
    undoStack = _useState54[0],
    setUndoStack = _useState54[1]; // stack of previous battlefield snapshots
  var _useState55 = useState(""),
    _useState56 = _slicedToArray(_useState55, 2),
    toast = _useState56[0],
    setToast = _useState56[1]; // tiny ephemeral message

  // Batch 2: active tab
  var _useState57 = useState(function () {
      return storage.get('activeTab') || 'battlefield';
    }),
    _useState58 = _slicedToArray(_useState57, 2),
    activeTab = _useState58[0],
    setActiveTab = _useState58[1]; // 'battlefield' | 'life' | 'tools'

  // Batch 2: life tracker state
  var defaultPlayers = function defaultPlayers(n) {
    return Array.from({
      length: n
    }, function (_, i) {
      return {
        id: "p".concat(i + 1),
        name: "Player ".concat(i + 1),
        life: 40,
        color: ["#d48a86", "#9fc7e6", "#d4b87a", "#b4d4a0"][i % 4],
        poison: 0,
        energy: 0,
        experience: 0,
        commanderTax: 0
      };
    });
  };
  var _useState59 = useState(function () {
      return storage.get('players') || defaultPlayers(4);
    }),
    _useState60 = _slicedToArray(_useState59, 2),
    players = _useState60[0],
    setPlayers = _useState60[1];
  var _useState61 = useState(function () {
      return storage.get('player_flipped') || [false, false, false, false];
    }),
    _useState62 = _slicedToArray(_useState61, 2),
    playerFlipped = _useState62[0],
    setPlayerFlipped = _useState62[1];
  var _useState63 = useState([]),
    _useState64 = _slicedToArray(_useState63, 2),
    lifeHistory = _useState64[0],
    setLifeHistory = _useState64[1]; // last 5 life changes for undo
  var _useState65 = useState(false),
    _useState66 = _slicedToArray(_useState65, 2),
    showResetConfirm = _useState66[0],
    setShowResetConfirm = _useState66[1]; // confirmation modal for reset
  var _useState67 = useState(false),
    _useState68 = _slicedToArray(_useState67, 2),
    showNewGameMenu = _useState68[0],
    setShowNewGameMenu = _useState68[1]; // new game setup menu
  // Life delta tally -- { [playerId]: { delta: number, timer: timeoutId } }
  var _useState69 = useState({}),
    _useState70 = _slicedToArray(_useState69, 2),
    lifeDelta = _useState70[0],
    setLifeDelta = _useState70[1];
  var lifeDeltaTimers = useRef({});
  // commanderDamage[dealtToId][dealtByPlayerId] = amount
  var _useState71 = useState(function () {
      return storage.get('commanderDamage') || {};
    }),
    _useState72 = _slicedToArray(_useState71, 2),
    commanderDamage = _useState72[0],
    setCommanderDamage = _useState72[1];
  var _useState73 = useState(null),
    _useState74 = _slicedToArray(_useState73, 2),
    cmdrDamageFor = _useState74[0],
    setCmdrDamageFor = _useState74[1]; // which player's CD grid is open
  var _useState75 = useState(null),
    _useState76 = _slicedToArray(_useState75, 2),
    editPlayerName = _useState76[0],
    setEditPlayerName = _useState76[1];
  var _useState77 = useState(""),
    _useState78 = _slicedToArray(_useState77, 2),
    editPlayerNameValue = _useState78[0],
    setEditPlayerNameValue = _useState78[1];

  // Batch 2: dice state
  var _useState79 = useState([]),
    _useState80 = _slicedToArray(_useState79, 2),
    diceRolls = _useState80[0],
    setDiceRolls = _useState80[1]; // rolling history (latest first, max 10)
  var _useState81 = useState(null),
    _useState82 = _slicedToArray(_useState81, 2),
    rolling = _useState82[0],
    setRolling = _useState82[1]; // sides currently animating

  // Batch 2: phase + turn
  var PHASES = ['Untap', 'Upkeep', 'Draw', 'Main 1', 'Combat', 'Main 2', 'End'];
  var _useState83 = useState(function () {
      var _storage$get;
      return (_storage$get = storage.get('phaseIndex')) !== null && _storage$get !== void 0 ? _storage$get : 0;
    }),
    _useState84 = _slicedToArray(_useState83, 2),
    phaseIndex = _useState84[0],
    setPhaseIndex = _useState84[1];
  var _useState85 = useState(function () {
      return storage.get('turnNumber') || 1;
    }),
    _useState86 = _slicedToArray(_useState85, 2),
    turnNumber = _useState86[0],
    setTurnNumber = _useState86[1];
  var _useState87 = useState(function () {
      return storage.get('activePlayerIndex') || 0;
    }),
    _useState88 = _slicedToArray(_useState87, 2),
    activePlayerIndex = _useState88[0],
    setActivePlayerIndex = _useState88[1];

  // Batch 3 state
  // Day/Night: 'day' | 'night' | null (no daybound game)
  var _useState89 = useState(function () {
      return storage.get('dayNight') || null;
    }),
    _useState90 = _slicedToArray(_useState89, 2),
    dayNight = _useState90[0],
    setDayNight = _useState90[1];
  // Game state markers -- independent toggles per player
  // monarch: playerId | null
  // initiative: playerId | null
  // citysBlessing: array of playerIds
  var _useState91 = useState(function () {
      return storage.get('monarch') || null;
    }),
    _useState92 = _slicedToArray(_useState91, 2),
    monarch = _useState92[0],
    setMonarch = _useState92[1];
  var _useState93 = useState(function () {
      return storage.get('initiative') || null;
    }),
    _useState94 = _slicedToArray(_useState93, 2),
    initiative = _useState94[0],
    setInitiative = _useState94[1];
  var _useState95 = useState(function () {
      return storage.get('citysBlessing') || [];
    }),
    _useState96 = _slicedToArray(_useState95, 2),
    citysBlessing = _useState96[0],
    setCitysBlessing = _useState96[1];
  var _useState97 = useState(0),
    _useState98 = _slicedToArray(_useState97, 2),
    stormCount = _useState98[0],
    setStormCount = _useState98[1];
  var _useState99 = useState({
      W: 0,
      U: 0,
      B: 0,
      R: 0,
      G: 0,
      C: 0
    }),
    _useState100 = _slicedToArray(_useState99, 2),
    manaPool = _useState100[0],
    setManaPool = _useState100[1];

  // Deck presets -- { id, name, tokens: [token shape with id+name+image+pt+colors] }
  var _useState101 = useState(function () {
      return storage.get('presets') || [];
    }),
    _useState102 = _slicedToArray(_useState101, 2),
    presets = _useState102[0],
    setPresets = _useState102[1];
  var _useState103 = useState(false),
    _useState104 = _slicedToArray(_useState103, 2),
    presetMenuOpen = _useState104[0],
    setPresetMenuOpen = _useState104[1];
  var _useState105 = useState(false),
    _useState106 = _slicedToArray(_useState105, 2),
    savePresetOpen = _useState106[0],
    setSavePresetOpen = _useState106[1];
  var _useState107 = useState(""),
    _useState108 = _slicedToArray(_useState107, 2),
    savePresetName = _useState108[0],
    setSavePresetName = _useState108[1];

  // Oracle text and zoom modals
  var _useState109 = useState(null),
    _useState110 = _slicedToArray(_useState109, 2),
    oracleFor = _useState110[0],
    setOracleFor = _useState110[1]; // token id
  var _useState111 = useState(""),
    _useState112 = _slicedToArray(_useState111, 2),
    oracleText = _useState112[0],
    setOracleText = _useState112[1];
  var _useState113 = useState(false),
    _useState114 = _slicedToArray(_useState113, 2),
    oracleLoading = _useState114[0],
    setOracleLoading = _useState114[1];
  var _useState115 = useState(null),
    _useState116 = _slicedToArray(_useState115, 2),
    zoomImage = _useState116[0],
    setZoomImage = _useState116[1]; // { url, tokenId } or null

  // Secret menu (The Sanctum) -- unlocked by 7 taps on the title within 3s
  var _useState117 = useState(false),
    _useState118 = _slicedToArray(_useState117, 2),
    sanctumOpen = _useState118[0],
    setSanctumOpen = _useState118[1];
  var _useState119 = useState(false),
    _useState120 = _slicedToArray(_useState119, 2),
    hatcheryDoorOpen = _useState120[0],
    setHatcheryDoorOpen = _useState120[1];
  // Games
  var _useState121 = useState(false),
    _useState122 = _slicedToArray(_useState121, 2),
    memoryOpen = _useState122[0],
    setMemoryOpen = _useState122[1];
  var _useState123 = useState(false),
    _useState124 = _slicedToArray(_useState123, 2),
    dragonOpen = _useState124[0],
    setDragonOpen = _useState124[1];
  var _useState125 = useState(0),
    _useState126 = _slicedToArray(_useState125, 2),
    titleTapCount = _useState126[0],
    setTitleTapCount = _useState126[1];
  var titleTapResetRef = useRef(null);

  // --------- COMPANION PET SYSTEM ---------
  // Pet state. null until hatched.
  // Shape: { core: 'W'|'U'|'B'|'R'|'G', name: string, hatchedAt: number,
  //          xp: number, lastFedAt: number, lastPlayedAt: number,
  //          affinities: { W:n, U:n, B:n, R:n, G:n } }
  var _useState127 = useState(function () {
      return storage.get('pet');
    }),
    _useState128 = _slicedToArray(_useState127, 2),
    pet = _useState128[0],
    setPet = _useState128[1];

  // Discovery (Tier 2): WUBRG order puzzle inside Sanctum
  // unlockedOrbs is the array of correctly-tapped orb colours so far in current attempt
  var _useState129 = useState([]),
    _useState130 = _slicedToArray(_useState129, 2),
    unlockedOrbs = _useState130[0],
    setUnlockedOrbs = _useState130[1];
  var _useState131 = useState(false),
    _useState132 = _slicedToArray(_useState131, 2),
    showDiscoveryHint = _useState132[0],
    setShowDiscoveryHint = _useState132[1];
  var _useState133 = useState(false),
    _useState134 = _slicedToArray(_useState133, 2),
    hatchingOpen = _useState134[0],
    setHatchingOpen = _useState134[1];
  var _useState135 = useState(null),
    _useState136 = _slicedToArray(_useState135, 2),
    chosenCore = _useState136[0],
    setChosenCore = _useState136[1]; // during ceremony
  var _useState137 = useState([]),
    _useState138 = _slicedToArray(_useState137, 2),
    ceremonyStarters = _useState138[0],
    setCeremonyStarters = _useState138[1]; // 3 petType keys
  var _useState139 = useState(null),
    _useState140 = _slicedToArray(_useState139, 2),
    chosenType = _useState140[0],
    setChosenType = _useState140[1]; // chosen petType key
  var _useState141 = useState(false),
    _useState142 = _slicedToArray(_useState141, 2),
    hatchAnimating = _useState142[0],
    setHatchAnimating = _useState142[1];

  // Pet UI -- open the pet view directly (sets sanctumOpen + scrolls to pet section)
  var _useState143 = useState(false),
    _useState144 = _slicedToArray(_useState143, 2),
    petResetConfirmOpen = _useState144[0],
    setPetResetConfirmOpen = _useState144[1];
  var _useState145 = useState(false),
    _useState146 = _slicedToArray(_useState145, 2),
    petRenameOpen = _useState146[0],
    setPetRenameOpen = _useState146[1];
  var _useState147 = useState(""),
    _useState148 = _slicedToArray(_useState147, 2),
    petNameInput = _useState148[0],
    setPetNameInput = _useState148[1];
  var _useState149 = useState(false),
    _useState150 = _slicedToArray(_useState149, 2),
    showPetAdvanced = _useState150[0],
    setShowPetAdvanced = _useState150[1];

  // Pet hint timer ref
  var petHintTimerRef = useRef(null);
  // Force re-render every minute so age/hunger displays stay current
  var _useState151 = useState(0),
    _useState152 = _slicedToArray(_useState151, 2),
    setPetTick = _useState152[1];
  useEffect(function () {
    var i = setInterval(function () {
      return setPetTick(function (t) {
        return t + 1;
      });
    }, 60 * 1000);
    return function () {
      return clearInterval(i);
    };
  }, []);

  // Persist pet
  useEffect(function () {
    if (pet) storage.set('pet', pet);else storage.set('pet', null);
  }, [pet]);

  // Show hint after 5 seconds inside Sanctum (only if pet hasn't hatched)
  useEffect(function () {
    if (sanctumOpen && !pet) {
      petHintTimerRef.current = setTimeout(function () {
        return setShowDiscoveryHint(true);
      }, 5000);
    } else {
      setShowDiscoveryHint(false);
      setUnlockedOrbs([]);
      if (petHintTimerRef.current) clearTimeout(petHintTimerRef.current);
    }
    return function () {
      if (petHintTimerRef.current) clearTimeout(petHintTimerRef.current);
    };
  }, [sanctumOpen, pet]);

  // --- Pet action handlers ---
  // WUBRG order puzzle. Wrong tap = reset.
  var handleOrbTap = function handleOrbTap(colour) {
    var expectedOrder = ['W', 'U', 'B', 'R', 'G'];
    var nextExpected = expectedOrder[unlockedOrbs.length];
    if (colour === nextExpected) {
      haptic(15);
      var newLit = [].concat(_toConsumableArray(unlockedOrbs), [colour]);
      setUnlockedOrbs(newLit);
      if (newLit.length === 5) {
        // All 5 lit -- open hatching ceremony after a brief celebratory pause
        haptic([30, 50, 30, 50, 100]);
        setTimeout(function () {
          setCeremonyStarters(pickCeremonyStarters());
          setChosenType(null);
          setHatchingOpen(true);
        }, 600);
      }
    } else {
      // Wrong order -- reset
      haptic([40, 80]);
      setUnlockedOrbs([]);
    }
  };

  // Hatch the egg with a chosen core colour
  var hatchPet = function hatchPet(petTypeKey) {
    haptic([30, 50, 30, 50, 100]);
    var typeData = PET_TYPES[petTypeKey];
    var core = (typeData === null || typeData === void 0 ? void 0 : typeData.color) || 'G';
    var now = Date.now();
    var newPet = {
      core: core,
      petType: petTypeKey,
      name: null,
      hatchedAt: now,
      xp: 0,
      lastFedAt: now,
      lastPlayedAt: now,
      affinities: {
        W: 0,
        U: 0,
        B: 0,
        R: 0,
        G: 0
      }
    };
    setPet(newPet);
    setHatchingOpen(false);
    setChosenCore(null);
    setUnlockedOrbs([]);
    showToast("Your ".concat((typeData === null || typeData === void 0 ? void 0 : typeData.name) || 'companion', " has awakened!"));
  };

  // Feed cooldown 12h
  var FEED_COOLDOWN_MS = 12 * 60 * 60 * 1000;
  // Play cooldown 6h
  var PLAY_COOLDOWN_MS = 6 * 60 * 60 * 1000;
  var feedPet = function feedPet() {
    if (!pet) return;
    var now = Date.now();
    if (now - pet.lastFedAt < FEED_COOLDOWN_MS) {
      haptic(15);
      showToast('Not hungry yet');
      return;
    }
    haptic(30);
    setPet(_objectSpread(_objectSpread({}, pet), {}, {
      lastFedAt: now,
      xp: (pet.xp || 0) + 5
    }));
    showToast('Your companion is sated');
  };
  var playWithPet = function playWithPet() {
    if (!pet) return;
    var now = Date.now();
    if (now - pet.lastPlayedAt < PLAY_COOLDOWN_MS) {
      haptic(15);
      showToast('Resting from play');
      return;
    }
    haptic([15, 30, 15]);
    setPet(_objectSpread(_objectSpread({}, pet), {}, {
      lastPlayedAt: now,
      xp: (pet.xp || 0) + 8
    }));
    showToast('Your companion delights in the play');
  };
  var renamePet = function renamePet() {
    if (!pet) return;
    var trimmed = petNameInput.trim().slice(0, 20);
    if (!trimmed) return;
    haptic(20);
    // Secret: rename to EMRAKUL -> transform to colorless Null
    if (trimmed.toUpperCase() === 'EMRAKUL') {
      haptic([30, 50, 30, 80, 120]);
      setPet(_objectSpread(_objectSpread({}, pet), {}, {
        name: 'Emrakul',
        core: 'C',
        petType: 'eldrazi'
      }));
      setPetRenameOpen(false);
      setPetNameInput("");
      showToast("Something ancient stirs...");
      return;
    }
    setPet(_objectSpread(_objectSpread({}, pet), {}, {
      name: trimmed
    }));
    setPetRenameOpen(false);
    setPetNameInput("");
    showToast("Named: ".concat(trimmed));
  };

  // Dev mode handlers
  var devSkipJuvenile = function devSkipJuvenile() {
    if (!pet) return;
    haptic(20);
    // Set hatchedAt to 8 days ago (just past juvenile threshold)
    var eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
    setPet(_objectSpread(_objectSpread({}, pet), {}, {
      hatchedAt: eightDaysAgo,
      xp: Math.max(pet.xp || 0, 150)
    }));
    showToast("Skipped to Juvenile");
  };
  var devSkipAdult = function devSkipAdult() {
    if (!pet) return;
    haptic(20);
    var twentyTwoDaysAgo = Date.now() - 22 * 24 * 60 * 60 * 1000;
    setPet(_objectSpread(_objectSpread({}, pet), {}, {
      hatchedAt: twentyTwoDaysAgo,
      xp: Math.max(pet.xp || 0, 600)
    }));
    showToast("Skipped to Adult");
  };
  var devResetFeedCD = function devResetFeedCD() {
    if (!pet) return;
    haptic(15);
    var thirteenHoursAgo = Date.now() - 13 * 60 * 60 * 1000;
    setPet(_objectSpread(_objectSpread({}, pet), {}, {
      lastFedAt: thirteenHoursAgo
    }));
    showToast("Feed cooldown reset");
  };
  var devResetPlayCD = function devResetPlayCD() {
    if (!pet) return;
    haptic(15);
    var sevenHoursAgo = Date.now() - 7 * 60 * 60 * 1000;
    setPet(_objectSpread(_objectSpread({}, pet), {}, {
      lastPlayedAt: sevenHoursAgo
    }));
    showToast("Play cooldown reset");
  };
  var resetPet = function resetPet() {
    haptic([50, 50, 80]);
    setPet(null);
    setUnlockedOrbs([]);
    setPetResetConfirmOpen(false);
    setShowPetAdvanced(false);
    showToast('Your egg has returned to the aether');
  };

  // Pet stat helpers (using lazy decay model)
  var petHunger = function petHunger(p) {
    if (!p) return 100;
    var since = Date.now() - p.lastFedAt;
    return Math.max(0, Math.min(100, 100 - since / FEED_COOLDOWN_MS * 100));
  };
  var petHappiness = function petHappiness(p) {
    if (!p) return 100;
    var since = Date.now() - p.lastPlayedAt;
    return Math.max(0, Math.min(100, 100 - since / PLAY_COOLDOWN_MS * 100));
  };
  var feedReady = function feedReady(p) {
    return p && Date.now() - p.lastFedAt >= FEED_COOLDOWN_MS;
  };
  var playReady = function playReady(p) {
    return p && Date.now() - p.lastPlayedAt >= PLAY_COOLDOWN_MS;
  };

  // Track battlefield additions for affinity growth + colour-match reaction
  var lastBattlefieldTotal = useRef(0);
  useEffect(function () {
    if (!pet) {
      lastBattlefieldTotal.current = battlefield.reduce(function (s, t) {
        return s + t.count;
      }, 0);
      return;
    }
    var total = battlefield.reduce(function (s, t) {
      return s + t.count;
    }, 0);
    var delta = total - lastBattlefieldTotal.current;
    if (delta > 0) {
      // Distribute affinity by current battlefield colour mix
      var mix = {
        W: 0,
        U: 0,
        B: 0,
        R: 0,
        G: 0
      };
      battlefield.forEach(function (t) {
        if (Array.isArray(t.colors)) t.colors.forEach(function (c) {
          if (mix[c] !== undefined) mix[c] += 1;
        });
      });
      var total2 = Object.values(mix).reduce(function (s, v) {
        return s + v;
      }, 0) || 1;
      var newAff = _objectSpread({}, pet.affinities);
      Object.keys(mix).forEach(function (c) {
        newAff[c] = (newAff[c] || 0) + mix[c] / total2 * delta;
      });
      // Colour-match bonus: if pet's core colour is in the mix, bonus XP + toast
      var core = pet.core || 'G';
      var matchBonus = mix[core] ? Math.ceil(mix[core] / total2 * delta * 2) : 0;
      var totalXp = (pet.xp || 0) + delta + matchBonus;
      setPet(_objectSpread(_objectSpread({}, pet), {}, {
        xp: totalXp,
        affinities: newAff
      }));
      // Show toast only when there's a meaningful colour match (core colour tokens were added)
      if (matchBonus > 0 && mix[core] >= 1) {
        var _COLOR_DATA$core;
        var colorName = ((_COLOR_DATA$core = COLOR_DATA[core]) === null || _COLOR_DATA$core === void 0 ? void 0 : _COLOR_DATA$core.name) || core;
        var matchToasts = {
          W: "Your companion feels the light.",
          U: "Your companion stirs with curiosity.",
          B: "Your companion's eyes gleam.",
          R: "Your companion sparks with energy!",
          G: "Your companion feels the wild surge.",
          C: "[RESONANCE DETECTED]"
        };
        showToast(matchToasts[core] || "Your companion stirs.");
      }
    }
    lastBattlefieldTotal.current = total;
  }, [battlefield, pet]);

  // Counter types -- pre-defined plus custom adders. Stored per token in t.counters = { [type]: count }
  // We track which counter type panels are expanded per token via t.expandedCounters (array of type ids)
  // Default counters are +1/+1 and -1/-1 (already represented as powerMod/toughnessMod)
  // Additional types: charge, loyalty, poison, time, fade, ice, quest, lore
  var COUNTER_TYPES = [{
    id: 'charge',
    label: 'Charge',
    short: 'CHG',
    color: '#9fc7e6'
  }, {
    id: 'loyalty',
    label: 'Loyalty',
    short: 'LOY',
    color: '#d4b87a'
  }, {
    id: 'poison',
    label: 'Poison',
    short: 'PSN',
    color: '#8fbc8f'
  }, {
    id: 'time',
    label: 'Time',
    short: 'TIME',
    color: '#c9a9c9'
  }, {
    id: 'lore',
    label: 'Lore',
    short: 'LORE',
    color: '#e8dcc4'
  }, {
    id: 'quest',
    label: 'Quest',
    short: 'QST',
    color: '#e8947a'
  }];
  var debounceRef = useRef(null);
  var copyDebounceRef = useRef(null);
  var wakeLockRef = useRef(null);
  var toastTimerRef = useRef(null);
  var diceTimerRef = useRef(null);

  // Persist tab selection + game state
  useEffect(function () {
    storage.set('activeTab', activeTab);
  }, [activeTab]);
  useEffect(function () {
    storage.set('players', players);
  }, [players]);
  useEffect(function () {
    storage.set('player_flipped', playerFlipped);
  }, [playerFlipped]);
  useEffect(function () {
    storage.set('commanderDamage', commanderDamage);
  }, [commanderDamage]);
  useEffect(function () {
    storage.set('phaseIndex', phaseIndex);
  }, [phaseIndex]);
  useEffect(function () {
    storage.set('turnNumber', turnNumber);
  }, [turnNumber]);
  useEffect(function () {
    storage.set('activePlayerIndex', activePlayerIndex);
  }, [activePlayerIndex]);
  // Batch 3 persistence
  useEffect(function () {
    storage.set('dayNight', dayNight);
  }, [dayNight]);
  useEffect(function () {
    storage.set('monarch', monarch);
  }, [monarch]);
  useEffect(function () {
    storage.set('initiative', initiative);
  }, [initiative]);
  useEffect(function () {
    storage.set('citysBlessing', citysBlessing);
  }, [citysBlessing]);
  useEffect(function () {
    storage.set('presets', presets);
  }, [presets]);

  // Keep-screen-awake via Screen Wake Lock API
  useEffect(function () {
    var released = false;
    var acquire = /*#__PURE__*/function () {
      var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              _context.p = 0;
              if (!('wakeLock' in navigator)) {
                _context.n = 2;
                break;
              }
              _context.n = 1;
              return navigator.wakeLock.request('screen');
            case 1:
              wakeLockRef.current = _context.v;
            case 2:
              _context.n = 4;
              break;
            case 3:
              _context.p = 3;
              _t = _context.v;
            case 4:
              return _context.a(2);
          }
        }, _callee, null, [[0, 3]]);
      }));
      return function acquire() {
        return _ref26.apply(this, arguments);
      };
    }();
    acquire();
    var handleVisibility = function handleVisibility() {
      if (document.visibilityState === 'visible' && !released) acquire();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return function () {
      released = true;
      document.removeEventListener('visibilitychange', handleVisibility);
      try {
        wakeLockRef.current && wakeLockRef.current.release && wakeLockRef.current.release();
      } catch (_unused6) {}
    };
  }, []);

  // Lock to portrait via Screen Orientation API
  useEffect(function () {
    try {
      if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('portrait').catch(function () {});
      }
    } catch (_unused7) {}
  }, []);

  // Inject global CSS (animations + search input colour)
  useEffect(function () {
    if (document.getElementById('tq-global-styles')) return;
    var el = document.createElement('style');
    el.id = 'tq-global-styles';
    el.textContent = ['@keyframes toastIn{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}', '@keyframes sanctumIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}', '@keyframes petPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}',
    // Pet creature animations
    '@keyframes petFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}', '@keyframes petEggWobble{0%,100%{transform:rotate(-2deg) translateY(0)}25%{transform:rotate(2deg) translateY(-3px)}50%{transform:rotate(-1.5deg) translateY(-1px)}75%{transform:rotate(1.5deg) translateY(-4px)}}', '@keyframes doorSwing{from{transform:perspective(600px) rotateY(0deg)}to{transform:perspective(600px) rotateY(-115deg)}}', '@keyframes keyholePulse{0%,100%{opacity:0.3}50%{opacity:0.8}}', '@keyframes petBounce{0%{transform:scale(1)}20%{transform:scale(0.88)}60%{transform:scale(1.12)}80%{transform:scale(0.96)}100%{transform:scale(1)}}', '@keyframes petResponseIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}', '@keyframes lifeDeltaFade{0%{opacity:1;transform:translateY(0) scale(1)}70%{opacity:1;transform:translateY(-12px) scale(1.1)}100%{opacity:0;transform:translateY(-24px) scale(0.9)}}', '@keyframes petKenBurns{0%,100%{transform:scale(1.0) translate(0%,0%)}33%{transform:scale(1.06) translate(-1.5%,0.8%)}66%{transform:scale(1.04) translate(1%,-0.5%)}}', '@keyframes petGlow{0%,100%{opacity:0.85}50%{opacity:1}}', '@keyframes petGlowBox{0%,100%{box-shadow:var(--pet-glow-min)}50%{box-shadow:var(--pet-glow-max)}}', '@keyframes particleRise{0%{transform:translateY(0) translateX(0);opacity:0.9}100%{transform:translateY(-55px) translateX(var(--pdx,0px));opacity:0}}', '@keyframes particleFall{0%{transform:translateY(0);opacity:0.8}100%{transform:translateY(50px);opacity:0}}', '@keyframes particleDrift{0%,100%{transform:translateY(0) translateX(0) rotate(0deg)}50%{transform:translateY(-12px) translateX(var(--pdx,6px)) rotate(180deg)}}', '@keyframes particleTwinkle{0%,100%{opacity:0.2;transform:scale(0.7)}50%{opacity:1;transform:scale(1.2)}}', '@keyframes particleOrbit{0%{transform:rotate(0deg) translateX(var(--pr,20px)) rotate(0deg)}100%{transform:rotate(360deg) translateX(var(--pr,20px)) rotate(-360deg)}}', 'input.search-green{color:#a8d8a0!important}', 'input.search-green::placeholder{color:rgba(168,216,160,0.55)!important;opacity:1}', 'input.search-green::-webkit-input-placeholder{color:rgba(168,216,160,0.55)}'].join('');
    document.head.appendChild(el);
  }, []);

  // Push a snapshot onto the undo stack -- capped at 20 entries
  var pushUndo = function pushUndo(snapshot) {
    setUndoStack(function (prev) {
      var next = [].concat(_toConsumableArray(prev), [snapshot]);
      if (next.length > 20) next.shift();
      return next;
    });
  };
  var showToast = function showToast(msg) {
    var ms = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1800;
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(function () {
      return setToast("");
    }, ms);
  };
  var undo = function undo() {
    if (undoStack.length === 0) return;
    haptic(35);
    setUndoStack(function (prev) {
      var next = _toConsumableArray(prev);
      var snapshot = next.pop();
      if (snapshot) setBattlefield(snapshot);
      return next;
    });
    showToast("Undone");
  };
  useEffect(function () {
    storage.set('battlefield', battlefield);
  }, [battlefield]);
  useEffect(function () {
    storage.set('favourites', favourites);
  }, [favourites]);
  var runSearch = /*#__PURE__*/function () {
    var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(searchTerm) {
      var url, res, data, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            if (searchTerm.trim()) {
              _context2.n = 1;
              break;
            }
            setResults([]);
            setError("");
            return _context2.a(2);
          case 1:
            setLoading(true);
            setError("");
            setActiveSearch(searchTerm);
            _context2.p = 2;
            url = "https://api.scryfall.com/cards/search?q=".concat(encodeURIComponent("t:token ".concat(searchTerm)), "&unique=art&order=name");
            _context2.n = 3;
            return fetch(url);
          case 3:
            res = _context2.v;
            if (!(res.status === 404)) {
              _context2.n = 4;
              break;
            }
            setResults([]);
            setError("No tokens matching \"".concat(searchTerm, "\""));
            setLoading(false);
            return _context2.a(2);
          case 4:
            if (res.ok) {
              _context2.n = 5;
              break;
            }
            throw new Error("Scryfall error");
          case 5:
            _context2.n = 6;
            return res.json();
          case 6:
            data = _context2.v;
            setResults((data.data || []).slice(0, 18));
            _context2.n = 8;
            break;
          case 7:
            _context2.p = 7;
            _t2 = _context2.v;
            setError("Couldn't reach Scryfall. Check connection.");
            setResults([]);
          case 8:
            setLoading(false);
          case 9:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 7]]);
    }));
    return function runSearch(_x) {
      return _ref27.apply(this, arguments);
    };
  }();
  useEffect(function () {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(function () {
      if (query.trim().length >= 2) runSearch(query);else {
        setResults([]);
        setError("");
      }
    }, 350);
    return function () {
      return clearTimeout(debounceRef.current);
    };
  }, [query]);
  var addToBattlefield = function addToBattlefield(card) {
    haptic(30);
    var token = normalizeCard(card);
    setBattlefield(function (prev) {
      pushUndo(prev);
      var existing = prev.find(function (t) {
        return t.id === token.id;
      });
      if (existing) return prev.map(function (t) {
        return t.id === token.id ? _objectSpread(_objectSpread({}, t), {}, {
          count: t.count + 1
        }) : t;
      });
      return [].concat(_toConsumableArray(prev), [_objectSpread(_objectSpread({}, token), {}, {
        count: 1,
        powerMod: 0,
        toughnessMod: 0,
        ptExpanded: false,
        tapped: false,
        counters: {
          plusOne: 0,
          minusOne: 0
        }
      })]);
    });
  };

  // Add a creature to the battlefield as a COPY -- given a unique id so it stacks separately from any "real" version
  var addAsCopy = function addAsCopy(card) {
    haptic(30);
    var base = normalizeCard(card);
    var copyId = "copy:".concat(base.id, ":").concat(Date.now());
    setBattlefield(function (prev) {
      pushUndo(prev);
      return [].concat(_toConsumableArray(prev), [_objectSpread(_objectSpread({}, base), {}, {
        id: copyId,
        originalId: base.id,
        originalName: base.name,
        isCopy: true,
        count: 1,
        powerMod: 0,
        toughnessMod: 0,
        ptExpanded: false
      })]);
    });
    setCopyOpen(false);
    setCopyQuery("");
    setCopyResults([]);
  };
  var runCopySearch = /*#__PURE__*/function () {
    var _ref28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(searchTerm, scope) {
      var qParts, url, res, data, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (searchTerm.trim()) {
              _context3.n = 1;
              break;
            }
            setCopyResults([]);
            setCopyError("");
            return _context3.a(2);
          case 1:
            setCopyLoading(true);
            setCopyError("");
            _context3.p = 2;
            qParts = scope === "tokens" ? "t:token ".concat(searchTerm) : "t:creature ".concat(searchTerm);
            url = "https://api.scryfall.com/cards/search?q=".concat(encodeURIComponent(qParts), "&unique=art&order=name");
            _context3.n = 3;
            return fetch(url);
          case 3:
            res = _context3.v;
            if (!(res.status === 404)) {
              _context3.n = 4;
              break;
            }
            setCopyResults([]);
            setCopyError("No ".concat(scope === "tokens" ? "tokens" : "creatures", " matching \"").concat(searchTerm, "\""));
            setCopyLoading(false);
            return _context3.a(2);
          case 4:
            if (res.ok) {
              _context3.n = 5;
              break;
            }
            throw new Error("Scryfall error");
          case 5:
            _context3.n = 6;
            return res.json();
          case 6:
            data = _context3.v;
            setCopyResults((data.data || []).slice(0, 18));
            _context3.n = 8;
            break;
          case 7:
            _context3.p = 7;
            _t3 = _context3.v;
            setCopyError("Couldn't reach Scryfall. Check connection.");
            setCopyResults([]);
          case 8:
            setCopyLoading(false);
          case 9:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 7]]);
    }));
    return function runCopySearch(_x2, _x3) {
      return _ref28.apply(this, arguments);
    };
  }();
  useEffect(function () {
    if (copyDebounceRef.current) clearTimeout(copyDebounceRef.current);
    copyDebounceRef.current = setTimeout(function () {
      if (copyQuery.trim().length >= 2) runCopySearch(copyQuery, copyScope);else {
        setCopyResults([]);
        setCopyError("");
      }
    }, 350);
    return function () {
      return clearTimeout(copyDebounceRef.current);
    };
  }, [copyQuery, copyScope]);
  var increment = function increment(id) {
    haptic(25);
    setBattlefield(function (prev) {
      pushUndo(prev);
      return prev.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          count: t.count + 1
        }) : t;
      });
    });
  };
  var decrement = function decrement(id) {
    haptic(25);
    setBattlefield(function (prev) {
      pushUndo(prev);
      return prev.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          count: t.count - 1
        }) : t;
      }).filter(function (t) {
        return t.count > 0;
      });
    });
  };
  var setCount = function setCount(id, value) {
    var n = Math.max(0, Math.min(999, parseInt(value, 10) || 0));
    haptic(30);
    setBattlefield(function (prev) {
      pushUndo(prev);
      if (n === 0) return prev.filter(function (t) {
        return t.id !== id;
      });
      return prev.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          count: n
        }) : t;
      });
    });
    showToast("Count set to ".concat(n));
  };
  // Quick delta adjust -- used from the enhanced count modal
  var adjustCount = function adjustCount(id, delta) {
    haptic(15);
    setBattlefield(function (prev) {
      pushUndo(prev);
      var target = prev.find(function (t) {
        return t.id === id;
      });
      if (!target) return prev;
      var next = Math.max(0, Math.min(999, target.count + delta));
      if (next === 0) return prev.filter(function (t) {
        return t.id !== id;
      });
      return prev.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          count: next
        }) : t;
      });
    });
  };
  var adjustPT = function adjustPT(id, which, delta) {
    haptic(20);
    setBattlefield(function (prev) {
      pushUndo(prev);
      return prev.map(function (t) {
        if (t.id !== id) return t;
        var key = which === 'power' ? 'powerMod' : 'toughnessMod';
        return _objectSpread(_objectSpread({}, t), {}, _defineProperty({}, key, (t[key] || 0) + delta));
      });
    });
  };
  var resetPT = function resetPT(id) {
    haptic(30);
    setBattlefield(function (prev) {
      pushUndo(prev);
      return prev.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          powerMod: 0,
          toughnessMod: 0
        }) : t;
      });
    });
  };
  var togglePTExpanded = function togglePTExpanded(id) {
    return setBattlefield(function (prev) {
      return prev.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          ptExpanded: !t.ptExpanded
        }) : t;
      });
    });
  };
  var toggleTapped = function toggleTapped(id) {
    haptic(15);
    setBattlefield(function (prev) {
      return prev.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          tapped: !t.tapped
        }) : t;
      });
    });
  };
  var adjustTokenCounter = function adjustTokenCounter(id, counterType, delta) {
    haptic(10);
    setBattlefield(function (prev) {
      return prev.map(function (t) {
        return t.id === id ? _objectSpread(_objectSpread({}, t), {}, {
          counters: _objectSpread(_objectSpread({}, t.counters || {}), {}, _defineProperty({}, counterType, Math.max(0, ((t.counters || {})[counterType] || 0) + delta)))
        }) : t;
      });
    });
  };
  var removeAll = function removeAll(id) {
    haptic(35);
    setBattlefield(function (prev) {
      pushUndo(prev);
      return prev.filter(function (t) {
        return t.id !== id;
      });
    });
  };
  var requestWipe = function requestWipe() {
    haptic(20);
    setWipeConfirmOpen(true);
  };
  var confirmWipe = function confirmWipe() {
    haptic([30, 30, 30]);
    setBattlefield(function (prev) {
      pushUndo(prev);
      return [];
    });
    setWipeConfirmOpen(false);
    showToast("Battlefield wiped");
  };
  var toggleFavourite = function toggleFavourite(card) {
    haptic(25);
    var token = normalizeCard(card);
    setFavourites(function (prev) {
      var existing = prev.find(function (f) {
        return f.id === token.id;
      });
      if (existing) return prev.filter(function (f) {
        return f.id !== token.id;
      });
      return [].concat(_toConsumableArray(prev), [token]);
    });
  };
  var isFavourite = function isFavourite(id) {
    return favourites.some(function (f) {
      return f.id === id;
    });
  };

  // ---- Batch 2 handlers: Life, Commander Damage, Players, Dice, Phases ----

  var adjustLife = function adjustLife(playerId, delta) {
    haptic(delta > 0 ? 20 : 25);
    // Save to history before changing
    setPlayers(function (prev) {
      setLifeHistory(function (hist) {
        return [].concat(_toConsumableArray(hist.slice(-4)), [{
          players: prev,
          time: Date.now()
        }]);
      }); // keep last 5
      return prev.map(function (p) {
        return p.id === playerId ? _objectSpread(_objectSpread({}, p), {}, {
          life: p.life + delta
        }) : p;
      });
    });
    // Accumulate delta tally + reset 2.5s fade timer
    setLifeDelta(function (prev) {
      var _prev$playerId;
      var current = ((_prev$playerId = prev[playerId]) === null || _prev$playerId === void 0 ? void 0 : _prev$playerId.delta) || 0;
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, playerId, {
        delta: current + delta
      }));
    });
    if (lifeDeltaTimers.current[playerId]) clearTimeout(lifeDeltaTimers.current[playerId]);
    lifeDeltaTimers.current[playerId] = setTimeout(function () {
      setLifeDelta(function (prev) {
        var next = _objectSpread({}, prev);
        delete next[playerId];
        return next;
      });
    }, 2500);
  };
  var undoLifeChange = function undoLifeChange() {
    if (lifeHistory.length === 0) return;
    var lastState = lifeHistory[lifeHistory.length - 1];
    setPlayers(lastState.players);
    setLifeHistory(function (hist) {
      return hist.slice(0, -1);
    });
    haptic(25);
    showToast("Undo");
  };
  var adjustCounter = function adjustCounter(playerId, counterType, delta) {
    haptic(15);
    setPlayers(function (prev) {
      return prev.map(function (p) {
        return p.id === playerId ? _objectSpread(_objectSpread({}, p), {}, _defineProperty({}, counterType, Math.max(0, (p[counterType] || 0) + delta))) : p;
      });
    });
  };
  var resetLife = function resetLife() {
    var startingLife = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 40;
    haptic(30);
    setPlayers(function (prev) {
      return prev.map(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          life: startingLife
        });
      });
    });
    setCommanderDamage({});
    showToast("Life reset to ".concat(startingLife));
    setShowResetConfirm(false);
  };
  var startNewGame = function startNewGame(playerCount, startingLife) {
    haptic(30);
    setPlayers(defaultPlayers(playerCount));
    setPlayers(function (prev) {
      return prev.map(function (p) {
        return _objectSpread(_objectSpread({}, p), {}, {
          life: startingLife
        });
      });
    });
    setCommanderDamage({});
    setTurnNumber(1);
    setPhaseIndex(0);
    setActivePlayerIndex(0);
    setMonarch(null);
    setInitiative(null);
    setCitysBlessing([]);
    setDayNight(null);
    setBattlefield([]);
    setShowNewGameMenu(false);
    showToast("New ".concat(playerCount, "-player game started!"));
  };
  var setPlayerCount = function setPlayerCount(n) {
    haptic(20);
    setPlayers(defaultPlayers(n));
    setCommanderDamage({});
  };
  var renamePlayer = function renamePlayer(playerId, newName) {
    setPlayers(function (prev) {
      return prev.map(function (p) {
        return p.id === playerId ? _objectSpread(_objectSpread({}, p), {}, {
          name: newName.trim() || p.name
        }) : p;
      });
    });
    setEditPlayerName(null);
    setEditPlayerNameValue("");
  };
  var adjustCmdrDamage = function adjustCmdrDamage(dealtToId, dealtById, delta) {
    haptic(15);
    setCommanderDamage(function (prev) {
      var byTarget = prev[dealtToId] || {};
      var current = byTarget[dealtById] || 0;
      var next = Math.max(0, Math.min(21, current + delta));
      var newByTarget = _objectSpread(_objectSpread({}, byTarget), {}, _defineProperty({}, dealtById, next));
      // Side-effect: sync to player life if commander damage advances
      if (delta > 0) {
        setPlayers(function (pp) {
          return pp.map(function (p) {
            return p.id === dealtToId ? _objectSpread(_objectSpread({}, p), {}, {
              life: p.life - delta
            }) : p;
          });
        });
      } else if (delta < 0) {
        setPlayers(function (pp) {
          return pp.map(function (p) {
            return p.id === dealtToId ? _objectSpread(_objectSpread({}, p), {}, {
              life: p.life - delta
            }) : p;
          });
        });
      }
      return _objectSpread(_objectSpread({}, prev), {}, _defineProperty({}, dealtToId, newByTarget));
    });
  };

  // Dice
  var rollDie = function rollDie(sides) {
    haptic(25);
    setRolling(sides);
    if (diceTimerRef.current) clearTimeout(diceTimerRef.current);
    diceTimerRef.current = setTimeout(function () {
      var result = Math.floor(Math.random() * sides) + 1;
      setDiceRolls(function (prev) {
        return [{
          sides: sides,
          result: result,
          at: Date.now(),
          id: "".concat(Date.now(), "-").concat(Math.random())
        }].concat(_toConsumableArray(prev)).slice(0, 10);
      });
      setRolling(null);
      haptic(35);
    }, 450);
  };
  var flipCoin = function flipCoin() {
    haptic(25);
    setRolling('coin');
    if (diceTimerRef.current) clearTimeout(diceTimerRef.current);
    diceTimerRef.current = setTimeout(function () {
      var result = Math.random() < 0.5 ? 'Heads' : 'Tails';
      setDiceRolls(function (prev) {
        return [{
          sides: 'coin',
          result: result,
          at: Date.now(),
          id: "".concat(Date.now(), "-").concat(Math.random())
        }].concat(_toConsumableArray(prev)).slice(0, 10);
      });
      setRolling(null);
      haptic(35);
    }, 450);
  };
  var randomPlayer = function randomPlayer() {
    haptic(25);
    setRolling('player');
    if (diceTimerRef.current) clearTimeout(diceTimerRef.current);
    diceTimerRef.current = setTimeout(function () {
      var pick = players[Math.floor(Math.random() * players.length)];
      setDiceRolls(function (prev) {
        return [{
          sides: 'player',
          result: pick.name,
          at: Date.now(),
          id: "".concat(Date.now(), "-").concat(Math.random())
        }].concat(_toConsumableArray(prev)).slice(0, 10);
      });
      setRolling(null);
      haptic(35);
    }, 450);
  };
  var clearRolls = function clearRolls() {
    haptic(20);
    setDiceRolls([]);
  };

  // Phase + turn
  var advancePhase = function advancePhase() {
    haptic(18);
    if (phaseIndex >= PHASES.length - 1) {
      // wrap to next turn + next player
      setPhaseIndex(0);
      setTurnNumber(function (t) {
        return t + 1;
      });
      setActivePlayerIndex(function (i) {
        return (i + 1) % players.length;
      });
    } else {
      setPhaseIndex(function (i) {
        return i + 1;
      });
    }
  };
  var retreatPhase = function retreatPhase() {
    haptic(18);
    if (phaseIndex <= 0) {
      if (turnNumber > 1) {
        setTurnNumber(function (t) {
          return t - 1;
        });
        setActivePlayerIndex(function (i) {
          return (i - 1 + players.length) % players.length;
        });
        setPhaseIndex(PHASES.length - 1);
      }
    } else {
      setPhaseIndex(function (i) {
        return i - 1;
      });
    }
  };
  var resetTurnTracker = function resetTurnTracker() {
    haptic(25);
    setPhaseIndex(0);
    setTurnNumber(1);
    setActivePlayerIndex(0);
    showToast("Turn tracker reset");
  };

  // --- Batch 3 handlers ---

  // Day/Night
  var toggleDayNight = function toggleDayNight() {
    haptic(20);
    if (dayNight === null) setDayNight('day');else if (dayNight === 'day') setDayNight('night');else setDayNight('day');
  };
  var clearDayNight = function clearDayNight() {
    haptic(15);
    setDayNight(null);
  };

  // Monarch / Initiative
  var setMonarchPlayer = function setMonarchPlayer(pid) {
    haptic(20);
    setMonarch(monarch === pid ? null : pid);
  };
  var setInitiativePlayer = function setInitiativePlayer(pid) {
    haptic(20);
    setInitiative(initiative === pid ? null : pid);
  };
  var toggleCitysBlessing = function toggleCitysBlessing(pid) {
    haptic(15);
    setCitysBlessing(function (prev) {
      return prev.includes(pid) ? prev.filter(function (p) {
        return p !== pid;
      }) : [].concat(_toConsumableArray(prev), [pid]);
    });
  };

  // Oracle text fetch
  var showOracle = /*#__PURE__*/function () {
    var _ref29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(token) {
      var res, _data$card_faces3, data, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            haptic(15);
            setOracleFor(token.id);
            if (!(oracleText && oracleFor === token.id)) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            // already loaded
            setOracleLoading(true);
            _context4.p = 2;
            _context4.n = 3;
            return fetch("https://api.scryfall.com/cards/".concat(encodeURIComponent(token.originalId || token.id)));
          case 3:
            res = _context4.v;
            if (!res.ok) {
              _context4.n = 5;
              break;
            }
            _context4.n = 4;
            return res.json();
          case 4:
            data = _context4.v;
            setOracleText(data.oracle_text || ((_data$card_faces3 = data.card_faces) === null || _data$card_faces3 === void 0 || (_data$card_faces3 = _data$card_faces3[0]) === null || _data$card_faces3 === void 0 ? void 0 : _data$card_faces3.oracle_text) || "(No rules text)");
            _context4.n = 6;
            break;
          case 5:
            setOracleText("Couldn't fetch rules text.");
          case 6:
            _context4.n = 8;
            break;
          case 7:
            _context4.p = 7;
            _t4 = _context4.v;
            setOracleText("Couldn't reach Scryfall.");
          case 8:
            setOracleLoading(false);
          case 9:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 7]]);
    }));
    return function showOracle(_x4) {
      return _ref29.apply(this, arguments);
    };
  }();

  // Card zoom (long-press)
  var showZoom = function showZoom(imageUrl) {
    var tokenId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    haptic(20);
    // Find battlefield index for swipe navigation
    var idx = tokenId ? battlefield.findIndex(function (t) {
      return t.id === tokenId;
    }) : -1;
    setZoomImage({
      url: imageUrl,
      tokenId: tokenId,
      battlefieldIndex: idx
    });
  };

  // Secret menu -- 7 taps on title within 3s window

  var handleTitleTap = function handleTitleTap() {
    if (titleTapResetRef.current) clearTimeout(titleTapResetRef.current);
    var next = titleTapCount + 1;
    setTitleTapCount(next);
    // Progressive haptics -- quiet at first, intensifying near the unlock
    if (next < 4) haptic(8);else if (next < 6) haptic(15);else if (next === 6) haptic(25);else if (next >= 7) {
      haptic([40, 60, 40, 60, 80]);
      setSanctumOpen(true);
      setTitleTapCount(0);
      return;
    }
    // Reset counter if 3 seconds pass without another tap
    titleTapResetRef.current = setTimeout(function () {
      return setTitleTapCount(0);
    }, 3000);
  };

  // Presets
  var savePreset = function savePreset(name) {
    if (!name.trim() || battlefield.length === 0) return;
    haptic(25);
    var stripped = battlefield.map(function (t) {
      return {
        id: t.id,
        originalId: t.originalId,
        isCopy: t.isCopy,
        originalName: t.originalName,
        name: t.name,
        smallImage: t.smallImage,
        power: t.power,
        toughness: t.toughness,
        type_line: t.type_line,
        colors: t.colors
      };
    });
    var id = "preset:".concat(Date.now());
    setPresets(function (prev) {
      return [].concat(_toConsumableArray(prev), [{
        id: id,
        name: name.trim(),
        tokens: stripped,
        createdAt: Date.now()
      }]);
    });
    setSavePresetOpen(false);
    setSavePresetName("");
    showToast("Preset \"".concat(name.trim(), "\" saved"));
  };
  var loadPreset = function loadPreset(preset) {
    haptic(25);
    setBattlefield(function (prev) {
      pushUndo(prev);
      return preset.tokens.map(function (t) {
        return _objectSpread(_objectSpread({}, t), {}, {
          count: 1,
          powerMod: 0,
          toughnessMod: 0,
          ptExpanded: false,
          counters: {}
        });
      });
    });
    setPresetMenuOpen(false);
    showToast("Loaded \"".concat(preset.name, "\""));
  };
  var deletePreset = function deletePreset(presetId) {
    haptic(25);
    setPresets(function (prev) {
      return prev.filter(function (p) {
        return p.id !== presetId;
      });
    });
  };
  var totalTokens = battlefield.reduce(function (sum, t) {
    return sum + t.count;
  }, 0);
  var uniqueTypes = battlefield.length;
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen w-full",
    style: {
      background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 50%, #05030a 100%)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "pointer-events-none fixed inset-0 opacity-30 mix-blend-overlay",
    style: {
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative max-w-6xl mx-auto px-3 sm:px-6",
    style: {
      paddingBottom: 'calc(5rem + env(safe-area-inset-bottom))'
    }
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-30 -mx-3 sm:-mx-6 mb-4",
    style: {
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
      paddingTop: 'max(0.5rem, env(safe-area-inset-top))',
      paddingBottom: '0.5rem',
      background: "linear-gradient(to bottom, rgba(10, 6, 4, 0.97) 0%, rgba(10, 6, 4, 0.92) 100%)",
      borderBottom: "1px solid rgba(201, 169, 97, 0.25)",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center mb-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleTitleTap,
    className: "active:scale-[0.98] transition-transform",
    style: {
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    },
    "aria-label": "Token Queen"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "uppercase text-base sm:text-lg tracking-[0.35em]",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: "#d4b87a",
      textShadow: titleTapCount >= 5 ? "0 0 12px rgba(212, 184, 122, 0.6), 0 1px 2px rgba(0,0,0,0.7)" : "0 1px 2px rgba(0,0,0,0.7)",
      background: "linear-gradient(180deg, #f5d98f 0%, #d4b87a 50%, #8a6f3a 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      lineHeight: 1.2,
      transition: 'text-shadow 0.2s ease'
    }
  }, "Token Queen"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-2 min-h-[2rem]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-shrink-0"
  }, totalTokens > 0 ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-start leading-none"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base font-bold",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#d4b87a"
    }
  }, totalTokens), /*#__PURE__*/React.createElement("span", {
    className: "text-[7px] tracking-[0.2em] uppercase mt-0.5",
    style: {
      color: "#9a8765",
      fontFamily: "'Cinzel', serif"
    }
  }, "token", totalTokens === 1 ? "" : "s")), /*#__PURE__*/React.createElement("div", {
    className: "h-5 w-px",
    style: {
      background: "rgba(201, 169, 97, 0.25)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-start leading-none"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base font-bold",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#d4b87a"
    }
  }, uniqueTypes), /*#__PURE__*/React.createElement("span", {
    className: "text-[7px] tracking-[0.2em] uppercase mt-0.5",
    style: {
      color: "#9a8765",
      fontFamily: "'Cinzel', serif"
    }
  }, "type", uniqueTypes === 1 ? "" : "s"))) : /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] italic",
    style: {
      color: "#6a5a42",
      fontFamily: "'Crimson Pro', serif"
    }
  }, "Empty battlefield")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 flex-shrink-0"
  }, pet && function () {
    var cd = COLOR_DATA[pet.core];
    var hungry = petHunger(pet) < 30;
    var bored = petHappiness(pet) < 30;
    var needsAttention = hungry || bored;
    return /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        haptic(15);
        setSanctumOpen(true);
      },
      className: "flex items-center justify-center active:scale-90 transition-all",
      style: {
        width: '28px',
        height: '28px',
        borderRadius: '50%',
        background: "radial-gradient(circle at 35% 35%, ".concat(cd.bg, ", ").concat(cd.symbol, ")"),
        border: "1.5px solid ".concat(cd.symbol),
        boxShadow: needsAttention ? "0 0 12px ".concat(cd.glow, ", 0 0 4px ").concat(cd.glow, " inset") : "0 0 6px ".concat(cd.glow, "88"),
        animation: needsAttention ? 'petPulse 1.6s ease-in-out infinite' : 'none',
        cursor: 'pointer',
        padding: 0
      },
      "aria-label": "Companion: ".concat(needsAttention ? hungry ? 'hungry' : 'bored' : 'content'),
      title: "Companion: ".concat(needsAttention ? hungry ? 'hungry' : 'bored' : 'content')
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Cinzel', serif",
        fontWeight: 700,
        fontSize: '0.7rem',
        color: cd.textOnBg,
        textShadow: "0 0 4px ".concat(cd.glow)
      }
    }, pet.core));
  }(), undoStack.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: undo,
    className: "flex items-center justify-center w-8 h-8 active:scale-90 transition-all",
    style: {
      color: "#c9a961",
      background: "linear-gradient(180deg, rgba(201, 169, 97, 0.1), rgba(201, 169, 97, 0.02))",
      border: "1px solid rgba(201, 169, 97, 0.35)",
      borderRadius: "2px"
    },
    "aria-label": "Undo last action",
    title: "Undo"
  }, /*#__PURE__*/React.createElement(Undo, {
    style: {
      fontSize: '0.9rem'
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      haptic(30);
      setCopyOpen(true);
    },
    className: "flex items-center justify-center w-8 h-8 active:scale-90 transition-all",
    style: {
      color: "#d4b87a",
      background: "linear-gradient(180deg, rgba(201, 169, 97, 0.15), rgba(201, 169, 97, 0.05))",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    },
    "aria-label": "Copy creature as token",
    title: "Copy"
  }, /*#__PURE__*/React.createElement(Copy, {
    style: {
      fontSize: '0.85rem'
    }
  })), battlefield.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: requestWipe,
    className: "flex items-center justify-center w-8 h-8 active:scale-90 transition-all",
    style: {
      color: "#d48a86",
      background: "linear-gradient(180deg, rgba(160, 48, 44, 0.15), rgba(160, 48, 44, 0.05))",
      border: "1px solid rgba(160, 48, 44, 0.4)",
      borderRadius: "2px"
    },
    "aria-label": "Clear battlefield",
    title: "Wipe"
  }, /*#__PURE__*/React.createElement(Trash2, {
    style: {
      fontSize: '0.85rem'
    }
  })))))), activeTab === 'battlefield' && /*#__PURE__*/React.createElement(React.Fragment, null, favourites.length > 0 && /*#__PURE__*/React.createElement("section", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-[10px] tracking-[0.3em] uppercase flex items-center gap-1.5",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Star, {
    fill: "#c9a961",
    style: {
      color: "#c9a961",
      fontSize: '0.75rem'
    }
  }), "Favourites")), /*#__PURE__*/React.createElement("div", {
    className: "no-scrollbar flex gap-2 overflow-x-auto pb-2"
  }, favourites.map(function (f) {
    return /*#__PURE__*/React.createElement("div", {
      key: f.id,
      className: "relative flex-shrink-0",
      style: {
        width: "64px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return addToBattlefield(f);
      },
      className: "block w-full active:scale-95 transition-transform",
      style: {
        borderRadius: "4.75% / 3.5%",
        overflow: "hidden",
        border: "1px solid rgba(201, 169, 97, 0.4)"
      },
      "aria-label": "Summon ".concat(f.name)
    }, f.smallImage ? /*#__PURE__*/React.createElement("img", {
      src: f.smallImage,
      alt: f.name,
      className: "w-full h-auto block"
    }) : /*#__PURE__*/React.createElement("div", {
      className: "aspect-[5/7] flex items-center justify-center text-[9px] p-1 text-center",
      style: {
        background: "#2a1f14",
        color: "#c9a961"
      }
    }, f.name)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        toggleFavourite(f);
      },
      className: "absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center active:scale-90",
      style: {
        background: "rgba(10, 6, 4, 0.95)",
        border: "1px solid rgba(201, 169, 97, 0.6)",
        borderRadius: "50%",
        color: "#9a8765"
      },
      "aria-label": "Unfavourite ".concat(f.name)
    }, /*#__PURE__*/React.createElement(XIcon, {
      style: {
        fontSize: '0.625rem'
      }
    })));
  }))), /*#__PURE__*/React.createElement("section", {
    className: "mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h3", {
    className: "text-[10px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, "Quick Tokens")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, PRESET_TOKENS.map(function (preset) {
    return /*#__PURE__*/React.createElement("button", {
      key: preset.id,
      onClick: function onClick() {
        var token = {
          id: "".concat(preset.id, "-").concat(Date.now()),
          name: preset.name,
          type: preset.type,
          colors: preset.colors,
          pt: preset.pt,
          text: preset.text,
          originalId: preset.id,
          powerMod: 0,
          toughnessMod: 0,
          tapped: false,
          counters: {
            plusOne: 0,
            minusOne: 0
          }
        };
        setBattlefield(function (prev) {
          pushUndo(prev);
          return [token].concat(_toConsumableArray(prev));
        });
        haptic(20);
        showToast("".concat(preset.name, " added"));
      },
      className: "flex flex-col items-center gap-1 py-3 rounded active:scale-95",
      style: {
        background: 'linear-gradient(180deg, rgba(20, 14, 8, 0.8), rgba(10, 6, 4, 0.6))',
        border: '1px solid rgba(201, 169, 97, 0.3)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.03)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '1.5rem'
      }
    }, preset.emoji), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Cinzel', serif",
        fontSize: '0.65rem',
        color: '#c9a961',
        fontWeight: 600,
        letterSpacing: '0.05em'
      }
    }, preset.name.toUpperCase()));
  }))), /*#__PURE__*/React.createElement("section", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative",
    style: {
      background: "linear-gradient(180deg, rgba(20, 14, 8, 0.8), rgba(10, 6, 4, 0.6))",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.4), inset 0 0 20px rgba(201, 169, 97, 0.04)"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    style: {
      color: "#9a8765",
      fontSize: '1rem',
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: query,
    onChange: function onChange(e) {
      setQuery(e.target.value);
      setShowSearch(true);
    },
    onFocus: function onFocus() {
      return setShowSearch(true);
    },
    placeholder: "Search tokens\u2026",
    className: "search-green w-full bg-transparent pl-10 pr-10 py-3 text-base outline-none",
    style: {
      fontFamily: "'Crimson Pro', serif"
    }
  }), query && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setQuery("");
      setResults([]);
      setActiveSearch("");
    },
    className: "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 active:scale-90",
    style: {
      color: "#9a8765"
    },
    "aria-label": "Clear search"
  }, /*#__PURE__*/React.createElement(XIcon, null))), /*#__PURE__*/React.createElement("div", {
    className: "no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1"
  }, QUICK_SEARCHES.map(function (term) {
    var active = activeSearch === term;
    return /*#__PURE__*/React.createElement("button", {
      key: term,
      onClick: function onClick() {
        return setQuery(term);
      },
      className: "flex-shrink-0 px-3 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase transition-all active:scale-95",
      style: {
        fontFamily: "'Cinzel', serif",
        fontWeight: active ? 600 : 500,
        color: active ? "#1a110a" : "#c9a961",
        background: active ? "linear-gradient(180deg, #f5d98f, #c9a961)" : "linear-gradient(180deg, rgba(201, 169, 97, 0.06), rgba(201, 169, 97, 0.01))",
        border: "1px solid ".concat(active ? "#c9a961" : "rgba(201, 169, 97, 0.3)"),
        borderRadius: "2px",
        boxShadow: active ? "0 2px 8px rgba(201, 169, 97, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)" : "inset 0 1px 0 rgba(255, 255, 255, 0.03)"
      }
    }, term);
  }))), (loading || results.length > 0 || error) && showSearch && /*#__PURE__*/React.createElement("section", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-[10px] sm:text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, loading ? "Searching&hellip;" : "Tap to summon")), results.length > 0 && !loading && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowSearch(false);
    },
    className: "text-[10px] tracking-widest uppercase px-2 py-1 active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Hide")), loading && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center py-6"
  }, /*#__PURE__*/React.createElement(Loader2, {
    className: "animate-spin",
    style: {
      color: "#c9a961",
      fontSize: '1.25rem'
    }
  })), error && !loading && /*#__PURE__*/React.createElement("p", {
    className: "italic text-center py-4 text-sm",
    style: {
      color: "#9a8765"
    }
  }, error), !loading && results.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"
  }, results.map(function (card) {
    var _card$image_uris5, _card$image_uris6, _card$card_faces5;
    var img = ((_card$image_uris5 = card.image_uris) === null || _card$image_uris5 === void 0 ? void 0 : _card$image_uris5.small) || ((_card$image_uris6 = card.image_uris) === null || _card$image_uris6 === void 0 ? void 0 : _card$image_uris6.normal) || ((_card$card_faces5 = card.card_faces) === null || _card$card_faces5 === void 0 || (_card$card_faces5 = _card$card_faces5[0]) === null || _card$card_faces5 === void 0 || (_card$card_faces5 = _card$card_faces5.image_uris) === null || _card$card_faces5 === void 0 ? void 0 : _card$card_faces5.small) || "";
    var fav = isFavourite(card.id);
    return /*#__PURE__*/React.createElement("div", {
      key: card.id,
      className: "relative"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return addToBattlefield(card);
      },
      className: "group relative block w-full transition-all active:scale-95",
      style: {
        borderRadius: "4.75% / 3.5%",
        overflow: "hidden"
      }
    }, img ? /*#__PURE__*/React.createElement("img", {
      src: img,
      alt: card.name,
      className: "w-full h-auto block"
    }) : /*#__PURE__*/React.createElement("div", {
      className: "aspect-[5/7] flex items-center justify-center text-[10px] p-2 text-center",
      style: {
        background: "#2a1f14",
        color: "#c9a961"
      }
    }, card.name)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        toggleFavourite(card);
      },
      className: "absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center active:scale-90",
      style: {
        background: "rgba(10, 6, 4, 0.85)",
        border: "1px solid ".concat(fav ? "#c9a961" : "rgba(154, 135, 101, 0.5)"),
        borderRadius: "50%"
      },
      "aria-label": fav ? "Unfavourite" : "Favourite"
    }, /*#__PURE__*/React.createElement(Star, {
      fill: fav ? "#c9a961" : "none",
      style: {
        color: fav ? "#c9a961" : "#9a8765",
        fontSize: '0.875rem'
      }
    })));
  }))), !showSearch && results.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowSearch(true);
    },
    className: "w-full mb-4 py-2 text-xs tracking-widest uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      border: "1px dashed rgba(201, 169, 97, 0.3)",
      borderRadius: "2px"
    }
  }, "Show results (", results.length, ")"), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-[10px] sm:text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, "Battlefield")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      haptic(15);
      setPresetMenuOpen(true);
    },
    className: "flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-1 active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    },
    "aria-label": "Manage deck presets",
    title: "Presets"
  }, /*#__PURE__*/React.createElement(Layers, {
    style: {
      fontSize: '0.75rem'
    }
  }), "Presets ", presets.length > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#9a8765',
      fontFamily: "'JetBrains Mono', monospace"
    }
  }, ". ", presets.length))), battlefield.length > 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] italic tracking-wide text-center mb-2",
    style: {
      color: "#6a5a42"
    }
  }, "tap top . +1 \xA0.\xA0 tap bottom . -1 \xA0.\xA0 long-press . zoom"), battlefield.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-16 px-6",
    style: {
      border: "1px dashed rgba(201, 169, 97, 0.2)",
      borderRadius: "2px",
      background: "radial-gradient(ellipse at center, rgba(26, 17, 10, 0.4), transparent)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "italic text-sm mb-1",
    style: {
      color: "#8a7555",
      fontFamily: "'Crimson Pro', serif"
    }
  }, "No creatures stir."), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] tracking-widest uppercase",
    style: {
      color: "#6a5a42",
      fontFamily: "'Cinzel', serif"
    }
  }, "Summon from above")) : /*#__PURE__*/React.createElement("div", {
    className: "grid gap-2 ".concat(battlefield.length <= 2 ? 'grid-cols-2' : battlefield.length <= 4 ? 'grid-cols-3' : battlefield.length <= 8 ? 'grid-cols-3' : 'grid-cols-4')
  }, battlefield.map(function (t) {
    var fav = isFavourite(t.id);
    var compact = battlefield.length > 4;
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      className: "relative flex flex-col",
      style: {
        background: "rgba(20, 14, 8, 0.8)",
        border: "1px solid rgba(201, 169, 97, 0.3)",
        borderRadius: "3px",
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative select-none flex-shrink-0"
    }, t.smallImage ? /*#__PURE__*/React.createElement("img", {
      src: t.smallImage,
      alt: t.name,
      className: "w-full h-auto block pointer-events-none"
    }) : /*#__PURE__*/React.createElement("div", {
      className: "aspect-[5/7] flex items-center justify-center text-xs p-2 text-center pointer-events-none",
      style: {
        background: "#2a1f14",
        color: "#c9a961"
      }
    }, t.name), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 z-10",
      onClick: function onClick() {
        haptic(20);
        setNumpadFor(t.id);
        setNumpadValue(String(t.count));
      },
      onContextMenu: function onContextMenu(e) {
        e.preventDefault();
        showZoom(t.normalImage || t.smallImage, t.id);
      },
      onTouchStart: function onTouchStart(e) {
        var target = e.currentTarget;
        var timer = setTimeout(function () {
          target.dataset.lp = "1";
          showZoom(t.normalImage || t.smallImage, t.id);
        }, 600);
        target.dataset.lpt = String(timer);
      },
      onTouchEnd: function onTouchEnd(e) {
        var target = e.currentTarget;
        clearTimeout(parseInt(target.dataset.lpt || "0", 10));
        if (target.dataset.lp === "1") {
          target.dataset.lp = "0";
          e.preventDefault();
        }
      },
      onTouchCancel: function onTouchCancel(e) {
        return clearTimeout(parseInt(e.currentTarget.dataset.lpt || "0", 10));
      },
      style: {
        cursor: 'pointer'
      },
      "aria-label": "".concat(t.name, ": tap to edit count, long-press to zoom")
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1.5 left-1.5 z-30",
      style: {
        minWidth: compact ? "1.5rem" : "1.75rem",
        height: compact ? "1.5rem" : "1.75rem",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 0.25rem',
        background: "rgba(10, 6, 4, 0.92)",
        border: "1.5px solid #c9a961",
        borderRadius: "2px",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#d4b87a",
        fontWeight: 700,
        fontSize: compact ? "0.8rem" : "0.95rem",
        boxShadow: "0 0 8px rgba(201, 169, 97, 0.4)",
        pointerEvents: 'none'
      }
    }, t.count), t.colors.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-1.5 right-1.5 flex gap-0.5 pointer-events-none z-20"
    }, t.colors.map(function (c) {
      return /*#__PURE__*/React.createElement("span", {
        key: c,
        className: "rounded-full",
        style: {
          width: '0.4rem',
          height: '0.4rem',
          background: COLOR_DOTS[c] || "#666",
          border: "1px solid rgba(0,0,0,0.4)"
        }
      });
    })), t.isCopy && /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-9 left-1 pointer-events-none z-20 flex items-center gap-0.5 px-1 py-0.5",
      style: {
        background: "rgba(10, 6, 4, 0.9)",
        border: "1px solid #9fc7e6",
        borderRadius: "2px"
      }
    }, /*#__PURE__*/React.createElement(Copy, {
      style: {
        color: "#9fc7e6",
        fontSize: '0.45rem'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#9fc7e6",
        fontSize: "0.4rem",
        fontWeight: 700
      }
    }, "COPY")), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-0 left-0 right-0 z-20 px-1 pt-4 pb-1",
      style: {
        background: "linear-gradient(to top, rgba(6, 4, 2, 0.96) 0%, rgba(6, 4, 2, 0.7) 60%, transparent 100%)",
        pointerEvents: 'none'
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "truncate",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#f0e8d4",
        fontSize: compact ? "0.55rem" : "0.68rem",
        fontWeight: 600,
        lineHeight: 1.2,
        textShadow: "0 1px 3px rgba(0,0,0,0.9)"
      },
      title: t.name
    }, t.name, t.isCopy ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#9fc7e6",
        fontStyle: "italic"
      }
    }, " .copy") : null), t.power !== null && t.toughness !== null && function () {
      var pMod = t.powerMod || 0;
      var tMod = t.toughnessMod || 0;
      var hasMod = pMod !== 0 || tMod !== 0;
      var basePwr = parseInt(t.power, 10);
      var baseTgh = parseInt(t.toughness, 10);
      var curP = isNaN(basePwr) ? t.power : basePwr + pMod;
      var curT = isNaN(baseTgh) ? t.toughness : baseTgh + tMod;
      var fmt = function fmt(n) {
        return n > 0 ? "+".concat(n) : "".concat(n);
      };
      return /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-1"
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: hasMod ? "#f5d98f" : "#c9a961",
          fontSize: compact ? "0.55rem" : "0.65rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          textShadow: "0 1px 3px rgba(0,0,0,0.9)"
        }
      }, curP, "/", curT), hasMod && /*#__PURE__*/React.createElement("span", {
        style: {
          color: "#b4d4a0",
          fontSize: "0.5rem",
          padding: "0 2px",
          background: "rgba(107,142,90,0.3)",
          border: "1px solid rgba(107,142,90,0.5)",
          borderRadius: "1px"
        }
      }, fmt(pMod), "/", fmt(tMod)));
    }()), /*#__PURE__*/React.createElement("div", {
      className: "absolute bottom-0 left-0 right-0 z-25 flex items-center justify-end gap-0.5 px-0.5 pb-0.5",
      style: {
        paddingTop: compact ? '22px' : '26px'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        toggleTapped(t.id);
      },
      className: "flex items-center justify-center active:scale-90",
      style: {
        width: compact ? '18px' : '22px',
        height: compact ? '18px' : '22px',
        background: t.tapped ? "rgba(201,169,97,0.25)" : "rgba(6,4,2,0.85)",
        border: "1px solid ".concat(t.tapped ? "#c9a961" : "rgba(154,135,101,0.5)"),
        borderRadius: "2px",
        color: t.tapped ? "#c9a961" : "#9a8765",
        transform: t.tapped ? 'rotate(90deg)' : 'none',
        transition: 'transform 0.2s'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: compact ? '0.5rem' : '0.6rem',
        fontWeight: 700
      }
    }, "\u21BB")), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        showOracle(t);
      },
      className: "flex items-center justify-center active:scale-90",
      style: {
        width: compact ? '18px' : '22px',
        height: compact ? '18px' : '22px',
        background: "rgba(6,4,2,0.85)",
        border: "1px solid rgba(154,135,101,0.5)",
        borderRadius: "2px",
        color: "#9a8765"
      }
    }, /*#__PURE__*/React.createElement(Info, {
      style: {
        fontSize: compact ? '0.55rem' : '0.65rem'
      }
    })), t.power !== null && t.toughness !== null && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        togglePTExpanded(t.id);
      },
      className: "flex items-center justify-center active:scale-90",
      style: {
        width: compact ? '18px' : '22px',
        height: compact ? '18px' : '22px',
        background: t.ptExpanded ? "rgba(201,169,97,0.25)" : "rgba(6,4,2,0.85)",
        border: "1px solid ".concat(t.ptExpanded ? "#c9a961" : "rgba(154,135,101,0.5)"),
        borderRadius: "2px",
        color: t.ptExpanded ? "#c9a961" : "#9a8765"
      }
    }, /*#__PURE__*/React.createElement(Sword, {
      style: {
        fontSize: compact ? '0.55rem' : '0.65rem'
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        toggleFavourite(t);
      },
      className: "flex items-center justify-center active:scale-90",
      style: {
        width: compact ? '18px' : '22px',
        height: compact ? '18px' : '22px',
        background: fav ? "rgba(201,169,97,0.25)" : "rgba(6,4,2,0.85)",
        border: "1px solid ".concat(fav ? "#c9a961" : "rgba(154,135,101,0.5)"),
        borderRadius: "2px"
      }
    }, /*#__PURE__*/React.createElement(Star, {
      fill: fav ? "#c9a961" : "none",
      style: {
        color: fav ? "#c9a961" : "#9a8765",
        fontSize: compact ? '0.55rem' : '0.65rem'
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        removeAll(t.id);
      },
      className: "flex items-center justify-center active:scale-90",
      style: {
        width: compact ? '18px' : '22px',
        height: compact ? '18px' : '22px',
        background: "rgba(6,4,2,0.85)",
        border: "1px solid rgba(160,48,44,0.5)",
        borderRadius: "2px",
        color: "#d48a86"
      }
    }, /*#__PURE__*/React.createElement(Trash2, {
      style: {
        fontSize: compact ? '0.55rem' : '0.65rem'
      }
    })))), t.ptExpanded && t.power !== null && t.toughness !== null && /*#__PURE__*/React.createElement("div", {
      className: "px-2 py-1.5",
      style: {
        borderTop: "1px solid rgba(201, 169, 97, 0.15)",
        background: "rgba(10, 6, 4, 0.6)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between gap-1 mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[8px] tracking-[0.2em] uppercase",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#9a8765"
      }
    }, "Counters"), (t.powerMod !== 0 || t.toughnessMod !== 0) && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return resetPT(t.id);
      },
      className: "flex items-center gap-0.5 text-[8px] tracking-widest uppercase px-1 py-0.5 active:scale-95",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#9a8765",
        border: "1px solid rgba(154, 135, 101, 0.4)",
        borderRadius: "2px"
      }
    }, /*#__PURE__*/React.createElement(RotateCcw, {
      style: {
        fontSize: '0.5rem'
      }
    }), "Reset")), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between gap-0.5",
      style: {
        background: "rgba(232,148,122,0.08)",
        border: "1px solid rgba(232,148,122,0.3)",
        borderRadius: "2px",
        padding: "2px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustPT(t.id, 'power', -1);
      },
      className: "w-5 h-5 flex items-center justify-center active:scale-90",
      style: {
        color: "#d48a86"
      }
    }, /*#__PURE__*/React.createElement(Minus, {
      style: {
        fontSize: '0.625rem'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-0.5"
    }, /*#__PURE__*/React.createElement(Sword, {
      style: {
        color: "#d48a86",
        fontSize: '0.55rem'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: (t.powerMod || 0) === 0 ? "#9a8765" : "#d4b87a",
        fontSize: "0.65rem",
        fontWeight: 700,
        minWidth: "1rem",
        textAlign: "center"
      }
    }, (t.powerMod || 0) > 0 ? "+".concat(t.powerMod) : t.powerMod || 0)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustPT(t.id, 'power', 1);
      },
      className: "w-5 h-5 flex items-center justify-center active:scale-90",
      style: {
        color: "#d48a86"
      }
    }, /*#__PURE__*/React.createElement(Plus, {
      style: {
        fontSize: '0.625rem'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between gap-0.5",
      style: {
        background: "rgba(159,199,230,0.08)",
        border: "1px solid rgba(159,199,230,0.3)",
        borderRadius: "2px",
        padding: "2px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustPT(t.id, 'toughness', -1);
      },
      className: "w-5 h-5 flex items-center justify-center active:scale-90",
      style: {
        color: "#9fc7e6"
      }
    }, /*#__PURE__*/React.createElement(Minus, {
      style: {
        fontSize: '0.625rem'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-0.5"
    }, /*#__PURE__*/React.createElement(Shield, {
      style: {
        color: "#9fc7e6",
        fontSize: '0.55rem'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: (t.toughnessMod || 0) === 0 ? "#9a8765" : "#d4b87a",
        fontSize: "0.65rem",
        fontWeight: 700,
        minWidth: "1rem",
        textAlign: "center"
      }
    }, (t.toughnessMod || 0) > 0 ? "+".concat(t.toughnessMod) : t.toughnessMod || 0)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustPT(t.id, 'toughness', 1);
      },
      className: "w-5 h-5 flex items-center justify-center active:scale-90",
      style: {
        color: "#9fc7e6"
      }
    }, /*#__PURE__*/React.createElement(Plus, {
      style: {
        fontSize: '0.625rem'
      }
    })))), /*#__PURE__*/React.createElement("div", {
      className: "mt-1.5 pt-1.5",
      style: {
        borderTop: "1px dashed rgba(201, 169, 97, 0.15)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-2 gap-1"
    }, COUNTER_TYPES.map(function (ct) {
      var _t$counters;
      var value = ((_t$counters = t.counters) === null || _t$counters === void 0 ? void 0 : _t$counters[ct.id]) || 0;
      var active = value > 0;
      return /*#__PURE__*/React.createElement("div", {
        key: ct.id,
        className: "flex items-center justify-between gap-0.5",
        style: {
          background: active ? "".concat(ct.color, "14") : 'transparent',
          border: "1px solid ".concat(active ? ct.color + '55' : 'rgba(154,135,101,0.2)'),
          borderRadius: "2px",
          padding: "1px"
        }
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return adjustTokenCounter(t.id, ct.id, -1);
        },
        className: "w-4 h-4 flex items-center justify-center active:scale-90",
        style: {
          color: ct.color,
          opacity: active ? 1 : 0.4
        }
      }, /*#__PURE__*/React.createElement(Minus, {
        style: {
          fontSize: '0.5rem'
        }
      })), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-0.5"
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: '0.45rem',
          color: ct.color,
          fontFamily: "'Cinzel', serif",
          fontWeight: 600
        }
      }, ct.short), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "'JetBrains Mono', monospace",
          color: active ? "#d4b87a" : "#6a5a42",
          fontSize: "0.6rem",
          fontWeight: 700,
          minWidth: "0.875rem",
          textAlign: "center"
        }
      }, value)), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return adjustTokenCounter(t.id, ct.id, 1);
        },
        className: "w-4 h-4 flex items-center justify-center active:scale-90",
        style: {
          color: ct.color
        }
      }, /*#__PURE__*/React.createElement(Plus, {
        style: {
          fontSize: '0.5rem'
        }
      })));
    })))));
  })))), activeTab === 'life' && /*#__PURE__*/React.createElement("section", {
    className: "mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-[10px] sm:text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, "Life Totals")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center",
    style: {
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px",
      overflow: "hidden"
    }
  }, [2, 3, 4].map(function (n) {
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      onClick: function onClick() {
        return setPlayerCount(n);
      },
      className: "px-2 py-1 text-[10px] active:scale-95 transition-transform",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        color: players.length === n ? "#1a110a" : "#c9a961",
        background: players.length === n ? "linear-gradient(180deg, #f5d98f, #c9a961)" : "transparent"
      }
    }, n, "P");
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowResetConfirm(true);
    },
    className: "flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-1 active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    },
    title: "Reset all life to 40"
  }, /*#__PURE__*/React.createElement(Undo, {
    style: {
      fontSize: '0.75rem'
    }
  }), "Reset"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowNewGameMenu(true);
    },
    className: "flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-1 active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#8fbc8f",
      border: "1px solid rgba(143, 188, 143, 0.4)",
      borderRadius: "2px"
    },
    title: "Start a new game"
  }, /*#__PURE__*/React.createElement(Plus, {
    style: {
      fontSize: '0.75rem'
    }
  }), "New Game"), lifeHistory.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: undoLifeChange,
    className: "flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-1 active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9fc7e6",
      border: "1px solid rgba(159, 199, 230, 0.4)",
      borderRadius: "2px"
    },
    title: "Undo last life change"
  }, /*#__PURE__*/React.createElement(Undo, {
    style: {
      fontSize: '0.75rem',
      transform: 'scaleX(-1)'
    }
  }), "Undo"))), /*#__PURE__*/React.createElement("div", {
    className: players.length === 2 ? "grid grid-cols-1 gap-3" : players.length === 3 ? "grid grid-cols-1 sm:grid-cols-3 gap-3" : "grid grid-cols-2 gap-3"
  }, players.map(function (p, idx) {
    var isActive = idx === activePlayerIndex;
    var lifeColor = p.life <= 0 ? "#a0302c" : p.life <= 10 ? "#d48a86" : "#d4b87a";
    var isFlipped = playerFlipped[idx] || false;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "relative flex flex-col overflow-hidden",
      style: {
        background: "linear-gradient(180deg, rgba(20, 14, 8, 0.9), rgba(10, 6, 4, 0.7))",
        border: "1.5px solid ".concat(isActive ? p.color : "rgba(201, 169, 97, 0.3)"),
        borderRadius: "3px",
        boxShadow: isActive ? "0 0 20px ".concat(p.color, "40, inset 0 1px 0 rgba(255, 255, 255, 0.04)") : "inset 0 1px 0 rgba(255, 255, 255, 0.03)",
        minHeight: "180px",
        transform: isFlipped ? "rotate(180deg)" : "none",
        transition: "transform 0.3s ease"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between px-3 py-2",
      style: {
        borderBottom: "1px solid ".concat(p.color, "33"),
        background: "linear-gradient(90deg, ".concat(p.color, "15, transparent)")
      }
    }, editPlayerName === p.id ? /*#__PURE__*/React.createElement("input", {
      type: "text",
      value: editPlayerNameValue,
      onChange: function onChange(e) {
        return setEditPlayerNameValue(e.target.value);
      },
      onBlur: function onBlur() {
        return renamePlayer(p.id, editPlayerNameValue);
      },
      onKeyDown: function onKeyDown(e) {
        if (e.key === 'Enter') renamePlayer(p.id, editPlayerNameValue);
        if (e.key === 'Escape') {
          setEditPlayerName(null);
          setEditPlayerNameValue("");
        }
      },
      autoFocus: true,
      maxLength: 20,
      className: "bg-transparent outline-none text-sm flex-1 min-w-0",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#e8dcc4",
        borderBottom: "1px solid ".concat(p.color)
      }
    }) : /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setEditPlayerName(p.id);
        setEditPlayerNameValue(p.name);
      },
      className: "text-left flex-1 min-w-0 truncate text-sm tracking-wide active:opacity-70",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#e8dcc4",
        fontWeight: 600
      },
      "aria-label": "Rename player"
    }, p.name), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setCmdrDamageFor(p.id);
      },
      className: "ml-2 px-1.5 py-0.5 text-[9px] tracking-widest uppercase active:scale-95 flex-shrink-0",
      style: {
        fontFamily: "'Cinzel', serif",
        color: p.color,
        border: "1px solid ".concat(p.color, "66"),
        borderRadius: "2px"
      },
      title: "Commander damage"
    }, "C-DMG"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        // Cycle through adding counters: poison → energy → experience → tax → none
        if ((p.poison || 0) === 0 && (p.energy || 0) === 0 && (p.experience || 0) === 0 && (p.commanderTax || 0) === 0) {
          adjustCounter(p.id, 'poison', 1);
        } else if ((p.poison || 0) > 0 && (p.energy || 0) === 0) {
          adjustCounter(p.id, 'energy', 1);
        } else if ((p.energy || 0) > 0 && (p.experience || 0) === 0) {
          adjustCounter(p.id, 'experience', 1);
        } else if ((p.experience || 0) > 0 && (p.commanderTax || 0) === 0) {
          adjustCounter(p.id, 'commanderTax', 1);
        }
      },
      className: "ml-1 px-1.5 py-0.5 text-[9px] active:scale-95 flex-shrink-0",
      style: {
        fontFamily: "'Cinzel', serif",
        color: p.color,
        border: "1px solid ".concat(p.color, "66"),
        borderRadius: "2px"
      },
      title: "Add counters (\u2620\uFE0F\u2192\u26A1\u2192\u2B50\u2192\uD83D\uDC51)"
    }, "+CTR"), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        var newFlipped = _toConsumableArray(playerFlipped);
        newFlipped[idx] = !newFlipped[idx];
        setPlayerFlipped(newFlipped);
      },
      className: "ml-1 px-1.5 py-0.5 text-[9px] active:scale-95 flex-shrink-0",
      style: {
        fontFamily: "'Cinzel', serif",
        color: p.color,
        border: "1px solid ".concat(p.color, "66"),
        borderRadius: "2px"
      },
      title: "Flip 180\xB0 for opponent view"
    }, "\u27F2")), /*#__PURE__*/React.createElement("div", {
      className: "flex-1 flex items-center justify-center relative"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustLife(p.id, -1);
      },
      className: "absolute inset-y-0 left-0 w-1/2 flex items-center justify-start pl-4 active:bg-red-900/10 transition-colors",
      "aria-label": "Decrease life"
    }, /*#__PURE__*/React.createElement(Minus, {
      style: {
        color: "#d48a86",
        fontSize: '1.25rem',
        opacity: 0.7
      }
    })), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustLife(p.id, 1);
      },
      className: "absolute inset-y-0 right-0 w-1/2 flex items-center justify-end pr-4 active:bg-green-900/10 transition-colors",
      "aria-label": "Increase life"
    }, /*#__PURE__*/React.createElement(Plus, {
      style: {
        color: "#b4d4a0",
        fontSize: '1.25rem',
        opacity: 0.7
      }
    })), /*#__PURE__*/React.createElement("span", {
      className: "pointer-events-none relative z-10",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: players.length >= 4 ? "3rem" : "4rem",
        fontWeight: 700,
        color: lifeColor,
        textShadow: "0 0 20px ".concat(lifeColor, "66, 0 2px 4px rgba(0,0,0,0.8)"),
        lineHeight: 1
      }
    }, p.life), lifeDelta[p.id] && /*#__PURE__*/React.createElement("span", {
      key: "".concat(p.id, "-").concat(lifeDelta[p.id].delta),
      style: {
        position: 'absolute',
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        fontSize: '1.6rem',
        color: lifeDelta[p.id].delta > 0 ? '#b4d4a0' : '#d48a86',
        textShadow: "0 0 16px ".concat(lifeDelta[p.id].delta > 0 ? 'rgba(107,142,90,0.8)' : 'rgba(160,48,44,0.8)'),
        pointerEvents: 'none',
        animation: 'lifeDeltaFade 2.5s ease-out forwards',
        whiteSpace: 'nowrap',
        zIndex: 20
      }
    }, lifeDelta[p.id].delta > 0 ? "+".concat(lifeDelta[p.id].delta) : lifeDelta[p.id].delta)), ((p.poison || 0) > 0 || (p.energy || 0) > 0 || (p.experience || 0) > 0 || (p.commanderTax || 0) > 0) && /*#__PURE__*/React.createElement("div", {
      className: "px-2 pb-2 flex flex-wrap gap-1.5 justify-center"
    }, (p.poison || 0) > 0 && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1 px-2 py-1 rounded",
      style: {
        background: 'rgba(160, 48, 44, 0.15)',
        border: '1px solid rgba(160, 48, 44, 0.3)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustCounter(p.id, 'poison', -1);
      },
      className: "text-[10px] active:scale-90",
      style: {
        color: '#d48a86'
      }
    }, "\u2212"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: '#d48a86',
        fontWeight: 600
      }
    }, "\u2620\uFE0F ", p.poison), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustCounter(p.id, 'poison', 1);
      },
      className: "text-[10px] active:scale-90",
      style: {
        color: '#d48a86'
      }
    }, "+")), (p.energy || 0) > 0 && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1 px-2 py-1 rounded",
      style: {
        background: 'rgba(159, 199, 230, 0.15)',
        border: '1px solid rgba(159, 199, 230, 0.3)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustCounter(p.id, 'energy', -1);
      },
      className: "text-[10px] active:scale-90",
      style: {
        color: '#9fc7e6'
      }
    }, "\u2212"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: '#9fc7e6',
        fontWeight: 600
      }
    }, "\u26A1 ", p.energy), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustCounter(p.id, 'energy', 1);
      },
      className: "text-[10px] active:scale-90",
      style: {
        color: '#9fc7e6'
      }
    }, "+")), (p.experience || 0) > 0 && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1 px-2 py-1 rounded",
      style: {
        background: 'rgba(201, 169, 97, 0.15)',
        border: '1px solid rgba(201, 169, 97, 0.3)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustCounter(p.id, 'experience', -1);
      },
      className: "text-[10px] active:scale-90",
      style: {
        color: '#c9a961'
      }
    }, "\u2212"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: '#c9a961',
        fontWeight: 600
      }
    }, "\u2B50 ", p.experience), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustCounter(p.id, 'experience', 1);
      },
      className: "text-[10px] active:scale-90",
      style: {
        color: '#c9a961'
      }
    }, "+")), (p.commanderTax || 0) > 0 && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1 px-2 py-1 rounded",
      style: {
        background: 'rgba(180, 212, 160, 0.15)',
        border: '1px solid rgba(180, 212, 160, 0.3)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustCounter(p.id, 'commanderTax', -1);
      },
      className: "text-[10px] active:scale-90",
      style: {
        color: '#b4d4a0'
      }
    }, "\u2212"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '0.75rem',
        color: '#b4d4a0',
        fontWeight: 600
      }
    }, "\uD83D\uDC51 ", p.commanderTax), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustCounter(p.id, 'commanderTax', 1);
      },
      className: "text-[10px] active:scale-90",
      style: {
        color: '#b4d4a0'
      }
    }, "+"))), /*#__PURE__*/React.createElement("div", {
      className: "flex border-t",
      style: {
        borderColor: "rgba(201, 169, 97, 0.2)"
      }
    }, [-5, -1, 1, 5].map(function (delta) {
      return /*#__PURE__*/React.createElement("button", {
        key: delta,
        onClick: function onClick() {
          return adjustLife(p.id, delta);
        },
        className: "flex-1 py-2 text-xs active:scale-95 transition-transform",
        style: {
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          color: delta > 0 ? "#b4d4a0" : "#d48a86",
          background: delta > 0 ? "rgba(107, 142, 90, 0.08)" : "rgba(160, 48, 44, 0.08)",
          borderLeft: delta === -5 ? "none" : "1px solid rgba(201, 169, 97, 0.15)"
        }
      }, delta > 0 ? "+".concat(delta) : delta);
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 mt-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] tracking-widest uppercase",
    style: {
      color: "#6a5a42",
      fontFamily: "'Cinzel', serif"
    }
  }, "Reset to"), [20, 30, 40].map(function (n) {
    return /*#__PURE__*/React.createElement("button", {
      key: n,
      onClick: function onClick() {
        return resetLife(n);
      },
      className: "px-3 py-1 text-[10px] tracking-widest active:scale-95",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600,
        color: "#c9a961",
        border: "1px solid rgba(201, 169, 97, 0.3)",
        borderRadius: "2px"
      }
    }, n);
  }))), showResetConfirm && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center px-4",
    style: {
      background: 'rgba(0, 0, 0, 0.85)'
    },
    onClick: function onClick() {
      return setShowResetConfirm(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm p-6 rounded-lg",
    style: {
      background: 'linear-gradient(180deg, #2d1f14 0%, #1a110a 100%)',
      border: '2px solid #d48a86',
      boxShadow: '0 0 30px rgba(212, 138, 134, 0.3)'
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-center mb-4",
    style: {
      fontFamily: "'Cinzel', serif",
      color: '#d48a86',
      fontSize: '1.1rem',
      fontWeight: 600
    }
  }, "Reset Life Totals?"), /*#__PURE__*/React.createElement("p", {
    className: "text-center mb-6",
    style: {
      color: '#9a8765',
      fontSize: '0.9rem'
    }
  }, "This will reset all players to 40 life and clear commander damage."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowResetConfirm(false);
    },
    className: "flex-1 py-3 rounded active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      background: 'rgba(154, 135, 101, 0.2)',
      border: '1px solid rgba(154, 135, 101, 0.4)',
      color: '#9a8765',
      fontSize: '0.9rem',
      fontWeight: 600,
      letterSpacing: '0.05em'
    }
  }, "CANCEL"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return resetLife(40);
    },
    className: "flex-1 py-3 rounded active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      background: 'linear-gradient(180deg, #d48a86, #a0302c)',
      border: '1px solid #d48a86',
      color: '#ffffff',
      fontSize: '0.9rem',
      fontWeight: 600,
      letterSpacing: '0.05em'
    }
  }, "RESET")))), showNewGameMenu && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center px-4",
    style: {
      background: 'rgba(0, 0, 0, 0.85)'
    },
    onClick: function onClick() {
      return setShowNewGameMenu(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm p-6 rounded-lg",
    style: {
      background: 'linear-gradient(180deg, #2d1f14 0%, #1a110a 100%)',
      border: '2px solid #8fbc8f',
      boxShadow: '0 0 30px rgba(143, 188, 143, 0.3)'
    },
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-center mb-2",
    style: {
      fontFamily: "'Cinzel', serif",
      color: '#8fbc8f',
      fontSize: '1.1rem',
      fontWeight: 600
    }
  }, "Start New Game"), /*#__PURE__*/React.createElement("p", {
    className: "text-center mb-6",
    style: {
      color: '#9a8765',
      fontSize: '0.85rem'
    }
  }, "This will reset everything and start fresh"), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block mb-2 text-xs uppercase tracking-widest",
    style: {
      fontFamily: "'Cinzel', serif",
      color: '#c9a961'
    }
  }, "Players"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, [2, 3, 4].map(function (count) {
    return /*#__PURE__*/React.createElement("button", {
      key: count,
      onClick: function onClick() {
        var life = count === 2 ? 20 : 40;
        startNewGame(count, life);
      },
      className: "py-4 rounded active:scale-95",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        background: 'rgba(143, 188, 143, 0.15)',
        border: '1px solid rgba(143, 188, 143, 0.4)',
        color: '#8fbc8f',
        fontSize: '1.5rem',
        fontWeight: 700
      }
    }, count, "P");
  }))), /*#__PURE__*/React.createElement("div", {
    className: "mb-5"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block mb-2 text-xs uppercase tracking-widest",
    style: {
      fontFamily: "'Cinzel', serif",
      color: '#c9a961'
    }
  }, "Format"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return startNewGame(4, 40);
    },
    className: "w-full py-3 rounded active:scale-95 flex items-center justify-between px-4",
    style: {
      fontFamily: "'Cinzel', serif",
      background: 'rgba(143, 188, 143, 0.15)',
      border: '1px solid rgba(143, 188, 143, 0.4)',
      color: '#d4b87a',
      fontSize: '0.9rem',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "Commander"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8fbc8f'
    }
  }, "4P \xB7 40 Life")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return startNewGame(2, 20);
    },
    className: "w-full py-3 rounded active:scale-95 flex items-center justify-between px-4",
    style: {
      fontFamily: "'Cinzel', serif",
      background: 'rgba(143, 188, 143, 0.15)',
      border: '1px solid rgba(143, 188, 143, 0.4)',
      color: '#d4b87a',
      fontSize: '0.9rem',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", null, "Standard / Modern"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8fbc8f'
    }
  }, "2P \xB7 20 Life")))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setShowNewGameMenu(false);
    },
    className: "w-full py-2 rounded active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      background: 'rgba(154, 135, 101, 0.2)',
      border: '1px solid rgba(154, 135, 101, 0.4)',
      color: '#9a8765',
      fontSize: '0.85rem',
      letterSpacing: '0.05em'
    }
  }, "CANCEL"))), activeTab === 'tools' && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6 mb-6"
  }, /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-[10px] sm:text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, "Game State")), /*#__PURE__*/React.createElement("div", {
    className: "p-3 space-y-3",
    style: {
      background: "linear-gradient(180deg, rgba(20, 14, 8, 0.8), rgba(10, 6, 4, 0.6))",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "3px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 min-w-0 flex-1"
  }, dayNight === 'night' ? /*#__PURE__*/React.createElement(Moon, {
    style: {
      color: "#9fc7e6",
      fontSize: '1.1rem'
    }
  }) : /*#__PURE__*/React.createElement(Sun, {
    style: {
      color: "#f5d98f",
      fontSize: '1.1rem'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Day / Night"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      fontFamily: "'Cinzel', serif",
      color: dayNight ? dayNight === 'night' ? "#9fc7e6" : "#f5d98f" : "#6a5a42",
      fontWeight: 600
    }
  }, dayNight === 'day' ? 'Day' : dayNight === 'night' ? 'Night' : 'Inactive'))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1.5 flex-shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: toggleDayNight,
    className: "px-2.5 py-1.5 text-[10px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: dayNight ? "#1a110a" : "#c9a961",
      background: dayNight ? "linear-gradient(180deg, #f5d98f, #c9a961)" : "transparent",
      border: "1px solid ".concat(dayNight ? "#c9a961" : "rgba(201, 169, 97, 0.4)"),
      borderRadius: "2px"
    }
  }, dayNight === 'day' ? 'To Night' : dayNight === 'night' ? 'To Day' : 'Begin'), dayNight && /*#__PURE__*/React.createElement("button", {
    onClick: clearDayNight,
    className: "w-7 h-7 flex items-center justify-center active:scale-90",
    style: {
      border: "1px solid rgba(154, 135, 101, 0.3)",
      borderRadius: "2px",
      color: "#9a8765"
    },
    "aria-label": "Clear day/night"
  }, /*#__PURE__*/React.createElement(XIcon, {
    style: {
      fontSize: '0.75rem'
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "h-px",
    style: {
      background: "rgba(201, 169, 97, 0.15)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement(Crown, {
    style: {
      color: monarch ? "#d4b87a" : "#6a5a42",
      fontSize: '1.1rem'
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Monarch"), monarch && /*#__PURE__*/React.createElement("span", {
    className: "text-xs",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d4b87a",
      fontWeight: 600
    }
  }, (_players$find = players.find(function (p) {
    return p.id === monarch;
  })) === null || _players$find === void 0 ? void 0 : _players$find.name)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1.5"
  }, players.map(function (p) {
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: function onClick() {
        return setMonarchPlayer(p.id);
      },
      className: "px-2 py-1.5 text-[10px] tracking-widest uppercase active:scale-95 flex items-center justify-center gap-1.5",
      style: {
        fontFamily: "'Cinzel', serif",
        color: monarch === p.id ? "#1a110a" : p.color,
        background: monarch === p.id ? "linear-gradient(180deg, ".concat(p.color, "cc, ").concat(p.color, "88)") : 'transparent',
        border: "1px solid ".concat(monarch === p.id ? p.color : p.color + '55'),
        borderRadius: "2px"
      }
    }, monarch === p.id && /*#__PURE__*/React.createElement(Crown, {
      style: {
        fontSize: '0.75rem'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate"
    }, p.name));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "h-px",
    style: {
      background: "rgba(201, 169, 97, 0.15)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement(Sword, {
    style: {
      color: initiative ? "#e8947a" : "#6a5a42",
      fontSize: '1.1rem'
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Initiative"), initiative && /*#__PURE__*/React.createElement("span", {
    className: "text-xs",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#e8947a",
      fontWeight: 600
    }
  }, (_players$find2 = players.find(function (p) {
    return p.id === initiative;
  })) === null || _players$find2 === void 0 ? void 0 : _players$find2.name)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1.5"
  }, players.map(function (p) {
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: function onClick() {
        return setInitiativePlayer(p.id);
      },
      className: "px-2 py-1.5 text-[10px] tracking-widest uppercase active:scale-95 flex items-center justify-center gap-1.5",
      style: {
        fontFamily: "'Cinzel', serif",
        color: initiative === p.id ? "#1a110a" : p.color,
        background: initiative === p.id ? "linear-gradient(180deg, ".concat(p.color, "cc, ").concat(p.color, "88)") : 'transparent',
        border: "1px solid ".concat(initiative === p.id ? p.color : p.color + '55'),
        borderRadius: "2px"
      }
    }, initiative === p.id && /*#__PURE__*/React.createElement(Sword, {
      style: {
        fontSize: '0.75rem'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate"
    }, p.name));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "h-px",
    style: {
      background: "rgba(201, 169, 97, 0.15)"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    style: {
      color: citysBlessing.length > 0 ? "#c9a9c9" : "#6a5a42",
      fontSize: '1.1rem'
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "City's Blessing"), /*#__PURE__*/React.createElement("span", {
    className: "text-[9px]",
    style: {
      color: "#6a5a42"
    }
  }, "(10+ permanents)")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-1.5"
  }, players.map(function (p) {
    var blessed = citysBlessing.includes(p.id);
    return /*#__PURE__*/React.createElement("button", {
      key: p.id,
      onClick: function onClick() {
        return toggleCitysBlessing(p.id);
      },
      className: "px-2 py-1.5 text-[10px] tracking-widest uppercase active:scale-95 flex items-center justify-center gap-1.5",
      style: {
        fontFamily: "'Cinzel', serif",
        color: blessed ? "#1a110a" : p.color,
        background: blessed ? "linear-gradient(180deg, ".concat(p.color, "cc, ").concat(p.color, "88)") : 'transparent',
        border: "1px solid ".concat(blessed ? p.color : p.color + '55'),
        borderRadius: "2px"
      }
    }, blessed && /*#__PURE__*/React.createElement(Sparkles, {
      style: {
        fontSize: '0.75rem'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "truncate"
    }, p.name));
  }))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-[10px] sm:text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, "Turn Tracker")), /*#__PURE__*/React.createElement("button", {
    onClick: resetTurnTracker,
    className: "flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-1 active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765",
      border: "1px solid rgba(154, 135, 101, 0.3)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement(Undo, {
    style: {
      fontSize: '0.75rem'
    }
  }), "Reset")), /*#__PURE__*/React.createElement("div", {
    className: "p-4",
    style: {
      background: "linear-gradient(180deg, rgba(20, 14, 8, 0.8), rgba(10, 6, 4, 0.6))",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "3px",
      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-baseline gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Turn"), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-bold",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#d4b87a",
      textShadow: "0 1px 2px rgba(0,0,0,0.5)"
    }
  }, turnNumber)), players[activePlayerIndex] && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 px-2.5 py-1",
    style: {
      background: "".concat(players[activePlayerIndex].color, "18"),
      border: "1px solid ".concat(players[activePlayerIndex].color, "66"),
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement(User, {
    style: {
      color: players[activePlayerIndex].color,
      fontSize: '0.8rem'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs tracking-wide",
    style: {
      fontFamily: "'Cinzel', serif",
      color: players[activePlayerIndex].color,
      fontWeight: 600
    }
  }, players[activePlayerIndex].name))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1 mb-3 overflow-x-auto no-scrollbar pb-1"
  }, PHASES.map(function (phase, idx) {
    var isCurrent = idx === phaseIndex;
    var isPast = idx < phaseIndex;
    return /*#__PURE__*/React.createElement("button", {
      key: phase,
      onClick: function onClick() {
        haptic(15);
        setPhaseIndex(idx);
      },
      className: "flex-shrink-0 px-2 py-1.5 text-[9px] tracking-widest uppercase transition-all active:scale-95",
      style: {
        fontFamily: "'Cinzel', serif",
        fontWeight: isCurrent ? 600 : 500,
        color: isCurrent ? "#1a110a" : isPast ? "#8a7555" : "#c9a961",
        background: isCurrent ? "linear-gradient(180deg, #f5d98f, #c9a961)" : "transparent",
        border: "1px solid ".concat(isCurrent ? "#c9a961" : "rgba(201, 169, 97, 0.3)"),
        borderRadius: "2px",
        boxShadow: isCurrent ? "0 2px 8px rgba(201, 169, 97, 0.3)" : "none",
        opacity: isPast ? 0.6 : 1
      }
    }, phase);
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: retreatPhase,
    className: "flex-1 py-2.5 flex items-center justify-center gap-2 active:scale-95 transition-transform",
    style: {
      color: "#c9a961",
      background: "linear-gradient(180deg, rgba(201, 169, 97, 0.08), rgba(201, 169, 97, 0.02))",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement(ChevronLeft, {
    style: {
      fontSize: '0.9rem'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] tracking-widest uppercase",
    style: {
      fontFamily: "'Cinzel', serif"
    }
  }, "Prev")), /*#__PURE__*/React.createElement("button", {
    onClick: advancePhase,
    className: "flex-[2] py-2.5 flex items-center justify-center gap-2 active:scale-95 transition-transform",
    style: {
      color: "#1a110a",
      fontWeight: 600,
      background: "linear-gradient(180deg, #f5d98f, #c9a961)",
      border: "1px solid #c9a961",
      borderRadius: "2px",
      boxShadow: "0 2px 8px rgba(201, 169, 97, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] tracking-widest uppercase",
    style: {
      fontFamily: "'Cinzel', serif"
    }
  }, phaseIndex >= PHASES.length - 1 ? "End turn" : "Next phase"), /*#__PURE__*/React.createElement(ChevronRight, {
    style: {
      fontSize: '0.9rem'
    }
  }))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-4",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-[10px] sm:text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      fontWeight: 600
    }
  }, "Dice & Picks")), diceRolls.length > 0 && /*#__PURE__*/React.createElement("button", {
    onClick: clearRolls,
    className: "text-[10px] tracking-widest uppercase px-2 py-1 active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765",
      border: "1px solid rgba(154, 135, 101, 0.3)",
      borderRadius: "2px"
    }
  }, "Clear")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-2 mb-3"
  }, [4, 6, 8, 10, 12, 20].map(function (sides) {
    return /*#__PURE__*/React.createElement("button", {
      key: sides,
      onClick: function onClick() {
        return rollDie(sides);
      },
      disabled: rolling !== null,
      className: "py-4 active:scale-95 transition-transform disabled:opacity-50",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700,
        fontSize: "1rem",
        color: "#c9a961",
        background: "linear-gradient(180deg, rgba(201, 169, 97, 0.1), rgba(201, 169, 97, 0.02))",
        border: "1px solid rgba(201, 169, 97, 0.3)",
        borderRadius: "2px",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)"
      }
    }, "d", sides);
  }), /*#__PURE__*/React.createElement("button", {
    onClick: flipCoin,
    disabled: rolling !== null,
    className: "py-4 flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50",
    style: {
      color: "#c9a961",
      background: "linear-gradient(180deg, rgba(201, 169, 97, 0.1), rgba(201, 169, 97, 0.02))",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px"
    },
    title: "Flip coin"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Cinzel', serif",
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      fontWeight: 600
    }
  }, "Coin")), /*#__PURE__*/React.createElement("button", {
    onClick: randomPlayer,
    disabled: rolling !== null || players.length === 0,
    className: "py-4 flex items-center justify-center gap-1 active:scale-95 transition-transform disabled:opacity-50",
    style: {
      color: "#c9a961",
      background: "linear-gradient(180deg, rgba(201, 169, 97, 0.1), rgba(201, 169, 97, 0.02))",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px"
    },
    title: "Random player"
  }, /*#__PURE__*/React.createElement(Shuffle, {
    style: {
      fontSize: '0.8rem'
    }
  }))), (rolling || diceRolls[0]) && /*#__PURE__*/React.createElement("div", {
    className: "p-4 text-center mb-3",
    style: {
      background: "linear-gradient(180deg, rgba(20, 14, 8, 0.9), rgba(10, 6, 4, 0.7))",
      border: "1.5px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "3px",
      boxShadow: "0 0 20px rgba(201, 169, 97, 0.1)"
    }
  }, rolling ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase mb-1",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Rolling\u2026"), /*#__PURE__*/React.createElement("div", {
    className: "text-4xl font-bold animate-pulse",
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      color: "#d4b87a"
    }
  }, "?")) : diceRolls[0] && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase mb-1",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, diceRolls[0].sides === 'coin' ? 'Coin flip' : diceRolls[0].sides === 'player' ? 'Random pick' : "d".concat(diceRolls[0].sides)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: diceRolls[0].sides === 'player' || diceRolls[0].sides === 'coin' ? "'Cinzel', serif" : "'JetBrains Mono', monospace",
      fontSize: diceRolls[0].sides === 'player' ? "1.5rem" : "3rem",
      fontWeight: 700,
      color: "#d4b87a",
      textShadow: "0 0 20px rgba(212, 184, 122, 0.4)",
      lineHeight: 1.1
    }
  }, diceRolls[0].result))), diceRolls.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "flex gap-1.5 overflow-x-auto no-scrollbar pb-1"
  }, diceRolls.slice(1).map(function (r) {
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      className: "flex-shrink-0 px-2 py-1 text-[10px]",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: "#8a7555",
        background: "rgba(20, 14, 8, 0.6)",
        border: "1px solid rgba(154, 135, 101, 0.25)",
        borderRadius: "2px"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#6a5a42"
      }
    }, r.sides === 'coin' ? '🪙' : r.sides === 'player' ? '👤' : "d".concat(r.sides, ":")), " ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#c9a961",
        fontWeight: 600
      }
    }, r.result));
  }))), /*#__PURE__*/React.createElement(KeywordIndex, null)), /*#__PURE__*/React.createElement("footer", {
    className: "mt-10 pt-5",
    style: {
      borderTop: "1px solid rgba(201, 169, 97, 0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center gap-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-px w-6",
    style: {
      background: "linear-gradient(90deg, transparent, rgba(201, 169, 97, 0.5))"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[8px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#8a7555"
    }
  }, "Forged by"), /*#__PURE__*/React.createElement("div", {
    className: "h-px w-6",
    style: {
      background: "linear-gradient(90deg, rgba(201, 169, 97, 0.5), transparent)"
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-sm tracking-[0.25em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      background: "linear-gradient(180deg, #f5d98f 0%, #d4b87a 40%, #8a6f3a 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }
  }, "Sodium Fabrications")), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-[10px] italic px-4",
    style: {
      color: "#6a5a42",
      fontFamily: "'Crimson Pro', serif",
      lineHeight: 1.5
    }
  }, "Card data & art via Scryfall. Saved locally between sessions.", /*#__PURE__*/React.createElement("br", null), "Not affiliated with Wizards of the Coast.")))), copyOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-start justify-center overflow-y-auto",
    style: {
      background: "rgba(5, 3, 10, 0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)"
    },
    onClick: function onClick() {
      return setCopyOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-2xl my-4 mx-3",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "3px",
      boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-4 py-3",
    style: {
      borderBottom: "1px solid rgba(201, 169, 97, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Copy, {
    style: {
      color: "#9fc7e6",
      fontSize: '1rem'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d4b87a",
      fontWeight: 600
    }
  }, "Copy Token")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setCopyOpen(false);
    },
    className: "w-8 h-8 flex items-center justify-center active:scale-90",
    style: {
      color: "#9a8765"
    },
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(XIcon, {
    style: {
      fontSize: '1rem'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 px-4 pt-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setCopyScope("tokens");
    },
    className: "flex-1 py-1.5 text-[10px] tracking-widest uppercase transition-all active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: copyScope === "tokens" ? "#1a110a" : "#c9a961",
      background: copyScope === "tokens" ? "#c9a961" : "transparent",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    }
  }, "Tokens"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setCopyScope("creatures");
    },
    className: "flex-1 py-1.5 text-[10px] tracking-widest uppercase transition-all active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: copyScope === "creatures" ? "#1a110a" : "#c9a961",
      background: copyScope === "creatures" ? "#c9a961" : "transparent",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    }
  }, "All Creatures")), /*#__PURE__*/React.createElement("div", {
    className: "px-4 pt-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative",
    style: {
      background: "rgba(20, 14, 8, 0.6)",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement(Search, {
    style: {
      color: "#9a8765",
      fontSize: '1rem',
      position: 'absolute',
      left: '0.75rem',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: copyQuery,
    onChange: function onChange(e) {
      return setCopyQuery(e.target.value);
    },
    autoFocus: true,
    placeholder: copyScope === "tokens" ? "Search tokens to copy..." : "Search creatures to copy...",
    className: "search-green w-full bg-transparent pl-10 pr-10 py-3 text-base outline-none",
    style: {
      fontFamily: "'Crimson Pro', serif"
    }
  }), copyQuery && /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setCopyQuery("");
      setCopyResults([]);
    },
    className: "absolute right-2 top-1/2 -translate-y-1/2 p-1.5",
    style: {
      color: "#9a8765"
    },
    "aria-label": "Clear"
  }, /*#__PURE__*/React.createElement(XIcon, null))), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] italic mt-2 text-center",
    style: {
      color: "#6a5a42"
    }
  }, "Tap a result to summon it as a copy")), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 max-h-[60vh] overflow-y-auto"
  }, copyLoading && /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center py-6"
  }, /*#__PURE__*/React.createElement(Loader2, {
    className: "animate-spin",
    style: {
      color: "#c9a961",
      fontSize: '1.25rem'
    }
  })), copyError && !copyLoading && /*#__PURE__*/React.createElement("p", {
    className: "italic text-center py-4 text-sm",
    style: {
      color: "#9a8765"
    }
  }, copyError), !copyLoading && !copyError && copyResults.length === 0 && copyQuery.trim().length < 2 && /*#__PURE__*/React.createElement("p", {
    className: "italic text-center py-4 text-sm",
    style: {
      color: "#6a5a42"
    }
  }, "Type at least 2 characters..."), !copyLoading && copyResults.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2"
  }, copyResults.map(function (card) {
    var _card$image_uris7, _card$image_uris8, _card$card_faces6;
    var img = ((_card$image_uris7 = card.image_uris) === null || _card$image_uris7 === void 0 ? void 0 : _card$image_uris7.small) || ((_card$image_uris8 = card.image_uris) === null || _card$image_uris8 === void 0 ? void 0 : _card$image_uris8.normal) || ((_card$card_faces6 = card.card_faces) === null || _card$card_faces6 === void 0 || (_card$card_faces6 = _card$card_faces6[0]) === null || _card$card_faces6 === void 0 || (_card$card_faces6 = _card$card_faces6.image_uris) === null || _card$card_faces6 === void 0 ? void 0 : _card$card_faces6.small) || "";
    return /*#__PURE__*/React.createElement("button", {
      key: card.id,
      onClick: function onClick() {
        return addAsCopy(card);
      },
      className: "relative block w-full transition-all active:scale-95",
      style: {
        borderRadius: "4.75% / 3.5%",
        overflow: "hidden"
      }
    }, img ? /*#__PURE__*/React.createElement("img", {
      src: img,
      alt: card.name,
      className: "w-full h-auto block"
    }) : /*#__PURE__*/React.createElement("div", {
      className: "aspect-[5/7] flex items-center justify-center text-[10px] p-2 text-center",
      style: {
        background: "#2a1f14",
        color: "#c9a961"
      }
    }, card.name));
  }))))), numpadFor !== null && function () {
    var target = battlefield.find(function (t) {
      return t.id === numpadFor;
    });
    if (!target) return null;
    var pressKey = function pressKey(k) {
      haptic(15);
      if (k === 'clear') setNumpadValue("");else if (k === 'back') setNumpadValue(function (v) {
        return v.slice(0, -1);
      });else if (numpadValue.length < 3) setNumpadValue(function (v) {
        return (v + k).replace(/^0+(?=\d)/, "");
      });
    };
    var commit = function commit() {
      setCount(numpadFor, numpadValue === "" ? target.count : numpadValue);
      setNumpadFor(null);
      setNumpadValue("");
    };
    var quickDelta = function quickDelta(delta) {
      adjustCount(numpadFor, delta);
      // Update the displayed value to reflect new count
      var newCount = Math.max(0, Math.min(999, target.count + delta));
      setNumpadValue(String(newCount));
    };
    var keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"];
    var displayVal = numpadValue === "" ? String(target.count) : numpadValue;
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-50 flex items-end justify-center",
      style: {
        background: "rgba(5, 3, 10, 0.75)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)"
      },
      onClick: function onClick() {
        setNumpadFor(null);
        setNumpadValue("");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-full max-w-sm",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      style: {
        background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
        border: "1px solid rgba(201, 169, 97, 0.4)",
        borderTopLeftRadius: "6px",
        borderTopRightRadius: "6px",
        boxShadow: "0 -8px 40px rgba(0, 0, 0, 0.8)",
        paddingBottom: 'env(safe-area-inset-bottom)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between px-4 py-2.5",
      style: {
        borderBottom: "1px solid rgba(201, 169, 97, 0.2)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm truncate",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#e8dcc4",
        fontWeight: 600
      }
    }, target.name), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setNumpadFor(null);
        setNumpadValue("");
      },
      className: "w-7 h-7 flex items-center justify-center active:scale-90",
      style: {
        color: "#9a8765"
      },
      "aria-label": "Close"
    }, /*#__PURE__*/React.createElement(XIcon, {
      style: {
        fontSize: '0.875rem'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 px-4 pt-3 pb-2"
    }, [[-5, '-5'], [-1, '-1'], [1, '+1'], [5, '+5']].map(function (_ref30) {
      var _ref31 = _slicedToArray(_ref30, 2),
        d = _ref31[0],
        label = _ref31[1];
      return /*#__PURE__*/React.createElement("button", {
        key: d,
        onClick: function onClick() {
          return quickDelta(d);
        },
        className: "flex-1 py-3 text-base active:scale-95 transition-transform",
        style: {
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          color: d < 0 ? "#d48a86" : "#b4d4a0",
          background: d < 0 ? "rgba(160, 48, 44, 0.12)" : "rgba(107, 142, 90, 0.12)",
          border: "1px solid ".concat(d < 0 ? "rgba(160, 48, 44, 0.35)" : "rgba(107, 142, 90, 0.35)"),
          borderRadius: "2px"
        }
      }, label);
    })), /*#__PURE__*/React.createElement("div", {
      className: "px-4 pb-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-center py-3",
      style: {
        background: "rgba(10, 6, 4, 0.6)",
        border: "1.5px solid #c9a961",
        borderRadius: "2px",
        fontFamily: "'JetBrains Mono', monospace",
        color: "#d4b87a",
        fontWeight: 700,
        fontSize: "2rem",
        boxShadow: "0 0 16px rgba(201, 169, 97, 0.25)"
      }
    }, displayVal)), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-1.5 px-4 pb-2"
    }, keys.map(function (k) {
      return /*#__PURE__*/React.createElement("button", {
        key: k,
        onClick: function onClick() {
          return pressKey(k);
        },
        className: "py-3.5 text-base active:scale-95 transition-transform",
        style: {
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 600,
          color: k === 'clear' || k === 'back' ? "#d48a86" : "#e8dcc4",
          background: "linear-gradient(180deg, rgba(201, 169, 97, 0.08), rgba(201, 169, 97, 0.02))",
          border: "1px solid rgba(201, 169, 97, 0.25)",
          borderRadius: "2px"
        }
      }, k === 'back' ? '<-' : k === 'clear' ? 'C' : k);
    })), /*#__PURE__*/React.createElement("div", {
      className: "px-4 pb-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: commit,
      className: "w-full py-2.5 text-xs tracking-[0.3em] uppercase active:scale-95 transition-transform",
      style: {
        fontFamily: "'Cinzel', serif",
        fontWeight: 600,
        color: "#1a110a",
        background: "linear-gradient(180deg, #f5d98f, #c9a961)",
        border: "1px solid #c9a961",
        borderRadius: "2px"
      }
    }, "Set to ", displayVal))));
  }(), wipeConfirmOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
    style: {
      background: "rgba(5, 3, 10, 0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)"
    },
    onClick: function onClick() {
      return setWipeConfirmOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-sm",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
      border: "1px solid rgba(160, 48, 44, 0.5)",
      borderRadius: "3px",
      boxShadow: "0 0 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(160, 48, 44, 0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-5 text-center"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    style: {
      color: "#d48a86",
      fontSize: '2rem',
      margin: '0 auto 0.75rem'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-sm tracking-[0.25em] uppercase mb-2",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d48a86",
      fontWeight: 600
    }
  }, "Wipe battlefield?"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm italic mb-1",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#c9a961"
    }
  }, totalTokens, " token", totalTokens === 1 ? "" : "s", " across ", uniqueTypes, " type", uniqueTypes === 1 ? "" : "s"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] italic mb-5",
    style: {
      color: "#8a7555"
    }
  }, "You can undo this."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      haptic(25);
      setWipeConfirmOpen(false);
    },
    className: "flex-1 py-2.5 text-[10px] tracking-widest uppercase active:scale-95 transition-transform",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      background: "transparent",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: confirmWipe,
    className: "flex-1 py-2.5 text-[10px] tracking-widest uppercase active:scale-95 transition-transform",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: "#fff",
      background: "linear-gradient(180deg, #c0453f, #8a2d29)",
      border: "1px solid #a0302c",
      borderRadius: "2px",
      boxShadow: "0 2px 8px rgba(160, 48, 44, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.15)"
    }
  }, "Wipe"))))), sanctumOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto",
    style: {
      background: "radial-gradient(ellipse at top, rgba(40, 25, 60, 0.95) 0%, rgba(5, 3, 10, 0.98) 70%)",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      animation: "sanctumIn 0.4s ease-out"
    },
    onClick: function onClick() {
      setSanctumOpen(false);
      setHatcheryDoorOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-md my-4 mx-3",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: "linear-gradient(180deg, rgba(26, 17, 10, 0.95) 0%, rgba(10, 6, 4, 0.98) 100%)",
      border: "1px solid rgba(201, 169, 97, 0.5)",
      borderRadius: "3px",
      boxShadow: "0 0 60px rgba(212, 184, 122, 0.2), 0 20px 40px rgba(0, 0, 0, 0.8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 w-12 h-12 pointer-events-none",
    style: {
      borderTop: "1px solid #c9a961",
      borderLeft: "1px solid #c9a961",
      borderTopLeftRadius: "3px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-12 h-12 pointer-events-none",
    style: {
      borderTop: "1px solid #c9a961",
      borderRight: "1px solid #c9a961",
      borderTopRightRadius: "3px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 left-0 w-12 h-12 pointer-events-none",
    style: {
      borderBottom: "1px solid #c9a961",
      borderLeft: "1px solid #c9a961",
      borderBottomLeftRadius: "3px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-0 right-0 w-12 h-12 pointer-events-none",
    style: {
      borderBottom: "1px solid #c9a961",
      borderRight: "1px solid #c9a961",
      borderBottomRightRadius: "3px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "px-6 pt-6 pb-4 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-3 mb-2"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    style: {
      color: "#d4b87a",
      fontSize: '1rem'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "uppercase tracking-[0.4em] text-base",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      background: "linear-gradient(180deg, #f5d98f 0%, #d4b87a 50%, #8a6f3a 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }
  }, "The Sanctum"), /*#__PURE__*/React.createElement(Sparkles, {
    style: {
      color: "#d4b87a",
      fontSize: '1rem'
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] italic",
    style: {
      color: "#9a8765",
      fontFamily: "'Crimson Pro', serif"
    }
  }, "A hidden chamber, found by those who seek")), /*#__PURE__*/React.createElement("div", {
    className: "px-6 pb-6 space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center py-6 px-4",
    style: {
      background: "radial-gradient(ellipse at center, rgba(212, 184, 122, 0.08) 0%, transparent 70%)",
      border: "1px solid rgba(201, 169, 97, 0.25)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-px w-8",
    style: {
      background: "linear-gradient(90deg, transparent, rgba(232, 148, 122, 0.6))"
    }
  }), /*#__PURE__*/React.createElement(Heart, {
    fill: "#e8947a",
    style: {
      color: "#e8947a",
      fontSize: '0.9rem'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "h-px w-8",
    style: {
      background: "linear-gradient(90deg, rgba(232, 148, 122, 0.6), transparent)"
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] tracking-[0.3em] uppercase mb-2",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "A Note"), /*#__PURE__*/React.createElement("p", {
    className: "italic text-base sm:text-lg",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#e8dcc4",
      lineHeight: 1.4
    }
  }, "Made with love for"), /*#__PURE__*/React.createElement("p", {
    className: "mt-1 text-2xl sm:text-3xl",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 700,
      background: "linear-gradient(180deg, #f5d98f 0%, #e8947a 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      letterSpacing: "0.15em"
    }
  }, "Dani")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-3",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "About")), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-3 space-y-2",
    style: {
      background: "rgba(20, 14, 8, 0.5)",
      border: "1px solid rgba(201, 169, 97, 0.2)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] tracking-[0.25em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "App"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#e8dcc4",
      fontWeight: 600
    }
  }, "Token Queen")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] tracking-[0.25em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Codename"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm italic",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#c9a961"
    }
  }, "The Arcanist's Grimoire")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] tracking-[0.25em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Forged by"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d4b87a",
      fontWeight: 600
    }
  }, "Sodium Fabrications")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] tracking-[0.25em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Card data"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#e8dcc4"
    }
  }, "Scryfall")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-0.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[9px] tracking-[0.25em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Crafted in"), /*#__PURE__*/React.createElement("span", {
    className: "text-sm italic",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#c9a961"
    }
  }, "the Izzet League's labs"))), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] italic text-center mt-2",
    style: {
      color: "#6a5a42",
      fontFamily: "'Crimson Pro', serif"
    }
  }, "Not affiliated with Wizards of the Coast.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-3",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, pet ? 'Companion' : 'Hatchery')), !pet ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '220px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-5 text-center",
    style: {
      background: "radial-gradient(ellipse at center, rgba(143,188,143,0.06) 0%, rgba(159,199,230,0.04) 30%, rgba(232,148,122,0.03) 60%, transparent 100%)",
      border: "1px dashed rgba(201,169,97,0.3)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center mb-3"
  }, /*#__PURE__*/React.createElement(PetEgg, {
    orbsLit: unlockedOrbs.length,
    size: 100
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2.5 mb-4"
  }, WUBRG.map(function (c) {
    var lit = unlockedOrbs.includes(c);
    var cd = COLOR_DATA[c];
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: function onClick() {
        return handleOrbTap(c);
      },
      className: "active:scale-90 transition-all",
      style: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        background: lit ? "radial-gradient(circle at 35% 35%, ".concat(cd.bg, ", ").concat(cd.symbol, ")") : "radial-gradient(circle at 35% 35%, ".concat(cd.bg, "66, ").concat(cd.symbol, "44)"),
        border: "2px solid ".concat(lit ? cd.symbol : cd.symbol + '55'),
        boxShadow: lit ? "0 0 16px ".concat(cd.glow, ", 0 0 4px ").concat(cd.glow, " inset") : "0 0 4px ".concat(cd.glow, "88 inset"),
        opacity: lit ? 1 : 0.6,
        transition: 'all 0.3s ease',
        fontFamily: "'Cinzel', serif",
        fontWeight: 700,
        fontSize: '1.1rem',
        color: lit ? cd.textOnBg : cd.symbol + 'aa',
        textShadow: lit ? "0 0 4px ".concat(cd.glow) : 'none',
        cursor: 'pointer',
        padding: 0
      },
      "aria-label": "".concat(cd.name, " mana orb")
    }, c);
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-sm italic mb-1",
    style: {
      color: "#c9a961",
      fontFamily: "'Crimson Pro', serif"
    }
  }, "An egg awaits its spark..."), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] tracking-[0.2em] uppercase mb-2",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#6a5a42"
    }
  }, "Solve the runes to hatch"), showDiscoveryHint && /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] italic mt-2",
    style: {
      color: "#8a7555",
      fontFamily: "'Crimson Pro', serif",
      opacity: 0.85
    }
  }, "the orbs seem to remember an order...")), !hatcheryDoorOpen && /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      haptic(25);
      setHatcheryDoorOpen(true);
    },
    style: {
      position: 'absolute',
      inset: 0,
      cursor: 'pointer',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 300 240",
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: "300",
    height: "240",
    fill: "#1a0e1a"
  }), [0, 1, 2, 3, 4, 5].map(function (i) {
    return /*#__PURE__*/React.createElement("rect", {
      key: "tl".concat(i),
      x: 0,
      y: i * 40,
      width: "18",
      height: "38",
      fill: i % 2 === 0 ? '#3a2a4a' : '#2e2240',
      rx: "1",
      stroke: "#4a3a5a",
      strokeWidth: "0.5"
    });
  }), [0, 1, 2, 3, 4, 5].map(function (i) {
    return /*#__PURE__*/React.createElement("rect", {
      key: "tr".concat(i),
      x: 282,
      y: i * 40,
      width: "18",
      height: "38",
      fill: i % 2 === 0 ? '#2e2240' : '#3a2a4a',
      rx: "1",
      stroke: "#4a3a5a",
      strokeWidth: "0.5"
    });
  }), [0, 1, 2, 3, 4].map(function (i) {
    return /*#__PURE__*/React.createElement("rect", {
      key: "bt".concat(i),
      x: 18 + i * 54,
      y: 222,
      width: "52",
      height: "18",
      fill: i % 2 === 0 ? '#3a2a4a' : '#2e2240',
      rx: "1",
      stroke: "#4a3a5a",
      strokeWidth: "0.5"
    });
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18,20 Q150,-30 282,20",
    fill: "none",
    stroke: "#4a3a5a",
    strokeWidth: "16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18,20 Q150,-30 282,20",
    fill: "none",
    stroke: "#3a2a4a",
    strokeWidth: "13"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M20,220 L20,60 Q20,20 150,18 Q280,20 280,60 L280,220 Z",
    fill: "#2a1808"
  }), [0, 1, 2, 3, 4].map(function (i) {
    return /*#__PURE__*/React.createElement("clipPath", {
      key: "cp".concat(i),
      id: "plank".concat(i)
    }, /*#__PURE__*/React.createElement("path", {
      d: "M20,220 L20,60 Q20,20 150,18 Q280,20 280,60 L280,220 Z"
    }));
  }), [0, 1, 2, 3, 4].map(function (i) {
    return /*#__PURE__*/React.createElement("rect", {
      key: "pl".concat(i),
      x: "20",
      y: 20 + i * 40,
      width: "260",
      height: "37",
      fill: i % 2 === 0 ? '#2a1808' : '#231405',
      clipPath: "url(#plank0)"
    });
  }), [0, 1, 2, 3, 4].map(function (i) {
    return [0.35, 0.7].map(function (f, j) {
      return /*#__PURE__*/React.createElement("line", {
        key: "g".concat(i).concat(j),
        x1: "20",
        y1: 20 + i * 40 + 37 * f,
        x2: "280",
        y2: 20 + i * 40 + 37 * f,
        stroke: "#3a2010",
        strokeWidth: "0.7",
        opacity: "0.5",
        clipPath: "url(#plank0)"
      });
    });
  }), /*#__PURE__*/React.createElement("line", {
    x1: "150",
    y1: "20",
    x2: "150",
    y2: "220",
    stroke: "#1a0c04",
    strokeWidth: "2.5",
    clipPath: "url(#plank0)"
  }), [58, 118, 178].map(function (y) {
    return /*#__PURE__*/React.createElement("rect", {
      key: "band".concat(y),
      x: "20",
      y: y,
      width: "260",
      height: "7",
      fill: "#282830",
      stroke: "#404048",
      strokeWidth: "0.8",
      clipPath: "url(#plank0)"
    });
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "36",
    width: "24",
    height: "46",
    rx: "2",
    fill: "#383840",
    stroke: "#505058",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "36",
    width: "24",
    height: "3",
    fill: "#606068"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "59",
    r: "5",
    fill: "#484850"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "59",
    r: "2.5",
    fill: "#282830"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "155",
    width: "24",
    height: "46",
    rx: "2",
    fill: "#383840",
    stroke: "#505058",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "155",
    width: "24",
    height: "3",
    fill: "#606068"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "178",
    r: "5",
    fill: "#484850"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "32",
    cy: "178",
    r: "2.5",
    fill: "#282830"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "240",
    cy: "110",
    r: "16",
    fill: "none",
    stroke: "#5a4a2a",
    strokeWidth: "5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "240",
    cy: "110",
    r: "7",
    fill: "#2a1808",
    stroke: "#6a5a3a",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "232",
    y: "120",
    width: "16",
    height: "7",
    rx: "2",
    fill: "#3a2a12",
    stroke: "#5a4a2a",
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "150",
    cy: "110",
    r: "9",
    fill: "#080406",
    stroke: "#5a3a20",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "150",
    cy: "107",
    r: "5",
    fill: "#060304"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "146",
    y: "110",
    width: "8",
    height: "14",
    rx: "1",
    fill: "#060304"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "150",
    cy: "107",
    r: "4"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "fill",
    values: "#c9a961;#f5d98f;#c9a961",
    dur: "2.5s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    values: "0.25;0.6;0.25",
    dur: "2.5s",
    repeatCount: "indefinite"
  })), ['#e8e4d0', '#7aaccc', '#3a2a3a', '#c87860', '#7aaa70'].map(function (col, i) {
    var a = i / 5 * Math.PI * 2 - Math.PI / 2;
    return /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: 150 + Math.cos(a) * 26,
      cy: 170 + Math.sin(a) * 18,
      r: "5",
      fill: col,
      opacity: "0.30"
    });
  }), /*#__PURE__*/React.createElement("polygon", {
    points: "150,148 162,164 150,178 138,164",
    fill: "none",
    stroke: "#c9a961",
    strokeWidth: "0.8",
    opacity: "0.25"
  }), /*#__PURE__*/React.createElement("text", {
    x: "150",
    y: "210",
    textAnchor: "middle",
    fontFamily: "serif",
    fontSize: "8",
    fill: "#6a4a28",
    letterSpacing: "4",
    opacity: "0.7"
  }, "HATCHERY"), /*#__PURE__*/React.createElement("rect", {
    x: "20",
    y: "18",
    width: "260",
    height: "202",
    fill: "none",
    stroke: "#0a0604",
    strokeWidth: "3",
    opacity: "0.5",
    clipPath: "url(#plank0)"
  }))), hatcheryDoorOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      transformOrigin: 'left center',
      animation: 'doorSwing 0.65s cubic-bezier(0.4,0,0.2,1) forwards',
      pointerEvents: 'none',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 300 220",
    preserveAspectRatio: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "296",
    height: "216",
    rx: "3",
    fill: "#1a0e06",
    stroke: "#8a6030",
    strokeWidth: "3"
  }), [0, 1, 2, 3, 4].map(function (i) {
    return /*#__PURE__*/React.createElement("rect", {
      key: i,
      x: "6",
      y: 6 + i * 42,
      width: "288",
      height: "38",
      fill: i % 2 === 0 ? '#2a1a0a' : '#221508',
      rx: "1"
    });
  }), [48, 108, 168].map(function (y) {
    return /*#__PURE__*/React.createElement("rect", {
      key: y,
      x: "2",
      y: y,
      width: "296",
      height: "8",
      fill: "#2a2a2a",
      stroke: "#444",
      strokeWidth: "0.8"
    });
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "22",
    width: "22",
    height: "36",
    rx: "2",
    fill: "#3a3a3a",
    stroke: "#555",
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "162",
    width: "22",
    height: "36",
    rx: "2",
    fill: "#3a3a3a",
    stroke: "#555",
    strokeWidth: "1"
  }))))) :
  /*#__PURE__*/
  /* Pet panel -- alive companion */
  React.createElement(PetPanel, {
    pet: pet,
    petHunger: petHunger,
    petHappiness: petHappiness,
    feedReady: feedReady,
    playReady: playReady,
    feedPet: feedPet,
    playWithPet: playWithPet,
    showAdvanced: showPetAdvanced,
    setShowAdvanced: setShowPetAdvanced,
    onRename: function onRename() {
      setPetNameInput(pet.name || '');
      setPetRenameOpen(true);
    },
    onReset: function onReset() {
      return setPetResetConfirmOpen(true);
    },
    onDevJuvenile: devSkipJuvenile,
    onDevAdult: devSkipAdult,
    onDevFeed: devResetFeedCD,
    onDevPlay: devResetPlayCD
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-1 h-3",
    style: {
      background: "linear-gradient(180deg, #c9a961, transparent)"
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-[9px] tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765"
    }
  }, "Games")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      haptic(20);
      setSanctumOpen(false);
      setMemoryOpen(true);
    },
    className: "flex flex-col items-center gap-1.5 py-3 active:scale-95 transition-transform",
    style: {
      background: "radial-gradient(ellipse at top, rgba(201,169,97,0.12), rgba(20,14,8,0.6))",
      border: "1px solid rgba(201,169,97,0.35)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.5rem'
    }
  }, "\uD83C\uDCCF"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d4b87a",
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase"
    }
  }, "Memory"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#6a5a42",
      fontSize: "0.6rem",
      fontStyle: "italic"
    }
  }, "Match the tokens")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      haptic(20);
      setSanctumOpen(false);
      setDragonOpen(true);
    },
    className: "flex flex-col items-center gap-1.5 py-3 active:scale-95 transition-transform",
    style: {
      background: "radial-gradient(ellipse at top, rgba(160,48,44,0.12), rgba(20,14,8,0.6))",
      border: "1px solid rgba(160,48,44,0.35)",
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.5rem'
    }
  }, "\uD83D\uDC09"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d48a86",
      fontSize: "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase"
    }
  }, "Flappy Dragon"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#6a5a42",
      fontSize: "0.6rem",
      fontStyle: "italic"
    }
  }, "Dodge the pillars")))), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setSanctumOpen(false);
      setHatcheryDoorOpen(false);
    },
    className: "w-full py-3 text-xs tracking-[0.3em] uppercase active:scale-95 transition-transform",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: "#c9a961",
      background: "linear-gradient(180deg, rgba(201, 169, 97, 0.08), rgba(201, 169, 97, 0.02))",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    }
  }, "Return")))), memoryOpen && /*#__PURE__*/React.createElement(MemoryGame, {
    onClose: function onClose() {
      return setMemoryOpen(false);
    },
    pet: pet,
    setPet: setPet,
    showToast: showToast,
    haptic: haptic
  }), dragonOpen && /*#__PURE__*/React.createElement(FlappyDragon, {
    onClose: function onClose() {
      return setDragonOpen(false);
    },
    pet: pet,
    setPet: setPet,
    haptic: haptic
  }), hatchingOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[65] flex items-start justify-center overflow-y-auto p-3",
    style: {
      background: "radial-gradient(ellipse at top, rgba(40, 30, 60, 0.97) 0%, rgba(5, 3, 10, 0.99) 70%)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      animation: "sanctumIn 0.4s ease-out"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-md my-4",
    style: {
      background: "linear-gradient(180deg, rgba(26,17,10,0.98) 0%, rgba(10,6,4,0.99) 100%)",
      border: "1px solid rgba(201,169,97,0.5)",
      borderRadius: "3px",
      boxShadow: "0 0 80px rgba(212,184,122,0.3), 0 20px 50px rgba(0,0,0,0.9)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 left-0 w-10 h-10 pointer-events-none",
    style: {
      borderTop: "1px solid #c9a961",
      borderLeft: "1px solid #c9a961",
      borderTopLeftRadius: "3px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-0 right-0 w-10 h-10 pointer-events-none",
    style: {
      borderTop: "1px solid #c9a961",
      borderRight: "1px solid #c9a961",
      borderTopRightRadius: "3px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "px-5 pt-5 pb-3 text-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    style: {
      color: "#d4b87a",
      fontSize: '1rem'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "uppercase tracking-[0.35em] text-sm",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      background: "linear-gradient(180deg, #f5d98f 0%, #d4b87a 50%, #8a6f3a 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    }
  }, "Choose Your Companion"), /*#__PURE__*/React.createElement(Sparkles, {
    style: {
      color: "#d4b87a",
      fontSize: '1rem'
    }
  })), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] italic",
    style: {
      color: "#c9a961",
      fontFamily: "'Crimson Pro', serif"
    }
  }, "Three companions await. Only one may bond with you.")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 px-3 pb-3"
  }, ceremonyStarters.map(function (typeKey) {
    return /*#__PURE__*/React.createElement(StarterCard, {
      key: typeKey,
      typeKey: typeKey,
      selected: chosenType === typeKey,
      onSelect: function onSelect() {
        haptic(20);
        setChosenType(typeKey);
      }
    });
  })), chosenType && /*#__PURE__*/React.createElement("div", {
    className: "mx-3 mb-3 px-3 py-2.5",
    style: {
      background: "linear-gradient(135deg, ".concat(COLOR_DATA[PET_TYPES[chosenType].color].symbol, "10, transparent)"),
      border: "1px solid ".concat(COLOR_DATA[PET_TYPES[chosenType].color].symbol, "33"),
      borderRadius: "2px",
      transition: 'all 0.3s ease'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] tracking-[0.2em] uppercase mb-1",
    style: {
      fontFamily: "'Cinzel', serif",
      color: COLOR_DATA[PET_TYPES[chosenType].color].symbol,
      fontWeight: 600
    }
  }, PET_TYPES[chosenType].emoji, " ", PET_TYPES[chosenType].name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm italic",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#e8dcc4",
      lineHeight: 1.45
    }
  }, ((_COLOR_LORE$PET_TYPES = COLOR_LORE[PET_TYPES[chosenType].color]) === null || _COLOR_LORE$PET_TYPES === void 0 ? void 0 : _COLOR_LORE$PET_TYPES.text) || PET_TYPES[chosenType].flavor)), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 px-3 pb-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      haptic(15);
      setCeremonyStarters(pickCeremonyStarters());
      setChosenType(null);
    },
    className: "flex items-center justify-center gap-1.5 px-3 py-2.5 text-[10px] tracking-[0.2em] uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#9a8765",
      border: "1px solid rgba(154,135,101,0.35)",
      borderRadius: "2px",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Shuffle, {
    style: {
      fontSize: '0.7rem'
    }
  }), " New Three"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setHatchingOpen(false);
      setChosenType(null);
      setCeremonyStarters([]);
    },
    className: "px-3 py-2.5 text-[10px] tracking-[0.2em] uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      border: "1px solid rgba(201,169,97,0.4)",
      borderRadius: "2px"
    }
  }, "Wait"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return chosenType && hatchPet(chosenType);
    },
    disabled: !chosenType,
    className: "flex-[2] py-2.5 text-[11px] tracking-[0.3em] uppercase active:scale-95 transition-transform",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: chosenType ? "#1a110a" : "#6a5a42",
      background: chosenType ? "linear-gradient(180deg, #f5d98f, #c9a961)" : "rgba(154,135,101,0.1)",
      border: "1px solid ".concat(chosenType ? "#c9a961" : "rgba(154,135,101,0.2)"),
      borderRadius: "2px",
      boxShadow: chosenType ? "0 0 16px rgba(212,184,122,0.3)" : 'none'
    }
  }, "Awaken")))), petRenameOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[60] flex items-center justify-center p-4",
    style: {
      background: "rgba(5, 3, 10, 0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)"
    },
    onClick: function onClick() {
      setPetRenameOpen(false);
      setPetNameInput('');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-sm",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "3px",
      boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-5"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs tracking-[0.3em] uppercase mb-3",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d4b87a",
      fontWeight: 600
    }
  }, "Name your companion"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: petNameInput,
    onChange: function onChange(e) {
      return setPetNameInput(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') renamePet();
    },
    autoFocus: true,
    maxLength: 20,
    placeholder: "A name...",
    className: "w-full px-3 py-2.5 text-base outline-none mb-3",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#e8dcc4",
      background: "rgba(20, 14, 8, 0.6)",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPetRenameOpen(false);
      setPetNameInput('');
    },
    className: "flex-1 py-2 text-[10px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: renamePet,
    disabled: !petNameInput.trim(),
    className: "flex-1 py-2 text-[10px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: !petNameInput.trim() ? "#6a5a42" : "#1a110a",
      background: !petNameInput.trim() ? "rgba(154, 135, 101, 0.1)" : "linear-gradient(180deg, #f5d98f, #c9a961)",
      border: "1px solid ".concat(!petNameInput.trim() ? "rgba(154, 135, 101, 0.2)" : "#c9a961"),
      borderRadius: "2px"
    }
  }, "Save"))))), petResetConfirmOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-[60] flex items-center justify-center p-4",
    style: {
      background: "rgba(5, 3, 10, 0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)"
    },
    onClick: function onClick() {
      return setPetResetConfirmOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-sm",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
      border: "1px solid rgba(160, 48, 44, 0.5)",
      borderRadius: "3px",
      boxShadow: "0 0 40px rgba(0, 0, 0, 0.8), 0 0 30px rgba(160, 48, 44, 0.15)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-5 text-center"
  }, /*#__PURE__*/React.createElement(AlertTriangle, {
    style: {
      color: "#d48a86",
      fontSize: '2rem',
      margin: '0 auto 0.75rem'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-sm tracking-[0.25em] uppercase mb-2",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d48a86",
      fontWeight: 600
    }
  }, "Release your companion?"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm italic mb-1 px-2",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#c9a961",
      lineHeight: 1.5
    }
  }, "Your companion will return to the aether. The egg may be found again."), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] italic mt-1 mb-5",
    style: {
      color: "#8a7555"
    }
  }, "This cannot be undone."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      haptic(15);
      setPetResetConfirmOpen(false);
    },
    className: "flex-1 py-2.5 text-[10px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    }
  }, "Keep"), /*#__PURE__*/React.createElement("button", {
    onClick: resetPet,
    className: "flex-1 py-2.5 text-[10px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: "#fff",
      background: "linear-gradient(180deg, #c0453f, #8a2d29)",
      border: "1px solid #a0302c",
      borderRadius: "2px"
    }
  }, "Release"))))), zoomImage && function () {
    var idx = zoomImage.battlefieldIndex >= 0 ? zoomImage.battlefieldIndex : -1;
    var canNav = idx >= 0 && battlefield.length > 1;
    var token = zoomImage.tokenId ? battlefield.find(function (t) {
      return t.id === zoomImage.tokenId;
    }) : null;
    var hasPT = token && token.power !== null && token.toughness !== null;
    var pMod = token ? token.powerMod || 0 : 0;
    var tMod = token ? token.toughnessMod || 0 : 0;
    var hasMod = pMod !== 0 || tMod !== 0;
    var basePwr = hasPT ? parseInt(token.power, 10) : 0;
    var baseTgh = hasPT ? parseInt(token.toughness, 10) : 0;
    var curP = hasPT ? isNaN(basePwr) ? token.power : basePwr + pMod : null;
    var curT = hasPT ? isNaN(baseTgh) ? token.toughness : baseTgh + tMod : null;
    var fmt = function fmt(n) {
      return n > 0 ? "+".concat(n) : "".concat(n);
    };
    var goTo = function goTo(newIdx) {
      var t = battlefield[newIdx];
      if (!t) return;
      haptic(15);
      setZoomImage({
        url: t.normalImage || t.smallImage,
        tokenId: t.id,
        battlefieldIndex: newIdx
      });
    };

    // Swipe detection refs (stored on the modal div via data attrs)
    var touchStartX = {
      current: null
    };
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-[55] flex flex-col items-center justify-center",
      style: {
        background: "rgba(0, 0, 0, 0.93)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)"
      },
      onClick: function onClick() {
        return setZoomImage(null);
      },
      onTouchStart: function onTouchStart(e) {
        touchStartX.current = e.touches[0].clientX;
      },
      onTouchEnd: function onTouchEnd(e) {
        if (touchStartX.current === null || !canNav) return;
        var dx = touchStartX.current - e.changedTouches[0].clientX;
        touchStartX.current = null;
        if (Math.abs(dx) < 50) return; // too small
        if (dx > 0 && idx < battlefield.length - 1) goTo(idx + 1); // swipe left -> next
        else if (dx < 0 && idx > 0) goTo(idx - 1); // swipe right -> prev
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        setZoomImage(null);
      },
      className: "absolute top-4 right-4 w-10 h-10 flex items-center justify-center active:scale-90 z-10",
      style: {
        background: "rgba(10, 6, 4, 0.9)",
        border: "1px solid rgba(201, 169, 97, 0.4)",
        borderRadius: "50%",
        color: "#c9a961"
      },
      "aria-label": "Close zoom"
    }, /*#__PURE__*/React.createElement(XIcon, {
      style: {
        fontSize: '1.25rem'
      }
    })), canNav && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-4 left-4 flex items-center gap-1 z-10"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: "#c9a961",
        fontSize: "0.75rem"
      }
    }, idx + 1, "/", battlefield.length)), canNav && idx > 0 && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        goTo(idx - 1);
      },
      className: "absolute left-2 top-1/2 -translate-y-1/2 w-10 h-16 flex items-center justify-center active:scale-90 z-10",
      style: {
        background: "rgba(10, 6, 4, 0.7)",
        border: "1px solid rgba(201, 169, 97, 0.3)",
        borderRadius: "2px",
        color: "#c9a961"
      },
      "aria-label": "Previous token"
    }, /*#__PURE__*/React.createElement(ChevronLeft, {
      style: {
        fontSize: '1.5rem'
      }
    })), canNav && idx < battlefield.length - 1 && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick(e) {
        e.stopPropagation();
        goTo(idx + 1);
      },
      className: "absolute right-2 top-1/2 -translate-y-1/2 w-10 h-16 flex items-center justify-center active:scale-90 z-10",
      style: {
        background: "rgba(10, 6, 4, 0.7)",
        border: "1px solid rgba(201, 169, 97, 0.3)",
        borderRadius: "2px",
        color: "#c9a961"
      },
      "aria-label": "Next token"
    }, /*#__PURE__*/React.createElement(ChevronRight, {
      style: {
        fontSize: '1.5rem'
      }
    })), canNav && /*#__PURE__*/React.createElement("p", {
      className: "absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] italic z-10",
      style: {
        color: "rgba(201,169,97,0.4)",
        fontFamily: "'Crimson Pro', serif",
        whiteSpace: 'nowrap'
      }
    }, "swipe left or right to navigate"), /*#__PURE__*/React.createElement("img", {
      src: zoomImage.url,
      alt: token ? token.name : "Card",
      className: "max-w-full",
      style: {
        maxHeight: hasPT ? '68vh' : '82vh',
        borderRadius: "4.75% / 3.5%",
        boxShadow: "0 0 60px rgba(212, 184, 122, 0.25), 0 20px 40px rgba(0,0,0,0.8)"
      },
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }), hasPT && token && /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-center mt-3",
      style: {
        width: '100%',
        paddingLeft: '12px',
        paddingRight: '12px',
        boxSizing: 'border-box'
      },
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1.5 px-2 py-2",
      style: {
        background: "rgba(10, 6, 4, 0.92)",
        border: "1px solid rgba(201, 169, 97, 0.35)",
        borderRadius: "3px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1 flex-1"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustPT(token.id, 'power', -1);
      },
      className: "flex-shrink-0 flex items-center justify-center active:scale-90",
      style: {
        width: '32px',
        height: '32px',
        background: "rgba(232,148,122,0.15)",
        border: "1px solid rgba(232,148,122,0.5)",
        borderRadius: "2px",
        color: "#d48a86"
      }
    }, /*#__PURE__*/React.createElement(Minus, {
      style: {
        fontSize: '0.875rem'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "text-center flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#9a8765",
        fontSize: "0.5rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase"
      }
    }, "Power"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: pMod !== 0 ? "#f5d98f" : "#c9a961",
        fontSize: "1.2rem",
        fontWeight: 700,
        lineHeight: 1.1
      }
    }, curP), pMod !== 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: "#b4d4a0",
        fontSize: "0.55rem"
      }
    }, fmt(pMod))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustPT(token.id, 'power', 1);
      },
      className: "flex-shrink-0 flex items-center justify-center active:scale-90",
      style: {
        width: '32px',
        height: '32px',
        background: "rgba(232,148,122,0.15)",
        border: "1px solid rgba(232,148,122,0.5)",
        borderRadius: "2px",
        color: "#d48a86"
      }
    }, /*#__PURE__*/React.createElement(Plus, {
      style: {
        fontSize: '0.875rem'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "flex-shrink-0 text-center px-2",
      style: {
        borderLeft: "1px solid rgba(201,169,97,0.2)",
        borderRight: "1px solid rgba(201,169,97,0.2)",
        minWidth: '3.5rem'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: "#d4b87a",
        fontSize: "1.4rem",
        fontWeight: 700,
        lineHeight: 1
      }
    }, curP, "/", curT), hasMod && /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return resetPT(token.id);
      },
      className: "flex items-center justify-center gap-0.5 mt-1 active:scale-95 mx-auto",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#9a8765",
        fontSize: "0.5rem",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        background: "transparent",
        border: "1px solid rgba(154,135,101,0.3)",
        borderRadius: "2px",
        padding: "1px 4px"
      }
    }, /*#__PURE__*/React.createElement(RotateCcw, {
      style: {
        fontSize: '0.45rem'
      }
    }), "reset")), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-1 flex-1"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustPT(token.id, 'toughness', -1);
      },
      className: "flex-shrink-0 flex items-center justify-center active:scale-90",
      style: {
        width: '32px',
        height: '32px',
        background: "rgba(159,199,230,0.15)",
        border: "1px solid rgba(159,199,230,0.5)",
        borderRadius: "2px",
        color: "#9fc7e6"
      }
    }, /*#__PURE__*/React.createElement(Minus, {
      style: {
        fontSize: '0.875rem'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "text-center flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#9a8765",
        fontSize: "0.5rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase"
      }
    }, "Tough"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: tMod !== 0 ? "#f5d98f" : "#c9a961",
        fontSize: "1.2rem",
        fontWeight: 700,
        lineHeight: 1.1
      }
    }, curT), tMod !== 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: "#9fc7e6",
        fontSize: "0.55rem"
      }
    }, fmt(tMod))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return adjustPT(token.id, 'toughness', 1);
      },
      className: "flex-shrink-0 flex items-center justify-center active:scale-90",
      style: {
        width: '32px',
        height: '32px',
        background: "rgba(159,199,230,0.15)",
        border: "1px solid rgba(159,199,230,0.5)",
        borderRadius: "2px",
        color: "#9fc7e6"
      }
    }, /*#__PURE__*/React.createElement(Plus, {
      style: {
        fontSize: '0.875rem'
      }
    }))))));
  }(), oracleFor && function () {
    var target = battlefield.find(function (t) {
      return t.id === oracleFor;
    });
    if (!target) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: {
        background: "rgba(5, 3, 10, 0.85)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)"
      },
      onClick: function onClick() {
        setOracleFor(null);
        setOracleText("");
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-full max-w-md",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      style: {
        background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
        border: "1px solid rgba(201, 169, 97, 0.4)",
        borderRadius: "3px",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between px-4 py-3",
      style: {
        borderBottom: "1px solid rgba(201, 169, 97, 0.2)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "min-w-0 flex items-center gap-2"
    }, /*#__PURE__*/React.createElement(BookOpen, {
      style: {
        color: "#c9a961",
        fontSize: '1rem'
      }
    }), /*#__PURE__*/React.createElement("h2", {
      className: "text-sm truncate",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#e8dcc4",
        fontWeight: 600
      }
    }, target.name)), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        setOracleFor(null);
        setOracleText("");
      },
      className: "w-8 h-8 flex items-center justify-center active:scale-90",
      style: {
        color: "#9a8765"
      },
      "aria-label": "Close"
    }, /*#__PURE__*/React.createElement(XIcon, {
      style: {
        fontSize: '1rem'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "px-4 py-4 max-h-[60vh] overflow-y-auto"
    }, target.type_line && /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] italic mb-3",
      style: {
        color: "#9a8765",
        fontFamily: "'Crimson Pro', serif"
      }
    }, target.type_line), oracleLoading ? /*#__PURE__*/React.createElement("div", {
      className: "flex justify-center py-6"
    }, /*#__PURE__*/React.createElement(Loader2, {
      className: "animate-spin",
      style: {
        color: "#c9a961",
        fontSize: '1.25rem'
      }
    })) : /*#__PURE__*/React.createElement("p", {
      className: "text-sm whitespace-pre-line",
      style: {
        color: "#e8dcc4",
        fontFamily: "'Crimson Pro', serif",
        lineHeight: 1.5
      }
    }, oracleText || "(No rules text)"), target.power !== null && target.toughness !== null && /*#__PURE__*/React.createElement("p", {
      className: "mt-3 text-right",
      style: {
        fontFamily: "'JetBrains Mono', monospace",
        color: "#c9a961"
      }
    }, target.power, " / ", target.toughness))));
  }(), presetMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-start justify-center pt-12 p-4",
    style: {
      background: "rgba(5, 3, 10, 0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)"
    },
    onClick: function onClick() {
      return setPresetMenuOpen(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-md",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "3px",
      boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-4 py-3",
    style: {
      borderBottom: "1px solid rgba(201, 169, 97, 0.2)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Layers, {
    style: {
      color: "#c9a961",
      fontSize: '1rem'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d4b87a",
      fontWeight: 600
    }
  }, "Deck Presets")), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setPresetMenuOpen(false);
    },
    className: "w-8 h-8 flex items-center justify-center active:scale-90",
    style: {
      color: "#9a8765"
    },
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(XIcon, {
    style: {
      fontSize: '1rem'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 py-4 max-h-[60vh] overflow-y-auto"
  }, presets.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-center italic text-sm py-6",
    style: {
      color: "#6a5a42"
    }
  }, "No presets saved.", /*#__PURE__*/React.createElement("br", null), "Build a battlefield, then save it as a preset for next game.") : /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-2"
  }, presets.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "flex items-center gap-2 px-3 py-2.5",
      style: {
        background: "rgba(20, 14, 8, 0.6)",
        border: "1px solid rgba(201, 169, 97, 0.25)",
        borderRadius: "2px"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return loadPreset(p);
      },
      className: "flex-1 text-left active:scale-[0.98] transition-transform"
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#e8dcc4",
        fontSize: "0.9rem",
        fontWeight: 600
      }
    }, p.name), /*#__PURE__*/React.createElement("p", {
      className: "text-[10px] mt-0.5",
      style: {
        color: "#9a8765",
        fontFamily: "'Crimson Pro', serif"
      }
    }, p.tokens.length, " token type", p.tokens.length === 1 ? "" : "s")), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return deletePreset(p.id);
      },
      className: "w-8 h-8 flex items-center justify-center active:scale-90 flex-shrink-0",
      style: {
        border: "1px solid rgba(160, 48, 44, 0.4)",
        borderRadius: "2px",
        color: "#d48a86"
      },
      "aria-label": "Delete ".concat(p.name),
      title: "Delete preset"
    }, /*#__PURE__*/React.createElement(Trash2, {
      style: {
        fontSize: '0.85rem'
      }
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 pb-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setPresetMenuOpen(false);
      setSavePresetOpen(true);
    },
    disabled: battlefield.length === 0,
    className: "w-full py-2.5 text-xs tracking-[0.3em] uppercase active:scale-95 transition-transform flex items-center justify-center gap-2",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: battlefield.length === 0 ? "#6a5a42" : "#1a110a",
      background: battlefield.length === 0 ? "rgba(154, 135, 101, 0.1)" : "linear-gradient(180deg, #f5d98f, #c9a961)",
      border: "1px solid ".concat(battlefield.length === 0 ? "rgba(154, 135, 101, 0.2)" : "#c9a961"),
      borderRadius: "2px"
    }
  }, /*#__PURE__*/React.createElement(Save, {
    style: {
      fontSize: '0.875rem'
    }
  }), "Save current as preset")))), savePresetOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
    style: {
      background: "rgba(5, 3, 10, 0.85)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)"
    },
    onClick: function onClick() {
      setSavePresetOpen(false);
      setSavePresetName("");
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-sm",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "3px",
      boxShadow: "0 0 40px rgba(0, 0, 0, 0.8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "px-5 py-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-3"
  }, /*#__PURE__*/React.createElement(Save, {
    style: {
      color: "#c9a961",
      fontSize: '1rem'
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "text-xs tracking-[0.3em] uppercase",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#d4b87a",
      fontWeight: 600
    }
  }, "Save Preset")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-3",
    style: {
      color: "#9a8765",
      fontFamily: "'Crimson Pro', serif"
    }
  }, "Saves ", battlefield.length, " token type", battlefield.length === 1 ? "" : "s", " as a reusable preset."), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: savePresetName,
    onChange: function onChange(e) {
      return setSavePresetName(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') savePreset(savePresetName);
    },
    autoFocus: true,
    placeholder: "e.g. Halana & Alena",
    className: "w-full px-3 py-2.5 text-base outline-none mb-3",
    style: {
      fontFamily: "'Crimson Pro', serif",
      color: "#e8dcc4",
      background: "rgba(20, 14, 8, 0.6)",
      border: "1px solid rgba(201, 169, 97, 0.3)",
      borderRadius: "2px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      setSavePresetOpen(false);
      setSavePresetName("");
    },
    className: "flex-1 py-2 text-[10px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      color: "#c9a961",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px"
    }
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return savePreset(savePresetName);
    },
    disabled: !savePresetName.trim(),
    className: "flex-1 py-2 text-[10px] tracking-widest uppercase active:scale-95",
    style: {
      fontFamily: "'Cinzel', serif",
      fontWeight: 600,
      color: !savePresetName.trim() ? "#6a5a42" : "#1a110a",
      background: !savePresetName.trim() ? "rgba(154, 135, 101, 0.1)" : "linear-gradient(180deg, #f5d98f, #c9a961)",
      border: "1px solid ".concat(!savePresetName.trim() ? "rgba(154, 135, 101, 0.2)" : "#c9a961"),
      borderRadius: "2px"
    }
  }, "Save"))))), toast && /*#__PURE__*/React.createElement("div", {
    className: "fixed left-1/2 bottom-8 -translate-x-1/2 z-[60] pointer-events-none px-4 py-2",
    style: {
      fontFamily: "'Cinzel', serif",
      fontSize: "0.75rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "#d4b87a",
      background: "rgba(10, 6, 4, 0.95)",
      border: "1px solid rgba(201, 169, 97, 0.4)",
      borderRadius: "2px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
      animation: "toastIn 0.2s ease-out"
    }
  }, toast), cmdrDamageFor && function () {
    var target = players.find(function (p) {
      return p.id === cmdrDamageFor;
    });
    if (!target) return null;
    var dealers = players.filter(function (p) {
      return p.id !== cmdrDamageFor;
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: {
        background: "rgba(5, 3, 10, 0.85)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)"
      },
      onClick: function onClick() {
        return setCmdrDamageFor(null);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative w-full max-w-md",
      onClick: function onClick(e) {
        return e.stopPropagation();
      },
      style: {
        background: "radial-gradient(ellipse at top, #1a110a 0%, #0a0604 100%)",
        border: "1px solid ".concat(target.color, "66"),
        borderRadius: "3px",
        boxShadow: "0 0 40px rgba(0, 0, 0, 0.8), 0 0 30px ".concat(target.color, "20")
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between px-4 py-3",
      style: {
        borderBottom: "1px solid ".concat(target.color, "33")
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 min-w-0"
    }, /*#__PURE__*/React.createElement(Crown, {
      style: {
        color: target.color,
        fontSize: '1rem'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "min-w-0"
    }, /*#__PURE__*/React.createElement("h2", {
      className: "text-[9px] tracking-[0.3em] uppercase",
      style: {
        fontFamily: "'Cinzel', serif",
        color: "#9a8765"
      }
    }, "Commander damage to"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm truncate",
      style: {
        fontFamily: "'Cinzel', serif",
        color: target.color,
        fontWeight: 600
      }
    }, target.name))), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return setCmdrDamageFor(null);
      },
      className: "w-8 h-8 flex items-center justify-center active:scale-90 flex-shrink-0",
      style: {
        color: "#9a8765"
      },
      "aria-label": "Close"
    }, /*#__PURE__*/React.createElement(XIcon, {
      style: {
        fontSize: '1rem'
      }
    }))), /*#__PURE__*/React.createElement("div", {
      className: "p-4 space-y-2.5"
    }, dealers.map(function (d) {
      var dmg = (commanderDamage[target.id] || {})[d.id] || 0;
      var lethal = dmg >= 21;
      return /*#__PURE__*/React.createElement("div", {
        key: d.id,
        className: "flex items-center gap-2",
        style: {
          background: "rgba(10, 6, 4, 0.4)",
          border: "1px solid ".concat(d.color, "33"),
          borderRadius: "2px"
        }
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-center gap-2 flex-1 min-w-0 px-3 py-2"
      }, /*#__PURE__*/React.createElement(User, {
        style: {
          color: d.color,
          fontSize: '0.75rem',
          flexShrink: 0
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-xs truncate",
        style: {
          fontFamily: "'Cinzel', serif",
          color: "#e8dcc4",
          fontWeight: 500
        }
      }, d.name)), /*#__PURE__*/React.createElement("div", {
        className: "flex items-center"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return adjustCmdrDamage(target.id, d.id, -1);
        },
        className: "w-9 h-9 flex items-center justify-center active:scale-90",
        style: {
          color: "#d48a86",
          borderLeft: "1px solid ".concat(d.color, "33")
        },
        "aria-label": "Decrease"
      }, /*#__PURE__*/React.createElement(Minus, {
        style: {
          fontSize: '0.9rem'
        }
      })), /*#__PURE__*/React.createElement("span", {
        className: "w-10 text-center",
        style: {
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: lethal ? "#ff6b67" : dmg > 0 ? "#d4b87a" : "#8a7555",
          textShadow: lethal ? "0 0 12px rgba(255, 107, 103, 0.6)" : "none"
        }
      }, dmg), /*#__PURE__*/React.createElement("button", {
        onClick: function onClick() {
          return adjustCmdrDamage(target.id, d.id, 1);
        },
        className: "w-9 h-9 flex items-center justify-center active:scale-90",
        style: {
          color: "#b4d4a0",
          borderRight: "1px solid ".concat(d.color, "33")
        },
        "aria-label": "Increase"
      }, /*#__PURE__*/React.createElement(Plus, {
        style: {
          fontSize: '0.9rem'
        }
      }))));
    })), /*#__PURE__*/React.createElement("div", {
      className: "px-4 pb-4 pt-1"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-[9px] italic text-center",
      style: {
        color: "#6a5a42"
      }
    }, "Damage also reduces life. 21+ from one commander = lethal."))));
  }(), activeTab === 'vault' && /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen",
    style: {
      background: "#0d0d0f",
      paddingBottom: 80
    }
  }, /*#__PURE__*/React.createElement(CommanderVault, null)), /*#__PURE__*/React.createElement("nav", {
    className: "fixed bottom-0 left-0 right-0 z-40",
    style: {
      background: "linear-gradient(to top, rgba(5, 3, 4, 0.98) 0%, rgba(10, 6, 4, 0.95) 100%)",
      borderTop: "1px solid rgba(201, 169, 97, 0.25)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      paddingBottom: 'env(safe-area-inset-bottom)',
      boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto flex"
  }, [{
    id: 'battlefield',
    label: 'Battlefield',
    Icon: Swords
  }, {
    id: 'life',
    label: 'Life',
    Icon: Heart
  }, {
    id: 'tools',
    label: 'Tools',
    Icon: Wrench
  }, {
    id: 'vault',
    label: 'Vault',
    Icon: Crown
  }].map(function (tab) {
    var isActive = activeTab === tab.id;
    return /*#__PURE__*/React.createElement("button", {
      key: tab.id,
      onClick: function onClick() {
        haptic(15);
        setActiveTab(tab.id);
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      },
      className: "flex-1 flex flex-col items-center justify-center gap-0.5 py-2 active:scale-95 transition-all",
      style: {
        color: isActive ? "#d4b87a" : "#6a5a42",
        background: isActive ? "linear-gradient(180deg, rgba(201, 169, 97, 0.1), transparent)" : "transparent",
        borderTop: isActive ? "2px solid #c9a961" : "2px solid transparent",
        paddingTop: "calc(0.5rem - 2px)"
      },
      "aria-label": tab.label,
      "aria-pressed": isActive
    }, /*#__PURE__*/React.createElement(tab.Icon, {
      style: {
        fontSize: isActive ? '1.1rem' : '1rem',
        filter: isActive ? 'drop-shadow(0 0 6px rgba(212, 184, 122, 0.4))' : 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "text-[9px] tracking-widest uppercase",
      style: {
        fontFamily: "'Cinzel', serif",
        fontWeight: isActive ? 600 : 500
      }
    }, tab.label));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'none'
    },
    id: "tq-styles-injected"
  }));
}

// Wait for DOM to be ready
if (typeof window !== 'undefined') {
  var startApp = function startApp() {
    try {
      var root = document.getElementById('root');
      if (!root) {
        console.error('Root element not found');
        alert('ERROR: Root element not found. App cannot start.');
        return;
      }
      console.log('Starting Token Queen app...');

      // Hide any loading screens before mounting
      var hideLoading = function hideLoading() {
        ['initial-loading', 'splash-screen', 'loading-screen'].forEach(function (id) {
          var el = document.getElementById(id);
          if (el) {
            el.style.display = 'none';
            console.log("Hidden: ".concat(id));
          }
        });
        document.querySelectorAll('[class*="summoning"]').forEach(function (el) {
          el.style.display = 'none';
          console.log('Hidden summoning screen');
        });
      };
      hideLoading();
      ReactDOM.createRoot(root).render(/*#__PURE__*/React.createElement(TokenTracker, null));
      console.log('Token Queen app started successfully');

      // Give it a moment to render, then check if still stuck
      setTimeout(function () {
        if (document.querySelector('[class*="summoning"]')) {
          console.error('Still showing summoning screen after mount!');
          hideLoading(); // Try again
        }
      }, 1000);
    } catch (error) {
      console.error('Failed to start app:', error);
      alert("CRITICAL ERROR: ".concat(error.message, "\n\nTap OK to see details"));

      // Show error to user
      document.body.innerHTML = "\n        <div style=\"display: flex; align-items: center; justify-content: center; height: 100vh; background: #0a0604; color: #c9a961; font-family: sans-serif; padding: 20px; text-align: center;\">\n          <div>\n            <h1 style=\"margin-bottom: 10px; color: #d48a86;\">App Failed to Start</h1>\n            <p style=\"color: #c9a961; margin: 20px 0;\">".concat(error.message, "</p>\n            <pre style=\"background: #1a110a; padding: 10px; border-radius: 4px; font-size: 11px; text-align: left; overflow: auto; max-width: 90vw;\">").concat(error.stack || 'No stack trace', "</pre>\n            <button onclick=\"location.reload()\" style=\"margin-top: 20px; padding: 10px 20px; background: #c9a961; border: none; color: #0a0604; cursor: pointer; font-size: 16px; border-radius: 4px;\">Reload App</button>\n          </div>\n        </div>\n      ");
    }
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
    console.log('Waiting for DOMContentLoaded...');
  } else {
    console.log('DOM already ready, starting immediately...');
    startApp();
  }
}
