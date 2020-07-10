export default {
  init: function (dom) {
    // 创建一个canvas对象
    const cav = document.createElement('canvas')
    dom.appendChild(cav)
    // 设置canvas大小
    cav.setSize = function (width = 300, height = 150) {
      if (!isNaN(width) && !isNaN(height)) {
        this.width = width
        this.height = height
      }
    }
    // 获取坐标函数
    function getCoordinate (arr) {
      const result = []
      let length = arr.length
      const angle = 360 / length
      let i = 0
      while (length) {
        result[i] = []
        const arrNum = arr[i]
        result[i][0] = Math.sin(angle * length * Math.PI / 180) * arrNum
        result[i][1] = Math.cos(angle * length * Math.PI / 180) * arrNum
        length--
        i++
      }
      console.log(result)
      return result
    }
    // 画图函数
    function drawRadar (arr, color, type) {
      // 创建画布
      if (cav.getContext) {
        var ctx = cav.getContext('2d')
        // 刚开始的时候,移动画布的位置
        if (type === 'background') {
          // 重新定位画布位置
          ctx.translate(cav.width / 2, cav.height / 2)
        }
        ctx.beginPath()
        // 设置雷达图的颜色
        const coordinate = getCoordinate(arr)
        coordinate.forEach(item => {
          ctx.lineTo(item[0], item[1])
        })
        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
      }
    }
    // 标坐标轴函数
    function setAxis (axis, arr, type) {
      if (cav.getContext) {
        var ctx = cav.getContext('2d')
        ctx.beginPath()
        const coordinate = getCoordinate(arr)
        let i = 0
        ctx.font = '16px Arial'
        ctx.fillStyle = '#2C3E50'
        if (type === 'val') {
          coordinate.forEach(item => {
            if (axis[i]) {
              ctx.textBaseline = 'middle'
              ctx.fillText(axis[i], item[0], item[1])
            }
            i++
          })
        } else {
          coordinate.forEach(item => {
            if (axis[i]) {
              ctx.fillText(axis[i], item[0] > 0 ? item[0] : item[0] - 30, item[1] > 0 ? item[1] + 20 : item[1])
            }
            i++
          })
        }
        ctx.closePath()
      }
    }
    // 画蜘蛛线
    function spiderLine (arr) {
      if (cav.getContext) {
        var ctx = cav.getContext('2d')
        ctx.beginPath()
        const coordinate = getCoordinate(arr)
        coordinate.forEach(item => {
          ctx.moveTo(0, 0)
          ctx.lineTo(item[0], item[1])
        })
        ctx.strokeStyle = '#adadad'
        ctx.stroke()
        ctx.closePath()
      }
    }
    cav.setOptions = function (axis, arr, color, spider) {
      if (arr.length >= 3) {
        // 画大背景图
        const max = Math.floor((cav.width >= cav.height ? cav.width / 2 : cav.height / 2) * 0.7)
        // 获取最大的坐标数组
        const maxArr = arr.map(item => {
          item = max
          return item
        })
        drawRadar(maxArr, '#f0f0f0', 'background')
        setAxis(axis, maxArr)
        // 画小背景图
        const maxHalf = Math.floor((cav.width >= cav.height ? cav.width / 4 : cav.height / 4) * 0.7)
        const maxHalfArr = arr.map(item => {
          item = maxHalf
          return item
        })
        drawRadar(maxHalfArr, '#e0e0e0')
        // 画用户数据图
        drawRadar(arr, color)
        setAxis(arr, arr, 'val')
        // 最后画蜘蛛线
        if (spider) {
          spiderLine(maxArr)
        }
      }
    }
    // 返回canvas对象
    return cav
  }
}
