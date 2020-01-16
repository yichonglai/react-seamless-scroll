"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var enzyme_1 = require("enzyme");
var enzyme_adapter_react_16_1 = __importDefault(require("enzyme-adapter-react-16"));
var index_1 = require("../component/PluginDemo/index");
enzyme_1.configure({ adapter: new enzyme_adapter_react_16_1.default() });
test('1加1等于2', function () {
    expect(1 + 1).toBe(2);
});
test('Jest-React-TypeScript 尝试运行', function () {
    var renderer = enzyme_1.shallow(react_1.default.createElement("div", null, "hello world"));
    expect(renderer.text()).toEqual('hello world');
});
var setup = function () {
    // 模拟 props
    var props = {
        title: '测试组件的props传值',
    };
    // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
    var wrapper = enzyme_1.shallow(react_1.default.createElement(index_1.PluginDemo, __assign({}, props)));
    return {
        props: props,
        wrapper: wrapper,
    };
};
describe('测试demo组件', function () {
    var _a = setup(), wrapper = _a.wrapper, props = _a.props;
    // 通过传递模拟的props,测试组件是否正常渲染
    it('props', function () {
        // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
        expect(wrapper.text()).toEqual('测试组件的props传值');
    });
});
