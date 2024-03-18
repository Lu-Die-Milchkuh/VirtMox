#!/bin/bash

# Install the required packages

echo "Building VirtMox"

echo "Building the frontend...

cd VirtMox-Frontend

bun install

# Bundling the Frontend
bun run build

echo "Building the backend...

cd ..

cd VirtMox-Backend

bun install

cd ..
cp -r VirtMox-Frontend/dist VirtMox-Backend/public

echo "VirtMox has been built successfully"
