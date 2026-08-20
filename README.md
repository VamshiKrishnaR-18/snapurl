# SnapURL

SnapURL is a full-stack URL shortening application. It features a React-based frontend, a Node.js backend, and a MongoDB database. The repository is fully equipped for modern DevOps pipelines, including Docker containerization and Kubernetes deployment manifests.

## Architecture overview

The repository is divided into distinct microservices and deployment configurations:

*   **`snapurl-frontend/`**: The client-side application built with React and Vite.
*   **`snapurl-backend/`**: The REST API backend built with Node.js to handle URL processing and redirection.
*   **`k8s/`**: Kubernetes manifests for deploying the application stack into a cluster.
*   **`docker-compose.yml`**: Local orchestration file to spin up the entire stack with a single command.

## 🚀 Getting Started (Local Development)

### Prerequisites
*   [Docker](https://www.docker.com/) and Docker Compose
*   [Node.js](https://nodejs.org/) (for local, non-containerized development)

### Running with Docker Compose
The easiest way to run SnapURL locally is via Docker Compose.

1. Clone the repository.
2. Navigate to the root directory.
3. Start the services:
   ```bash
   docker-compose up --build

