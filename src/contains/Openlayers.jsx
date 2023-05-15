import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

// 匯入 excel
import * as XLSX from 'xlsx/xlsx.mjs'
import InputFiles from 'react-input-files'

// 建立地圖
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import Overlay from 'ol/Overlay'
import { fromLonLat } from 'ol/proj'

const OpenLayersWrapper = styled.div`
    width: 100%;
    height: calc(100vh - 150px);
    margin-top: ${headerHeight};
    padding: 10px;
    background-color: #fbfbfb;
`
const MapWrapper = styled.div`
    position: relative;
    top: 0px;
    display: block;
    width: 100%;
    height: 100%;
    padding: 5px;
    border: 2px solid black;
`

const MapComponent = styled.div`
    width: 100%;
    height: 100%;
`

const LocatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    max-width: 250px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    color: rgb(0, 0, 0);
    font-size: 1rem;
    background-color: rgb(255, 255, 255, 0.75);
`

const LocatName = styled.div`
    margin-bottom: 2px;
    font-weight: 700;
`

const LocatGeoInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const LocatGeoInfo = styled.div`
    margin-bottom: 2px;
    font-weight: 400;
`

const LocatPointWrapper = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: sandybrown;
    border: 2px solid black;
`

function OpenLayers() {
    const isMapInit = useRef(false)
    const [fileListWithGeo, setFileListWithGeo] = useState([
        {
            用戶名: 'AAA股份有限公司',
            電號: '03-000',
            縣市: '宜蘭縣',
            用電地址: '宜蘭市光復路',
            lat: 24.7553153,
            lon: 121.7558994,
        },
        {
            用戶名: 'BBB股份有限公司',
            電號: '03-001',
            縣市: '宜蘭縣',
            用電地址: '宜蘭縣宜蘭市XXX',
            lat: 24.7238725,
            lon: 121.7689197,
        },
    ])

    // 初始化地圖
    useEffect(() => {
        function initMap() {
            const map = new Map({
                target: 'map',
                layers: [
                    new TileLayer({
                        source: new XYZ({
                            // 使用不同圖層
                            // url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // openstreetmap
                            // url: 'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', // basemaps
                            // url: 'http://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', // basemaps dark
                            // url: 'http://{1-4}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', // basemaps light_all
                            // url: 'http://{1-4}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', // basemaps dark_nolabels
                            // url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png', // CartoDB地圖
                            // url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png', // CartoDB 地圖(深色)
                            // url: 'https://cartocdn_{a-d}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', // CartoDB 地圖(仿古)
                            // url: 'https://cartocdn_{a-d}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png', // CartoDB World Eco
                            // url: 'https://cartocdn_{a-d}.global.ssl.fastly.net/base-flatblue/{z}/{x}/{y}.png', // CartoDB World Flat Blue
                            // url: 'https://cartocdn_{a-d}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png', // CartoDB World Midnight Commander
                            // url: 'https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}', // 通用版電子地圖
                             url: 'https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}', // 正射影像圖(通用版)
                        }),
                    }),
                ],
                view: new View({
                    center: [13450000, 2720000],
                    zoom: 8,
                }),
            })
            return map
        }

        function markMountains(map, locat) {
            // 定義定位點
            const pos = fromLonLat([Number(locat.lon), Number(locat.lat)])

            // 透過資料參數，找出對應的地點 UI 圖示
            const router_link_id = 'locatId' + locat['用電地址'] + locat['電號']
            const mt_label = new Overlay({
                position: pos,
                element: document.getElementById(router_link_id),
            })

            // 將地點 UI 圖示標記到地圖上
            map.addOverlay(mt_label)
        }

        if (!isMapInit.current && fileListWithGeo.length > 0) {
            // 初始化地圖
            isMapInit.current = true
            const map = initMap()

            // 將每個地點的 UI 圖示，依據定位標記到地圖上
            fileListWithGeo.forEach((locat) => {
                markMountains(map, locat)
            })
        }
    }, [fileListWithGeo])

    // 參考：React上傳文件使用react-input-files讀取Excel js-xlsx
    // https://ucamc.com/311-react%E4%B8%8A%E5%82%B3%E6%96%87%E4%BB%B6%E4%BD%BF%E7%94%A8react-input-files%E8%AE%80%E5%8F%96excel-js-xlsx
    function onImportExcel(files) {
        // 獲取上傳的文件對象
        //const { files } = file.target; // 通過FileReader對象讀取文件
        const fileReader = new FileReader()
        // console.log(fileReader);
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
                setFileListWithGeo(data)
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

    return (
        <>
            <Header />
            <OpenLayersWrapper>
                <InputFiles onChange={(files) => onImportExcel(files)}>
                    <button>Upload</button>
                </InputFiles>

                <MapWrapper>
                    {/* 用來掛地圖的原件 */}
                    <MapComponent id="map"></MapComponent>

                    {/* 將每個地點迴圈產生個別的 UI 圖示 */}
                    {/* {fileListWithGeo.map((locat) => (
                        <LocatWrapper id={'locatId' + locat['用電地址'] + locat['電號']}>
                            <LocatName>用戶名：{locat['用戶名']}</LocatName>
                            <LocatGeoInfo>用電地址：{locat['用電地址']}</LocatGeoInfo>
                            <LocatGeoInfo>電號：{locat['電號']}</LocatGeoInfo>
                            <LocatGeoInfoWrapper>
                                <LocatGeoInfo>lat: {locat['lat']} </LocatGeoInfo>
                                &nbsp;&nbsp;
                                <LocatGeoInfo>lon: {locat['lon']}</LocatGeoInfo>
                            </LocatGeoInfoWrapper>
                        </LocatWrapper>
                    ))} */}

                    {/* 將每個地點迴圈產生個別的 UI 圖示(用圓點表示) */}
                    {fileListWithGeo.map((locat) => (
                        <LocatPointWrapper
                            id={'locatId' + locat['用電地址'] + locat['電號']}
                        ></LocatPointWrapper>
                    ))}
                </MapWrapper>
            </OpenLayersWrapper>
        </>
    )
}

export default OpenLayers
