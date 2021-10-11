'use strict'

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
    alert(TestAAA("Call to TestAAA"));
}

// 即時関数サンプル
const TestImmediateMethod = () => {
    var result = (function (param1, param2) {
        return param1 + param2;
    })(1, 2);
    console.log('TestImmediateMethod:' + result); //3が出力される。
}

// 即時関数をアロー関数で記述
const TestArrowMethod = () => {

    (v => console.log('あああ'))();

    (v => {
        console.log('あああ');
        console.log('いいい');
    })(); // => あああ いいい

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

    // ES5ではアロー関数は使えない
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

/* クロージャ―テスト */
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

// ES5での各Array用関数の使用方法
function TestArrayMethods() {

    /* forEach */
    // 要素に値とインデックスや配列をコールバック関数の引数として受け取って処理する場合
    var objArray = ["aaa", "bbb", "ccc", "ddd", "eee"];
    objArray.forEach(function(element, index, array){
        console.log('Index:' + index);
        console.log('Element:' + element);
        console.log('Array:' + array);
    });

    /* map */
    // map(与えられた関数を配列のすべての要素に対して実行し、その戻り値から新しい配列を作成)
    // ※この辺りの関数は無名関数にしている。別途、関数を定義して呼び出すことも可能
    const array1 = [3,1,4,1,5,9,2];
    const array22 = array1.map(function (item, index, ary) {
        console.log("index:" + index + " " + item * item);
        return item * item;
    });
    console.log("map:" + array22);

    /* reduce */
    // reduce(配列要素に対してインデックスが小さい方から大きい方へ
    // 順（左から右の順）に指定された関数を実行)
    var arr = [3, 1, 4, 1, 5, 9, 2, 11];
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

    /* filter */
    // filter(与えられた関数を配列のすべての要素に対して実行し、
    // 判定で真を返した要素だけから新しい配列を作成して返する)
    var arr2 = arr.filter(function (value, index, array) {
        return value > array[2];
    });
    console.log("arr2:" + arr2);

    /* some */
    // 評価式がtrueになる条件が一つでもあればtrueを返す
    console.log('array some test:' + arr.some(function (value, index, array) {
        return value > 10;
    }));

    /* find */
    // 配列内で一致する要素を検索する
    var arr_months = ['March', 'Jan', 'Feb', 'Dec'];
    var valueName = arr_months.find(function (value, index, array) {
        return 'Feb' === value;
    });
    console.log('arr_month match value:' + valueName);

    /* includes */
    // 配列内に一致する要素があればtrueなければfalseを返す
    console.log('Jan is match:' + arr_months.includes('Jan', 0));

    /* flat */
    // 多次元の配列を平坦化する
    var arr3 = [[1,2],[3,4]];
    var arr4 = arr3.flat();
    console.log('arr3 を平坦化 ' + arr4);

    /* concat */
    // 配列に追加
    var arr6 = [7, 8];
    var arr5 = arr4.concat(5, 6, arr6);
    console.log("配列追加:" + arr5);

    /* 配列の欠けてる要素を取り除く */
    // var arr10 = [, 2, , 7, , 9].filter(x => true); //ES6
    var arr10 = [, 2, , 7, , 9].filter(function (x) {
        return true;
    });
    console.log(arr10);

    /* assign */
    // 複数オブジェクトをallObjへコピーする
    var objA = {a:'Ant'};
    var objB = {b:'bee'};
    var objC = {c:'cicada'};
    var allObj = Object.assign(objA, objB, objC);
    console.log('allObj a:' + allObj.a);

    // 既存オブジェクトへ追加する場合
    var objD = {d:'lion'};
    allObj = Object.assign({}, allObj, objD);
    console.log('allObj a:' + allObj.a + ' d:' + allObj.d);

    /* オブジェクト内に配列格納処理 */
    var arr7 = [1,2,3,4];
    var arr8 = [5,6,7,8];
    var arr9 = [9,10,11,12];

    var helpText = [
        {'id': 'email', 'help': 'メールアドレス', 'help2': '年齢', 'a_data': arr7},
        {'id': 'name', 'help': '氏名', 'help2': '名字', 'a_data': arr8},
        {'id': 'age', 'help': '年齢 (17歳以上)', 'help2': '大人', 'a_data': arr9},
    ];
    console.log('helpText Length:' + helpText.length);

    for (var oneData of helpText) {
        console.log(oneData.id + ' ' + oneData.help + ' ' + oneData.help2 + ' ' + oneData.a_data);
    }

    // 辞書として昇順にソート
    var arr_months = ['March', 'Jan', 'Feb', 'Dec'];
    arr_months.sort();
    console.log(arr_months);
    // expected output: Array ["Dec", "Feb", "Jan", "March"]

    // 数字として昇順にソート
    var arr_number = [1, 30, 4, 21, 100000];
    arr_number.sort(function (a, b) {
        return a - b;
    });
    console.log(arr_number);
    // expected output: Array [1, 100000, 21, 30, 4]

    // 二次元配列をソート
    arrayTaxationList.sort(function(a, b) { return(a[0] - b[0]); });

    // オブジェクトを配列に格納(569行目とやっていることは一緒)
    var arr10 = [];
    arr10.push({'id': 'email', 'help': 'メールアドレス', 'help2': '年齢', 'a_data': arr7});
    arr10.push({'id': 'name', 'help': '氏名', 'help2': '名字', 'a_data': arr8});
    arr10.push({'id': 'age', 'help': '年齢 (17歳以上)', 'help2': '大人', 'a_data': arr9});

    // 配列の各要素(オブジェクト)をchgData関数で実行する
    var arr11 = arr10.map(chgData);
    arr11.map(function (value, index) {
        console.log('arr11 ' + Number(index + 1) + ': ' + value.id + ' '
                    + value.help + ' ' + value.help2 + ' [' + value.a_data + ']');
    });

    console.log('arr11 1:' + arr11[0].id);
    console.log('arr11 2:' + arr11[1].a_data);

    var objAAA = null;
    // ChgObjData(objAAA); // undefined null test
    var objBBB = ChgObjData(arr11);
    // console.log('obj:' + objBBB[1]);

    /* プロパティの存在チェック */
    // 「a_data」プロパティがオブジェクト内に存在するかチェック
    if ('a_data' in objBBB[0][1]) {
        console.log('a_data is arr11 to exsist!');
    } else {
        console.log('a_data is not arr11 to exsist!');
    }
}

// 引数としてオブジェクトデータを受け取り、編集後に一つのオブジェクトにまとめて返す
function chgData (arrObj) {
    var retObj = {};
    retObj = Object.assign({} ,{'id': 'user_' + arrObj.id});
    retObj = Object.assign({}, retObj, {'help': 'ユーザー' + arrObj.help});
    retObj = Object.assign({}, retObj, {'help2': 'ユーザー' + arrObj.help2});

    var tmpArr = [];
    for (var val of arrObj.a_data) tmpArr.push(val * 2);
    retObj = Object.assign({}, retObj, {'a_data': tmpArr});

    console.log('retObj:' + retObj.id + ' ' + retObj.help + ' '
                + retObj.help2 + ' ' + retObj.a_data);
    return retObj;
}

function ChgObjData (objects) {

    if (!objects || objects.length === 0) console.log('objects not exsist');

    /* Array map の使い方 */
    Object.entries(objects).map(function (value, index) {
        console.log('id ' + index + ':' + value[1].id);
        console.log('help ' + index + ':' + value[1].help);
        console.log('help2 ' + index + ':' + value[1].help2);
        console.log('Data ' + index + ':' + value[1].a_data);
    });

    /* Array filter の使い方 */
    var retObj = Object.entries(objects).filter(function (value) {
        return value[1].a_data[3] > 15;
    });

    console.log('retObj:' + retObj[0][1].a_data);
    console.log('retObj:' + retObj[1][1].a_data);
    return retObj;
}


/* apply関数(ES5可能) */
// apply関数の使用方法
// apply関数は、引数の単一の配列のみを受け取る
const TestApply = () => {

    // 既存の配列に配列を追加する
    const array = ['a', 'b'];
    const elements = [0, 1, 2];
    array.push.apply(array, elements);
    console.info(array); // ["a", "b", 0, 1, 2]


    // ループ文として代用する
    const array2 = [5, 6, 2, 3, 7];
    let max = Math.max.apply(null, array2);
    let min = Math.min.apply(null, array2);
    console.log('Max:' + max + ', Min:' + min);

    return;
}


/* call関数(ES5可能) */
// call() はあるオブジェクトに所属する関数やメソッドを、別なオブジェクトに割り当てて呼び出す
const TestCall = () => {

    console.log('===============');
    console.log('[Case1] オブジェクトのコンストラクターを連鎖させる');
    // オブジェクトのコンストラクターを連鎖させる
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }

    function Food(name, price) {
        Product.call(this, name, price);
        this.category = 'food';
    }

    function Toy(name, price) {
        Product.call(this, name, price);
        this.category = 'toy';
    }

    const cheese = new Food('feta', 5);
    const fun = new Toy('robot', 40);

    console.log('cheese name:' + cheese.name + ' price:' + cheese.price + ' category:' + cheese.category);
    console.log('fun name:' + fun.name + ' price:' + fun.price + ' category:' + fun.category);


    console.log('===============');
    console.log('[Case2] 無名関数を作成して call を使用して配列内の各オブジェクトに対して呼び出し');

    // 無名関数を作成して call を使用して配列内の各オブジェクトに対して呼び出し
    const animals = [
        { species: 'Lion', name: 'King' },
        { species: 'Whale', name: 'Fail' }
    ];

    for (let i = 0; i < animals.length; i++) {
        (function(i) {
        this.print = function() {
            console.log('#' + i + ' ' + this.species
                        + ': ' + this.name);
        }
        this.print();
        }).call(animals[i], i);
    }
    console.log('===============');

    return;
}


