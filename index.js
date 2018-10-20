import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';

export default class extends Component {
    static propTypes = {
        duration: PropTypes.number,
        onChange: PropTypes.func,
        active: PropTypes.bool
    };

    static defaultProps = {
        duration: 100,
        active: true,
        onChange: () => {}
    };

    constructor(props) {
        super(props);

        this.state = {
            viewTop: 0,
            viewBottom: 0,
            viewWidth: 0
        };

        this.viewPort = null;
        this.prevStatus = null;
        this.onLayout = this.onLayout.bind(this);
        this.watchingView = this.watchingView.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.active) {
            this.prevStatus = null;
            this.startWatching();
            return;
        }

        this.stopWatching();
    }

    componentWillUnmount() {
        this.stopWatching();
    }

    onLayout() {
        if (this.props.active) {
            this.startWatching();
        }
    }

    startWatching() {
        if (this.interval) {
            return;
        }

        this.interval = setInterval(this.watchingView, this.props.duration);
    }

    watchingView() {
        if (!this.viewPort) {
            return;
        }

        this.viewPort.measureInWindow((x, y, width, height) => {
            this.setState({
                viewTop: y,
                viewBottom: y + height,
                viewWidth: x + width
            });
            this.checkViewPostion();
        });
    }

    stopWatching() {
        this.interval = clearInterval(this.interval);
    }

    checkViewPostion() {
        const { height, width } = Dimensions.get('window'),
            { onChange } = this.props,
            { prevStatus, state } = this,
            { viewWidth, viewBottom, viewTop } = state,
            horizontalIsVisible = viewWidth > 0 && viewWidth <= width,
            verticalIsVisible =
                viewBottom && viewTop >= 0 && viewBottom <= height,
            isVisible = horizontalIsVisible && verticalIsVisible;

        if (prevStatus !== isVisible) {
            this.prevStatus = isVisible;
            onChange && onChange(isVisible);
        }
    }

    render() {
        return (
            <View
                collapsable={false}
                onLayout={this.onLayout}
                ref={component => {
                    this.viewPort = component;
                }}
                {...this.props}
            >
                {this.props.children}
            </View>
        );
    }
}
