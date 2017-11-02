export default function lanstyrDefault() {
    return {
        url: "https://ext-geodata.lansstyrelsen.se/arcgis/rest/services/vektor/LSTF_webbgis_planeringsunderlag/MapServer/58/query",
        data: {
            where: 'Kommun IS NOT NULL',
            outFields: "OBJECTID,Kommun,Lokalnamn,Tradslag,Stamomkret,Tradstatus",
            geometryType: "esriGeometryEnvelope",
            spatialRel: "esriSpatialRelIntersects",
            returnGeometry: true,
            returnTrueCurves: false,
            returnIdsOnly: false,
            returnCountOnly: false,
            returnZ: false,
            returnM: false,
            returnDistinctValues: false,
            resultRecordCount: null,
            orderByFields: "Stamomkret DESC",
            outStatistics: null,
            outSR: 4326,
            f: "pjson"
        },
        type: "GET",
        datatype: "json",
        success: function (response) {
            console.log(response);
        },
        error: function (xhr) {
            console.log(xhr.statusText);
        }
    };
}

export { lanstyrDefault };