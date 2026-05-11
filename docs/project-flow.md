# プロジェクトフロー：実装優先順位

> フロントエンドチームの提案をもとに合意した実装フロー。
> バックエンド・フロントエンド両チームはこの優先順序に沿って開発を進める。

---

## 優先フロー

```
① アカウント作成
        ↓  POST /api/register
② ログイン認証 → Bearer トークン取得
        ↓  POST /api/login
③ ダウンロードリンク発行（購入済みのみ）
           GET /api/products/{id}/download
           Authorization: Bearer {token} が必須
```

### 背景・理由
- ダウンロードエンドポイントはトークンなしでは呼び出せない（401）
- トークンを得るためにはログインが必要
- ログインするためにはアカウント作成が先決
- このため「アカウント作成 → ログイン → ダウンロード」の順が最優先フローとなる

---

## フェーズ別実装ロードマップ

### Phase 1 — 認証基盤（最優先）
| # | 機能 | エンドポイント | 状態 |
|---|------|--------------|------|
| 1 | アカウント作成 | POST /api/register | ✅ 実装済み |
| 2 | ログイン | POST /api/login | ✅ 実装済み |
| 3 | ログアウト | POST /api/logout | ✅ 実装済み |

### Phase 2 — コンテンツ取得
| # | 機能 | エンドポイント | 状態 |
|---|------|--------------|------|
| 4 | 商品一覧 | GET /api/products | ✅ 実装済み |
| 5 | 商品詳細（is_purchased付き） | GET /api/products/{id} | ✅ 実装済み |

### Phase 3 — 購入・ダウンロード（コア機能）
| # | 機能 | エンドポイント | 状態 |
|---|------|--------------|------|
| 6 | 購入 | POST /api/purchases | ✅ 実装済み |
| 7 | ダウンロードリンク発行 | GET /api/products/{id}/download | ✅ 実装済み |

### Phase 4 — 拡張機能（後回し可）
| # | 機能 | エンドポイント | 状態 |
|---|------|--------------|------|
| 8 | カテゴリ一覧 | GET /api/categories | 未実装 |
| 9 | 購入済み一覧 | GET /api/user/purchases | 未実装 |
| 10 | ウィッシュリスト追加 | POST /api/wishlists | 未実装 |
| 11 | ウィッシュリスト一覧 | GET /api/user/wishlists | 未実装 |
| 12 | ウィッシュリスト削除 | DELETE /api/wishlists/{id} | 未実装 |

---

## 認証フロー詳細

### アカウント作成 → ログイン

```
POST /api/register
Body: { name, email, password }
→ Response: { token, user }

POST /api/login
Body: { email, password }
→ Response: { token, user }
```

- register・login どちらも成功すると同形式で `token` が返る
- 取得した `token` は以降のリクエストで `Authorization: Bearer {token}` として使い回す

### トークンを使ったダウンロード

```
GET /api/products/{id}/download
Headers:
  Authorization: Bearer {token}   ← 必須
  Content-Type: application/json

条件: その商品を POST /api/purchases で購入済みであること
```

| 状態 | レスポンス |
|------|----------|
| 購入済み + 認証済み | 200 ファイルダウンロード |
| 未認証 | 401 |
| 未購入 | 403 |
| ファイル不存在 | 404 |

---

## 関連ドキュメント
- [API リファレンス](./api-reference.md)
- [フロントエンド実装ガイド](./frontend-implementation.md)
