import { useEffect } from 'react'

// React.js 職場實戰！圖片 Lazy Loading
// https://ithelp.ithome.com.tw/articles/10266193?sc=rss.iron

const useLazyLoading = () => {
    useEffect(() => {
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

        const observer = new IntersectionObserver(callback)
        // 找出所有有加上 className lazy-image 的 img
        const lazyImages = document.querySelectorAll('.lazy-image')
        lazyImages.forEach((image) => {
            observer.observe(image)
        })
    }, [])
}

export default useLazyLoading

// 在要載入的頁面 import
// 並且在頁面 component 中執行
// 並且對於 img 加上 className 與 data-src
// function Page() {
//     useLazyLoading()
//     return (
//         <div>
//             <img className='lazy-image' data-src={imgsrc} alt="" />
//             <PageComponent />
//         </div>
//     )
// }
// function PageComponent() {
//     return (
//         <div>
//             <img className='lazy-image' data-src={imgsrc} alt="" />
//         </div>
//     )
// }
