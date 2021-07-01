'use strict'

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
    // !残余引数としての使用法(値のシーケンスを配列に変換)
    const a = (a = 0, b = 0, ...args) => {
        console.log(`a:${a}`);
        console.log(`b:${b}`);
        for (const v of args) console.log(`v:${v}`);
    };
    a(1, 2, 3, 4, 5, 6, 7);

    // !スプレッド演算子としての使用法(配列を値のシーケンスに変換)
    let b = [1, 7, 2, 9];
    console.log(Math.max(...b));
}

// 分割代入
const TestDDD = () => {

    // 分割代入方法１
    let a, b, c, d, rest;
    ({a, b, ...rest} = {a: 10, b: 20, x: 30, z: 40});

    console.log(`a:${a}`);
    console.log(`b:${b}`);
    console.log("rest:" + rest.x); // {x: 30}
    console.log("rest:" + rest.z); // {z: 40}

    // 分割代入方法２(定義しつつ代入)
    let [aa, bb, dd] = [10, 20, 30];
    console.log(aa); // 10
    console.log(bb); // 20
    console.log(rest.x); // 30
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

    // Object形式のデータをJSON形式のデータに変換
    console.log(JSON.stringify({'id': aaa.id, 'address': aaa.address,}));
    alert(JSON.stringify({'id': aaa.id, 'address': aaa.address,}));
}

// 無名関数(関数リテラル)
const TestFFF = () => {
    // !mapの中で実行しているのが無名関数
    let results = [0, 1, 2, 3, 4].map(function (x) { return 100 * x});
    for (const vv of results) console.log(`Value:${vv}`);
}

/* 高階関数群と使い方 */
const TestGGG = () => {

    // ES5では使えない...
    const objArray = ["aaa", "bbb", "ccc", "ddd", "eee"];
    objArray.forEach((ele, index) => console.log(`index:${index}, ele:${ele}`));

    // map(与えられた関数を配列のすべての要素に対して実行し、その戻り値から新しい配列を作成)
    const array1 = [3,1,4,1,5,9,2];
    const array2 = array1.map(function (item, index, ary) {
        return item * item;
    });
    console.log("map:" + array2);

    // filter(与えられた関数を配列のすべての要素に対して実行し、合格した要素だけからなる新しい配列を作成)
    // const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
    // const result = words.filter(word => word.length > 6);
    // console.log("filter test:" + result);

    // reduce(配列要素に対してインデックスが小さい方から大きい方へ
    // 順（左から右の順）に指定された関数を実行)
    var arr = [3,1,4,1,5,9,2];
    var result = arr.reduce(function (previousItem, currentItem, index, array) {
        var message = '';
        message += '[' + array.toString() + '] ';
        message += 'No.' + index + ' :';
        message += previousItem;
        message += '+';
        message += currentItem;
        message += '=';
        message += (previousItem + currentItem);
        console.log(message);
        return previousItem + currentItem;
    });
    console.log("reduce result:" + result);
}

/* プロトタイプ(基本) */
function createEmployeeBase(name, salary) {
    return {
        name2: name,
        salary2: salary,
        raiseSalary2: function (percent) {
            this.salary2 *= 1 + percent / 100;
        }
    }
}

// プロトタイプ(共有メソッド)
const employeePrototype = {
    raiseSalary: function(percent) {
        this.salary *= 1 + percent / 100;
    }
}

// プロトタイプ設定
function createEmployee(name, salary) {
    const result = {name, salary};
    Object.setPrototypeOf(result, employeePrototype);
    return result;
}

// プロトタイプテスト
const TestHHH = () => {
    const aaa = createEmployee('kouki', 1000000);
    aaa.raiseSalary(50);
    console.log("EmployeeInfo name:" + aaa.name + " " + "salary:" + aaa.salary);

    const bbb = createEmployeeBase('taro', 500000);
    bbb.raiseSalary2(50);
    console.log("createEmployeeBase name2:" + bbb.name2 + " salary2:" + bbb.salary2);
}

/* 動的にプロトタイプ */
function memberInfo(name, skill) {
    this.name = name;
    this.skill = skill;
}

