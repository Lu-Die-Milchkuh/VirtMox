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

echo "Creating directories..."

mkdir -p VirtMox-Backend/public
mkdir -p VirtMox-Backend/vm/config
mkdir -p VirtMox-Backend/vm/hdd
mkdir -p VirtMox-Backend/vm/iso

cp -r VirtMox-Frontend/dist/* VirtMox-Backend/public

echo "VirtMox has been built successfully"
