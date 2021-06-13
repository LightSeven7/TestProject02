function showSum(obj) {
    var num1 = 1;
    var num2 = 2;
    var sum = num1 + num2;
    console.log(obj);
    alert(sum);
}

// 「.strike」クラスに取り消し線をつける
function dispLineThrough() {
    $('.strike').css('text-decoration', 'line-through');
    $('.strike').css('text-decoration-color', 'red');
}

// -------------------------------------------
// ユーザーエージェントからブラウザとそのバージョンを取得する
// -------------------------------------------
/*
var ua = window.navigator.userAgent.toLowerCase();
var ver = window.navigator.appVersion.toLowerCase();
var name = 'unknown';

//alert (window.location.href.split('/').pop());
alert("ua:" + ua + "\n" + "ver:" + ver);
alert("href:" +  window.location.href.split('/').pop());
alert("href2:" +  window.location.href.split('/').pop().slice(0, 2));

if (ua.indexOf("msie") != -1){
    if (ver.indexOf("msie 6.") != -1){
//        location.href = "/lp_new/" + window.location.href.split('/').pop();
    }else if (ver.indexOf("msie 7.") != -1){
//        location.href = "/lp_new/" + window.location.href.split('/').pop();
    }else if (ver.indexOf("msie 8.") != -1){
//        location.href = "/lp_new/" + window.location.href.split('/').pop();
    }else if (ver.indexOf("msie 9.") != -1){
//        location.href = "/ag_new/" + window.location.href.split('/').pop();
//          location.href = "/lp_new/" + window.location.href.split('/').pop();
    }else if (ver.indexOf("msie 10.") != -1){
//        location.href = "/ag_new/" + window.location.href.split('/').pop();
//          location.href = "/lp_new/" + window.location.href.split('/').pop();
    }else{
    }
}
*/

/**
 * 数値チェック関数
 * 入力値が数値 (符号あり小数 (- のみ許容)) であることをチェックする
 * [引数]   numVal: 入力値
 * [返却値] true:  数値、false: 数値以外
 */
function isNumber (numVal) {
    // チェック条件パターン
    var pattern = /^[-]?([1-9]\d*|0)(\.\d+)?$/;
    // 数値チェック
    return pattern.test(numVal);
}

const TestAAA = (valA) => {
    console.log(valA);
    alert(valA);
    return "OK";
}

const TestBBB = () => {
    alert(TestAAA("Call to TestAAA" /* func test */));
}


/**
 * 初歩としてPromise関数の使い方を把握する関数
 */
const PromiseTest01 = () => {
    let val_Base = "AAA";

    // 関数定義
    const a = (arg) => {
        console.log("a");
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(arg + "→BBB");
            }, 1000);
        });
    }
    const b = (arg) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const flg = true;
                console.log("b");
                if (flg) resolve(arg + "→CCC");
                else reject("error!");
            }, 1000);
        });
    }
    // const c = () => console.log("c");
    // const d = () => console.log("d error:");
    const c = (arg) => {
        console.log("c arg:" + arg + "→DDD");
    }
    const d = (arg) => {
        console.log("d error:" + arg);
    }

    // 関数呼び出し
    console.log("method start");
    let val_retVal;
    a().then(result => {val_retVal = result});

    // resultには「b」の戻り値が入っていて、それを「c」・「d」の引数へセットしている。
    // rejectが返される場合、catchへ飛ぶ
    b(val_retVal).then(result => {c(result)}).catch(result => {d(result)});

    alert("Call To PromiseTest01");
}

// async・awaitを使用した非同期処理テスト１
// delayミリ秒待機する。任意の第二引数を結果として返す。
async function sleep(delay, result) {
    return new Promise(resolve => {
        setTimeout(() => resolve(result), delay);
    });
}

async function exec() {

    // 非同期処理を実行するだけ
    await sleep(1000)
    console.log(1);

    // 非同期の結果を受け取る
    let result = await sleep(2000, 42);
    console.log(result);

}

