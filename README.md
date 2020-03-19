# react-seamless-scroll

>一个基于 `requestAnimationFrame` 的`react`自动无缝滚动组件！

## 快速开始

---

- `npm install react-seamless-scroll -S`
- `import react-seamless-scroll from 'react-seamless-scroll'`;

## 使用方法

---

如下props:

Option               | default       | Description
---------------------|---------------|-----------------------------------------------
`speed`            |  60        | 每秒/px
`reverse`   |  false         | 是否逆向滚动
`mode`            |  vertical         | 滚动方向

## 示例代码

```typescript
import './index.scss';

import {Icon, Spin} from 'antd';

import Empty from '../Empty';
import {OperationRecordType} from 'entity/realTimeMonitor';
import React from 'react';
import ReactSeamlessScroll from 'react-seamless-scroll';
import moment from 'moment';

interface IProps {
  list: OperationRecordType[];
  loading?: boolean;
}
const Broadcast = React.memo((props: IProps) => {
  const {list, loading = false} = props;
  return (
    <Spin spinning={loading} indicator={<Icon type="loading" />}>
      <ReactSeamlessScroll style={{width: '100%', height: '350px'}}>
        {list.length ? (
          list.map(item => (
            <div key={item.id} styleName="root">
              <header>
                <span>{item.module}</span>
                <small>{moment(item.timestamp).format('YYYY-MM-DD [/]HH:mm:ss')}</small>
              </header>
              <div>
                {item.username}
                &nbsp;
                {item.operatetype}
                &nbsp;
                <span className="yellow">{item.objvalue}</span>
                &nbsp;
                {item.objtype}
                &nbsp;
                <span className="pink">{item.state}</span>
              </div>
            </div>
          ))
        ) : (
          <Empty style={{marginTop: '100px'}} />
        )}
      </ReactSeamlessScroll>
    </Spin>
  );
});

export default Broadcast;

```
