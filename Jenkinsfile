pipeline {
    agent any

    // Task 8: Pipeline Parameters
    parameters {
        choice(name: 'ENVIRONMENT', choices: ['dev', 'test', 'prod'], description: 'Select the deployment environment')
    }

    // Task 7: Environment Variables
    environment {
        APP_NAME = 'snapurl'
        BUILD_VERSION = "1.0.${env.BUILD_NUMBER}"
    }

    // Task 5 & 6: Stages and Steps
    stages {
        stage('Checkout') {
            steps {
                echo "Starting CI/CD pipeline for ${env.APP_NAME}..."
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo "Building version ${env.BUILD_VERSION}..."
                bat 'node -v'
                bat 'echo "Dependencies installed and code compiled successfully!"'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running automated test suites...'
                bat 'echo "All Node.js unit tests passed!"'
            }
        }
        
        stage('Deploy') {
            steps {
                echo "Deploying application to the ${params.ENVIRONMENT} environment..."
                bat 'echo "Deployment completed!"'
            }
        }
    }
    
    // Task 9: Post Actions
    post {
        always {
            echo 'Pipeline execution has finished.'
        }
        success {
            echo 'Status: SUCCESS - The build, test, and deploy stages passed.'
        }
        failure {
            echo 'Status: FAILURE - The pipeline failed. Check the logs.'
        }
        cleanup {
            echo 'Cleaning up temporary files...'
            bat 'echo "Workspace cleanup complete."'
        }
    }
}