/* bind関数 */
// bind関数の使用方法
const TestBind = () => {

    console.log('===============');
    console.log('[Case1] 基本的なbind関数の使用方法');

    function list() {
        return Array.prototype.slice.call(arguments);
    }

    const addArguments = (arg1, arg2) => arg1 + arg2;

    const list1 = list(1, 2, 3);        // [1, 2, 3]
    console.log('list1:' + list1);

    const result1 = addArguments(1, 2); // 3
    console.log('result1:' + result1);

    // 先頭の引数が設定済みの関数を生成します。
    const leadingThirtysevenList = list.bind(null, 37);

    // 第一引数が設定済みの関数を生成します。
    const addThirtySeven = addArguments.bind(null, 37);

    const list2 = leadingThirtysevenList();
    console.log('list2:' + list2);      // [37]

    const list3 = leadingThirtysevenList(1, 2, 3);
    console.log('list3:' + list3);      // [37, 1, 2, 3]

    const result2 = addThirtySeven(5);
    console.log('result2:' + result2 + ' (37 + 5 = 42)');   // 37 + 5 = 42

    const result3 = addThirtySeven(5, 10);
    console.log('result3:' + result3 + ' (37 + 5 = 42 the second argument is ignored)');
    //  37 + 5 = 42
    //  (the second argument is ignored)


    console.log('===============');
    console.log('[Case2] 特定の this を必要とするような関数のショートカットを作成する');

    // slice関数を定義
    const unboundSlice = Array.prototype.slice;

    // Slice関数にapply関数をバインドする
    const slice = Function.prototype.apply.bind(unboundSlice);

    // slice(apply)関数として利用する
    const array = ['sss', 'bbbb', 12, 23, 45];
    const vals = slice(array);
    console.log('slice:' + vals);


    console.log('===============');
    console.log('[Case3] this をコールバック関数と明確に結びつけて (バインドして)、インスタンスを維持する');
    // this をコールバック関数と明確に結びつけて (バインドして)、インスタンスを維持する
    function LateBloomer() {
        this.petalCount = Math.floor(Math.random() * 12) + 1;
    }

    // 1 秒遅延させてから bloom を宣言する
    LateBloomer.prototype.bloom = function() {
        window.setTimeout(this.declare.bind(this), 1000);
    };

    LateBloomer.prototype.declare = function() {
        console.log(`I am a beautiful flower with ${this.petalCount} petals!`);
    };

    const flower = new LateBloomer();
    flower.bloom();
    //  after 1 second, calls 'flower.declare()'
    console.log('===============');

    return;
}

