class Http {
    jsonp(o) {
        /**
         * o.url
         * o.data
         * o.callback
         */
        let self = this;
        let promise = new Promise((resolve, reject) => {

            let body = document.querySelector('body');
            let script = document.createElement('script');

            let fnName = 'fn' + +new Date();

            script.src = o.url + '?' + self.stringParams(o.data) + '&' + o.callback + '=' + fnName;

            window[fnName] = (data) => {
                resolve(data);
                window[fnName] = null;
            }

            body.append(script);

            setTimeout(() => {
                script.remove();
            }, 500)
        })

        return promise;

    }

    getPromise(o) {
        /**
         * o.url
         * o.data
         * o.isAsync
         *  */
        let self = this;
        let promise = new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject('请求出现问题');
                    }
                }
            }

            xhr.open('GET', o.url + '?' + self.stringParams(o.data), o.isAsync);

            xhr.send(null);
        })

        return promise;
    }

    stringParams(o) {
        let str = '';
        for (let k in o) {
            str += k + '=' + o[k] + '&';
        }

        return str.slice(0, -1);
    }
}

let http = new Http();
// export default new Http();