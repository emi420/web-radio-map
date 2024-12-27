
// Default available baselayers
// You can overwrite this passing a new `config.sources` property

export const getMapBase = (source = "osm", config) => {
    const sources = config && config.sources || {
      osm: {
        type: "raster",
        tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 19,
      },
      esri: {
        type: "raster",
        tiles: [
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors &copy; ESRI",
        maxzoom: 17,
      },
      bing: {
        type: "raster",
        tiles: ["http://ecn.t3.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=1"],
        tileSize: 256,
        attribution: "&copy; OpenStreetMap Contributors",
        maxzoom: 18,
      },
      oam: {
        type: "raster",
        tiles: ["https://apps.kontur.io/raster-tiler/oam/mosaic/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution:
          "&copy; OpenStreetMap Contributors &copy; OpenAerialMap &copy; Kontur",
        maxzoom: 19,
      },
    };
  
    return {
      version: 8,
      sources,
      layers: [
        {
          id: "main",
          type: "raster",
          source
        },
      ],
    };
  };