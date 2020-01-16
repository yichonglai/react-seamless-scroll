import * as React from 'react';
interface IProps {
    title?: string;
}
interface IStates {
    name?: string;
}
declare class PluginDemo extends React.Component<IProps, IStates> {
    constructor(props: IProps);
    render(): JSX.Element;
}
export default PluginDemo;
