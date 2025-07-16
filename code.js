// モノ（クラスとして表現）

// ダミーのUI要素表現
class UIElement {
    constructor(name = "") {
        this.name = name;
    }

    display(value) {
        console.log(`[${this.name}] 表示: ${value}`);
    }

    click() {
        console.log(`[${this.name}] がクリックされました。`);
    }
}

class 入出金記録 {
    constructor(日付, タイプ, 金額) {
        this.日付 = 日付;
        this.タイプ = タイプ; // "入金" または "出金"
        this.金額 = 金額;
    }

    toString() {
        return `日付: ${this.日付.toLocaleDateString()}, タイプ: ${this.タイプ}, 金額: ${this.金額.toFixed(2)}`;
    }
}

class コメント {
    constructor(メッセージ) {
        this.メッセージ = メッセージ;
    }

    表示() {
        console.log(`コメント: ${this.メッセージ}`);
    }
}

class ホーム {
    constructor() {
        this.残高表示エリア = new UIElement("残高表示");
        this.目標金額表示エリア = new UIElement("目標金額表示");
        this.入出金ボタン = new UIElement("入出金ボタン");
        this.分析ボタン = new UIElement("分析ボタン");
    }

    データ表示(残高, 目標金額) {
        this.残高表示エリア.display(残高.toFixed(2));
        this.目標金額表示エリア.display(目標金額.toFixed(2));
    }

    入出金ボタンをクリック() {
        this.入出金ボタン.click();
    }

    分析ボタンをクリック() {
        this.分析ボタン.click();
    }
}

class ボタン {
    constructor(name, action) {
        this.name = name;
        this._action = action;
    }

    クリック() {
        console.log(`'${this.name}' ボタンがクリックされました。`);
        this._action();
    }
}


// 登場人物（クラスとして表現）

class キャラクター {
    constructor(気分 = "普通") {
        this.気分 = 気分;
    }

    コメントを出力(残高, 目標金額) {
        let message;
        if (残高 >= 目標金額) {
            message = "素晴らしい！目標達成です！";
            this.気分 = "嬉しい";
        } else { // 目標額を下回っている場合
            message = "頑張りどころです。支出を見直してみましょう。";
            this.気分 = "悲しい";
        }
        new コメント(`${this.気分}：${message} (残高: ${残高.toFixed(2)}, 目標: ${目標金額.toFixed(2)})`).表示();
    }
}

class プログラム {
    constructor() {
        this.残高 = 0.00; // JavaScriptではNumber型で数値を扱う
        this.入出金データ = [];
        this.目標金額 = 0.00;
        this.キャラクター = new キャラクター();
        this.ホーム = new ホーム();
    }

    // プログラムは目標金額を残高と同時にホームに出力する。
    残高と目標額をホームに出力() {
        console.log("\n--- ホーム画面更新 ---");
        this.ホーム.データ表示(this.残高, this.目標金額);
        // 残高が変動した時、キャラクターはもしも設定した目標額よりも残高が下回っていたら悲しいコメントを、上回っていたら嬉しいコメントを画面に出力する。
        this.キャラクター.コメントを出力(this.残高, this.目標金額);
        console.log("--------------------");
    }

    // 利用者は出金及び入金の金額を入力することができ、もしも出金であれば残高=残高ー入力した値、入金であれば残高=残高+入力した値とする。
    残高を更新(タイプ, 金額) {
        const parsed金額 = parseFloat(金額); // 文字列を数値に変換
        if (isNaN(parsed金額) || parsed金額 <= 0) {
            console.error("エラー: 無効な金額です。正の数値を入力してください。");
            return;
        }

        if (タイプ === "入金") {
            this.残高 += parsed金額;
        } else if (タイプ === "出金") {
            this.残高 -= parsed金額;
        } else {
            console.error("エラー: 不明なタイプです (入金/出金)。");
            return;
        }

        this.入出金データ.push(new 入出金記録(new Date(), タイプ, parsed金額));
        console.log(`${タイプ} ${parsed金額.toFixed(2)}円が記録されました。現在の残高: ${this.残高.toFixed(2)}`);
        this.残高と目標額をホームに出力(); // 残高変動時にコメントも更新
    }

    // プログラムは月末ごとの残高を折れ線グラフで整理する。
    月末残高を折れ線グラフで整理() {
        console.log("\n--- 月末残高の折れ線グラフ (ダミー) ---");
        // 実際にはここでグラフ描画ライブラリ（Chart.jsなど）を使用
        const monthlyBalances = {};
        let currentBalance = 0; // 各月の開始残高をトラッキングするための変数

        // 入出金データを日付順にソート（必要であれば）
        const sortedData = [...this.入出金データ].sort((a, b) => a.日付.getTime() - b.日付.getTime());

        for (const record of sortedData) {
            const monthYear = record.日付.getFullYear() + "-" + (record.日付.getMonth() + 1).toString().padStart(2, '0');

            // 各トランザクションがその月の残高にどう影響するかを追跡
            if (record.タイプ === "入金") {
                currentBalance += record.金額;
            } else if (record.タイプ === "出金") {
                currentBalance -= record.金額;
            }
            monthlyBalances[monthYear] = currentBalance; // その時点での残高を記録
        }

        const sortedMonths = Object.keys(monthlyBalances).sort();
        for (const month of sortedMonths) {
            console.log(` ${month}: ${monthlyBalances[month].toFixed(2)}円`);
        }
        console.log("------------------------------");
    }
}

