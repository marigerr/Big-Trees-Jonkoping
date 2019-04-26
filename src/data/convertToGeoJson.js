export default function convertToGeoJson(features) {
  const trees = [];
  const newGeoJson = {
    type: 'FeatureCollection',
    crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
    features: [],
  };
  for (let index = 0; index < features.length; index++) {
    const newFeature = {
      type: 'Feature',
      properties: {
        Id: features[index].attributes.OBJECTID, Kommun: features[index].attributes.Kommun, Lokalnamn: features[index].attributes.Lokalnamn, Tradslag: features[index].attributes.Tradslag, Stamomkret: features[index].attributes.Stamomkret, Tradstatus: features[index].attributes.Tradstatus,
      },
      geometry: { type: 'Point', coordinates: [features[index].geometry.x, features[index].geometry.y] },
    };

    newGeoJson.features.push(newFeature);
    trees.push(features[index].attributes.Tradslag);
  }
  return { geojson: newGeoJson, trees };
}
