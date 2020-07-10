## 使用用例
```
//导入js模块
import RadarChart from './src/index.js'
//使用
var myChart = RadarChart.init(document.getElementById('app'))
    myChart.setSize(500, 500)
    myChart.setOptions(['属性1', '属性2', '属性3', '属性4', '属性5', '属性6', '属性7'], [90, 60, 70, 175, 90, 100, 175], 'pink')
```