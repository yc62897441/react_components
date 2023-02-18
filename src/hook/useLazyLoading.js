import { useEffect } from 'react'

// React.js 職場實戰！圖片 Lazy Loading
// https://ithelp.ithome.com.tw/articles/10266193?sc=rss.iron

// Lazy Loading Images – The Complete Guide
// https://imagekit.io/blog/lazy-loading-images-complete-guide/

const useLazyLoading = () => {
    useEffect(() => {
        // entries : 所有被 observer 監聽的元件，即 <img className=".lazy-image" />
        // observer: 監聽著所有 <img /> 的監聽器
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                // 銀幕位置滑動到圖片所在位置時，才去載入圖片資源，避免一進入頁面時就大量載入用不到的資源盡低速度
                if (entry.isIntersecting) {
                    const image = entry.target
                    image.setAttribute('src', image.dataset.src)
                    // image.removeAttribute('data-src')  // 註解起來，否則在 strict.mode 第一次執行到時就會刪除 data-src，第二次執行時就會找不到 data-src
                    observer.unobserve(image)
                }
            })
        }

        const observer = new IntersectionObserver(callback, {
            rootMargin: '0px 0px 500px 0px', // 在 DOM 元素進入 viewport 前 500px 就先去載入圖片資源
        })

        // 找出所有有加上 className lazy-image 的 img
        // 取得所有 <img className="lazy-image" /> 並讓 observer 開始監聽
        const lazyImages = document.querySelectorAll('.lazy-image')
        lazyImages.forEach((image) => {
            observer.observe(image)
        })
    }, [])
}

export default useLazyLoading
