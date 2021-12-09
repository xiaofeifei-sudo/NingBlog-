let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
export let randomColor = () => {
    let str = '#';
    for (let i = 1; i <= 6; i++) {
        function getRandom(min, max) { // 调用静态对象Math.random（包含大小值间取一个整数）
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var num = arr[getRandom(0, arr.length - 1)]; // 把从数组中随机索引的一个字符串赋值给变量
        /* 十六进制的长度为何要-1（就像十进制为什么只有9而没有10），如果超出则报underfined */
        str += num;
    }
    return str; //遍历索引满6个字符则返回函数值
};
