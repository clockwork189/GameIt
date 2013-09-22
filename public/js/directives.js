window.app.directive('gameTools', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/partials/gameTools.html',
        link: function (scope, element, attrs) {
            scope.init = function () {
                scope.location = "";
                scope.sport = "";
                scope.level = "";
                scope.description = "";
                scope.num_players = "";
                scope.start_time = "";
                scope.end_time = "";
            };
            scope.init();
        }
    };
});

window.app.directive('mapTools', function() {
    return {
        restrict: 'E',
        templateUrl: '/views/partials/mapTools.html',
        link: function (scope, element, attrs) {
            require(["esri/map", 
                 "dojo/on",
                 "esri/toolbars/edit",
                 "dojo/_base/Color",
                 "esri/dijit/Geocoder",  
                 "esri/symbols/SimpleFillSymbol",
                 "esri/symbols/SimpleMarkerSymbol",
                 "esri/InfoTemplate",
                 "esri/dijit/InfoWindowLite",
                 "esri/graphic",
                 "dojo/data/ItemFileReadStore",
                "dojox/mobile/DataCarousel",
                "esri/layers/FeatureLayer",
                "dojox/mobile/parser",
                "dojo/_base/lang",
                "esri/toolbars/draw",
                "esri/symbols/PictureMarkerSymbol",
                "esri/renderers/UniqueValueRenderer",
                "dojox/mobile",
                "dojox/mobile/deviceTheme",
                "dojo/domReady!"], function(Map, on, Edit, Color, Geocoder, SimpleFillSymbol, SimpleMarkerSymbol, InfoTemplate, infoWindowLite, Graphic, ItemFileReadStore, DataCarousel, FeatureLayer, Parser, lang, Draw, PictureMarkerSymbol,UniqueValueRenderer) {
            
                        var map = new Map("map", {
                                basemap: "satellite",
                                center:  [-79.362831, 43.723521],
                                zoom: 17,
                                sliderStyle: "small",
                                sliderOrientation: "horizontal",
                                sliderPosition: "bottom-left"
                            });
        
                        var editToolbar = new Edit(map);
                        //var infoWindowLite = new esri.dijit.InfoWindowLite(null, dojo.create("div", null, map.root));
                            //infoWindowLite.startup();
                            
                        
                        map.on("load", mapLoaded);

                        var featureLayer;
        
        function mapLoaded() {
            $("#map").css("height", "533px");
            $("#map_root").css("height", "533px");
            //map.setInfoWindow(infoWindowLite);
            //var infoTemplate = new InfoTemplate("${destination}");
            feeLayer = FeatureLayer("http://services1.arcgis.com/epWj2EmjrgksS4ol/arcgis/rest/services/gameIt_Field_Fee/FeatureServer/0", {
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"]
            });
          
          
            var infoSymbol = new esri.symbol.PictureMarkerSymbol({
                "angle": 0,
                "xoffset": 0,
                "yoffset": 12,
                "type": "esriPMS",
                "url": "http://www.sott.net/images/icons/dollarsign_gold.png",
                "contentType": "image/png",
                "width": 24,
                "height": 24
            });
          
            var infoSymbol2 = new esri.symbol.PictureMarkerSymbol({
                "angle": 0,
                "xoffset": 0,
                "yoffset": 12,
                "type": "esriPMS",
                "url": "http://static.arcgis.com/images/Symbols/Basic/YellowStickpin.png",
                "contentType": "image/png",
                "width": 24,
                "height": 24
            });
          
            var renderer = new UniqueValueRenderer(infoSymbol, "fee");
            renderer.addValue(0, infoSymbol2);
            feeLayer.setRenderer(renderer);
          
            featureLayer = FeatureLayer("http://services1.arcgis.com/epWj2EmjrgksS4ol/arcgis/rest/services/gameIt_Fields/FeatureServer/0", {
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"]
            });
            map.addLayers([featureLayer, feeLayer]);
          
            featureLayer.on("dbl-click", function(evt){
                //event.stop(evt);
                activateToolbar(evt.graphic);
            });
            featureLayer.on("click", function(evt){
                showPopup(evt.graphic);
            });
        }
        
        function showPopup(graphic)
        {
          console.log(graphic);
        }

        var geocoder = new Geocoder({ 
            map: map,
            autoComplete: true,
            isDoubleClickZoom: false,
            maxLocations: 2
        }, "search");

        geocoder.on("select", function(data){
            if (data.result) {
                var geometry = data.result.feature.geometry;
                var destination = data.result.name;
            }
        });
        
        function addToMap(evt) {
            var symbol;
            toolbar.deactivate();
            map.showZoomSlider();
            symbol = new SimpleFillSymbol();
            var graphic = new Graphic(evt.geometry, symbol);
            map.graphics.add(graphic);
          
            //add to geometry
            var sms = new SimpleMarkerSymbol().setStyle(SimpleMarkerSymbol.STYLE_CIRCLE).setColor(new Color([255,0,0,0.5]));
            var date = new Date().getTime();
            var attr = {"start": date, "end": date, "sport":"soccer","type":0, "location":"test"};
            var infoTemplate = new InfoTemplate("destination");
            var graphic = new Graphic(evt.geometry,sms,attr,infoTemplate);
            featureLayer.applyEdits([graphic],null,null,function(r){console.log(r)},function(r){console.log(e)});
        }

        geocoder.startup();   
        var toolbar = new Draw(map);
        //toolbar.activate(Draw["POLYGON"]);
        toolbar.on("draw-end", addToMap);
      
        function activateToolbar(graphic) {
            var tool = 0;      
            //if (registry.byId("tool_move").checked) {
            tool = tool | Edit.MOVE; 
            //}
            //if (registry.byId("tool_vertices").checked) {
            tool = tool | Edit.EDIT_VERTICES; 
            //}
            //if (registry.byId("tool_scale").checked) {
            tool = tool | Edit.SCALE; 
            //}
            //if (registry.byId("tool_rotate").checked) {
            tool = tool | Edit.ROTATE; 
            //}
            //specify toolbar options        
            var options = {
                allowAddVertices: true,
                allowDeleteVertices: true,
                uniformScaling: false
            };
            editToolbar.activate(tool, graphic, options);
        }
    });
        }
    };
});