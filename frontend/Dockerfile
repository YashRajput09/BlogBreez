# Use node image for base image for all stages.
ARG NODE_VERSION=20

################################################################################
# Base Stage
FROM node:${NODE_VERSION}-alpine AS base

# Set working directory for all build stages.
WORKDIR /app

################################################################################
# Dependencies Stage
FROM base AS deps

# Install dependencies separately to leverage caching
COPY package.json package-lock.json ./
RUN npm install --omit=dev

################################################################################
# Build Stage
FROM base AS build

# Install full dependencies (including dev dependencies)
COPY package.json package-lock.json ./
RUN npm install

# Copy the source files
COPY . .

# Run the build script
RUN npm run build

################################################################################
# Final Stage (Production)
FROM base AS final

# Use production environment
ENV NODE_ENV=production

# Copy only the necessary files from previous stages
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json . 

# Set user to node for security
USER node

# Expose the port the application listens on
EXPOSE 3000

# Start Vite development server
# CMD ["npm", "run", "dev"]

# Serve the built app
CMD ["npx", "serve", "-s", "dist"]
