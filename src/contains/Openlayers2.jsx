import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Header from '../components/Header.jsx'
import { headerHeight } from '../components/Header.jsx'

// 建立地圖
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

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

function OpenLayers() {
    const layers = [
        { name: 'openstreetmap', url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' },
        { name: 'basemaps', url: 'http://{1-4}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png' },
        {
            name: 'basemaps dark',
            url: 'http://{1-4}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
        },
        {
            name: 'basemaps light_all',
            url: 'http://{1-4}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        },
        {
            name: 'basemaps dark_nolabels',
            url: 'http://{1-4}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
        },
        {
            name: 'CartoDB地圖',
            url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png',
        },
        {
            name: 'CartoDB 地圖(深色)',
            url: 'https://{1-4}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
        },
        {
            name: 'CartoDB 地圖(仿古)',
            url: 'https://cartocdn_{a-d}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png',
        },
        {
            name: 'CartoDB World Eco',
            url: 'https://cartocdn_{a-d}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png',
        },
        {
            name: 'CartoDB World Flat Blue',
            url: 'https://cartocdn_{a-d}.global.ssl.fastly.net/base-flatblue/{z}/{x}/{y}.png',
        },
        {
            name: 'CartoDB World Midnight Commander',
            url: 'https://cartocdn_{a-d}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png',
        },
        {
            name: '通用版電子地圖',
            url: 'https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}',
        },
        {
            name: '正射影像圖(通用版)',
            url: 'https://wmts.nlsc.gov.tw/wmts/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}',
        },
    ]

    const [layer, setLayer] = useState(layers[0])
    const mapElement = useRef() // pull refs

    useEffect(() => {
        const initialMap = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        url: layer.url,
                    }),
                }),
            ],
            view: new View({
                center: [13450000, 2720000],
                zoom: 8,
            }),
            controls: [],
        })

        return () => {
            initialMap.setTarget(null)
        }
    }, [layer])

    function handleChange(e) {
        setLayer(JSON.parse(e.target.value))
    }

    return (
        <>
            <Header />
            <OpenLayersWrapper>
                <select name="" id="" onChange={(e) => handleChange(e)}>
                    {layers.map((layer, index) => (
                        <option key={index} value={JSON.stringify(layer)}>
                            {layer.name}
                        </option>
                    ))}
                </select>
                <MapWrapper>
                    {/* 用來掛地圖的原件 */}
                    <MapComponent ref={mapElement} className="map-container"></MapComponent>
                </MapWrapper>
            </OpenLayersWrapper>
        </>
    )
}

export default OpenLayers
