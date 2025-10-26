# Stage 1: deps
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-alpine AS dependencies
WORKDIR /client
COPY package*.json ./
RUN npm clean-install

# Stage 2: build
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /client
COPY --from=dependencies /client/node_modules ./node_modules
COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ARG VITE_VERCEL_ENV
ENV VITE_VERCEL_ENV=${VITE_VERCEL_ENV}

ENV NODE_ENV=production
RUN npm run build

# Stage 3: production environment
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Set production environment
ARG PORT=80
ENV PORT=${PORT}

# Copy built static files with correct permissions
COPY --from=builder /client/dist ./

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Fix permissions for nginx cache/log dirs
RUN mkdir -p /var/cache/nginx /run /var/log/nginx && \
    chown -R nginx:nginx /var/cache/nginx /run /var/log/nginx

# Use existing nginx user
USER nginx

EXPOSE ${PORT}

CMD ["nginx", "-g", "daemon off;"]
