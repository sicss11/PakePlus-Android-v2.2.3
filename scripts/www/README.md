# 工时管理 APP - 打包指南

## 项目结构

```
工时管理APP/
├── index.html      # 主应用文件（HTML + CSS + JS）
├── manifest.json   # PWA配置文件
├── sw.js           # Service Worker（离线支持）
└── README.md       # 本文档
```

## 快速开始

### 方法一：直接使用（无需安装）

1. 使用任何本地服务器运行项目（如 Live Server、http-server）
2. 在浏览器中打开 `index.html`

### 方法二：作为PWA安装到桌面/手机

1. 用Chrome/Safari浏览器打开项目
2. 点击"添加到主屏幕"即可作为独立APP使用

---

## 安卓APP打包方案

### 方案一：使用 HBuilderX（推荐小白）

1. 下载 [HBuilderX](https://www.dcloud.io/hbuilderx.html)
2. 将 `工时管理APP` 文件夹拖入 HBuilderX
3. 右键项目 → 发行 → 原生APP-云打包
4. 选择 Android + 使用公共测试证书
5. 勾选"隐私提示"确认
6. 点击打包，等待完成下载 APK

### 方案二：使用 Capacitor

```bash
# 1. 创建原生项目
npm create capacitor-app@latest workhour-app

# 2. 进入项目目录
cd workhour-app

# 3. 添加 Android 平台
npx cap add android

# 4. 复制 Web 文件到 Android 项目
# 将 工时管理APP/index.html 复制到 www/ 目录

# 5. 同步到原生项目
npx cap sync android

# 6. 打开 Android Studio
npx cap open android

# 7. 在 Android Studio 中 Build → Generate Signed APK
```

### 方案三：使用 PWABuilder（在线打包）

1. 部署网站到 GitHub Pages 或其他托管服务
2. 访问 [PWABuilder.com](https://www.pwabuilder.com/)
3. 输入网站URL
4. 点击 "Package for stores" → 选择 Android
5. 下载生成的 APK

### 方案四：使用 WebViewGold（付费）

1. 下载 [WebViewGold](https://www.webviewgold.com/)
2. 粘贴网站URL或上传本地文件
3. 配置APP图标和名称
4. 生成 APK

---

## 功能清单

✅ 月日历展示（支持左右滑动切换月份）  
✅ 批量选择（点击全选/反选/取消）  
✅ 工时/时薪编辑（支持单个和批量修改）  
✅ 实时统计（总工时、加班工时、总薪资）  
✅ Excel/CSV导入  
✅ 全局设置（默认时薪、工作日/加班日工时）  
✅ 本地存储（localStorage）  
✅ 离线支持（Service Worker）  
✅ 响应式设计（适配手机和桌面）  
✅ PWA安装支持  

---

## 数据格式说明

### 导入文件格式

支持 CSV/TXT 文件，格式要求：

```
日期,工时,时薪(可选)
2024-01-15,8,25
2024-01-16,10,25
```

支持的日期格式：
- `YYYY-MM-DD` （推荐）
- `YYYY/MM/DD`
- `MM-DD` 或 `MM/DD` （使用当前年份）

---

## 技术特性

- 纯前端实现，无需后端
- localStorage 本地存储
- Service Worker 离线缓存
- 响应式布局（320px - 414px+）
- 触摸友好（最小44px点击区域）
- 无第三方依赖
