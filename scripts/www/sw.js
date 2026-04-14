// Service Worker for 工时管理 APP
const CACHE_NAME = 'workhour-manager-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// 安装事件
self.addEventListener('install', (event) => {
  console.log('[SW] 安装中...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] 缓存静态资源');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] 安装完成');
        return self.skipWaiting();
      })
      .catch((err) => {
        console.error('[SW] 安装失败', err);
      })
  );
});

// 激活事件
self.addEventListener('activate', (event) => {
  console.log('[SW] 激活中...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] 删除旧缓存', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] 激活完成');
      return self.clients.claim();
    })
  );
});

// 请求拦截 - 缓存优先策略
self.addEventListener('fetch', (event) => {
  // 只处理同源请求
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            // 不缓存非成功响应
            if (!response || response.status !== 200 || response.type !== 'basic') {
              if (response && response.type === 'opaque') {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            console.log('[SW] 网络请求失败，返回缓存');
            return caches.match('./index.html');
          });
      })
  );
});

// 处理消息
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker 加载完成');
