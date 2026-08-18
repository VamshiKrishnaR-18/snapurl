pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from Git...'
                checkout scm
            }
        }
        
        stage('Build & Test Backend') {
            steps {
                echo 'Installing backend dependencies and running tests...'
                dir('snapurl-backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Installing frontend dependencies and compiling React app...'
                dir('snapurl-frontend') {
                    bat 'npm install'
                    // This executes the Vite build script from your package.json
                    bat 'npm run build' 
                }
            }
        }

        stage('Result') {
            steps {
                echo 'Full-stack automation stages executed successfully.'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Status: SUCCESS - Both backend and frontend built successfully.'
        }
        failure {
            echo 'Status: FAILURE - The pipeline failed. Please check the logs.'
        }
        cleanup {
            echo 'Cleaning up workspace...'
            cleanWs() 
        }
    }
}
