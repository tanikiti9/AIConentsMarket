<?php

namespace App\Http\Controllers;

use OpenApi\Attributes as OA;

#[OA\Info(title: 'AIContentsMarket API', version: '1.0.0', description: 'AIコンテンツ販売サイトのAPI。購入済みユーザーのみダウンロード可能。')]
#[OA\Server(url: 'http://127.0.0.1:8000', description: 'ローカル開発サーバー')]
#[OA\SecurityScheme(securityScheme: 'bearerAuth', type: 'http', scheme: 'bearer', description: '登録・ログインで取得したトークンを入力してください')]
abstract class Controller
{
    //
}