function TestSample () {

    var sum = 0;
    var array_num = [1,2,3,4,5,6,7,8,9,10];

    // ES5までの書き方
    // array_num.map(function (value) {
    //     value % 2 === 0 ? sum += value * 2 : sum += value;
    // });

    // ES6以降の書き方
    array_num.map((value) => value % 2 === 0 ? sum += value * 2 : sum += value);

    return alert('SUM:' + sum);
}
function TestSample2 () {

    var val1 = 1;
    var val2 = 2;
    var val3 = 2;

    // 比較演算子の使用方法
    if (val1 <= val2) console.log('val1 less val2');
    if (val1 !== val2) console.log('val1 not equal val2');
    if (val2 === val3) console.log('val2 equal val3');

    return;
}

function TestSample2 () {

    // var helpText = [
    //     {'id': 'email', 'help': 'メールアドレス', 'help2': '年齢', 'a_data': 100},
    //     {'id': 'name', 'help': '氏名', 'help2': '名字', 'a_data': 200},
    //     {'id': 'age', 'help': '年齢 (17歳以上)', 'help2': '大人', 'a_data': 300},
    // ];

    // var retObj = {};
    // retObj = Object.assign({} ,{'id': 'user_' + arrObj.id});
    // retObj = Object.assign({}, retObj, {'help': 'ユーザー' + arrObj.help});
    // retObj = Object.assign({}, retObj, {'help2': 'ユーザー' + arrObj.help2});

    var retObj = {};
    retObj = Object.assign({} ,{'id': '111'});
    retObj = Object.assign({}, retObj, {'id': '222'});
    // retObj = Object.assign(retObj, {'id': '333'});
    // retObj = Object.assign(retObj, {'id': '444'});

    // retObj = Object.assign({}, retObj, {'help': 'ユーザー'});
    // retObj = Object.assign({}, retObj, {'help2': 'ユーザーSSS'});
    // retObj = Object.assign({}, retObj, {'a_data': '300'});

    // Object形式のデータをJSON形式のデータに変換
    console.log(JSON.stringify(retObj));
    // console.log(JSON.stringify({'id': aaa.id, 'address': aaa.address,}));
    // alert(JSON.stringify({'id': aaa.id, 'address': aaa.address,}));

    return;
}

