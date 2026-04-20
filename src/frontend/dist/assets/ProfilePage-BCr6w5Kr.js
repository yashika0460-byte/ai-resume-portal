import { c as createLucideIcon, R as React, h as clsx, r as reactExports, u as useAuth, j as jsxRuntimeExports, f as Link } from "./index-BW0DBoAl.js";
import { G as GlassCard, a as ScoreBadge } from "./GlassCard-CqZihfXf.js";
import { d as useUserResumes, b as useDeleteResume } from "./use-resumes-BkByy20o.js";
import { H as History } from "./history-DRuu52Wy.js";
import { D as Download } from "./download-DJwlZCMW.js";
import { i as isFunction, D as Dot, c as findAllByType, E as ErrorBar, L as Layer, d as filterProps, e as Curve, A as Animate, h as interpolateNumber, j as isEqual, k as isNil, l as hasClipDot, m as LabelList, n as getValueByDataKey, u as uniqueId, G as Global, o as getCateCoordinateOfLine, g as generateCategoricalChart, X as XAxis, Y as YAxis, f as formatAxisMap, C as CloudUpload, R as ResponsiveContainer, a as CartesianGrid, T as Tooltip } from "./generateCategoricalChart-DKQlU1BF.js";
import { F as FileText } from "./file-text-BdAYUBQk.js";
import { S as Sparkles } from "./sparkles-D7iV9PZj.js";
import { S as Star } from "./star-3dMSJpQd.js";
import { A as ArrowUp, a as ArrowDown } from "./arrow-up-D7ic3_hu.js";
import { A as ArrowRight } from "./arrow-right-DwP2sP5m.js";
import { C as Calendar } from "./calendar-EyJncCHR.js";
import { T as Trash2 } from "./trash-2-DbtB38ng.js";
import { C as ChevronUp } from "./chevron-up-Dj0QWSpa.js";
import { C as ChevronDown } from "./chevron-down-Buq2wl4V.js";
import "./useMutation-DJ2_JvTs.js";
import "./api-D_-AFWZL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
var _excluded = ["type", "layout", "connectNulls", "ref"], _excluded2 = ["key"];
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o, e) {
  return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Line = /* @__PURE__ */ function(_PureComponent) {
  function Line2() {
    var _this;
    _classCallCheck(this, Line2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Line2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: true,
      totalLength: 0
    });
    _defineProperty(_this, "generateSimpleStrokeDasharray", function(totalLength, length) {
      return "".concat(length, "px ").concat(totalLength - length, "px");
    });
    _defineProperty(_this, "getStrokeDasharray", function(length, totalLength, lines) {
      var lineLength = lines.reduce(function(pre, next) {
        return pre + next;
      });
      if (!lineLength) {
        return _this.generateSimpleStrokeDasharray(totalLength, length);
      }
      var count = Math.floor(length / lineLength);
      var remainLength = length % lineLength;
      var restLength = totalLength - length;
      var remainLines = [];
      for (var i = 0, sum = 0; i < lines.length; sum += lines[i], ++i) {
        if (sum + lines[i] > remainLength) {
          remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
          break;
        }
      }
      var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];
      return [].concat(_toConsumableArray(Line2.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function(line) {
        return "".concat(line, "px");
      }).join(", ");
    });
    _defineProperty(_this, "id", uniqueId("recharts-line-"));
    _defineProperty(_this, "pathRef", function(node) {
      _this.mainCurve = node;
    });
    _defineProperty(_this, "handleAnimationEnd", function() {
      _this.setState({
        isAnimationFinished: true
      });
      if (_this.props.onAnimationEnd) {
        _this.props.onAnimationEnd();
      }
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      _this.setState({
        isAnimationFinished: false
      });
      if (_this.props.onAnimationStart) {
        _this.props.onAnimationStart();
      }
    });
    return _this;
  }
  _inherits(Line2, _PureComponent);
  return _createClass(Line2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      this.setState({
        totalLength
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!this.props.isAnimationActive) {
        return;
      }
      var totalLength = this.getTotalLength();
      if (totalLength !== this.state.totalLength) {
        this.setState({
          totalLength
        });
      }
    }
  }, {
    key: "getTotalLength",
    value: function getTotalLength() {
      var curveDom = this.mainCurve;
      try {
        return curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;
      } catch (err) {
        return 0;
      }
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar(needClip, clipPathId) {
      if (this.props.isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props = this.props, points = _this$props.points, xAxis = _this$props.xAxis, yAxis = _this$props.yAxis, layout = _this$props.layout, children = _this$props.children;
      var errorBarItems = findAllByType(children, ErrorBar);
      if (!errorBarItems) {
        return null;
      }
      var dataPointFormatter = function dataPointFormatter2(dataPoint, dataKey) {
        return {
          x: dataPoint.x,
          y: dataPoint.y,
          value: dataPoint.value,
          errorVal: getValueByDataKey(dataPoint.payload, dataKey)
        };
      };
      var errorBarProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React.createElement(Layer, errorBarProps, errorBarItems.map(function(item) {
        return /* @__PURE__ */ React.cloneElement(item, {
          key: "bar-".concat(item.props.dataKey),
          data: points,
          xAxis,
          yAxis,
          layout,
          dataPointFormatter
        });
      }));
    }
  }, {
    key: "renderDots",
    value: function renderDots(needClip, clipDot, clipPathId) {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props2 = this.props, dot = _this$props2.dot, points = _this$props2.points, dataKey = _this$props2.dataKey;
      var lineProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread(_objectSpread(_objectSpread({
          key: "dot-".concat(i),
          r: 3
        }, lineProps), customDotProps), {}, {
          index: i,
          cx: entry.x,
          cy: entry.y,
          value: entry.value,
          dataKey,
          payload: entry.payload,
          points
        });
        return Line2.renderDotItem(dot, dotProps);
      });
      var dotsProps = {
        clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : null
      };
      return /* @__PURE__ */ React.createElement(Layer, _extends({
        className: "recharts-line-dots",
        key: "dots"
      }, dotsProps), dots);
    }
  }, {
    key: "renderCurveStatically",
    value: function renderCurveStatically(points, needClip, clipPathId, props) {
      var _this$props3 = this.props, type = _this$props3.type, layout = _this$props3.layout, connectNulls = _this$props3.connectNulls;
      _this$props3.ref;
      var others = _objectWithoutProperties(_this$props3, _excluded);
      var curveProps = _objectSpread(_objectSpread(_objectSpread({}, filterProps(others, true)), {}, {
        fill: "none",
        className: "recharts-line-curve",
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null,
        points
      }, props), {}, {
        type,
        layout,
        connectNulls
      });
      return /* @__PURE__ */ React.createElement(Curve, _extends({}, curveProps, {
        pathRef: this.pathRef
      }));
    }
  }, {
    key: "renderCurveWithAnimation",
    value: function renderCurveWithAnimation(needClip, clipPathId) {
      var _this2 = this;
      var _this$props4 = this.props, points = _this$props4.points, strokeDasharray = _this$props4.strokeDasharray, isAnimationActive = _this$props4.isAnimationActive, animationBegin = _this$props4.animationBegin, animationDuration = _this$props4.animationDuration, animationEasing = _this$props4.animationEasing, animationId = _this$props4.animationId, animateNewValues = _this$props4.animateNewValues, width = _this$props4.width, height = _this$props4.height;
      var _this$state = this.state, prevPoints = _this$state.prevPoints, totalLength = _this$state.totalLength;
      return /* @__PURE__ */ React.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "line-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        if (prevPoints) {
          var prevPointsDiffFactor = prevPoints.length / points.length;
          var stepData = points.map(function(entry, index) {
            var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
            if (prevPoints[prevPointIndex]) {
              var prev = prevPoints[prevPointIndex];
              var interpolatorX = interpolateNumber(prev.x, entry.x);
              var interpolatorY = interpolateNumber(prev.y, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: interpolatorX(t),
                y: interpolatorY(t)
              });
            }
            if (animateNewValues) {
              var _interpolatorX = interpolateNumber(width * 2, entry.x);
              var _interpolatorY = interpolateNumber(height / 2, entry.y);
              return _objectSpread(_objectSpread({}, entry), {}, {
                x: _interpolatorX(t),
                y: _interpolatorY(t)
              });
            }
            return _objectSpread(_objectSpread({}, entry), {}, {
              x: entry.x,
              y: entry.y
            });
          });
          return _this2.renderCurveStatically(stepData, needClip, clipPathId);
        }
        var interpolator = interpolateNumber(0, totalLength);
        var curLength = interpolator(t);
        var currentStrokeDasharray;
        if (strokeDasharray) {
          var lines = "".concat(strokeDasharray).split(/[,\s]+/gim).map(function(num) {
            return parseFloat(num);
          });
          currentStrokeDasharray = _this2.getStrokeDasharray(curLength, totalLength, lines);
        } else {
          currentStrokeDasharray = _this2.generateSimpleStrokeDasharray(totalLength, curLength);
        }
        return _this2.renderCurveStatically(points, needClip, clipPathId, {
          strokeDasharray: currentStrokeDasharray
        });
      });
    }
  }, {
    key: "renderCurve",
    value: function renderCurve(needClip, clipPathId) {
      var _this$props5 = this.props, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
      var _this$state2 = this.state, prevPoints = _this$state2.prevPoints, totalLength = _this$state2.totalLength;
      if (isAnimationActive && points && points.length && (!prevPoints && totalLength > 0 || !isEqual(prevPoints, points))) {
        return this.renderCurveWithAnimation(needClip, clipPathId);
      }
      return this.renderCurveStatically(points, needClip, clipPathId);
    }
  }, {
    key: "render",
    value: function render() {
      var _filterProps;
      var _this$props6 = this.props, hide = _this$props6.hide, dot = _this$props6.dot, points = _this$props6.points, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, top = _this$props6.top, left = _this$props6.left, width = _this$props6.width, height = _this$props6.height, isAnimationActive = _this$props6.isAnimationActive, id = _this$props6.id;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var hasSinglePoint = points.length === 1;
      var layerClass = clsx("recharts-line", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      var _ref2 = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
        r: 3,
        strokeWidth: 2
      }, _ref2$r = _ref2.r, r = _ref2$r === void 0 ? 3 : _ref2$r, _ref2$strokeWidth = _ref2.strokeWidth, strokeWidth = _ref2$strokeWidth === void 0 ? 2 : _ref2$strokeWidth;
      var _ref3 = hasClipDot(dot) ? dot : {}, _ref3$clipDot = _ref3.clipDot, clipDot = _ref3$clipDot === void 0 ? true : _ref3$clipDot;
      var dotSize = r * 2 + strokeWidth;
      return /* @__PURE__ */ React.createElement(Layer, {
        className: layerClass
      }, needClipX || needClipY ? /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ React.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      })), !clipDot && /* @__PURE__ */ React.createElement("clipPath", {
        id: "clipPath-dots-".concat(clipPathId)
      }, /* @__PURE__ */ React.createElement("rect", {
        x: left - dotSize / 2,
        y: top - dotSize / 2,
        width: width + dotSize,
        height: height + dotSize
      }))) : null, !hasSinglePoint && this.renderCurve(needClip, clipPathId), this.renderErrorBar(needClip, clipPathId), (hasSinglePoint || dot) && this.renderDots(needClip, clipDot, clipPathId), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }, {
    key: "repeat",
    value: function repeat(lines, count) {
      var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
      var result = [];
      for (var i = 0; i < count; ++i) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
      }
      return result;
    }
  }, {
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;
      if (/* @__PURE__ */ React.isValidElement(option)) {
        dotItem = /* @__PURE__ */ React.cloneElement(option, props);
      } else if (isFunction(option)) {
        dotItem = option(props);
      } else {
        var key = props.key, dotProps = _objectWithoutProperties(props, _excluded2);
        var className = clsx("recharts-line-dot", typeof option !== "boolean" ? option.className : "");
        dotItem = /* @__PURE__ */ React.createElement(Dot, _extends({
          key
        }, dotProps, {
          className
        }));
      }
      return dotItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty(Line, "displayName", "Line");
_defineProperty(Line, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  connectNulls: false,
  activeDot: true,
  dot: true,
  legendType: "line",
  stroke: "#3182bd",
  strokeWidth: 1,
  fill: "#fff",
  points: [],
  isAnimationActive: !Global.isSsr,
  animateNewValues: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  hide: false,
  label: false
});
_defineProperty(Line, "getComposedData", function(_ref4) {
  var props = _ref4.props, xAxis = _ref4.xAxis, yAxis = _ref4.yAxis, xAxisTicks = _ref4.xAxisTicks, yAxisTicks = _ref4.yAxisTicks, dataKey = _ref4.dataKey, bandSize = _ref4.bandSize, displayedData = _ref4.displayedData, offset = _ref4.offset;
  var layout = props.layout;
  var points = displayedData.map(function(entry, index) {
    var value = getValueByDataKey(entry, dataKey);
    if (layout === "horizontal") {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isNil(value) ? null : yAxis.scale(value),
        value,
        payload: entry
      };
    }
    return {
      x: isNil(value) ? null : xAxis.scale(value),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  return _objectSpread({
    points,
    layout
  }, offset);
});
var LineChart = generateCategoricalChart({
  chartName: "LineChart",
  GraphicalChild: Line,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
function getScoreTier(score) {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Work";
}
function getSkillCategory(skill) {
  const lower = skill.toLowerCase();
  const technical = [
    "javascript",
    "typescript",
    "python",
    "java",
    "c++",
    "c#",
    "go",
    "rust",
    "ruby",
    "php",
    "swift",
    "kotlin",
    "sql",
    "html",
    "css",
    "react",
    "vue",
    "angular",
    "node",
    "express",
    "django",
    "flask",
    "spring",
    "tensorflow",
    "pytorch",
    "machine learning",
    "deep learning",
    "nlp",
    "ai",
    "ml",
    "api",
    "rest",
    "graphql",
    "mongodb",
    "postgresql",
    "mysql",
    "redis",
    "aws",
    "azure",
    "gcp",
    "kubernetes",
    "docker"
  ];
  const tools = [
    "git",
    "github",
    "gitlab",
    "jira",
    "confluence",
    "figma",
    "sketch",
    "xd",
    "postman",
    "webpack",
    "vite",
    "jest",
    "cypress",
    "linux",
    "bash",
    "terraform",
    "ansible",
    "jenkins",
    "ci/cd",
    "vs code",
    "intellij",
    "excel",
    "tableau",
    "powerbi"
  ];
  const soft = [
    "communication",
    "leadership",
    "teamwork",
    "problem solving",
    "analytical",
    "critical thinking",
    "management",
    "collaboration",
    "presentation",
    "negotiation",
    "adaptability",
    "creativity",
    "time management"
  ];
  if (technical.some((t) => lower.includes(t))) return "technical";
  if (tools.some((t) => lower.includes(t))) return "tools";
  if (soft.some((t) => lower.includes(t))) return "soft";
  return "default";
}
const skillCategoryStyles = {
  technical: "bg-primary/15 text-primary border-primary/30",
  tools: "bg-secondary/15 text-secondary border-secondary/30",
  soft: "bg-success/15 text-success border-success/30",
  default: "bg-muted/40 text-muted-foreground border-border/30"
};
function computeTrend(resumes, count = 3) {
  if (resumes.length < 2) return "stable";
  const recent = resumes.slice(0, count);
  if (recent.length < 2) return "stable";
  const first = recent[recent.length - 1].score;
  const last = recent[0].score;
  if (last - first > 3) return "up";
  if (first - last > 3) return "down";
  return "stable";
}
function exportToCsv(resumes, email) {
  const rows = [
    ["Filename", "Upload Date", "Score", "Skills", "Tier"],
    ...resumes.map((r) => [
      `"${r.filename}"`,
      `"${new Date(r.uploadDate).toLocaleString()}"`,
      String(r.score),
      `"${r.skills.join(", ")}"`,
      `"${getScoreTier(r.score)}"`
    ])
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resume-history-${email.split("@")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function ProfileStatCard({ meta }) {
  const TrendIcon = meta.trend === "up" ? ArrowUp : meta.trend === "down" ? ArrowDown : Minus;
  const trendColor = meta.trend === "up" ? "text-success" : meta.trend === "down" ? "text-destructive" : "text-muted-foreground";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      "data-ocid": meta.ocid,
      className: "flex flex-col gap-3 hover:border-primary/30 transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `p-2 rounded-lg border ${meta.iconBg} shrink-0 flex items-center justify-center`,
              children: meta.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TrendIcon,
            {
              "aria-hidden": "true",
              className: `size-3.5 mt-1 ${trendColor}`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground leading-none", children: meta.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-body", children: meta.label })
        ] })
      ]
    }
  );
}
function CustomTooltip({ active, payload }) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const d = payload[0].payload;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg px-3 py-2 text-xs max-w-[180px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate", children: d.filename }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-0.5", children: d.date }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-mono font-bold mt-1", children: [
      "Score: ",
      d.score,
      "/100"
    ] })
  ] });
}
function ScoreTrendChart({ resumes }) {
  if (resumes.length < 2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex flex-col items-center justify-center gap-3 py-10 text-center border-border/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-xl bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 text-primary/60", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Upload more resumes to see your trend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Score trend appears after 2+ uploads" })
      ] })
    ] });
  }
  const trendData = [...resumes].reverse().map((r, i) => ({
    upload: `#${i + 1}`,
    score: r.score,
    filename: r.filename,
    date: new Date(r.uploadDate).toLocaleDateString(void 0, {
      month: "short",
      day: "numeric"
    })
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "flex flex-col gap-4 border-border/20",
      "data-ocid": "score-trend-chart",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-primary/15 border border-primary/25 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 text-primary", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm", children: "Score Trend" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          LineChart,
          {
            data: trendData,
            margin: { top: 8, right: 8, left: -20, bottom: 0 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CartesianGrid,
                {
                  strokeDasharray: "3 3",
                  stroke: "oklch(0.53 0.22 264 / 0.08)",
                  vertical: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                XAxis,
                {
                  dataKey: "upload",
                  tick: { fill: "oklch(0.68 0.01 264)", fontSize: 11 },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                YAxis,
                {
                  domain: [0, 100],
                  tick: { fill: "oklch(0.68 0.01 264)", fontSize: 11 },
                  axisLine: false,
                  tickLine: false
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}),
                  cursor: { stroke: "oklch(0.53 0.22 264 / 0.2)", strokeWidth: 1 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Line,
                {
                  type: "monotone",
                  dataKey: "score",
                  stroke: "oklch(0.53 0.22 264)",
                  strokeWidth: 2.5,
                  dot: (props) => {
                    const { cx, cy, payload } = props;
                    const color = payload.score >= 70 ? "oklch(0.54 0.2 151)" : payload.score >= 40 ? "oklch(0.65 0.18 79)" : "oklch(0.62 0.22 22)";
                    return /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Dot,
                      {
                        cx,
                        cy,
                        r: 5,
                        fill: color,
                        stroke: "oklch(0.08 0.015 264)",
                        strokeWidth: 2
                      },
                      `dot-${payload.upload}`
                    );
                  },
                  activeDot: {
                    r: 7,
                    stroke: "oklch(0.53 0.22 264)",
                    strokeWidth: 2,
                    fill: "oklch(0.08 0.015 264)"
                  }
                }
              )
            ]
          }
        ) }) })
      ]
    }
  );
}
function TimelineCard({
  resume,
  index,
  isLast
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(false);
  const { mutate: deleteResume, isPending: isDeleting } = useDeleteResume();
  const handleDelete = () => {
    deleteResume(resume.id);
    setConfirmDelete(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex gap-4",
      "data-ocid": `timeline.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0 w-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBadge, { score: resume.score, size: "sm" }) }),
          !isLast && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent mt-2 min-h-[24px]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            className: "flex-1 mb-4 border-border/20 hover:border-primary/25 transition-smooth",
            "data-ocid": `timeline.card.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3 text-primary", "aria-hidden": "true" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-display font-semibold text-foreground text-sm truncate",
                        title: resume.filename,
                        children: resume.filename
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-0.5 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3 shrink-0", "aria-hidden": "true" }),
                        new Date(resume.uploadDate).toLocaleDateString(void 0, {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })
                      ] }),
                      resume.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "size-3 shrink-0", "aria-hidden": "true" }),
                        resume.skills.length,
                        " skill",
                        resume.skills.length !== 1 ? "s" : ""
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground border border-border/20 font-medium", children: getScoreTier(resume.score) })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                  !confirmDelete ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setConfirmDelete(true),
                      disabled: isDeleting,
                      "aria-label": "Delete resume",
                      "data-ocid": `timeline.delete_button.${index + 1}`,
                      className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth focus:outline-none focus-visible:ring-1 focus-visible:ring-destructive/40",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5", "aria-hidden": "true" })
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-medium", children: "Delete?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleDelete,
                        disabled: isDeleting,
                        "data-ocid": `timeline.confirm_button.${index + 1}`,
                        className: "px-2 py-1 rounded-md bg-destructive/20 text-destructive border border-destructive/30 text-xs font-semibold hover:bg-destructive/30 transition-smooth",
                        children: "Yes"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setConfirmDelete(false),
                        "data-ocid": `timeline.cancel_button.${index + 1}`,
                        className: "px-2 py-1 rounded-md bg-muted/40 text-muted-foreground border border-border/30 text-xs font-semibold hover:bg-muted/60 transition-smooth",
                        children: "No"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setExpanded((e) => !e),
                      "aria-expanded": expanded,
                      "aria-label": expanded ? "Collapse skills" : "Expand skills",
                      "data-ocid": `timeline.toggle.${index + 1}`,
                      className: "p-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/40",
                      children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-3.5", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3.5", "aria-hidden": "true" })
                    }
                  )
                ] })
              ] }),
              !expanded && resume.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap gap-1 overflow-hidden max-h-7", children: [
                resume.skills.slice(0, 6).map((skill) => {
                  const cat = getSkillCategory(skill);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border transition-smooth ${skillCategoryStyles[cat]}`,
                      children: skill
                    },
                    skill
                  );
                }),
                resume.skills.length > 6 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium text-muted-foreground bg-muted/30 border border-border/20", children: [
                  "+",
                  resume.skills.length - 6
                ] })
              ] }),
              expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 pt-3 border-t border-border/15", children: resume.skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-2.5 flex-wrap", children: ["technical", "tools", "soft"].map((cat) => {
                  const count = resume.skills.filter(
                    (s) => getSkillCategory(s) === cat
                  ).length;
                  if (!count) return null;
                  const labels = {
                    technical: "Technical",
                    tools: "Tools",
                    soft: "Soft Skills"
                  };
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: `text-[10px] font-medium px-1.5 py-0.5 rounded border ${skillCategoryStyles[cat]}`,
                      children: [
                        labels[cat],
                        ": ",
                        count
                      ]
                    },
                    cat
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: resume.skills.map((skill) => {
                  const cat = getSkillCategory(skill);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border transition-smooth ${skillCategoryStyles[cat]}`,
                      children: skill
                    },
                    skill
                  );
                }) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground italic", children: "No skills extracted" }) })
            ]
          }
        )
      ]
    }
  );
}
function SkeletonTimeline() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 flex flex-col items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full shimmer" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 glass rounded-xl p-5 flex flex-col gap-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-lg shimmer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-1/2 rounded shimmer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/4 rounded shimmer" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: [1, 2, 3].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-14 rounded-md shimmer" }, j)) })
    ] })
  ] }, i)) });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-5 py-16 text-center",
      "data-ocid": "profile.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 rounded-2xl bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-10 text-primary/60", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No resumes uploaded yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-xs", children: "Upload your first resume to get started. Your analysis history and score trends will appear here." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
            "data-ocid": "profile.go_upload_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "size-4", "aria-hidden": "true" }),
              "Upload a resume",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4", "aria-hidden": "true" })
            ]
          }
        ) })
      ]
    }
  );
}
function ProfilePage() {
  const { user } = useAuth();
  const { data: resumes = [], isLoading, isError } = useUserResumes();
  const totalUploads = resumes.length;
  const avgScore = resumes.length > 0 ? Math.round(resumes.reduce((s, r) => s + r.score, 0) / resumes.length) : 0;
  const bestScore = resumes.length > 0 ? Math.max(...resumes.map((r) => r.score)) : 0;
  const totalSkills = resumes.reduce((s, r) => s + r.skills.length, 0);
  const overallTrend = computeTrend(resumes);
  const statCards = [
    {
      label: "Total Uploads",
      value: totalUploads,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3.5 text-secondary", "aria-hidden": "true" }),
      iconBg: "bg-secondary/10 border-secondary/25",
      trend: "stable",
      ocid: "stat.total_uploads"
    },
    {
      label: "Average Score",
      value: avgScore,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 text-primary", "aria-hidden": "true" }),
      iconBg: "bg-primary/10 border-primary/25",
      trend: overallTrend,
      ocid: "stat.avg_score"
    },
    {
      label: "Best Score",
      value: bestScore,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "size-3.5 text-success", "aria-hidden": "true" }),
      iconBg: "bg-success/10 border-success/25",
      trend: "stable",
      ocid: "stat.best_score"
    },
    {
      label: "Total Skills Found",
      value: totalSkills,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "size-3.5 text-accent", "aria-hidden": "true" }),
      iconBg: "bg-accent/10 border-accent/25",
      trend: overallTrend,
      ocid: "stat.total_skills"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-primary/15 border border-primary/30 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-5 text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Resume History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            (user == null ? void 0 : user.email) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: user.email }),
            !isLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground/60", children: [
              "· ",
              resumes.length,
              " resume",
              resumes.length !== 1 ? "s" : ""
            ] })
          ] })
        ] })
      ] }),
      !isLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => exportToCsv(resumes, (user == null ? void 0 : user.email) ?? "user"),
          className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 shrink-0",
          "data-ocid": "profile.export_csv_button",
          "aria-label": "Export resume history as CSV",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5", "aria-hidden": "true" }),
            "Export CSV"
          ]
        }
      )
    ] }),
    !isLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
        "data-ocid": "profile.stat_cards",
        children: statCards.map((meta) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileStatCard, { meta }, meta.label))
      }
    ),
    !isLoading && !isError && /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreTrendChart, { resumes }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTimeline, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass rounded-xl px-5 py-4 border border-destructive/25 bg-destructive/5 text-sm text-destructive",
        "data-ocid": "profile.error_state",
        children: "Failed to load resume history. Please refresh the page."
      }
    ) : resumes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "profile.timeline_list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-muted/30 border border-border/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          History,
          {
            className: "size-3.5 text-muted-foreground",
            "aria-hidden": "true"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Upload Timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "— most recent first" })
      ] }),
      resumes.map((resume, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TimelineCard,
        {
          resume,
          index,
          isLast: index === resumes.length - 1
        },
        resume.id
      ))
    ] }),
    !isLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-5 py-4 flex items-center justify-between gap-4 border border-border/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "size-4 text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Upload another resume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Analyse a new CV and compare scores" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-display font-semibold hover:bg-primary/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 whitespace-nowrap",
          "data-ocid": "profile.upload_more_button",
          children: [
            "Upload",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3.5", "aria-hidden": "true" })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
