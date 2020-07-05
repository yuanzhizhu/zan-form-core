'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var Slot = /*#__PURE__*/function (_React$Component) {
  _inherits(Slot, _React$Component);

  function Slot() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Slot);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Slot)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var children = _this.props.children;
      return React.createElement(React.Fragment, null, children);
    });

    return _this;
  }

  return Slot;
}(React.Component);

var componentDecorator = function componentDecorator(Component, mapDecoratorStateToProps) {
  var NewComponent = /*#__PURE__*/function (_React$Component) {
    _inherits(NewComponent, _React$Component);

    function NewComponent() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, NewComponent);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NewComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_this), "state", {
        key: Math.random().toString(36),
        data: mapDecoratorStateToProps.get(_this.props)
      });

      _defineProperty(_assertThisInitialized(_this), "restart", function () {
        _this.setState({
          key: Math.random().toString(36)
        });

        _this.getInitDataFromRemote();
      });

      _defineProperty(_assertThisInitialized(_this), "getInitDataFromRemote", function () {
        var _this$props = _this.props,
            _fetch_data = _this$props._fetch_data,
            _values = _this$props._values;

        if (_fetch_data) {
          _fetch_data(_values).then(function (data) {
            _this.setState({
              data: data
            });
          });
        }
      });

      _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
        _this.getInitDataFromRemote();
      });

      _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function (prevProps) {
        var _subscribe = _this.props._subscribe;

        if (_subscribe) {
          _subscribe(prevProps._values, _this.props._values, _this.restart);
        }
      });

      _defineProperty(_assertThisInitialized(_this), "render", function () {
        var _this$props2 = _this.props,
            _fetch_data = _this$props2._fetch_data,
            _values = _this$props2._values,
            _format = _this$props2._format,
            _subscribe = _this$props2._subscribe,
            forwardedRef = _this$props2.forwardedRef,
            restProps = _objectWithoutProperties(_this$props2, ["_fetch_data", "_values", "_format", "_subscribe", "forwardedRef"]);

        var _this$state = _this.state,
            key = _this$state.key,
            dataFromRemote = _this$state.data;

        if (dataFromRemote) {
          mapDecoratorStateToProps.set(restProps, dataFromRemote);
        }

        return _format ? _format(React.createElement(Component, _extends({
          key: key,
          ref: forwardedRef
        }, restProps)), _values) : React.createElement(Component, _extends({
          key: key,
          ref: forwardedRef
        }, restProps));
      });

      return _this;
    }

    return NewComponent;
  }(React.Component);

  return React.forwardRef(function (props, ref) {
    return React.createElement(NewComponent, _extends({}, props, {
      forwardedRef: ref
    }));
  });
};

var componentLib = {}; // 注册组件

var register = function register(name, component) {
  componentLib[name] = componentDecorator(component, zanForm.mapDecoratorStateToProps);
}; // 检验组件描述


var validComponentDesc = function validComponentDesc(componentDesc) {
  if (componentDesc.children !== undefined) {
    throw new Error("暂时不支持props.children");
  }

  var fields = ["_name", "_component"];
  return fields.every(function (field) {
    var fieldValue = componentDesc[field];

    if (!fieldValue) {
      throw new Error("\u5728".concat(JSON.stringify(componentDesc), "\u4E2D\u7F3A\u5C11").concat(field));
    } else {
      return true;
    }
  });
}; // 生成key的函数


var genKeyFn = function genKeyFn() {
  var referCountMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (identifier) {
    var referCount = (referCountMap[identifier] || 0) + 1;
    referCountMap[identifier] = referCount;
    return "".concat(identifier, "_").concat(referCount);
  };
}; // 通过$slotsElementsFrag得到slotMap


var getSlotMap = function getSlotMap($root) {
  var slotMap = {};

  var travel = function travel($root) {
    if (!$root) return;

    if ($root.type === Slot) {
      var _$root$props = $root.props,
          id = _$root$props.id,
          children = _$root$props.children;
      if (id === undefined) throw new Error("<Slot></Slot>必传props.id");
      slotMap[id] = children;
    } else {
      if ($root.props.children) {
        var _children = Array.isArray($root.props.children) ? $root.props.children : [$root.props.children];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;
            var _$root = child;
            travel(_$root);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  };

  travel($root);
  return slotMap;
}; // 设置表单值


var setValues = function setValues(data, formInstance, callback) {
  if (data) {
    var prevValues = null;

    var setValuesAsync = function setValuesAsync() {
      return setTimeout(function () {
        var values = zanForm.howToGetValues(formInstance);

        if (JSON.stringify(prevValues) !== JSON.stringify(values)) {
          prevValues = values;
          zanForm.howToSetValues(formInstance, data);
          setValuesAsync();
        } else {
          callback && callback();
        }
      }, 0);
    };

    setValuesAsync();
  }
};

var zanForm = function zanForm(schema, formInstance) {
  return function ($slotsElementsFrag) {
    if (!zanForm.howToGetValues) {
      throw new Error("请定义zanForm.howToGetValues");
    }

    if (!zanForm.howToSetValues) {
      throw new Error("请定义zanForm.howToSetValues");
    }

    if (!zanForm.mapDecoratorStateToProps) {
      throw new Error("请定义zanForm.mapDecoratorStateToProps");
    }

    if (!zanForm.onProps) {
      throw new Error("请定义zanForm.onProps");
    }

    var values = zanForm.howToGetValues(formInstance);
    var slotMap = getSlotMap($slotsElementsFrag);
    var genKeyByIdentifier = genKeyFn();
    var formElement = schema.map(function (componentDesc) {
      var _component = componentDesc._component,
          _name = componentDesc._name,
          _show = componentDesc._show,
          _format = componentDesc._format,
          _fetch_data = componentDesc._fetch_data,
          _subscribe = componentDesc._subscribe,
          _slot = componentDesc._slot,
          props = _objectWithoutProperties(componentDesc, ["_component", "_name", "_show", "_format", "_fetch_data", "_subscribe", "_slot"]);

      var rcEle = null;

      if (!!_slot) {
        var key = genKeyByIdentifier(_slot);
        rcEle = React.createElement(React.Fragment, {
          key: key
        }, slotMap[_slot]);
      } else {
        validComponentDesc(componentDesc);
        zanForm.onProps(props, _component);

        var _key = genKeyByIdentifier(_name);

        props.name = _name;
        var Component = componentLib[_component];
        rcEle = React.createElement(Component, _extends({
          key: _key,
          _format: _format,
          _values: values,
          _subscribe: _subscribe,
          _fetch_data: _fetch_data
        }, props));
      }

      var showComponent = _show ? _show(values) : true;
      return showComponent ? rcEle : null;
    });
    return formElement;
  };
};

zanForm.Slot = Slot;
zanForm.register = register;
zanForm.setValues = setValues;
zanForm.howToGetValues = null;
zanForm.howToSetValues = null;
zanForm.mapDecoratorStateToProps = null;
zanForm.onProps = null;

module.exports = zanForm;
