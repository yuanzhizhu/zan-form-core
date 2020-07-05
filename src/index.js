import React from "react";

import Slot from "./slot";
import componentDecorator from "./componentDecorator";

const componentLib = {};

const register = (name, component) => {
  componentLib[name] = componentDecorator(component);
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

const zanForm = (schema, formInstance) => $slotsElementsFrag => {
  const values = zanForm.howToGetValues(formInstance);
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
      zanForm.onProps && zanForm.onProps(props);

      const key = genKeyByIdentifier(_name);
      props.name = _name;

      const Component = componentLib[_component];

      rcEle = (
        <Component
          key={key}
          _format={_format}
          _values={values}
          _subscribe={_subscribe}
          _fetch_data={_fetch_data}
          {...props}
        />
      );
    }

    const showComponent = _show ? _show(values) : true;

    return showComponent ? rcEle : null;
  });

  return formElement;
};

zanForm.Slot = Slot;
zanForm.register = register;

export default zanForm;
