# 点击非图表图形元素不会触发事件问题

*解决：*

[参考](https://blog.csdn.net/smk108/article/details/78482154)

利用echarts提供的新API `convertFromPixel`完美解决。

| 一个普通标题 | 一个普通标题 | 一个普通标题 |
| ------ | ------ | ------ |
| 短文本 | 中等文本 | 稍微长一点的文本 |
| 稍微长一点的文本 | 短文本 | 中等文本 |

```js
echartInstance.getZr().on('click',params=>{
  const pointInPixel= [params.offsetX, params.offsetY];

  if (echartInstance.containPixel('grid',pointInPixel)) {
    let xIndex = echartInstance.convertFromPixel({seriesIndex:0},[params.offsetX, params.offsetY])[0];
    // do something

  }
});
```