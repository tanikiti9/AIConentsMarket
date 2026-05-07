# API リファレンス

**ベースURL:** `http://127.0.0.1:8000`  
**共通ヘッダー:** `Content-Type: application/json`  
**認証方式:** Bearer トークン（登録・ログインで取得）

---

## 認証

### POST /api/register　新規登録

認証不要

**リクエストボディ**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| name | string | ✅ | ユーザー名 |
| email | string | ✅ | メールアドレス（重複不可） |
| password | string | ✅ | パスワード（8文字以上） |

**レスポンス 201**
```json
{
  "token": "1|abc123...",
  "user": {
    "id": 1,
    "name": "テストユーザー",
    "email": "user@example.com"
  }
}
```

---

### POST /api/login　ログイン

認証不要

**リクエストボディ**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| email | string | ✅ | メールアドレス |
| password | string | ✅ | パスワード |

**レスポンス 200**
```json
{
  "token": "1|abc123...",
  "user": {
    "id": 1,
    "name": "テストユーザー",
    "email": "user@example.com"
  }
}
```

**レスポンス 422**（メールアドレスまたはパスワードが誤り）
```json
{
  "message": "認証情報が正しくありません。"
}
```

---

### POST /api/logout　ログアウト

**認証必要** `Authorization: Bearer {token}`

**レスポンス 200**
```json
{
  "message": "ログアウトしました。"
}
```

**レスポンス 401**（未認証）
```json
{
  "message": "認証が必要です。"
}
```

---

## 商品

### GET /api/products　商品一覧

認証不要

**レスポンス 200**
```json
[
  {
    "id": 1,
    "title": "AIイラスト素材セット",
    "creator_name": "田中 太郎",
    "description": "Midjourneyで生成した高品質なイラスト素材です。商用利用可能。",
    "price": 0,
    "is_free": true,
    "file_name": "ai_illustration_set.txt",
    "file_size": 228,
    "download_url": "http://127.0.0.1:8000/api/products/1/download",
    "status": "published",
    "created_at": "2026-05-06T07:24:57.000000Z"
  }
]
```

---

### GET /api/products/{id}　商品詳細

認証任意（ログイン済みの場合は `is_purchased` が正確に返る）

**パスパラメータ**

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| id | integer | 商品ID |

**レスポンス 200**
```json
{
  "id": 1,
  "title": "AIイラスト素材セット",
  "creator_name": "田中 太郎",
  "description": "Midjourneyで生成した高品質なイラスト素材です。商用利用可能。",
  "price": 0,
  "is_free": true,
  "file_name": "ai_illustration_set.txt",
  "file_size": 228,
  "download_url": "http://127.0.0.1:8000/api/products/1/download",
  "status": "published",
  "created_at": "2026-05-06T07:24:57.000000Z",
  "is_purchased": false
}
```

> `is_purchased` は未ログインの場合は常に `false`。ログイン済みの場合は購入済みなら `true`。

---

### GET /api/products/{id}/download　ダウンロード

**認証必要** `Authorization: Bearer {token}`  
**購入済みであること**

**パスパラメータ**

| パラメータ | 型 | 説明 |
|-----------|-----|------|
| id | integer | 商品ID |

**レスポンス 200**  
ファイルの中身がそのまま返ってくる。

**レスポンス 401**（未認証）
```json
{
  "message": "認証が必要です。"
}
```

**レスポンス 403**（未購入）
```json
{
  "message": "この商品を購入してからダウンロードしてください。"
}
```

---

## 購入

### POST /api/purchases　購入

**認証必要** `Authorization: Bearer {token}`

**リクエストボディ**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| product_id | integer | ✅ | 購入する商品のID |

**レスポンス 201**
```json
{
  "message": "購入が完了しました。",
  "product_id": 1,
  "title": "AIイラスト素材セット"
}
```

**レスポンス 409**（すでに購入済み）
```json
{
  "message": "すでに購入済みです。"
}
```

**レスポンス 401**（未認証）
```json
{
  "message": "認証が必要です。"
}
```

---

## エンドポイント一覧

| メソッド | パス | 認証 | 説明 |
|--------|------|:----:|------|
| POST | /api/register | ー | 新規登録 |
| POST | /api/login | ー | ログイン |
| POST | /api/logout | 必要 | ログアウト |
| GET | /api/products | ー | 商品一覧 |
| GET | /api/products/{id} | 任意 | 商品詳細 |
| POST | /api/purchases | 必要 | 購入 |
| GET | /api/products/{id}/download | 必要+購入済み | ダウンロード |
