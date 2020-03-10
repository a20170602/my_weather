// 这是一个设置页面rem的文件

(function (w, d) {

    function setRem() {

        let before = document.querySelector('[data-id="size"]');

        if (before) {
            before.remove();
        }

        let head = d.querySelector('head');

        let style = d.createElement('style');

        style.setAttribute('data-id', 'size');
        // 当前页面宽度
        let width = w.innerWidth;

        let size = (width > 640 ? 640 : width) / 375 * 10;

        let str = `html{font-size:${size}px}`;

        style.innerHTML = str;

        head.append(style);

    }

    setRem();

    function jiuLiu(fn, delay) {
        let bool = true;

        return () => {
            if (!bool) {
                return;
            }

            bool = false;

            setTimeout(() => {
                fn();
                bool = true;
            }, delay)
        }
    }

    w.onresize = jiuLiu(setRem, 500);


    // console.log('aaa')

})(window, document)