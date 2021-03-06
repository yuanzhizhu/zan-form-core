import React from "react";

const componentDecorator = (
  Component,
  mapDecoratorStateToProps,
  beforeRemoveFormItem
) => {
  class NewComponent extends React.Component {
    state = {
      key: Math.random().toString(36),
      data: mapDecoratorStateToProps.get(this.props)
    };

    restart = () => {
      beforeRemoveFormItem &&
        beforeRemoveFormItem(this.props.formInstance, this.props.name);
      this.setState({ key: Math.random().toString(36) });
      this.getInitDataFromRemote();
    };

    getInitDataFromRemote = () => {
      const { _fetch_data, _values } = this.props;
      if (_fetch_data) {
        _fetch_data(_values).then(data => {
          this.setState({ data });
        });
      }
    };

    componentDidMount = () => {
      this.getInitDataFromRemote();
    };

    componentDidUpdate = prevProps => {
      const { _subscribe } = this.props;

      if (_subscribe) {
        _subscribe(prevProps._values, this.props._values, this.restart);
      }
    };

    render = () => {
      const {
        _fetch_data,
        _values,
        _format,
        _subscribe,
        forwardedRef,
        formInstance,
        ...restProps
      } = this.props;

      const { key, data: dataFromRemote } = this.state;

      if (dataFromRemote) {
        mapDecoratorStateToProps.set(restProps, dataFromRemote);
      }

      return _format ? (
        _format(
          <Component key={key} ref={forwardedRef} {...restProps} />,
          _values
        )
      ) : (
        <Component key={key} ref={forwardedRef} {...restProps} />
      );
    };
  }

  return React.forwardRef((props, ref) => {
    return <NewComponent {...props} forwardedRef={ref} />;
  });
};

export default componentDecorator;
