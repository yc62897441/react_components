import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { Button1 } from '../components/components/Bottuns.jsx'
import { config } from '../config.js' // google api key 放在這

// 匯入 excel
import * as XLSX from 'xlsx/xlsx.mjs'
import InputFiles from 'react-input-files'

// 匯出 excel
import ExcelJs from 'exceljs'

const XlsxWrapper = styled.div`
    width: 100%;
    margin-top: 155px;
`

function Xlsx() {
    const [fileList, setFileList] = useState([])
    const [fileListWithGeo, setFileListWithGeo] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    // 匯入 excel
    // 參考：React上傳文件使用react-input-files讀取Excel js-xlsx
    //https://ucamc.com/311-react%E4%B8%8A%E5%82%B3%E6%96%87%E4%BB%B6%E4%BD%BF%E7%94%A8react-input-files%E8%AE%80%E5%8F%96excel-js-xlsx
    function onImportExcel(files) {
        // 獲取上傳的文件對象
        //const { files } = file.target; // 通過FileReader對象讀取文件
        const fileReader = new FileReader()
        //console.log(fileReader);
        for (let index = 0; index < files.length; index++) {
            fileReader.name = files[index].name
        }

        fileReader.onload = (event) => {
            try {
                // 判斷上傳檔案的類型 可接受的附檔名
                const validExts = new Array('.xlsx', '.xls')
                const fileExt = event.target.name

                if (fileExt == null) {
                    throw '檔案為空值'
                }

                const fileExtlastof = fileExt.substring(fileExt.lastIndexOf('.'))
                if (validExts.indexOf(fileExtlastof) == -1) {
                    throw '檔案類型錯誤，可接受的副檔名有：' + validExts.toString()
                }

                const { result } = event.target // 以二進制流方式讀取得到整份excel表格對象
                const workbook = XLSX.read(result, { type: 'binary' })
                let data = [] // 存儲獲取到的數據 // 遍歷每張工作表進行讀取（這裡默認只讀取第一張表）
                for (const sheet in workbook.Sheets) {
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法將 excel 轉成 json 數據
                        data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet])) // break; // 如果只取第一張表，就取消註釋這行
                    }
                }

                // 把資料儲存到 state 中
                setFileList(data)
            } catch (e) {
                // 這裡可以拋出文件類型錯誤不正確的相關提示
                alert(e)
                // console.log("文件類型不正確");
                return
            }
        }
        // 以二進制方式打開文件
        fileReader.readAsBinaryString(files[0])
    }

    // 匯出 excel
    // 參考：[前端/JavaScript] 實作匯出excel下載按鈕的超好用套件：ExcelJS（下）- 用React匯出excel （export excel）
    // https://ithelp.ithome.com.tw/articles/10284495
    function outputXlsx() {
        const workbook = new ExcelJs.Workbook() // 創建試算表檔案
        const sheet = workbook.addWorksheet('工作表範例1') //在檔案中新增工作表 參數放自訂名稱

        let columns = []
        let rows = []
        fileListWithGeo.forEach((item, index) => {
            // 如果是 forEach 的第一圈，建立 columns
            if (index === 0) {
                Object.keys(item).forEach((key) => {
                    columns.push({ name: key })
                })
            }

            // 建立每一個 row 的資料
            let row = []
            Object.keys(item).forEach((key) => {
                row.push(item[key])
            })
            rows.push(row)
        })

        sheet.addTable({
            // 在工作表裡面指定位置、格式並用columsn與rows屬性填寫內容
            name: 'table名稱', // 表格內看不到的，算是key值，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
            ref: 'A1', // 從A1開始
            columns: columns, // 例如: [{ name: '名字' }, { name: '年齡' }, { name: '電話' }]
            rows: rows, // 例如: [['小明', '20', '0987654321'], ['小美', '23', '0912345678']]
        })

        // 表格裡面的資料都填寫完成之後，訂出下載的callback function
        // 異步的等待他處理完之後，創建url與連結，觸發下載
        workbook.xlsx.writeBuffer().then((content) => {
            const link = document.createElement('a')
            const blobData = new Blob([content], {
                type: 'application/vnd.ms-excel;charset=utf-8;',
            })
            link.download = '測試的試算表.xlsx'
            link.href = URL.createObjectURL(blobData)
            link.click()
        })
    }

    // 初始化 geocoder
    var geocoder
    function initMap() {
        geocoder = new google.maps.Geocoder()
    }
    async function transGeo() {
        let tempData = []
        await Promise.all(
            fileList.map((item, index) => {
                let tempObj = {}
                Object.keys(item).forEach((key) => {
                    tempObj[key] = item[key]
                })

                const address = item['用電地址']

                // google 有每秒最多 request 的數量，所以「手動」分批去轉換0~9, 10~19..
                if (index < 0 || index >= 10) {
                    return
                } else {
                    console.log(index)
                    initMap()
                    return geocoder.geocode({ address: address }, function (results, status) {
                        if (status == 'OK') {
                            tempObj['lat'] = results[0].geometry.location.lat()
                            tempObj['lon'] = results[0].geometry.location.lng()
                            tempData.push(tempObj)
                            return tempObj
                        } else {
                            alert('Geocode was not successful for the following reason: ' + status)
                        }
                    })
                }
            })
        ).then((values) => {
            // console.log('values', values)
        })

        setFileListWithGeo(tempData)
    }

    useEffect(() => {
        // 載入 reCaptcha API 資源
        const script = document.createElement('script')
        // FIXME: API key 要隱藏起來，不要傳出去。
        script.src = `https://maps.googleapis.com/maps/api/js?key=${config.apiKey}&libraries=geometry&language=zh-TW`
        script.addEventListener('load', function () {
            setIsLoaded(true)
        })
        document.body.appendChild(script)
    }, [])

    return (
        <>
            <Header />
            <XlsxWrapper>
                {isLoaded && (
                    <>
                        <InputFiles onChange={(files) => onImportExcel(files)}>
                            <Button1>Upload excel</Button1>
                        </InputFiles>
                        <br />
                        <br />
                        <Button1 type="button" onClick={outputXlsx}>
                            匯出 xlsx
                        </Button1>
                        <br />
                        <br />
                        <Button1 type="button" onClick={transGeo}>
                            轉換經緯度
                        </Button1>
                    </>
                )}
            </XlsxWrapper>
        </>
    )
}

export default Xlsx
