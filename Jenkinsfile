pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from Git...'
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                echo 'Installing Node.js dependencies for the backend...'
                dir('snapurl-backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Test Backend') {
            steps {
                echo 'Executing backend automated tests...'
                dir('snapurl-backend') {
                    bat 'npm test'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                echo 'Installing Node.js dependencies for the frontend...'
                dir('snapurl-frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Result') {
            steps {
                echo 'Full-stack Build and Test automation stages executed successfully.'
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
            echo 'Status: FAILURE - The build or test stage failed. Please check the logs.'
        }
        cleanup {
            echo 'Cleaning up workspace...'
            cleanWs() 
        }
    }
}
