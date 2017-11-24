#!/bin/sh
# pack everything as a Firefox extension

TARGET=$PWD/dist/error-collector-webextension-firefox.xpi

cd webextension
rm -i $TARGET
zip -r $TARGET .
echo "Saved to $TARGET"
cd -
