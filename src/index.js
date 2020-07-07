import React from "react";

import Slot from "./slot";
import componentDecorator from "./componentDecorator";

const componentLib = {};

// 注册组件
const register = (name, component) => {
  componentLib[name] = componentDecorator(
    component,
    zanForm.mapDecoratorStateToProps,
    zanForm.beforeRemoveFormItem
  );
};

// 检验组件描述
const validComponentDesc = componentDesc => {
  if (componentDesc.children !== undefined) {
    throw new Error("暂时不支持props.children");
  }

  const fields = ["_name", "_component"];

  return fields.every(field => {
    const fieldValue = componentDesc[field];
    if (!fieldValue) {
      throw new Error(`在${JSON.stringify(componentDesc)}中缺少${field}`);
    } else {
      return true;
    }
  });
};

// 生成key的函数
const genKeyFn = (referCountMap = {}) => identifier => {
  const referCount = (referCountMap[identifier] || 0) + 1;
  referCountMap[identifier] = referCount;

  return `${identifier}_${referCount}`;
};

// 通过$slotsElementsFrag得到slotMap
const getSlotMap = $root => {
  const slotMap = {};

  const travel = $root => {
    if (!$root) return;

    if ($root.type === Slot) {
      const { id, children } = $root.props;
      if (id === undefined) throw new Error("<Slot></Slot>必传props.id");
      slotMap[id] = children;
    } else {
      if ($root.props.children) {
        const children = Array.isArray($root.props.children)
          ? $root.props.children
          : [$root.props.children];
        for (let child of children) {
          const $root = child;
          travel($root);
        }
      }
    }
  };

  travel($root);

  return slotMap;
};

// 设置表单值
const setValues = (data, formInstance, callback) => {
  if (data) {
    let prevValues = null;

    const setValuesAsync = () =>
      setTimeout(() => {
        const values = zanForm.howToGetFormValues(formInstance);
        if (JSON.stringify(prevValues) !== JSON.stringify(values)) {
          prevValues = values;
          zanForm.howToSetFormValues(formInstance, data);
          setValuesAsync();
        } else {
          callback && callback();
        }
      }, 0);

    setValuesAsync();
  }
};

const zanForm = (schema, formInstance) => $slotsElementsFrag => {
  if (!zanForm.howToGetFormValues) {
    throw new Error("请定义zanForm.howToGetFormValues");
  }
  if (!zanForm.howToSetFormValues) {
    throw new Error("请定义zanForm.howToSetFormValues");
  }
  if (!zanForm.mapDecoratorStateToProps) {
    throw new Error("请定义zanForm.mapDecoratorStateToProps");
  }
  if (!zanForm.onProps) {
    throw new Error("请定义zanForm.onProps");
  }
  const values = zanForm.howToGetFormValues(formInstance);
  const slotMap = getSlotMap($slotsElementsFrag);
  const genKeyByIdentifier = genKeyFn();

  const formElement = schema.map(componentDesc => {
    const {
      _component,
      _name,
      _show,
      _format,
      _fetch_data,
      _subscribe,
      _slot,
      ...props
    } = componentDesc;

    let rcEle = null;

    if (!!_slot) {
      const key = genKeyByIdentifier(_slot);
      rcEle = <React.Fragment key={key}>{slotMap[_slot]}</React.Fragment>;
    } else {
      validComponentDesc(componentDesc);
      zanForm.onProps(props, _component);

      const key = genKeyByIdentifier(_name);
      props.name = _name;

      const Component = componentLib[_component];

      rcEle = (
        <Component
          key={key}
          formInstance={formInstance}
          _format={_format}
          _values={values}
          _subscribe={_subscribe}
          _fetch_data={_fetch_data}
          {...props}
        />
      );
    }

    const showComponent = _show ? _show(values) : true;

    if (showComponent) {
      return rcEle;
    } else {
      zanForm.beforeRemoveFormItem &&
        zanForm.beforeRemoveFormItem(formInstance, _name);
      return null;
    }
  });

  return formElement;
};

zanForm.Slot = Slot;
zanForm.register = register;
zanForm.setValues = setValues;
zanForm.howToGetFormValues = null;
zanForm.howToSetFormValues = null;
zanForm.beforeRemoveFormItem = null;
zanForm.mapDecoratorStateToProps = null;
zanForm.onProps = null;

export default zanForm;
