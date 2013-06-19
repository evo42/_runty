#!/bin/sh

set -e
set -u

# Let's display everything on stderr.
exec 1>&2

UNAME=`uname`
if [ "$UNAME" != "Linux" -a "$UNAME" != "Darwin" ] ; then
    echo "Sorry, this OS is not supported yet. Please install Runty. The NoCMS manually using this guide: http://runty.io/guides/installation"
    exit 1
fi

trap "echo Installation failed." EXIT

# remove old runty directory
[ -e "runty" ] && rm -rf "runty"

# This is the CloudFront CDN serving com.meteor.warehouse.
#ZIP_URL="https://github.com/evo42/runty/archive/installer.zip"
TARBALL_URL="https://codeload.github.com/evo42/runty/tar.gz/installer"
#TARBALL_URL="http://apa.runty/installer.tar.gz"

INSTALL_TMPDIR=".runty-install-tmp"
sudo rm -rf "$INSTALL_TMPDIR"
mkdir "$INSTALL_TMPDIR"

echo ""
echo "Downloading Runty. The NoCMS"

curl --progress-bar --fail "$TARBALL_URL" | tar -xzf - -C "$INSTALL_TMPDIR"
# bomb out if it didn't work, eg no net
test -x "${INSTALL_TMPDIR}/runty-installer/runty/app.js"
mv "${INSTALL_TMPDIR}/runty-installer/runty" "./runty"
sudo rm -rf "${INSTALL_TMPDIR}"
# double-checking
test -x "runty/app.js"


# create uploads folder
if [ -e "./uploads" ] ; then
    # do not remove uploads dir
    echo "Uploads directory exists"
else
    # create empty uploads dir
    mkdir ./uploads
fi

# copy config files
mv runty/aloha-editor.js.example ./aloha-editor.js
mv runty/user.json.example ./user.json

# chown
if [ "$UNAME" = "Darwin" ] ; then
  ### OSX ###
  CHOWN="_www:staff"
elif [ "$UNAME" = "Linux" ] ; then
  ### Linux ###
  CHOWN="www-data:www-data"
fi

sudo chmod -R 755 ./*
sudo chown -R "$CHOWN" ./*

echo "Runty. The NoCMS has been installed."


  cat <<"EOF"

Sign in to http://yourdomain.com/runty to start editing pages.

Or see the docs at:

  runty.io/guides

EOF


trap - EXIT