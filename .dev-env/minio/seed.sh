#!/bin/sh

mc alias set minio http://tutorials-minio:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD

mc mb minio/tutorials

mc anonymous set download minio/tutorials

mc cp --recursive /tmp/minio/data/ minio/tutorials/
