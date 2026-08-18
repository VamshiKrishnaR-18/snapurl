pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from Git...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Installing Node.js dependencies...'
                // This command reads your package.json and installs required modules
                bat 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Executing automated tests...'
                // This command runs the test script defined in your package.json
                bat 'npm test'
            }
        }
        
        stage('Result') {
            steps {
                echo 'Build and Test automation stages executed successfully.'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution finished.'
        }
        success {
            echo 'Status: SUCCESS - The application successfully built and passed all tests.'
        }
        failure {
            echo 'Status: FAILURE - The build or test stage failed. Please check the logs.'
        }
        cleanup {
            echo 'Cleaning up workspace...'
            cleanWs() // This is a built-in Jenkins command to wipe the workspace after running
        }
    }
}
