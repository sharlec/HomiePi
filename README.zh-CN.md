# HomiePi

<p align="center">
  <img src="./docs/kiosk.png" alt="HomiePi kiosk dashboard" width="90%" />
</p>

<p align="center">
  局域网家庭打卡看板：触控大屏只负责点按，手机扫码完成添加用户和任务。
</p>

<p align="center">
  <a href="#快速开始">快速开始</a> ·
  <a href="#如何使用">如何使用</a> ·
  <a href="#特性">特性</a> ·
  <a href="#项目结构">项目结构</a> ·
  <a href="#计划">计划</a>
</p>

简体中文 | [English](./README.md)

## 简介

HomiePi 可以把树莓派（或任意内网主机）+ 屏幕变成家庭任务看板。家人用手机扫码在同一
局域网内添加用户和任务；看板本身只需点按，无需输入文字或密码。

## 亮点

- 本地运行：所有数据都在你的局域网内
- 触控优先：面向大屏/墙面平板的界面设计
- 二维码流程：添加用户和任务无需键盘
- 多用户头像与每日打卡

<p align="center">
  <img src="./docs/kiosk.png" alt="Dashboard view" width="90%" />
</p>
<p align="center">
  Dashboard：今日任务看板（待办 / 已完成）。
</p>
<p align="center">
  <img src="./docs/login.png" alt="Home view" width="90%" />
</p>
<p align="center">
  首页：选择用户进入看板，或通过二维码注册新用户。
</p>

## 快速开始

依赖：Python + pip。只有在你需要重新构建前端时才需要 Node.js。

### 1) 后端
```
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r ../requirements.txt
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### 2) 前端构建（仅在修改前端代码后需要）
```
cd backend/frontend
npm install
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

### 3) 打开看板
```
http://<pi-ip>:8000/
```

## 如何使用

1. 看板上显示用户选择与当日任务列表。
2. 手机打开 `http://<pi-ip>:8000/add_new_user` 扫码添加用户。
3. 手机打开 `http://<pi-ip>:8000/add_new_task` 扫码添加任务。
4. 在看板上点按任务完成打卡。

## 特性

- 触控友好的看板界面
- 二维码注册（无密码）
- 二维码添加任务与频率设置
- 每日点击打卡
- 多用户头像

## 技术栈

- 后端：Django + Django REST Framework
- 前端：React
- 二维码生成：qrcode

## 项目结构

- `backend/` Django 项目根目录（包含 `manage.py`）
- `backend/API/` 后端模型与视图
- `backend/frontend/` React 源码与构建工具
- `backend/frontend/static/frontend/main.js` 编译后的前端包

## 计划

- 任务编辑/删除
- 历史统计
- 离线二维码生成（不依赖外部 CDN）
