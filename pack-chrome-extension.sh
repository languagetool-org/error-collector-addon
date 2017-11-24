#!/bin/sh
# pack everything as a Chrome extension

TARGET=$PWD/dist/error-collector-webextension-chrome.zip

cd webextension
rm -i $TARGET
zip -r $TARGET .
echo "Saved to $TARGET"
cd -
