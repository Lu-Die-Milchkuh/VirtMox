#!/bin/bash

echo "Building VirtMox"

echo "Building the frontend..."

cd VirtMox-Frontend 
bun install
bun run build

echo "Building the backend..."

cd ..

cd VirtMox-Backend
bun install 

cd ..

cp -r VirtMox-Frontend/dist VirtMox-Backend/public

echo "VirtMox has been built successfully"