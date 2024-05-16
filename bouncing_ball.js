// ボールが跳ねるアニメーションを描画するJavaScript

// CanvasRenderingContext2Dのオブジェクト
var context;
// x座標、y座標
var x; var y;
// x座標の変位dxピクセル、y座標の変位dyピクセル
var dx = 2; var dy = 4;

// 横幅WIDTHピクセル、高さHEIGHTピクセル HTMLと合わせる
const WIDTH = 900; const HEIGHT = 600;
// ボールの半径BALL_RADIUSピクセル
const BALL_RADIUS = 70;

// 初期座標用の乱数生成
function getRandomNumber(min, max){
    // Math.randomメソッドで0以上1未満の範囲で浮動小数点数の疑似乱数を返す
    // Math.floor関数で引数として与えた数以下の最大の整数を返す
    return Math.floor(Math.random() * (max - min + 1)) + min; // minからmaxの範囲の整数を返す
}

// 初期座標を乱数で決める
function setXY(){
    x = getRandomNumber(BALL_RADIUS + dx, WIDTH - BALL_RADIUS - dx);  // x軸方向の初期座標
    y = getRandomNumber(BALL_RADIUS + dy, HEIGHT - BALL_RADIUS - dy); // y軸方向の初期座標
}

// キャンバス内をリセットする 円がキャンバス内で動いて見えるように前の描画をクリアする目的
function clearCanvas(){
    // 指定した4つの座標で囲まれた四角形の領域をクリアする
    context.clearRect(0, 0, WIDTH, HEIGHT);
}

// キャンバス内に円を描く
function drawCircle(x, y, radius){
    // サブパスのリストを空にして新しいパスを開始する
    context.beginPath();
    // 座標(x, y)を中心に半径radiusで0から2πまで反時計回りで回転させ円を描く
    context.arc(x, y, radius, 0, Math.PI * 2, true);
    // 円を塗りつぶす
    context.fill();
}

// drawCircleを利用して円がキャンバス内で動いて見えるよう描画する
function drawMove(){
    // 円がキャンバス内で動いて見えるように前の描画をクリアする
    clearCanvas();
    // 座標(x, y)を中心に青い円を描く
    context.fillStyle = "blue";
    drawCircle(x, y, BALL_RADIUS);
    // ボールの座標(x, y)が(WIDTH, HEIGHT)より大きくなったときまたは0より小さくなったとき動く向きを反転させる
    if((x + dx) > (WIDTH - BALL_RADIUS) || (x + dx) < BALL_RADIUS){
        dx = -dx; // 動く向きを反転
    }
    if((y + dy) > (HEIGHT - BALL_RADIUS) || (y + dy) < BALL_RADIUS){
        dy = -dy; // 動く向きを反転
    }
    // x座標をdxだけ移動させる
    x += dx;
    // y座標をdyだけ移動させる
    y += dy;
}

function main(canvasId){
    // getElementIdメソッドでID名を指定してHTML側と関連付ける
    // getContext("2d")で描画機能が利用できるように2Dコンテキストを取得
    // HTMLソース中のid="canvas"の部分に描画機能を使用することを定義
    context = document.getElementById(canvasId).getContext("2d");
    // 初期座標を決める
    setXY();
    // 一定の時間間隔をおいて関数を繰り返し呼び出す
    // 以下では10msごとにdrawMove関数を呼び出して円がキャンバス内で動いているように見せる
    return window.setInterval(drawMove, 10);
}

main("canvas");