class 利用者 {
    constructor(プログラム) {
        this.プログラム = プログラム;
    }

    // 利用者は目標金額を設定することができる。
    設定() {
        console.log("\n--- 利用者設定 ---");
        while (true) {
            const 目標額Str = prompt("目標金額を設定してください: ");
            const 目標額 = parseFloat(目標額Str);
            if (!isNaN(目標額) && 目標額 >= 0) {
                this.プログラム.目標金額 = 目標額;
                console.log(`目標金額が ${this.プログラム.目標金額.toFixed(2)}円に設定されました。`);
                break;
            } else {
                alert("無効な金額です。0以上の数値を入力してください。");
            }
        }
        this.プログラム.残高と目標額をホームに出力(); // 設定後もコメントを更新
    }

    入出金額を入力(金額) {
        let タイプ;
        while (true) {
            タイプ = prompt("入金ですか、出金ですか？ (入金/出金): ").trim();
            if (タイプ === "入金" || タイプ === "出金") {
                break;
            } else {
                alert("無効なタイプです。「入金」または「出金」と入力してください。");
            }
        }
        this.プログラム.残高を更新(タイプ, 金額);
    }

    // 利用者は残高を常に確認できる。（これは「残高と目標額をホームに出力」で間接的に達成されます）
    // また、別途明示的に確認する機能も持たせます
    残高を確認() {
        console.log(`現在の残高: ${this.プログラム.残高.toFixed(2)}円`);
    }

    // 利用者はボタンをホームから押すことでその分析を見ることが出来る。
    分析を見る() {
        console.log("\n--- 利用者分析 ---");
        this.プログラム.月末残高を折れ線グラフで整理();
        console.log("入出金履歴:");
        if (this.プログラム.入出金データ.length === 0) {
            console.log("履歴がありません。");
        } else {
            this.プログラム.入出金データ.forEach(record => {
                console.log(` - ${record.toString()}`);
            });
        }
        console.log("--------------------");
    }
}


// --- シミュレーション ---
function runSimulation() {
    const myProgram = new プログラム();
    const user = new 利用者(myProgram);

    console.log("=== 家計簿アプリ シミュレーション開始 ===");

    // ユーザーが設定を行う
    user.設定();

    // 入出金の入力シミュレーション
    // promptは同期的に動作するため、連続して呼び出しても問題ありません
    user.入出金額を入力(50000); // 給料が入金
    user.入出金額を入力(10000); // 食費が出金
    user.入出金額を入力(3000);  // 交通費が出金
    user.入出金額を入力(20000); // 副収入が入金

    // ホーム画面の入出金ボタンをクリックするシミュレーション
    const 入出金ボタン_アクション = () => console.log("入出金入力画面に遷移します。（このシミュレーションでは直接入出金額を入力します）");
    const ホーム_入出金ボタン = new ボタン("入出金", 入出金ボタン_アクション);
    ホーム_入出金ボタン.クリック();
    user.入出金額を入力(5000); // さらに出金

    // 分析を見る
    // プロンプトはシミュレーションの途中で挟まない方が良いので、最後にまとめて実行を促す
    user.分析を見る();

    // 目標金額の再設定（設定関数を再利用）
    console.log("\n--- 目標金額の再設定 ---");
    user.設定(); // 再度promptを呼び出して目標金額を再設定

    // 再度分析
    user.分析を見る();

    console.log("\n=== シミュレーション終了 ===");
}

// ブラウザのコンソールで実行する場合
// runSimulation();

// Node.js環境で実行する場合 (promptをエミュレートするためreadline-syncなどのライブラリが必要)
// このコードをNode.jsで実行するには、`prompt`関数を`readline-sync`のようなライブラリで置き換える必要があります。
// 例: npm install readline-sync
/*
const readlineSync = require('readline-sync');
function prompt(message) {
    return readlineSync.question(message);
}
function alert(message) {
    console.log(message);
}
*/
// Node.jsで実行する場合は、上記のprompt/alertエミュレーションを有効にして、runSimulation()を呼び出してください。

// 簡単なNode.jsでの実行のための準備（上記コメントアウト部分を有効にするか、以下を参考にしてください）
if (typeof window === 'undefined') { // Node.js環境か判定
    const readlineSync = require('readline-sync');
    global.prompt = readlineSync.question;
    global.alert = console.log;
}

runSimulation();