<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use OpenApi\Attributes as OA;

class AuthController extends Controller
{
    #[OA\Post(
        path: '/api/register',
        summary: 'ユーザー登録',
        tags: ['認証'],
        requestBody: new OA\RequestBody(required: true, content: new OA\JsonContent(properties: [
            new OA\Property(property: 'name', type: 'string', example: 'テストユーザー'),
            new OA\Property(property: 'email', type: 'string', example: 'user@example.com'),
            new OA\Property(property: 'password', type: 'string', example: 'password123'),
        ])),
        responses: [
            new OA\Response(response: 201, description: '登録成功', content: new OA\JsonContent(properties: [
                new OA\Property(property: 'token', type: 'string', example: '1|abc123...'),
                new OA\Property(property: 'user', type: 'object', properties: [
                    new OA\Property(property: 'id', type: 'integer', example: 1),
                    new OA\Property(property: 'name', type: 'string', example: 'テストユーザー'),
                    new OA\Property(property: 'email', type: 'string', example: 'user@example.com'),
                ]),
            ])),
        ]
    )]
    public function register(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user  = User::create($data);
        $token = $user->createToken('api')->plainTextToken;

        return response()->json(['token' => $token, 'user' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email]], 201);
    }

    #[OA\Post(
        path: '/api/login',
        summary: 'ログイン',
        tags: ['認証'],
        requestBody: new OA\RequestBody(required: true, content: new OA\JsonContent(properties: [
            new OA\Property(property: 'email', type: 'string', example: 'user@example.com'),
            new OA\Property(property: 'password', type: 'string', example: 'password123'),
        ])),
        responses: [
            new OA\Response(response: 200, description: 'ログイン成功', content: new OA\JsonContent(properties: [
                new OA\Property(property: 'token', type: 'string', example: '1|abc123...'),
                new OA\Property(property: 'user', type: 'object', properties: [
                    new OA\Property(property: 'id', type: 'integer', example: 1),
                    new OA\Property(property: 'name', type: 'string', example: 'テストユーザー'),
                    new OA\Property(property: 'email', type: 'string', example: 'user@example.com'),
                ]),
            ])),
        ]
    )]
    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['password'], $user->password)) {
            throw ValidationException::withMessages(['email' => ['認証情報が正しくありません。']]);
        }

        $token = $user->createToken('api')->plainTextToken;

        return response()->json(['token' => $token, 'user' => ['id' => $user->id, 'name' => $user->name, 'email' => $user->email]]);
    }

    #[OA\Post(
        path: '/api/logout',
        summary: 'ログアウト',
        tags: ['認証'],
        security: [['bearerAuth' => []]],
        responses: [
            new OA\Response(response: 200, description: 'ログアウト成功'),
            new OA\Response(response: 401, description: '未認証'),
        ]
    )]
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'ログアウトしました。']);
    }
}
