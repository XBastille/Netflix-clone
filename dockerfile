
FROM python:3.9-slim

WORKDIR /app

# Copy all files into the container
COPY . .

EXPOSE 8000

CMD ["python3", "-m", "http.server", "8000"]
