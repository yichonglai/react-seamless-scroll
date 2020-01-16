import * as React from 'react'

import SeamlessRoll from '../../src/component/SeamlessRoll';
class App extends React.Component<any, any> {
  render() {
    const arr = new Array(100);
    console.log(arr.length)
    return (
      <React.Fragment>
        <div style={{ width: '300px', height: '500px', border: '1px solid #333' }}>
          <SeamlessRoll>
            <div>是否规范激光焊</div>
            <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>  <div>是否规范激光焊</div>
          </SeamlessRoll>
        </div>
      </React.Fragment>
    )
  }
}

export default App
