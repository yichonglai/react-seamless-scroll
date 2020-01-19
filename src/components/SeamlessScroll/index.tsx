import React from 'react';

const DEFAULT_PROPS = {
  fps: 60,
  speed: 60,
  style: {},
  className: '',
  reverse: false,
  mode: 'vertical',
}
interface SeamlessRollProps {
  children?: React.ReactNode;
  /**每秒/px */
  speed?: number;
  style?: React.CSSProperties;
  className?: string;
  reverse?: boolean;
  mode?: 'vertical' | 'horizontal';
}
interface SeamlessRollState {
  step: number;
  sliderSize: number;
  containerSize: number;
}
class SeamlessRoll extends React.PureComponent<SeamlessRollProps, SeamlessRollState> {
  containerDom: HTMLDivElement | null = null;
  wrapperDom: HTMLDivElement | null = null;
  sliderDom: HTMLDivElement | null = null;
  sliderDomCopy: HTMLDivElement | null = null;
  requestID: number = 0;
  state = {
    step: 1,
    sliderSize: 0,
    containerSize: 0,
  };

  componentDidMount() {
    this.init();
  }
  componentDidUpdate(prevProps: SeamlessRollProps, prevState: SeamlessRollState) {
    const { children, speed, style, className, mode } = this.props;
    if (children !== prevProps.children || speed !== prevProps.speed || style !== prevProps.style || className !== prevProps.className || mode !== prevProps.mode) {
      this.init();
    }
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.requestID);
  }
  init = () => {
    const { speed = DEFAULT_PROPS.speed, mode = DEFAULT_PROPS.mode } = this.props;
    const step = parseFloat((speed / DEFAULT_PROPS.fps).toFixed(2));
    const sliderSize = mode === 'vertical' ? this.sliderDom!.offsetHeight : this.sliderDom!.offsetWidth;
    const containerSize = mode === 'vertical' ? this.containerDom!.clientHeight : this.containerDom!.clientWidth;
    this.setState({ step, sliderSize, containerSize }, () => {
      cancelAnimationFrame(this.requestID);
      if (sliderSize > containerSize) {
        this.sliderDomCopy!.innerHTML = this.sliderDom!.innerHTML;
        this.requestID = requestAnimationFrame(this.marquee);
        this.containerDom!.onmouseover = () => {
          cancelAnimationFrame(this.requestID);
        };
        this.containerDom!.onmouseout = () => {
          cancelAnimationFrame(this.requestID);
          this.requestID = requestAnimationFrame(this.marquee);
        };
      } else {
        this.sliderDomCopy!.innerHTML = '';
        this.containerDom!.onmouseover = null;
        this.containerDom!.onmouseout = null;
      }
    });
  };
  /**marquee */
  marquee = () => {
    const { sliderSize, step } = this.state;
    const { reverse = DEFAULT_PROPS.reverse, mode = DEFAULT_PROPS.mode } = this.props;
    const key = mode === 'vertical' ? 'top' : 'left';
    const position = parseFloat(this.getStyle(this.wrapperDom!, key));
    if (reverse) {
      if (position >= 0) {
        this.wrapperDom!.style[key] = `-${sliderSize}px`;
      } else {
        this.wrapperDom!.style[key] = `${position + step}px`;
      }
    } else {
      if (sliderSize - Math.abs(position) <= 0) {
        this.wrapperDom!.style[key] = '0px';
      } else {
        this.wrapperDom!.style[key] = `${position - step}px`;
      }
    }
    cancelAnimationFrame(this.requestID);
    this.requestID = requestAnimationFrame(this.marquee);
  };
  getStyle = (ele: HTMLElement, attr: string) => {
    if (window.getComputedStyle) {
      return window.getComputedStyle(ele)[attr];
    }
    return (ele as any).currentStyle[attr];
  };
  // 检测dom宽高变更
  // checkResize = () => {
  render() {
    const { children, style = DEFAULT_PROPS.style, className = DEFAULT_PROPS.className, mode = DEFAULT_PROPS.mode } = this.props;
    const containerStyle: React.CSSProperties = {
      position: 'relative', 
      overflow: 'hidden', 
      width: '100%', 
      height: '100%',
    };
    const WrapperStyle: React.CSSProperties = {
      position: 'absolute', 
      top: 0,
      left: 0,
      right: mode === 'vertical' ? 0 : 'auto',
      bottom: mode === 'vertical' ? 'auto' : 0,
      whiteSpace: mode === 'vertical' ? 'normal' : 'nowrap',
    };
    const sliderStyle: React.CSSProperties = {
      display: mode === 'vertical' ? 'block' : 'inline-block',
    };
    return (
      <div className={className} ref={dom => (this.containerDom = dom)} style={{...containerStyle, ...style}}>
        <div ref={dom => (this.wrapperDom = dom)} style={WrapperStyle}>
            <div style={sliderStyle} ref={dom => (this.sliderDom = dom)}>{children}</div>
            <div style={sliderStyle} ref={dom => (this.sliderDomCopy = dom)} />
        </div>
      </div>
    );
  }
}

export default SeamlessRoll;
