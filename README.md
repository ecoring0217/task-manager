# チームタスク管理アプリ

React + Supabase + Vercel で構築した、無料で運用できるチーム向けタスク管理Webアプリです。

---

## 機能

- タスクの追加・編集・削除
- 担当者 / 依頼者 / 期日 / 優先度 / ステータス / 備考を管理
- ステータスバッジをクリックして素早く更新（未着手 → 進行中 → 完了）
- 期限超過タスクを赤くハイライト表示
- ステータス・優先度・担当者でフィルター＋テキスト検索
- リアルタイム同期（誰かが変更すると全員の画面に即反映）
- PCでもスマホでも動作するレスポンシブデザイン

---

## セットアップ手順

### ステップ 1：Supabase プロジェクトを作成

1. [https://supabase.com](https://supabase.com) にアクセスし、無料でサインアップ
2. ダッシュボードで「New project」をクリック
3. プロジェクト名（例：task-manager）とパスワードを設定して作成
4. 左メニューの **SQL Editor** を開く
5. `supabase/schema.sql` の内容をまるごとコピーして貼り付け → **Run** をクリック

### ステップ 2：API キーを取得

1. 左メニューの **Project Settings → API** を開く
2. 以下の2つの値をコピーしておく
   - **Project URL**（例：`https://xxxx.supabase.co`）
   - **anon public key**（`eyJ...` から始まる長い文字列）

### ステップ 3：ローカルで動作確認（任意）

```bash
# task-manager フォルダに移動
cd Desktop/task-manager

# .env ファイルを作成
cp .env.example .env
```

`.env` を開き、以下のように編集：

```
VITE_SUPABASE_URL=https://あなたのプロジェクトURL.supabase.co
VITE_SUPABASE_ANON_KEY=あなたのanon公開キー
```

```bash
# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで http://localhost:5173 を開いて動作確認。

### ステップ 4：Vercel にデプロイ（無料公開）

1. [https://github.com](https://github.com) に無料サインアップ
2. 「New repository」でリポジトリを作成（例：task-manager）
3. 以下のコマンドでコードをプッシュ：
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/あなたのユーザー名/task-manager.git
   git push -u origin main
   ```
4. [https://vercel.com](https://vercel.com) に無料サインアップ（GitHubアカウントでログイン可）
5. 「Add New Project」→ 先ほど作ったリポジトリを選択してインポート
6. **Environment Variables** に以下を追加：
   - `VITE_SUPABASE_URL` → SupabaseのProject URL
   - `VITE_SUPABASE_ANON_KEY` → Supabaseのanon公開キー
7. 「Deploy」をクリック → 1〜2分でURLが発行される

発行されたURLをチームメンバーに共有するだけで、PCでもスマホでも使えます。

---

## 運用費用

| サービス | 無料枠 |
|---------|--------|
| Supabase | DB 500MB・月50,000アクティブユーザーまで無料 |
| Vercel | 個人・チームの小規模利用は無料 |
| GitHub | パブリック/プライベートリポジトリ無制限で無料 |

---

## 使い方

### メンバーを登録する（最初に行う）

1. 右上「メンバー」タブを開く
2. 名前を入力して「追加」→ チームメンバー全員を登録
3. 登録したメンバーがタスクの担当者・依頼者として選択可能になる

### タスクを追加する

- PC：右上の「＋ タスクを追加」ボタン
- スマホ：右下の大きな「＋」ボタン

### ステータスを更新する

タスクカードの **ステータスバッジ（未着手・進行中・完了）をクリック** するだけで次のステータスに更新されます。

### その他操作

- タスクカード右上の「⋮」メニューから編集・削除
- 上部のフィルターでステータス・優先度・担当者を絞り込み
- 「完了を非表示」チェックで完了済みタスクを隠せる
