FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN chown -R appuser:appgroup /usr/src/app

COPY --chown=appuser:appgroup ./src/Backend/PdfService ./

# Install app dependencies
RUN npm ci

# Install Puppeteer dependencies
RUN apk update && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates 

# Set the Puppeteer environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
    
USER appuser
    
# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]