function LoadProc() {
    var curDate = new Date();
    var Year = curDate.getFullYear();
    var Month = curDate.getMonth()+1;
    var Date = curDate.getDate();
    var Hour = curDate.getHours();
    var Min = curDate.getMinutes();
    var Sec = curDate.getSeconds();
    console.log(Year + "年" + Month + "月" + Date + "日" + Hour + ":" + Min + ":" + Sec);
}


/**
 * 四捨五入関数
 * [引数] num: 数値, digit: 桁数 (整数値)
 * [返却値] 計算結果
 */
function round(num, digit) {

    var digitVal = Math.pow( 10, digit );
    var retVal;

    // 誤差を生じにくくさせる
    if (digitVal < 1) {
        retVal = Math.round(num * digitVal) * Math.pow(10, -1 * digit);
    } else {
        retVal = Math.round(num * digitVal) / digitVal;
    }

    console.log('四捨五入結果：' + retVal);
    return retVal;
}

/**
 * 切り上げ関数
 * [引数] num: 数値, digit: 桁数 (整数値)
 * [返却値] 計算結果
 */
function roundUp(num, digit) {

    // Excel に仕様を合わせるための符号入れ替え用変数
    var sign =  num < 0 ? -1 : 1;
    var digitVal = Math.pow( 10, digit );
    var retVal;

    // 誤差を生じにくくさせる
    if (digitVal < 1) {
        retVal = Math.ceil(num * sign * digitVal) * sign * Math.pow(10, -1 * digit);
    } else {
        retVal = Math.ceil(num * sign * digitVal) * sign / digitVal;
    }

    console.log('切り上げ結果：' + retVal);
    return retVal;
}

/**
 * 切り捨て関数
 * [引数] num: 数値, digit: 桁数 (整数値)
 * [返却値] 計算結果
 */
function roundDown(num, digit) {

    var digitVal = Math.pow(10, digit);
    var retVal;

    // 誤差を生じにくくさせる
    if (digitVal < 1) {
        retVal = Math.floor( num * digitVal ) * Math.pow( 10, -1 * digit );
    } else {
        retVal = Math.floor( num * digitVal ) / digitVal;
    }

    console.log('切り捨て結果：' + retVal);
    return retVal;
}
