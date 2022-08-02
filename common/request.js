// 按需导入 $http 对象
import { $http } from '@escook/request-miniprogram'

// 在 uni-app 项目中，可以把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 配置请求的根路径
uni.$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'