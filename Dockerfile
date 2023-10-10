FROM node:16.20.2-alpine as builder

EXPOSE 80
# 设置项目目录
WORKDIR /app

COPY . .

# 编译项目
# RUN npm run build
RUN npm  build
RUN echo "build is success"

FROM nginx

# 复制 nginx.conf 配置文件到镜像中
COPY ["./_nginx/default.conf", "/etc/nginx/nginx.conf"]


# 从编译镜像复制编译结果到此镜像
COPY --from=builder /app/dist /usr/share/nginx/html
