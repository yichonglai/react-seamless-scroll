import React from 'react';

interface SeamlessRollProps {
  children?: React.ReactNode;
  /**每秒/px */
  speed?: number;
  style?: React.CSSProperties;
  className?: string;
}
interface SeamlessRollState {
  step: number;
  contentHeight: number;
  containerHeight: number;
}
class SeamlessRoll extends React.PureComponent<SeamlessRollProps, SeamlessRollState> {
  containerDom: any;
  sliderDom1: any;
  sliderDom2: any;
  requestID: any;
  state = {
    step: 1,
    contentHeight: 0,
    containerHeight: 0,
  };

  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps: SeamlessRollProps, prevState: SeamlessRollState) {
    const { children, speed, style, className } = this.props;
    if (children !== prevProps.children || speed !== prevProps.speed || style !== prevProps.style || className !== prevProps.className) {
      this.init();
    }
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.requestID);
  }
  init = () => {
    const { speed = 20 } = this.props;
    let step = parseFloat(((60 * speed) / 1000).toFixed(2));
    if (step < 1) step = 1;
    const contentHeight = this.sliderDom1.offsetHeight;
    const containerHeight = this.containerDom.clientHeight;
    this.setState({ step, contentHeight, containerHeight }, () => {
      cancelAnimationFrame(this.requestID);
      if (contentHeight > containerHeight) {
        this.sliderDom2.innerHTML = this.sliderDom1.innerHTML;
        this.requestID = requestAnimationFrame(this.marquee);
        this.containerDom.onmouseover = () => {
          cancelAnimationFrame(this.requestID);
        };
        this.containerDom.onmouseout = () => {
          cancelAnimationFrame(this.requestID);
          this.requestID = requestAnimationFrame(this.marquee);
        };
      } else {
        this.sliderDom2.innerHTML = '';
        this.containerDom.onmouseover = null;
        this.containerDom.onmouseout = null;
      }
    });
  };
  /**marquee */
  marquee = () => {
    const { contentHeight, step } = this.state;
    if (contentHeight - this.containerDom.scrollTop <= 0) {
      this.containerDom.scrollTop = 0;
    } else {
      this.containerDom.scrollTop = this.containerDom.scrollTop + (step / this.detectZoom()) * 100;
    }
    cancelAnimationFrame(this.requestID);
    this.requestID = requestAnimationFrame(this.marquee);
  };
  // 获取屏幕缩放大小
  detectZoom = () => {
    let ratio = 0;
    const screen = window.screen as any;
    const ua = navigator.userAgent.toLowerCase();

    if (window.devicePixelRatio !== undefined) {
      ratio = window.devicePixelRatio;
    } else if (~ua.indexOf('msie')) {
      if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI;
      }
    } else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
      ratio = window.outerWidth / window.innerWidth;
    }

    if (ratio) {
      ratio = Math.round(ratio * 100);
    }
    return ratio > 100 ? 100 : ratio;
  };
  render() {
    const { children, style = {}, className = '' } = this.props;
    return (
      <div style={{ position: 'relative', overflow: 'hidden', width: '100%', height: '100%', ...style }} className={className} ref={dom => (this.containerDom = dom)}>
        <div ref={dom => (this.sliderDom1 = dom)}>{children}</div>
        <div ref={dom => (this.sliderDom2 = dom)} />
      </div>
    );
  }
}

export default SeamlessRoll;
