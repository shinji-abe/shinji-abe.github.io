// SVGをcanvasでPNGへ
function svgtopng() {
    // SVGの読み込み
    var svg = document.getElementById('svgicon');
    var svgData = new XMLSerializer().serializeToString(svg);


    // canvasの描画
    var canvas = document.getElementById("canvas");
    canvas.width = svg.width.baseVal.value;
    canvas.height = svg.height.baseVal.value;
    var ctx = canvas.getContext("2d");
    var data = svgData;
    var DOMURL = self.URL || self.webkitURL || self;
    var img = new Image();
    var svg = new Blob([data], {
        type: "image/svg+xml"
    });
    var url = DOMURL.createObjectURL(svg);

    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        DOMURL.revokeObjectURL(url);

        // ZIPファイルに圧縮するデータの準備
        zipData = new JSZip();
        var svgAscii = btoa(unescape(encodeURIComponent(svgData)))
        var canvasAscii = document.getElementById("canvas").toDataURL('image/png').replace(/^.*,/, '');
        var svgFolder = zipData.folder("svg");
        var pngFolder = zipData.folder("png");
        svgFolder.file("sample.svg", svgAscii, {
            base64: true
        });
        pngFolder.file("sample.png", canvasAscii, {
            base64: true
        });
    };
    img.src = url;
};

// カラーピッカー表示
var ColorPicker = new iro.ColorPicker("#irojs", {
    // Canvas dimensions:
    width: 200,
    height: 200,
    // Initial color value -- any hex, rgb or hsl color string works:
    color: "#0000ff",
    // Radius of the markers that show the current color:
    markerRadius: 8,
    // Padding space around the markers:
    padding: 4,
    // Space between the hue/saturation ring and the value slider:
    sliderMargin: 24,
    // Add a border around the controls:
    borderWidth: 2,
    // Set the border color (defaults to white):
    borderColor: "#000",
    // CSS rules to update as the selected color changes
    css: {
        // 元のSVGで黒塗りの要素を変更の対象とする
        "*[fill='#000000']": {
            "fill": "rgb"
        }
    }
});

// 元のSVGで黒塗りの要素（色を変えたい要素）を抽出
targetArray = document.querySelectorAll("*[fill='#000000']");

// カラーピッカーで色が変更されたときの処理
function onColorChange(color) {
    for (i = 0; i < targetArray.length; i++) {
        // 要素の色を変更
        targetArray[i].setAttribute("fill", color.hexString);
    };
    // 色が変わるたびにcanvasに描画
    svgtopng();
};
ColorPicker.on("color:change", onColorChange);


// ZIPファイルとしてダウンロード
function ZipDL() {
    zipData.generateAsync({
            type: "blob"
        })
        .then(function(content) {
            saveAs(content, "icons.zip");
        });
};