// 無名関数・即実行関数テスト
function TestIII() {

    const xxx = new memberInfo('kubota', 60);
    memberInfo.prototype.raiseSkill = function(percent) {
        this.skill *= 1 + percent / 100;
    }
    memberInfo.prototype.fullPowerUp = function (point) {
        this.skill += point * 2;
    }

    xxx.raiseSkill(100);
    xxx.fullPowerUp(40);
    console.log(xxx.name + "is skill point " + xxx.skill);

    // 無名関数
    var x = function(y) {
        return y * y;
    };
    console.log("x test:" + String(x(7)));

    // 即実行関数(※nameに外部からアクセスできない)
    var result = (function () {
        var name = "Barry";
        return name;
    })();
    console.log("result :" + result);
}

// クロージャ―テスト１
function TestJJJ() {
    var makeCounter = function() {
        var privateCounter = 0;
        function changeBy(val) {
            privateCounter += val;
        }
        return {
            increment: function() {
                changeBy(1);
            },
            decrement: function() {
                changeBy(-1);
            },
            value: function() {
                return privateCounter;
            }
        }
    };

    var counter1 = makeCounter();
    var counter2 = makeCounter();

    alert(counter1.value());  // 0.

    counter1.increment();
    counter1.increment();
    alert(counter1.value()); // 2.

    counter1.decrement();
    alert(counter1.value()); // 1.
    alert(counter2.value()); // 0.
}

// クロージャ－テスト２
function TestKKK() {

    var counter = (function() {
        var privateCounter = 0;
        function changeBy(val) {
            privateCounter += val;
        }
        return {
            increment: function() {
                changeBy(1);
            },
            decrement: function() {
                changeBy(-1);
            },
            value: function() {
                return privateCounter;
            }
        };
    })();

    console.log(counter.value());  // 0.

    counter.increment();
    counter.increment();
    console.log(counter.value());  // 2.

    counter.decrement();
    console.log(counter.value());  // 1.
}

// ES5でのforEach使用方法
function TestLLL() {

    //  要素に値とインデックスや配列をコールバック関数の引数として受け取って処理する場合
    var objArray = ["aaa", "bbb", "ccc", "ddd", "eee"];
    objArray.forEach(function(element, index, array){
        console.log('Index:' + index);
        console.log('Element:' + element);
        console.log('Array:' + array);
    });

    // map(与えられた関数を配列のすべての要素に対して実行し、その戻り値から新しい配列を作成)
    const array1 = [3,1,4,1,5,9,2];
    const array2 = array1.map(function (item, index, ary) {
        return console.log("index:" + index + "" + item * item);
    });
    console.log("map:" + array2);

    // reduce(配列要素に対してインデックスが小さい方から大きい方へ
    // 順（左から右の順）に指定された関数を実行)
    var arr = [3,1,4,1,5,9,2];
    var result2 = arr.reduce(function (previousItem, currentItem, index, array) {
        var message = '';
        message += '[' + array.toString() + '] ';
        message += 'No.' + index + ' :';
        message += previousItem;
        message += '+';
        message += currentItem;
        message += '=';
        message += (previousItem + currentItem);
        console.log(message);
        return previousItem + currentItem;
    });
    console.log("reduce result2:" + result2);

    // filter(与えられた関数を配列のすべての要素に対して実行し、
    // 判定で真を返した要素だけから新しい配列を作成して返する)
    var arr2 = arr.filter(function (value, incex, array) {
        if (value > array[2]) return value;
    });
    console.log("arr2:" + arr2);

    var arr_months = ['March', 'Jan', 'Feb', 'Dec'];
    arr_months.sort();
    console.log(arr_months);
    // expected output: Array ["Dec", "Feb", "Jan", "March"]

    var arr_number = [1, 30, 4, 21, 100000];
    arr_number.sort();
    console.log(arr_number);
    // expected output: Array [1, 100000, 21, 30, 4]

}

function TestMMM() {

    function showHelp(help) {
        document.getElementById('help').innerHTML = help;
    }

    function makeHelpCallback(help) {
        return function() {
            showHelp(help);
        };
    }

    function setupHelp() {
        var helpText = [
            {'id': 'email', 'help': 'メールアドレス'},
            {'id': 'name', 'help': '氏名'},
            {'id': 'age', 'help': '年齢 (17歳以上)'}
        ];

        for (var i = 0; i < helpText.length; i++) {
            var item = helpText[i];
            document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
        }
    }

    setupHelp();
}
