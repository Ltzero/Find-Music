import React from 'react'; // 创建组件 虚拟dom元素 生命周期
import ReactDom from 'react-dom'; // 操作创建好的组件 虚拟dom 放到页面上展示

import App from '@/App';

ReactDom.render(<App />, document.getElementById('app'));
