#!/bin/bash

# Generate a hashed password with the given salt and password
function hash_password_sha512 {
    password="$1"
    salt="$2"
    hashed_password=$(openssl passwd -6 -salt $salt $password)
    echo $hashed_password
}

# Generate a hashed password with the given salt and password using YesCrypt
function hash_password_yescrypt {
    password="$1"
    salt="$2"
    hashed_password=$(yescrypt "$password" "$salt")
    echo $hashed_password
}

# We need to read /etc/shadow later, so make sure we got the correct permissions
if [ "$EUID" -ne 0 ]; then
  echo "Please run as root"
  exit 1
fi

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <username> <password>"
  exit 1
fi

username="$1"
password="$2"

if [[ -z $username  ]] || [[ -z $password ]]; then
  echo "Username or Password empty!"
  exit 1
fi

# Read line containing the username into a buffer
line=$(cat "/etc/shadow" | grep "^$username")

# Check if the user exists
if [[ -z $line ]]; then
  echo "User not found"
  exit 1
fi

# Get the hashed password
hash=$(echo $line | cut -d ":" -f 2)

alg=$(echo $hash | cut -c 1-3)

if [[ "$alg" = '$6$' ]]; then
  salt=$(echo $hash | cut -d "$" -f 3)
  hashed_password=$(hash_password_sha512 "$password" "$salt") 
elif [[ "$alg" = '$y$' ]]; then
  salt=$(echo $hash | cut -d "$" -f 3)
  hashed_password=$(hash_password_yescrypt "$password" "$salt")
elif [[ "$alg" = '$1$' ]]; then
  echo "Found MD5"
fi

# Compare the resulting hash with the stored hash
if [[ "$hashed_password" = "$hash" ]]; then
  exit 0
else
  exit 1
fi

