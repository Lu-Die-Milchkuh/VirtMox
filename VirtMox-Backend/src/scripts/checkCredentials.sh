#!/bin/bash

# Function to hash a password using the crypt function
function hash_password_crypt {
    local password="$1"
    local salt="$2"
    local hashed_password=$(perl -e "print crypt('$password', '\$$salt\$')")
    echo "$hashed_password"
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

alg_and_salt=$(echo $hash | cut -d "$" -f 2-3)

# YesCrypt uses a different format for the salt
if [[ "$alg" = '$y$' ]]; then
  alg_and_salt=$(echo $hash | cut -d "$" -f 2-4)
  hashed_password=$(hash_password_crypt "$password" "$alg_and_salt")
else
  hashed_password=$(hash_password_crypt "$password" "$alg_and_salt")
fi

# Compare the resulting hash with the stored hash
if [[ "$hashed_password" = "$hash" ]]; then
  exit 0
else
  exit 1
fi

