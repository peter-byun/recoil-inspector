#!/bin/bash

if [ -f .nvmrc ]; then
  if [ -s "$NVM_DIR/nvm.sh" ]; then
    . "$NVM_DIR/nvm.sh"
  fi
  
  nvm use
fi
