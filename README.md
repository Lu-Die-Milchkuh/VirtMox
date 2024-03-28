# VirtMox

## About

VirtMox is a Linux distro-independent web frontend that simplifies server monitoring and virtual machine management. With real-time insights into server performance and intuitive tools for creating and managing virtual machines, VirtMox offers a streamlined solution for server administration.

## Installation

1. Install the [Bun](https://bun.sh/) Javascript runtime:

```
curl -fsSL https://bun.sh/install | bash
```

2. Clone this repository:

```
git clone https://github.com/Lu-Die-Milchkuh/VirtMox.git
```

3. Navigate to the directory

```
cd VirtMox
```

4. Make the **install script** executable:

```
chmod +x install.sh
```

5. Then run the script:

```
./install.sh
```

## Running the Server

> [!NOTE]
> The server must be run with superuser privileges in order to authenticate users against the system database

By default the server listens on **Port 3000**, if you want to override this behaviour create a `.env.local` in the root of the backend directory and specify the port you want to use instead:

```
PORT=8080
```

To start the server, either ensure that _bun_ is in your **PATH** or run it with the full path, for example: `/path/to/bun run src/index.ts`
