# ── Dockerfile (backend) ──────────────────────────────────────────────────────
# Multi-stage is overkill for this project size; single stage keeps it simple.

# Use official Node LTS image on Alpine (small footprint)
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests first so Docker can cache the npm install layer.
# If only source files change, npm install won't re-run on rebuild.
COPY package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Copy the rest of the source code
COPY . .

# Expose the port the Express server listens on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
