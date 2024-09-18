FROM python:3.9-slim

WORKDIR /app

# Copy all files into the container
COPY . .

# Expose port 8000
EXPOSE 8000

# Start the python HTTP server
CMD ["python3", "-m", "http.server", "8000"]
