FROM squidfunk/mkdocs-material:latest AS builder

WORKDIR /docs
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN mkdocs build

FROM nginx:alpine
COPY --from=builder /docs/site /usr/share/nginx/html
COPY nginx-docs.conf /etc/nginx/conf.d/default.conf

EXPOSE 8001
CMD ["nginx", "-g", "daemon off;"]