// async・awaitを使用した非同期処理
function PromiseTest03 (flg, next_word=``) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let arg = `Success`;
            if (flg) resolve(`${next_word}Success`);
            else reject(`${next_word}Failure`);
        }, 1000);
    });
}

async function funcA() {

    let a = "";
    let b = "";

    try {
        // 処理１
        a = await PromiseTest03(true, "1st:");
        // 処理２
        b = await PromiseTest03(false, "2nd:");
    } catch(e) {
        // 処理３（処理２で失敗すると呼ばれる）
        // eには処理２の結果(b)が入っている
        a += `, ${e}, ${await PromiseTest03(true, 'Re:')}`;
    }

    return console.log(`Finish a:${a}`);
}

// 残余引数・スプレッド演算子
const TestCCC = () => {
    // const ary = [1, 2, 3, 4, 5];
    // a,bは固定でセット、残りはargsに配列で格納される
    const a = (a, b, ...args) => {
        console.log(`a:${a}`);
        console.log(`b:${b}`);
        for (const v of args) console.log(`v:${v}`);
    };
    a(1, 2, 3, 4, 5, 6, 7);
}

// 分割代入
const TestDDD = () => {

    // 分割代入方法１
    let a, b, c, d, rest;
    ({a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40});

    console.log(`a:${a}`);
    console.log(`b:${b}`);
    console.log("rest:" + rest.c); // {c: 30, d: 40}
    console.log("rest:" + rest.d); // {c: 30, d: 40}

    // 分割代入方法２(定義しつつ代入)
    let [aa, bb, dd] = [10, 20, 30];
    console.log(aa); // 10
    console.log(bb); // 20
    console.log(rest.c); // 30
    console.log(dd); // 30

    // 分割代入方法３(値の交換)
    let [x, y] = [5, 10];
    [x, y] = [y, x];
    console.log(`x:${x} y:${y}`);

    // オブジェクト版
    const thinking = {
        name: "小動物",
        mind: "Python3",
        reason: "`raise e from cause` べんりですよ"
    };
    // プロパティ名と変数名が同じであれば「プロパティ名.」を省略できる
    const {name="AAAAAA", mind} = thinking;
    console.log(`${name}だけど${mind}理由の一つです`);

    const pat = {name: 'Pat', birthday: {day: 14, month: 3, year: 2010}};
    const {birthday: {year: year}} = pat;
    console.log(`pat: ${year}`);
}

// デフォルト
const TestEEE = () => {
    const pat = {name: 'Pat', birthday: {day: 14, month: 3, year: 2010}};
    const [first, second = 0] = [42];
    const {nickname = 'None'} = pat;
    console.log(`first:${first}, second:${second}, nickname:${nickname}`);

    let zz = [] + {};
    console.log('zz:' + zz.length);
}

// 辞書・ハッシュ使用方法
const TestMap = () => {
    const map = new Map ([
        ["埼玉県", 12],
        ["東京都", 13],
        ["神奈川県", 14]
    ]);

    // 一覧表示
    for (const [key, value] of map) {
        console.log(`県名 ${key}:${value}`);
    }

    // 追加・削除・取得
    map.set("北海道", 1);
    map.delete("埼玉県");
    console.log(`東京都：${map.get("東京都")}`);
}

// オブジェクトコピー
const TestObjectCopy = () => {

    const srcObj = {
        id: 123,
        name: "srcObj!!!3"
    };
    const destObj = {};

    // パターン１
    Object.assign(destObj, srcObj);

    // パターン２
    const destObj2 = {...srcObj};

    console.log(`destObj2.id:${destObj2.id}`);
    console.log(`destObj2.name:${destObj2.name}`);
}

// オブジェクトの中身をログ等へ出力する方法
const TestOutputLog = () => {

    const aaa = {
        id: 1,
        address: "aaa@yahoo.co.jp",
        pw: "testtest",
    }
    console.log(JSON.stringify({'id': aaa.id, 'address': aaa.address,}));
}

// 無名関数(関数リテラル)
const TestFFF = () => {
    let results = [0, 1, 2, 3, 4].map(function (x) { return 100 * x});
    for (const vv of results) console.log(`Value:${vv}`);
}