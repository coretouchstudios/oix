echo "Deploying OIX Platform..."

docker build -t oix-platform .

docker run -p 3000:3000 oix-platform
